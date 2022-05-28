import React from 'react';

// reactstrap components
import { Card, Container, Row, Button, Table, Modal, ModalHeader } from "reactstrap";

import ReactStars from "react-rating-stars-component";

// get our fontawesome imports
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faSmile, faFrown } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Box } from "./Box";
import DemoContainer from './DemoContainer'

import {
    FIRST_TASK_PROPERTIES_TOTAL, FIRST_RADIO_VALUE, SECOND_RADIO_VALUE, WHITE, BLACK,
    THIRD_RADIO_VALUE, TEXT_FOOTER, SHOW_FEEDBACK_TRUE, SPACE_KEY_CODE,
    EVENT_KEY_DOWN, modaltStyle, ItemTypes, attributeListsForDemo
} from '../../../helpers/constants';


class MultiAttributeDemo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedOption: [],
            counter: 0,
            multiAttributeResults: [],
            showMissingResultsIndicator: false,
            modalOpen: false
        }
    }

    componentDidMount() {
        //for keyboard detection
        document.addEventListener(EVENT_KEY_DOWN, this.handleKeyDownEvent, false);

        // HTML prevent space bar from scrolling page
        window.addEventListener(EVENT_KEY_DOWN, function (e) {
            if (e.keyCode === SPACE_KEY_CODE && e.target === document.body) {
                e.preventDefault();
            }
        });
    }

    componentWillUnmount() {
        document.removeEventListener(EVENT_KEY_DOWN, this.handleKeyDownEvent, false);
    }

    handleKeyDownEvent = (event) => {
        if (event.keyCode === SPACE_KEY_CODE) {
            const { selectedOption, counter } = this.state
            const isOptionWasSelectedInThisRound = selectedOption.length === (counter + 1)
            const completedTask = this.controlIfAllOptionsAreSelected()

            if (isOptionWasSelectedInThisRound) {
                if (completedTask) {
                    if (attributeListsForDemo.length === selectedOption.length) {
                        this.props.action(selectedOption);
                    } else {
                        this.setState({
                            counter: (counter + 1),
                            modalOpen: false
                        }, () => {
                            console.log("NEXT ROUND")
                        })
                    }
                }
            }
        }
    }

    controlIfAllOptionsAreSelected() {
        const { multiAttributeResults, counter } = this.state
        const data = attributeListsForDemo[counter]

        if (multiAttributeResults.length === 0) return false

        for (let i = 0; i < FIRST_TASK_PROPERTIES_TOTAL; i++) {
            let isAttributeP1Bold = data.attributes[i].p1 === 1
            let isAttributeP2Bold = data.attributes[i].p2 === 1
            let isAttributeP3Bold = data.attributes[i].p3 === 1

            let isCurrentValueP1NotDroppedYet = !multiAttributeResults[0].droppedBoxNames.includes(data.attributes[i].valueP1)
            let isCurrentValueP2NotDroppedYet = !multiAttributeResults[1].droppedBoxNames.includes(data.attributes[i].valueP2)
            let isCurrentValueP3NotDroppedYet = !multiAttributeResults[2].droppedBoxNames.includes(data.attributes[i].valueP3)

            if ((isAttributeP1Bold && isCurrentValueP1NotDroppedYet) || (isAttributeP2Bold && isCurrentValueP2NotDroppedYet)
                || (isAttributeP3Bold && isCurrentValueP3NotDroppedYet)) {
                return false
            }
        }

        return true
    }

    optionClicked = (evt) => {
        const { selectedOption, counter } = this.state
        const isOptionWasSelectedInThisRound = selectedOption.length === (counter + 1)

        let selectedValue = evt.target.value

        evt.target.blur() //remove focus of selected button

        if (selectedOption.length === 0 || selectedOption.length < (counter + 1)) {
            selectedOption.push(selectedValue)
        } else if (isOptionWasSelectedInThisRound) {
            selectedOption[counter] = selectedValue
        }

        // this.props.action(selectedValue);

        this.setState({ selectedOption: selectedOption, modalOpen: true },
            () => {
                console.log(this.state)
            })
    }

    toggle = () => {
        const { selectedOption } = this.state
        const completedTask = this.controlIfAllOptionsAreSelected()

        if (completedTask) {
            this.setState({
                modalOpen: false
            });
        } else {
            selectedOption.pop() //removed button selection
            this.setState({
                modalOpen: false,
                showMissingResultsIndicator: true
            });
        }
    }

    multiAttributeResultsHandler = (attributeResults) => {
        this.setState({
            multiAttributeResults: attributeResults.results,
            showMissingResultsIndicator: false
        })
    }


    render() {
        const { counter, selectedOption, showMissingResultsIndicator,
            multiAttributeResults, modalOpen } = this.state
        const data = attributeListsForDemo[counter]
        const showFeedback = data.showFeedback
        const showFeedbackCorrectAnswer = selectedOption[counter] === data.correctAnswer
        const completedTask = this.controlIfAllOptionsAreSelected()
        return (
            <Container key={"KEY_" + counter}>
                <Modal isOpen={modalOpen} toggle={this.toggle} style={modaltStyle}>
                    {getModalText(showFeedback, showFeedbackCorrectAnswer, completedTask)}
                </Modal>
                <Row className="justify-content-center">
                    <Card body style={{ marginTop: "20px" }}>
                        <div>{getRatingStarBarTable(data)}</div>
                    </Card>
                    <Card body style={{ marginTop: "20px" }}>
                        <div>{getTable(selectedOption[counter], data, this.optionClicked,
                            showMissingResultsIndicator, multiAttributeResults)}</div>
                    </Card>
                    <Card id="cardStackVisual" body style={{ marginTop: "20px" }}>
                        <DemoContainer action={this.multiAttributeResultsHandler} />
                    </Card>

                </Row>
            </Container>
        );
    }
}

