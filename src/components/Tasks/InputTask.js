import React from "react";

import NumberFormat from 'react-number-format';
// reactstrap components
import { Container, Row, Alert, Card } from "reactstrap";
import { TEXT_FOOTER, EVENT_KEY_DOWN, SPACE_KEY_CODE } from '../../helpers/constants';
import Footer from "../Footers/Footer";

const DEBUG = (process.env.REACT_APP_DEBUG_LOG === "true") ? true : false;

class InputTask extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            result: '',
            inputCompleted: false,
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
            const { result, inputCompleted } = this.state

            if (inputCompleted) {
                this.props.action(result) //return values
            }
        }
    }

    validateInput = (id, numberFormat) => {
        // let e = { target: { id: id, value: numberFormat.formattedValue } }
        if (DEBUG) console.log(numberFormat.formattedValue)

        this.setState({ result: numberFormat.formattedValue, inputCompleted: numberFormat.formattedValue !== '' })
    }

    render() {
        return (
            <Container fluid="md">
                <Row className="justify-content-md-center" style={{ padding: "10px" }}>
                    <h4>{this.props.text}</h4>
                </Row>
                {/* <Alert style={{ fontSize: "1.0rem" }} color="warning" isOpen={this.props.error.showError}>
                    <span className="alert-inner--text ml-1">
                        {this.props.error.textError}
                    </span>
                </Alert> */}
                {getQuestions(this.props.questionsText, this.validateInput)}
                <br /><br />
                {this.state.inputCompleted ? <div style={{ 'marginTop': '25px' }}><Footer text={TEXT_FOOTER} /></div> : <></>}
            </Container>
        )
    };
}

/**
 * 
 * @param {*} data 
 * @param {*} questions 
 * @param {*} action 
 * @param {*} selectedAnswer 
 * @param {*} validateInput 
 */
function getQuestions(text, validateInput) {
    return (<Card body style={{ paddingLeft: '20px', paddingRight: '20px' }}>
        {/* pregunta */}
        <Row style={{ marginTop: "5px" }}>
            {text}
        </Row>
        {/* respuesta */}
        <Row style={{ alignItems: 'center' }}>
            <pre style={{ margingBottom: '0rem' }}> <h6>Około </h6></pre>
            <NumberFormat id={"id_fifth"} autoFocus={true}
                onValueChange={validateInput.bind(this, "id_fifth")} decimalScale={0} />
            <pre style={{ margingBottom: '0rem' }}> <h6> modeli.</h6></pre>
        </Row>
    </Card>
    );
}

export default InputTask;