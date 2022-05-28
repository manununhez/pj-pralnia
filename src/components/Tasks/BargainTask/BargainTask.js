import React, { useState, useEffect } from 'react';

import { Modal, ModalHeader, ModalBody } from 'reactstrap';

import {
    BARGAIN_ERROR_SELECTED_ALERT_MESSAGE,
    BARGAIN_MISSED_SELECTED_ALERT_MESSAGE,
    STORES_NOT_AVAILABLE,
    MIDDLE_EXPERIMENT_ALERT,
    ONE_SECOND_MS,
    EXPERIMENT_TYPE_LONG,
    EXPERIMENT_TYPE_SHORT,
    ENTER_KEY_CODE,
    EVENT_KEY_DOWN,
    TEXT_FOOTER_ENTER,
    MODAL_TITLE,
    MODAL_TYPE_STORE
} from '../../../helpers/constants';
import { randomNumber } from '../../../helpers/utils';
import StickmanLoading from './StickmanLoading';
import ProductsMenu from './ProductsMenu';
import Footer from "../../Footers/Footer";
import "../style.css";

const DEBUG = (process.env.REACT_APP_DEBUG_LOG === "true") ? true : false;
export default function BargainTask(props) {
    const [typeTask] = useState({ name: props.typeTask })
    const PRODUCTS_PER_ROW = 5
    const DURATION_IN_MINS = 30
    const EXPERIMENT_DURATION_SECS = DURATION_IN_MINS * 60

    const setConditionalList = () => {
        if (DEBUG) console.log("===== setConditionalList =====")
        if (typeTask.name === EXPERIMENT_TYPE_LONG) {
            if (DEBUG) console.log(EXPERIMENT_TYPE_LONG)
            return props.data.storesLong
        } else if (typeTask.name === EXPERIMENT_TYPE_SHORT) {
            if (DEBUG) console.log(EXPERIMENT_TYPE_SHORT)
            return props.data.storesShort
        }
    }

    const initializeProducts = (_store) => _store.products.slice(0, PRODUCTS_PER_ROW * 2)

    const initNewStoreResult = (_storeNumber, _typeTask, _round, _totalBargains) => {
        return {
            typeTask: _typeTask,
            storeNumber: _storeNumber,
            enterStoreTimestamp: Date.now(),
            leaveStoreTimestamp: Date.now(),
            productsSeen: 0,
            lastProductDisplayed: 0,
            bargainTakenNumber: 0,
            bargainWronglyTakenNumber: 0,
            bargainShownNumber: 0,
            round: _round,
            totalBargainsInStore: _totalBargains
        }
    }

    const [storeLists] = useState({ value: setConditionalList() })
    const [round, setRound] = useState(1)
    const [currentBeltIteration] = useState({ value: 1 })
    const [currentStoreIndex] = useState({ value: 0 })
    const [currentProducts, setCurrentProducts] = useState(initializeProducts(storeLists.value[currentStoreIndex.value]))
    const [currentProductListWithoutBargains, setCurrentProductListWithoutBargains] = useState([])
    const [delay, setDelay] = useState(ONE_SECOND_MS)
    const [modalAlertConfig, setModalAlertConfig] = useState({ isVisible: false, text: "", type: "", title: "" })
    const [results] = useState([initNewStoreResult(storeLists.value[currentStoreIndex.value].storeNumber, typeTask.name, round, storeLists.value[currentStoreIndex.value].bargainsNumber)])
    const [showFeedback, setShowFeedback] = useState(storeLists.value[currentStoreIndex.value].showFeedback)
    const [showInstruction, setShowInstruction] = useState(false)
    const [showProducts, setShowProducts] = useState(true)
    const [selectedProducts, setSelectedProducts] = useState([])
    const [timer] = useState({ counter: EXPERIMENT_DURATION_SECS })

    /**
     * MENU ITEM CALLBACKS
     */
    const onFirstItemVisible = () => {
        // if (DEBUG) console.log("first item is visible")
    }

    const onLastItemVisible = () => {
        if (DEBUG) console.log("last item is visible")
        generateNewProductListToDisplay()
    }

    const onUpdate = () => showNextBeltIterationProducts()

    const onSelect = key => productSelected(key)


    /**
     * Helper Functions
     */
    const onShowNextStore = () => {
        if (DEBUG) console.log("onGoStoreBtnClick")
        if (showFeedback) {
            let missedBargains = countMissedBargains()
            if (missedBargains > 0) {
                modalAlert(MODAL_TITLE, BARGAIN_MISSED_SELECTED_ALERT_MESSAGE(missedBargains), MODAL_TYPE_STORE)
                return //we return without calling showNextStoreActions() here. This function is later called in the modale onClosed
            }
        }

        showNextStoreActions()
    }

    /**
     * 
     */
    const showNextStoreActions = () => {
        saveResultsBeforeLeavingStore()
        showLoadingAnimation()
    }

    /**
     * 
     * @param {*} key 
     */
    const productSelected = key => {
        const productIndex = parseInt(key)

        if (!selectedProducts.includes(productIndex)) {
            const productSelected = storeLists.value[currentStoreIndex.value].products[productIndex]
            let selected = [...selectedProducts]

            selected.push(productIndex)

            setSelectedProducts(selected)

            //Check BARGAIN selection
            if (productSelected.isBargain) {
                const newBargainCounter = results[results.length - 1].bargainTakenNumber + 1

                saveResultsNewBargainTaken(newBargainCounter)
            } else {
                const wrongBargainCounter = results[results.length - 1].bargainWronglyTakenNumber + 1

                saveResultsWronglyBargainTaken(wrongBargainCounter)

                if (showFeedback) {
                    modalAlert(MODAL_TITLE, BARGAIN_ERROR_SELECTED_ALERT_MESSAGE)
                }
            }
        }
    }

    /**
     * 
     * @returns 
     */
    const displayNewStore = () => {
        //check is there are stores available
        if (results.length >= storeLists.value.length) {
            modalAlert(MODAL_TITLE, STORES_NOT_AVAILABLE)
            return
        }

        currentStoreIndex.value += 1
        currentBeltIteration.value = 1

        const newStore = storeLists.value[currentStoreIndex.value]

        //update results
        results.push(initNewStoreResult(newStore.storeNumber, typeTask.name, round, newStore.bargainsNumber))

        setCurrentProducts(initializeProducts(newStore))
        setShowFeedback(newStore.showFeedback)
        setSelectedProducts([])
        setCurrentProductListWithoutBargains([])
    }

    /**
     * 
     */
    const showLoadingAnimation = () => {
        setShowProducts(false)
        setShowInstruction(false)
    }


    /**
     * 
     */
    const showProductsPage = () => {
        setShowProducts(true)
        setShowInstruction(false)
    }

    /**
     * 
     */
    const showMiddleInstructionPage = () => {
        setShowProducts(false)
        setShowInstruction(true)
    }

    /**
     * 
     */
    const showNextBeltIterationProducts = () => {
        if (showFeedback) {
            let missedBargains = countMissedBargains()
            if (missedBargains > 0) {
                modalAlert(MODAL_TITLE, BARGAIN_MISSED_SELECTED_ALERT_MESSAGE(missedBargains), "")
            }
        }
        //we called saveResultsBeforeChangingBelt() even if we have shown the alert (it does not affect the animation of the belt transitioning)
        saveResultsBeforeChangingBelt()
    }

    /**
     * 
     */
    const generateNewProductListToDisplay = () => {
        if (DEBUG) console.log("generateNewProductListToDisplay")
        const from = currentBeltIteration.value * PRODUCTS_PER_ROW
        const to = from + (PRODUCTS_PER_ROW * 2)
        const isNeededGenerateNewProducts = currentProducts.length === storeLists.value[currentStoreIndex.value].products.length

        if (DEBUG) console.log('isNeededGenerateNewProducts: ' + isNeededGenerateNewProducts)
        let tmp = []

        if (!isNeededGenerateNewProducts) {
            tmp = storeLists.value[currentStoreIndex.value].products.slice(from, to)
        } else {
            // Update menu belt products with new random generated products when we reached the end of the product list
            let filteredNotBargainList = currentProductListWithoutBargains

            if (currentProductListWithoutBargains.length === 0) {
                filteredNotBargainList = storeLists.value[currentStoreIndex.value].products.filter(item => item.isBargain === false)

                setCurrentProductListWithoutBargains(filteredNotBargainList)
            }

            tmp = generateRandomProductList(filteredNotBargainList)

            //we update the original list with the new generated products
            storeLists.value[currentStoreIndex.value].products = currentProducts.concat(tmp)
        }

        //update current product list
        setCurrentProducts(currentProducts.concat(tmp))
    }

    /**
     * 
     * @param {*} filteredNotBargainList 
     * @returns 
     */
    const generateRandomProductList = (filteredNotBargainList) => {
        let count = 0
        let newList = []
        let randomNumbersList = []

        //TODO what happened in case of an infinite loop here => there are not enough not bargain product lists
        while (count < PRODUCTS_PER_ROW) {
            const randomProduct = filteredNotBargainList[randomNumber(0, filteredNotBargainList.length - 1)]
            const randomProductNumber = randomProduct.productNumber

            if (!randomNumbersList.includes(randomProductNumber)) {
                randomNumbersList.push(randomProductNumber)
                newList.push(randomProduct)
                count += 1
            }
        }

        return newList
    }

    /**
     * 
     * @returns 
     */
    const countMissedBargains = () => {
        const from = (currentBeltIteration.value - 1) * PRODUCTS_PER_ROW
        const to = from + PRODUCTS_PER_ROW
        const productListInThisIteration = storeLists.value[currentStoreIndex.value].products.slice(from, to)
        const bargainNumberInThisIteration = productListInThisIteration.filter(product => product.isBargain === true).length

        let selectedBargainsCounter = 0

        for (let i = from; i <= to; i++) {
            if (selectedProducts.includes(i)) {
                const product = storeLists.value[currentStoreIndex.value].products[i]

                if (product.isBargain) {
                    selectedBargainsCounter += 1
                }
            }
        }

        let missedBargains = bargainNumberInThisIteration - selectedBargainsCounter
        return missedBargains
    }

    /**
     * 
     */
    const onLoadingFinished = () => {
        showProductsPage()
        displayNewStore()
    }

    /**
     * 
     */
    const onMiddleExperimentResume = () => {
        setDelay(ONE_SECOND_MS)
        showProductsPage()
        setNewExperimentType()//change store list (short - long)
    }

    /**
     * 
     */
    const onMiddleExperimentPause = () => {
        setDelay(null)
        showMiddleInstructionPage()
    }

    /**
     * 
     */
    const saveResultsBeforeLeavingStore = () => {
        if (DEBUG) console.log("saveResultsBeforeLeavingStore")
        updateBargainAndProductsResults()
        updateTimestampResults()

        if (DEBUG) console.log(results)
    }

    /**
     * 
     */
    const updateTimestampResults = () => {
        results[results.length - 1] = {
            ...results[results.length - 1],
            leaveStoreTimestamp: Date.now()
        }
    }

    /**
     * 
     */
    const updateBargainAndProductsResults = () => {
        if (DEBUG) console.log("====Current storeLists =====")
        if (DEBUG) console.log(storeLists.value)
        const from = (currentBeltIteration.value - 1) * PRODUCTS_PER_ROW
        const to = from + PRODUCTS_PER_ROW
        const productListInThisIteration = storeLists.value[currentStoreIndex.value].products.slice(0, to) //every iteration, we took al the products from start to the current iteration. IMPROVE THIS!
        const totalShownBargainsSoFar = productListInThisIteration.filter(product => product.isBargain === true).length //we count the bargains numbers
        const lastProductNumberDisplayed = storeLists.value[currentStoreIndex.value].products[to - 1].productNumber

        if (DEBUG) console.log("currentBeltIteration: " + currentBeltIteration.value)
        if (DEBUG) console.log("From: " + 0 + " to: " + to)
        if (DEBUG) console.log(productListInThisIteration)
        if (DEBUG) console.log("totalShownBargainsSoFar: " + totalShownBargainsSoFar)
        if (DEBUG) console.log("lastProductDisplayed: " + lastProductNumberDisplayed)

        results[results.length - 1] = {
            ...results[results.length - 1],
            productsSeen: to,
            lastProductDisplayed: lastProductNumberDisplayed,
            bargainShownNumber: totalShownBargainsSoFar
        }
    }

    /**
     * 
     */
    const saveResultsBeforeChangingBelt = () => {
        if (DEBUG) console.log("saveResultsBeforeChangingBelt")

        updateBargainAndProductsResults()

        currentBeltIteration.value += 1

        if (DEBUG) console.log(results)
    }

    /**
     * 
     * @param {*} newBargainCounter 
     */
    const saveResultsNewBargainTaken = (newBargainCounter) => {
        if (DEBUG) console.log("saveResultsNewBargainTaken===")

        results[results.length - 1] = {
            ...results[results.length - 1],
            bargainTakenNumber: newBargainCounter
        }

        if (DEBUG) console.log(results)
    }

    /**
     * 
     * @param {*} wrongBargainCounter 
     */
    const saveResultsWronglyBargainTaken = (wrongBargainCounter) => {
        if (DEBUG) console.log("saveResultsWronglyBargainTaken===")

        results[results.length - 1] = {
            ...results[results.length - 1],
            bargainWronglyTakenNumber: wrongBargainCounter
        }

        if (DEBUG) console.log(results)
    }

    /**
     * 
     */
    const setNewExperimentType = () => {
        if (DEBUG) console.log("setNewExperimentType")
        const newTypeTask = typeTask.name === EXPERIMENT_TYPE_LONG ? EXPERIMENT_TYPE_SHORT : EXPERIMENT_TYPE_LONG
        const newListToDisplay = newTypeTask === EXPERIMENT_TYPE_LONG ? props.data.storesLong : props.data.storesShort
        const newStoresVisited = newListToDisplay[0]
        const newRound = round + 1

        results.push(initNewStoreResult(newStoresVisited.storeNumber, newTypeTask, newRound, newStoresVisited.bargainsNumber))
        typeTask.name = newTypeTask
        if (DEBUG) console.log(results)
        if (DEBUG) console.log(typeTask.name)

        currentStoreIndex.value = 0
        currentBeltIteration.value = 1
        storeLists.value = newListToDisplay//we change the stores lists by Conditions (Long/short)
        setRound(newRound)
        setSelectedProducts([])
        setCurrentProductListWithoutBargains([])
        setCurrentProducts(initializeProducts(newStoresVisited))
        setShowFeedback(newStoresVisited.showFeedback)
    }

    /**
     * 
     */
    const updateTime = () => {
        timer.counter -= 1
        if (DEBUG) console.log(timer.counter)
    }

    /**
     * 
     * @param {*} _isTaskCompleted 
     */
    const syncResults = (_isTaskCompleted) => {
        saveResultsBeforeLeavingStore()

        props.action({
            isTaskCompleted: _isTaskCompleted,
            results: (results.filter((item) => item.typeTask === typeTask.name))
        })
    }

    useEffect(() => {//component didmount
        let id = null
        function tick() {

            updateTime()

            if (timer.counter === 0) {//When timer 0, the experiment finishes
                clearInterval(id)

                syncResults(true)

            } else if (timer.counter === (EXPERIMENT_DURATION_SECS / 2)) {
                if (DEBUG) console.log("Middle of the experiments")

                syncResults(false)

                onMiddleExperimentPause()
            }
        }

        if (delay !== null) {
            id = setInterval(tick, delay)
            return () => clearInterval(id)
        }
    }, [delay])

    useEffect(() => {
        const handleKeyDownEvent = event => {
            const { key, keyCode } = event
            if (keyCode === ENTER_KEY_CODE && delay === null) { //If we are on pause in the middle of the experiment, we press enter to go to next part
                onMiddleExperimentResume()
            }
        }

        document.addEventListener(EVENT_KEY_DOWN, handleKeyDownEvent);
        return () => {
            document.removeEventListener(EVENT_KEY_DOWN, handleKeyDownEvent);
        };
    });

    /**
     * 
     * @param {*} showProducts 
     * @param {*} showInstruction 
     * @returns 
     */
    const displayBodyConfig = (showProducts, showInstruction) => {
        if (showProducts) {
            return (<div><ProductsMenu
                store={currentStoreIndex.value}
                products={currentProducts}
                selected={selectedProducts}
                onFirstItemVisible={onFirstItemVisible}
                onLastItemVisible={onLastItemVisible}
                onSelect={onSelect}
                onUpdate={onUpdate}
                onGoStoreBtnClick={onShowNextStore}
                bargainsTaken={results[results.length - 1].bargainTakenNumber} /></div>)
        } else if (showInstruction) {
            return (<div className="centered" style={{ textAlign: "center" }}>
                <h3>{MIDDLE_EXPERIMENT_ALERT}</h3>
                <br />
                <br />
                <Footer text={TEXT_FOOTER_ENTER} /></div>)
        } else {
            return (<div className="centered">
                <StickmanLoading
                    currentStore={storeLists.value[currentStoreIndex.value]}
                    onLoadingFinished={onLoadingFinished} /></div>)
        }
    }

    /**
     * 
     * @returns 
     */
    const showModal = () => {
        if (modalAlertConfig.isVisible) {
            if (modalAlertConfig.type === MODAL_TYPE_STORE) {
                return <ModalAlert
                    title={modalAlertConfig.title}
                    text={modalAlertConfig.text}
                    onOpened={() => { if (DEBUG) console.log("With STORE callback") }}
                    onClosed={onModalStoreClosed} />
            } else {
                return <ModalAlert
                    title={modalAlertConfig.title}
                    text={modalAlertConfig.text}
                    onOpened={() => { if (DEBUG) console.log("Without callback") }}
                    onClosed={() => { closeModal() }} />
            }
        } else return <></>
    }

    /**
     * 
     * @param {*} title 
     * @param {*} text 
     * @param {*} type 
     * @param {*} isVisible 
     * @returns 
     */
    const modalAlert = (title, text, type = "", isVisible = true) => setModalAlertConfig({ isVisible: isVisible, text: text, type: type, title: title })

    /**
     * 
     */
    const onModalStoreClosed = () => {
        if (DEBUG) console.log("onModalStoreClosed")
        closeModal()

        showNextStoreActions()
    }

    /**
     * 
     * @returns 
     */
    const closeModal = () => modalAlert("", "", "", false)


    return (<>
        {DEBUG ? `Store#:${storeLists.value[currentStoreIndex.value].storeNumber} CurrentBelt:${currentBeltIteration.value}` : ""}

        {showModal()}

        {displayBodyConfig(showProducts, showInstruction)}
    </>)
}

function ModalAlert(props) {
    const { text, title } = props
    const [modal, setModal] = useState(true)

    const toggle = () => setModal(modal => !modal)

    return (
        <div>
            <Modal
                isOpen={modal}
                className="modal-alert"
                toggle={toggle}
                size='sm'
                keyboard={false}
                onOpened={props.onOpened}
                onClosed={props.onClosed}>
                <ModalHeader>{title}</ModalHeader>
                <ModalBody>{text}</ModalBody>
            </Modal>
        </div>
    )
}