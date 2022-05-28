import React from 'react';

// reactstrap components
import { Card, Button, Container, Row, Table, Alert, Modal, ModalHeader } from "reactstrap";

import ReactStars from "react-rating-stars-component";

// get our fontawesome imports
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faSmile, faFrown } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
    FIRST_TASK_PROPERTIES_TOTAL, FIRST_RADIO_VALUE, SECOND_RADIO_VALUE, WHITE, BLACK,
    THIRD_RADIO_VALUE, TEXT_FOOTER, SHOW_FEEDBACK_TRUE, SPACE_KEY_CODE,
    EVENT_KEY_DOWN
} from '../../helpers/constants';
import Footer from "../Footers/Footer";


const attributeLists = [
    {
        id: 31, showFeedback: "YES", showVisualStack: "YES", correctAnswer: "3", attributes: [
            { id: "A3", p1: 1, p2: 0, p3: 1, name: "Klasa energetyczna", valueP1: "A+", valueP2: "A+", valueP3: "A++" },
            { id: "A5", p1: 1, p2: 0, p3: 0, name: "Zużycie wody", valueP1: "40", valueP2: "50", valueP3: "50" },
            { id: "A4", p1: 0, p2: 1, p3: 1, name: "Poziom hałasu", valueP1: "50", valueP2: "45", valueP3: "45" },
            { id: "A6", p1: 0, p2: 1, p3: 0, name: "Program szybki", valueP1: "brak", valueP2: "jest", valueP3: "brak" },
            { id: "A2", p1: 0, p2: 1, p3: 1, name: "Pojemność bębna", valueP1: "4", valueP2: "10", valueP3: "10" },
            { id: "A1", p1: 1, p2: 0, p3: 1, name: "Maksymalne obroty", valueP1: "1400", valueP2: "1200", valueP3: "1400" },
        ]
    },
    {
        id: 32, showFeedback: "YES", showVisualStack: "YES", correctAnswer: "1", attributes: [
            { id: "A3", p1: 0, p2: 0, p3: 1, name: "Klasa energetyczna", valueP1: "A", valueP2: "A", valueP3: "A++" },
            { id: "A5", p1: 1, p2: 1, p3: 0, name: "Zużycie wody", valueP1: "45", valueP2: "45", valueP3: "65" },
            { id: "A4", p1: 1, p2: 0, p3: 1, name: "Poziom hałasu", valueP1: "60", valueP2: "70", valueP3: "60" },
            { id: "A6", p1: 1, p2: 0, p3: 0, name: "Program szybki", valueP1: "jest", valueP2: "brak", valueP3: "brak" },
            { id: "A2", p1: 0, p2: 0, p3: 0, name: "Pojemność bębna", valueP1: "4", valueP2: "4", valueP3: "4" },
            { id: "A1", p1: 0, p2: 1, p3: 0, name: "Maksymalne obroty", valueP1: "1000", valueP2: "1400", valueP3: "1000" },
        ]
    },
    {
        id: 33, showFeedback: "YES", showVisualStack: "NO", correctAnswer: "3", attributes: [
            { id: "A3", p1: 0, p2: 0, p3: 1, name: "Klasa energetyczna", valueP1: "A", valueP2: "A", valueP3: "A++" },
            { id: "A5", p1: 1, p2: 0, p3: 0, name: "Zużycie wody", valueP1: "45", valueP2: "65", valueP3: "65" },
            { id: "A4", p1: 0, p2: 1, p3: 1, name: "Poziom hałasu", valueP1: "70", valueP2: "60", valueP3: "60" },
            { id: "A6", p1: 0, p2: 1, p3: 0, name: "Program szybki", valueP1: "brak", valueP2: "jest", valueP3: "brak" },
            { id: "A2", p1: 1, p2: 1, p3: 0, name: "Pojemność bębna", valueP1: "8", valueP2: "8", valueP3: "4" },
            { id: "A1", p1: 1, p2: 0, p3: 1, name: "Maksymalne obroty", valueP1: "1400", valueP2: "1000", valueP3: "1400" },
        ]
    },
    {
        id: 34, showFeedback: "YES", showVisualStack: "YES", correctAnswer: "3", attributes: [
            { id: "A3", p1: 0, p2: 1, p3: 1, name: "Klasa energetyczna", valueP1: "A+", valueP2: "A+++", valueP3: "A+++" },
            { id: "A5", p1: 0, p2: 0, p3: 0, name: "Zużycie wody", valueP1: "50", valueP2: "50", valueP3: "50" },
            { id: "A4", p1: 0, p2: 0, p3: 1, name: "Poziom hałasu", valueP1: "50", valueP2: "50", valueP3: "40" },
            { id: "A6", p1: 0, p2: 0, p3: 0, name: "Program szybki", valueP1: "brak", valueP2: "brak", valueP3: "brak" },
            { id: "A2", p1: 0, p2: 0, p3: 0, name: "Pojemność bębna", valueP1: "8", valueP2: "8", valueP3: "8" },
            { id: "A1", p1: 1, p2: 0, p3: 1, name: "Maksymalne obroty", valueP1: "1600", valueP2: "1200", valueP3: "1600" },
        ]
    },
];