/**
 * 
 * @param {*} showFeedback 
 * @param {*} showFeedbackCorrectAnswer 
 * @param {*} completedTask 
 * @returns 
 */
function getModalText(showFeedback, showFeedbackCorrectAnswer, completedTask) {
    return (<ModalHeader style={{ padding: "4em" }}>
        {completedTask ? getModalFeedback(showFeedback, showFeedbackCorrectAnswer) :
            <div><h4>You did not finished yet. Please complete the stacks.</h4></div>}
    </ModalHeader>)
}

/**
 * 
 * @param {*} showFeedback 
 * @param {*} showFeedbackCorrectAnswer 
 * @returns 
 */
function getModalFeedback(showFeedback, showFeedbackCorrectAnswer) {
    return (
        <>
            {(showFeedback === SHOW_FEEDBACK_TRUE) ?
                <div style={{ textAlign: "center" }}>
                    {showFeedbackCorrectAnswer ? <FontAwesomeIcon color="green" icon={faSmile} size="4x" />
                        : <FontAwesomeIcon color="red" icon={faFrown} size="4x" />}
                </div>
                : <></>}
            <br /><div><h4>{TEXT_FOOTER}</h4></div>
        </>
    )
}

/**
 * 
 * @param {*} selectedValue 
 * @param {*} data 
 * @param {*} onClick 
 * @param {*} showMissingResultsIndicator 
 * @param {*} multiAttributeResults 
 * @returns 
 */
function getTable(selectedValue, data, onClick, showMissingResultsIndicator, multiAttributeResults) {
    return (
        <Table responsive style={{ textAlign: 'center' }}>
            <thead>
                <tr>
                    <th>
                        <Button color="primary" id={"btn_" + FIRST_RADIO_VALUE}
                            className={selectedValue === FIRST_RADIO_VALUE ? "btn btn-warning" : "btn btn-primary"}
                            style={{ marginTop: "0px", marginBottom: "0px", fontSize: "0.9em" }}
                            onClick={onClick} value={FIRST_RADIO_VALUE}>
                            Pralka 1
                        </Button>
                    </th>
                    <th>
                        <Button color="primary" id={"btn_" + SECOND_RADIO_VALUE}
                            className={selectedValue === SECOND_RADIO_VALUE ? "btn btn-warning" : "btn btn-primary"}
                            onClick={onClick} value={SECOND_RADIO_VALUE}>
                            Pralka 2
                        </Button>
                    </th>
                    <th>
                        <Button color="primary" id={"btn_" + THIRD_RADIO_VALUE}
                            className={selectedValue === THIRD_RADIO_VALUE ? "btn btn-warning" : "btn btn-primary"}
                            onClick={onClick} value={THIRD_RADIO_VALUE}>
                            Pralka 3
                        </Button>
                    </th>
                </tr>
            </thead>
            <tbody>
                {getTableBody(data, showMissingResultsIndicator, multiAttributeResults)}
            </tbody>
        </Table>
    );
}

/**
 * 
 * @param {*} data 
 * @param {*} showMissingResultsIndicator 
 * @param {*} multiAttributeResults 
 * @returns 
 */
