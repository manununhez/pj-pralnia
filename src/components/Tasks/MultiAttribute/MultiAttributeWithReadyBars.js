import React from 'react';

// reactstrap components
import { Card, Container, Row, Table, Alert, Modal, ModalHeader } from "reactstrap";

import ReactStars from "react-rating-stars-component";

// get our fontawesome imports
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faSmile, faFrown } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
    FIRST_TASK_PROPERTIES_TOTAL, FIRST_RADIO_VALUE, SECOND_RADIO_VALUE, WHITE, BLACK,
    THIRD_RADIO_VALUE, TEXT_FOOTER, SPACE_KEY_CODE, EVENT_KEY_DOWN, ButtonClicked, SupportType
} from '../../../helpers/constants';

const defaultValue = {
    questionID: 0,
    questionNumber: 0,
    selectedAnswer: '\0',
    isCorrectAnswer: false,
    buttonClicked: ButtonClicked.NO_BUTTON_CLICKED,
    supportType: SupportType.READY_BARS_SHOWN
}

export default class MultiAttributeWithReadyBars extends React.Component {
    constructor(props) {
        super(props);
        this.state = this.initStateValue()
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

    initStateValue = () => {
        let selectedOption = []
        selectedOption.push(defaultValue)
        return {
            selectedOption: [defaultValue],
            startDateTime: Date.now(),
            counter: 0,
            modalOpen: false
        }
    }

    handleKeyDownEvent = (event) => {
        if (event.keyCode === SPACE_KEY_CODE) {
            const { selectedOption, counter, startDateTime } = this.state
            let currentSelectedAnswer = selectedOption[counter]
            currentSelectedAnswer.endDateTime = Math.floor((Date.now() - startDateTime) / 1000)

            if (this.isOptionWasSelectedInThisRound()) {
                if (this.props.data.length === selectedOption.length) {
                    this.setState(this.initStateValue(), () => {
                        this.props.action(selectedOption, currentSelectedAnswer)
                    })
                } else if (selectedOption.length === (counter + 1)) {
                    selectedOption.push(defaultValue)

                    this.setState({
                        counter: (counter + 1),
                        modalOpen: false,
                        selectedOption: selectedOption,
                        startDateTime: Date.now()
                    }, () => {
                        this.props.action(selectedOption, currentSelectedAnswer)
                    })
                }
            }
        }
    }

    modalToggle = () => {
        console.log(this.state)
        this.setState({
            modalOpen: !this.state.modalOpen
        });
    }

    optionClicked = (evt) => {
        const { selectedOption, counter } = this.state
        const currentAnswer = this.props.data[counter]

        let selectedValue = evt.target.value
        evt.target.blur() //remove focus of selected button

        selectedOption[counter] = {
            questionID: currentAnswer.id,
            questionNumber: counter + 1,
            selectedAnswer: selectedValue,
            buttonClicked: ButtonClicked.NO_BUTTON_CLICKED,
            supportType: SupportType.READY_BARS_SHOWN,
            isCorrectAnswer: selectedValue === currentAnswer.correctAnswer.toString(),
        }

        this.setState({ selectedOption: selectedOption, modalOpen: true },
            () => {
                console.log(this.state)
            })
    }

    isOptionWasSelectedInThisRound = () => {
        const { selectedOption, counter } = this.state
        const currentSelectedAnswer = selectedOption[counter]

        return selectedOption.length === (counter + 1) && currentSelectedAnswer.selectedAnswer !== '\0'
    }


    render() {
        const { counter, selectedOption, modalOpen } = this.state
        const data = this.props.data[counter]
        const showFeedback = data.showFeedback
        const showError = false
        const textError = "TEXT ERROR"
        const showFeedbackCorrectAnswer = this.isOptionWasSelectedInThisRound() ? selectedOption[counter].isCorrectAnswer : false
        return (
            <Container key={"KEY_" + counter}>
                <div className="instr-h3">{this.props.text}</div>

                <Alert style={{ fontSize: "1.0rem" }} color="warning" isOpen={showError}>
                    <span className="alert-inner--text ml-1">
                        {textError}
                    </span>
                </Alert>
                <Modal backdrop="static" isOpen={modalOpen} toggle={this.modalToggle} style={{ position: "fixed", top: "40%", left: "45%", transform: "translate(-40%, -40%)" }}>
                    <ModalHeader style={{ padding: "4em" }}>
                        {/* if showsFeedback -- we take the first element of the showFeedback column attribute*/}
                        {(showFeedback)
                            ? <div style={{ textAlign: "center" }}>
                                {/* if correct Answer */}
                                {showFeedbackCorrectAnswer ? <FontAwesomeIcon color="green" icon={faSmile} size="4x" />
                                    : <FontAwesomeIcon color="red" icon={faFrown} size="4x" />}
                            </div>
                            : <></>
                        }
                        <br /><div><h4>{TEXT_FOOTER}</h4></div>
                    </ModalHeader>
                </Modal>
                <Row className="justify-content-center" style={{ flexWrap: 'nowrap' }}>
                    <Card body style={{ marginTop: "20px" }}>
                        <div>{getRatingStarBarTable(data)}</div>
                    </Card>
                    <Card body style={{ marginTop: "20px" }}>
                        <div>{getTable(selectedOption[counter].selectedAnswer, data, this.optionClicked)}</div>
                    </Card>
                    <Card id="cardStackVisual" body style={{ marginTop: "20px" }}>
                        <div>{getTableVisualization(data)}</div>
                    </Card>
                </Row>
            </Container>
        );
    }
}

function getTableVisualization(data) {
    return (<Table borderless responsive style={{ textAlign: 'center', height: '600px' }}>
        <thead>
            <tr>
                <th><h5>Pralka 1</h5></th>
                <th><h5>Pralka 2</h5></th>
                <th><h5>Pralka 3</h5></th>
            </tr>

        </thead>
        <tbody>
            {getTableVisualizationBody(data)}
        </tbody>
    </Table>)
}
/**
 * 
 * @param {*} data 
 * @param {*} counter 
 * @param {*} selectedValue 
 * @param {*} onClick 
 */
function getTable(selectedValue, data, onClick) {
    return (
        <Table responsive style={{ textAlign: 'center' }}>
            <thead>
                <tr>
                    <th>
                        <button color="primary" id={"btn_" + FIRST_RADIO_VALUE}
                            className={selectedValue === FIRST_RADIO_VALUE ? "btn btn-warning" : "btn btn-primary"} //Values from 1 to length
                            onClick={onClick} value={FIRST_RADIO_VALUE}>
                            Pralka 1
                        </button>
                    </th>
                    <th>
                        <button color="primary" id={"btn_" + SECOND_RADIO_VALUE}
                            className={selectedValue === SECOND_RADIO_VALUE ? "btn btn-warning" : "btn btn-primary"} //Values from 1 to length 
                            onClick={onClick} value={SECOND_RADIO_VALUE}>
                            Pralka 2
                        </button>
                    </th>
                    <th>
                        <button color="primary" id={"btn_" + THIRD_RADIO_VALUE}
                            className={selectedValue === THIRD_RADIO_VALUE ? "btn btn-warning" : "btn btn-primary"} //Values from 1 to length
                            onClick={onClick} value={THIRD_RADIO_VALUE}>
                            Pralka 3
                        </button>
                    </th>
                </tr>
            </thead>
            <tbody>
                {getTableBody(data)}
            </tbody>
        </Table>
    );
}

/**
 * 
 * @param {*} data 
 * @param {*} counter 
 */
function getTableVisualizationBody(data) {
    return (<tr>
        <td style={{ verticalAlign: 'bottom' }}>
            <Table responsive borderless>
                <thead></thead>
                <tbody>
                    {getPropertiesTableVizualizationBodyProduct1(data)}
                </tbody>
            </Table>
        </td>
        <td style={{ verticalAlign: 'bottom' }}>
            <Table responsive borderless>
                <thead></thead>
                <tbody>
                    {getPropertiesTableVizualizationBodyProduct2(data)}
                </tbody>
            </Table>
        </td>
        <td style={{ verticalAlign: 'bottom' }}>
            <Table responsive borderless>
                <thead></thead>
                <tbody>
                    {getPropertiesTableVizualizationBodyProduct3(data)}
                </tbody>
            </Table>
        </td>
    </tr>
    );
}

/**
 * 
 * @param {*} data 
 * @returns 
 */
function getPropertiesTableVizualizationBodyProduct1(data) {
    let children = []
    let attributes = FIRST_TASK_PROPERTIES_TOTAL
    for (let i = attributes - 1; i >= 0; i--) {
        if (data.attributes[i].p1 === 1) {
            children.push(
                <tr style={{ border: '1px solid black', textAlign: '-webkit-center', fontSize: '1.3em', display: 'block ruby' }}>
                    {getPropertiesVerticalRating(FIRST_TASK_PROPERTIES_TOTAL - i)}
                </tr>);
        }
    }

    return children
}

/**
 * 
 * @param {*} data 
 * @returns 
 */
function getPropertiesTableVizualizationBodyProduct2(data) {
    let children = []
    let attributes = FIRST_TASK_PROPERTIES_TOTAL
    for (let i = attributes - 1; i >= 0; i--) {
        if (data.attributes[i].p2 === 1) {
            children.push(
                <tr style={{ border: '1px solid black', textAlign: '-webkit-center', fontSize: '1.3em', display: 'block ruby' }}>
                    {getPropertiesVerticalRating(FIRST_TASK_PROPERTIES_TOTAL - i)}
                </tr>);
        }
    }
    return children

}

/**
 * 
 * @param {*} data 
 * @returns 
 */
function getPropertiesTableVizualizationBodyProduct3(data) {
    let children = []
    let attributes = FIRST_TASK_PROPERTIES_TOTAL
    for (let i = attributes - 1; i >= 0; i--) {
        if (data.attributes[i].p3 === 1) {
            children.push(
                <tr style={{ border: '1px solid black', textAlign: '-webkit-center', fontSize: '1.3em', display: 'block ruby' }}>
                    {getPropertiesVerticalRating(FIRST_TASK_PROPERTIES_TOTAL - i)}
                </tr>
            );
        }
    }
    return children

}

/**
 * 
 * @param {*} value 
 * @returns 
 */
function getPropertiesVerticalRating(value) {
    let children = []
    for (let i = 0; i < value; i++) {
        children.push(
            <tr>
                <td style={{ padding: '0' }}>
                    <FontAwesomeIcon icon={faPlus} />
                </td>
            </tr>
        )
    }
    return children
}

/**
 * 
 * @param {*} data 
 * @param {*} counter 
 */
function getTableBody(data) {
    let children = []
    let attributes = FIRST_TASK_PROPERTIES_TOTAL
    for (let i = 0; i < attributes; i++) {
        children.push(
            <tr key={i}>
                <td style={{ fontSize: '1.3em' }}>{boldStyle(data.attributes[i].p1 === 1, data.attributes[i].valueP1)}</td>
                <td style={{ fontSize: '1.3em' }}>{boldStyle(data.attributes[i].p2 === 1, data.attributes[i].valueP2)}</td>
                <td style={{ fontSize: '1.3em' }}>{boldStyle(data.attributes[i].p3 === 1, data.attributes[i].valueP3)}</td>
            </tr>
        );
    }

    return children;
}

/**
 * 
 * @param {*} isBold 
 * @param {*} data 
 */
function boldStyle(isBold, data) {
    if (isBold) //true, bold
        return (<strong>{data}</strong>);
    else return (<>{data}</>);
}

/**
 * 
 * @param {*} data 
 * @param {*} counter 
 */
function getPropertiesTableBody(data) {
    let children = []
    let rating = 6; //6 stars
    for (let i = 0; i < 6; i++) {
        children.push(
            <tr key={i}>
                <td style={{ textAlign: 'left', fontSize: '1.0em', padding: '1.0em', verticalAlign: 'middle' }}>{data.attributes[i].name}</td>
                <td style={{ border: '1px solid black', display: 'table', paddingLeft: '0px', paddingRight: '5px', paddingTop: '10px', paddingBottom: '10px' }} className="align-middle">{RatingBar(rating)}</td>
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
 * @param {*} counter 
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