class MultiAttribute extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedOption: [],
            counter: 0,
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
            console.log("SPACE_KEY_CODE")
            console.log(this.state)
            const { selectedOption, counter } = this.state

            if (attributeLists.length === selectedOption.length) {
                console.log('this.props.action')
                this.props.action(selectedOption);
            } else if (selectedOption.length === (counter + 1)) {
                this.setState({ counter: (counter + 1), modalOpen: false })
            }
        }
    }

    toggle = () => {
        console.log(this.state)
        this.setState({
            modalOpen: !this.state.modalOpen
        });
    }

    optionClicked = (evt) => {
        console.log(evt)
        const { selectedOption, counter } = this.state

        let selectedValue = evt.target.value

        console.log(evt)

        if (selectedOption.length === 0 || selectedOption.length < (counter + 1)) {
            selectedOption.push(selectedValue)
        } else if (selectedOption.length === (counter + 1)) {
            selectedOption[counter] = selectedValue
        }

        this.setState({ selectedOption: selectedOption, modalOpen: true },
            () => {
                console.log(this.state)
            })
    }

    _stackDisplay() {
        document.getElementById("cardStackVisual").style.display = "";
        document.getElementById("btnShowStack").style.display = "none";
    }


    render() {
        const { counter, selectedOption, modalOpen } = this.state
        const data = attributeLists[counter]
        const showFeedback = data.showFeedback
        const showError = false
        const textError = "TEXT ERROR"
        const isOptionWasSelected = selectedOption.length === (counter + 1)
        const showFeedbackCorrectAnswer = selectedOption[counter] === data.correctAnswer
        return (
            <Container key={"KEY_" + counter}>
                <Alert style={{ fontSize: "1.0rem" }} color="warning" isOpen={showError}>
                    <span className="alert-inner--text ml-1">
                        {textError}
                    </span>
                </Alert>
                <Modal isOpen={modalOpen} toggle={this.toggle} style={{ position: "fixed", top: "40%", left: "45%", transform: "translate(-40%, -40%)" }}>
                    <ModalHeader style={{ padding: "4em" }}>
                        {/* if showsFeedback -- we take the first element of the showFeedback column attribute*/}
                        {(showFeedback === SHOW_FEEDBACK_TRUE)
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
                <Row className="justify-content-center">
                    <Card body style={{ marginTop: "20px" }}>
                        <div>{getRatingStarBarTable(data)}</div>
                    </Card>
                    <Card body style={{ marginTop: "20px" }}>
                        <div>{getTable(selectedOption[counter], data, this.optionClicked)}</div>
                        {(data.showVisualStack === "YES") ?
                            <Button color="info" id="btnShowStack" style={{ width: "fit-content", alignSelf: "center" }}
                                onClick={() => this._stackDisplay()}> Show me the levels</Button>
                            : <></>
                        }
                    </Card>
                    <Card id="cardStackVisual" body style={{ marginTop: "20px", display: 'none' }}>
                        <div>{getTableVisualization(data)}</div>
                    </Card>
                </Row>
                {isOptionWasSelected ? <div><Footer text={TEXT_FOOTER} /></div> : <></>}
            </Container>
        );
    }
}

function getTableVisualization(data) {
    return (<Table borderless responsive style={{ textAlign: 'center' }}>
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
                            style={{ marginTop: "0px", marginBottom: "0px", fontSize: "0.9em" }}
                            onClick={onClick} value={FIRST_RADIO_VALUE}>
                            Pralka 1
                        </button>
                    </th>
                    <th>
                        <button color="primary" id={"btn_" + SECOND_RADIO_VALUE}
                            className={selectedValue === SECOND_RADIO_VALUE ? "btn btn-warning" : "btn btn-primary"} //Values from 1 to length style={{ marginTop: "0px", marginBottom: "0px", fontSize: "0.9em" }}
                            onClick={onClick} value={SECOND_RADIO_VALUE}>
                            Pralka 2
                        </button>
                    </th>
                    <th>
                        <button color="primary" id={"btn_" + THIRD_RADIO_VALUE}
                            className={selectedValue === THIRD_RADIO_VALUE ? "btn btn-warning" : "btn btn-primary"} //Values from 1 to length style={{ marginTop: "0px", marginBottom: "0px", fontSize: "0.9em" }}
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
                <td style={{ fontSize: '1.3em' }}>{boldStyle(data.attributes[i].p1, data.attributes[i].valueP1)}</td>
                <td style={{ fontSize: '1.3em' }}>{boldStyle(data.attributes[i].p2, data.attributes[i].valueP2)}</td>
                <td style={{ fontSize: '1.3em' }}>{boldStyle(data.attributes[i].p3, data.attributes[i].valueP3)}</td>
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
    if (isBold === 1) //true, bold
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

export default MultiAttribute;