function getTableBody(data, showMissingResultsIndicator, multiAttributeResults) {
    let children = []
    let attributes = FIRST_TASK_PROPERTIES_TOTAL
    console.log(multiAttributeResults)
    for (let i = 0; i < attributes; i++) {
        let index = 6 - i
        let showIndicatorP1 = false
        let showIndicatorP2 = false
        let showIndicatorP3 = false
        let isAttributeP1Bold = data.attributes[i].p1 === 1
        let isAttributeP2Bold = data.attributes[i].p2 === 1
        let isAttributeP3Bold = data.attributes[i].p3 === 1
        let isCurrentValueP1NotDroppedYet = true
        let isCurrentValueP2NotDroppedYet = true
        let isCurrentValueP3NotDroppedYet = true


        if (multiAttributeResults.length > 0) {
            isCurrentValueP1NotDroppedYet = !multiAttributeResults[0].droppedBoxNames.includes(data.attributes[i].valueP1)
            isCurrentValueP2NotDroppedYet = !multiAttributeResults[1].droppedBoxNames.includes(data.attributes[i].valueP2)
            isCurrentValueP3NotDroppedYet = !multiAttributeResults[2].droppedBoxNames.includes(data.attributes[i].valueP3)

            showIndicatorP1 = showMissingResultsIndicator && isAttributeP1Bold && isCurrentValueP1NotDroppedYet
            showIndicatorP2 = showMissingResultsIndicator && isAttributeP2Bold && isCurrentValueP2NotDroppedYet
            showIndicatorP3 = showMissingResultsIndicator && isAttributeP3Bold && isCurrentValueP3NotDroppedYet
        }

        children.push(
            <tr key={i}>
                <td style={{ fontSize: '1.3em' }}>{boldStyle(isAttributeP1Bold, data.attributes[i].valueP1, ItemTypes.PRODUCT_1, index, showIndicatorP1, isCurrentValueP1NotDroppedYet)}</td>
                <td style={{ fontSize: '1.3em' }}>{boldStyle(isAttributeP2Bold, data.attributes[i].valueP2, ItemTypes.PRODUCT_2, index, showIndicatorP2, isCurrentValueP2NotDroppedYet)}</td>
                <td style={{ fontSize: '1.3em' }}>{boldStyle(isAttributeP3Bold, data.attributes[i].valueP3, ItemTypes.PRODUCT_3, index, showIndicatorP3, isCurrentValueP3NotDroppedYet)}</td>
            </tr>
        );
    }

    return children;
}

/**
 * 
 * @param {*} isBold 
 * @param {*} data 
 * @param {*} type 
 * @param {*} index 
 * @param {*} showIndicator 
 * @param {*} isDragActive 
 * @returns 
 */
function boldStyle(isBold, data, type, index, showIndicator, isDragActive) {
    if (isBold && isDragActive)
        return (<Box name={data} type={type} key={index} index={index} showIndicator={showIndicator} />)
    else if (!isDragActive)
        return <strong>{data}</strong>
    else return data
}

/**
 * 
 * @param {*} data 
 * @returns 
 */
function getPropertiesTableBody(data) {
    let children = []
    let rating = 6; //6 stars
    for (let i = 0; i < 6; i++) {
        children.push(
            <tr key={i}>
                <td style={{ textAlign: 'left', fontSize: '1.0em', padding: '1.0em', verticalAlign: 'middle' }}>{data.attributes[i].name}</td>
                <td style={{ border: '1px solid black', padding: '0' }} className="align-middle">{RatingBar(rating)}</td>
            </tr>
        );
        rating--;
    }

    return children;
}

/**
 * 
 * @param {*} value 
 */
function RatingBar(value) {
    return (<ReactStars
        edit={false}
        size={20}
        count={value}
        value={value}
        color={WHITE}
        activeColor={BLACK}
        emptyIcon={<FontAwesomeIcon icon={faPlus} style={{ marginLeft: "5px" }} />}
        filledIcon={<FontAwesomeIcon icon={faPlus} style={{ marginLeft: "5px" }} />}
    />
    );
}

/**
 * 
 * @param {*} data 
 * @returns 
 */
function getRatingStarBarTable(data) {
    return (
        <Table responsive borderless style={{ borderCollapse: 'separate' }}>
            <thead>
                <tr>
                    <th><h5>Właściwość</h5></th>
                    <th><h5>Ważność</h5></th>
                </tr>
            </thead>
            <tbody>
                {getPropertiesTableBody(data)}
            </tbody>
        </Table>
    );
}

export default MultiAttributeDemo;