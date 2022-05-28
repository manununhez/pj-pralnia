import React, { useState, useEffect } from 'react';

import {
    Card,
    Container,
    Row,
    Col,
    Alert,
    FormGroup,
    Label,
    Input,
    CardBody
} from "reactstrap";

import NumberFormat from 'react-number-format';

import * as constant from '../../helpers/constants';

export default function PSForm(props) {
    const defaultError = {
        showError: false,
        textError: constant.TEXT_EMPTY
    }
    const [error, setError] = useState(defaultError);
    const [result, setResult] = useState(constant.TEXT_EMPTY);
    const [currentQuestionNumber, setCurrentQuestionNumber] = useState(0);

    useEffect(() => {
        const handleKeyDownEvent = (event) => {
            if (event.keyCode === constant.SPACE_KEY_CODE) { //Transition between screens
                validateResults()
            }
        }

        document.addEventListener(constant.EVENT_KEY_DOWN, handleKeyDownEvent, false);

        // HTML prevent space bar from scrolling page
        window.addEventListener(constant.EVENT_KEY_DOWN, function (e) {
            if (e.keyCode === constant.SPACE_KEY_CODE && e.target === document.body) {
                e.preventDefault();
            }
        });

        return () => {
            document.removeEventListener(constant.EVENT_KEY_DOWN, handleKeyDownEvent, false);
        };
    });

    const validateResults = () => {
        if (result === undefined || result === constant.TEXT_EMPTY) {
            const error = { showError: true, textError: constant.PSFORM_SELECT_ALERT_ERROR }
            setError(error);
        } else {
            const currentQuestion = props.data[currentQuestionNumber]
            if (currentQuestion.number === (props.data.length - 1)) {
                finishAndSendResults()
            } else {
                goToNextQuestion()
            }
        }
    }

    const goToNextQuestion = () => {
        const currentQuestion = props.data[currentQuestionNumber]

        props.action({ questionCode: currentQuestion.questionCode, answer: result })

        setCurrentQuestionNumber(currentQuestionNumber + 1)
        setResult(constant.TEXT_EMPTY)
        setError(defaultError)
    }

    const finishAndSendResults = () => {
        const currentQuestion = props.data[currentQuestionNumber]

        props.action({ questionCode: currentQuestion.questionCode, answer: result })

        setResult(constant.TEXT_EMPTY)
        setError(defaultError)//This would clean the previous error message, if it was shown
    }

    function handleInputResult(id, numberFormat) {
        const value = numberFormat.formattedValue

        if (isNaN(value)) return

        setResult(value)
        setError(defaultError)//This would clean the previous error message, if it was shown
    }

    function handleMultipleChoicesResult(evt) {
        const id = evt.target.id
        const value = evt.target.value

        if (id === undefined || id === constant.TEXT_EMPTY ||
            value === undefined || value === constant.TEXT_EMPTY) return

        setResult(value)
        setError(defaultError)//This would clean the previous error message, if it was shown
    }

    return (
        <Container fluid="md">
            <PSTitle question={props.data[currentQuestionNumber]} />
            <Alert style={{ fontSize: "1.0rem" }} color="warning" isOpen={error.showError}>
                <span className="alert-inner--text ml-1">
                    {error.textError}
                </span>
            </Alert>
            <PSQuestion question={props.data[currentQuestionNumber]} inputResult={handleInputResult} multipleChoicesResult={handleMultipleChoicesResult} />
        </Container>
    );
}

function PSTitle(props) {
    const question = props.question

    const formatTitle = () => {
        let txtFormatted = question.title.split('\\n').map(function (item, key) { //replace \n with margin bottom to emulate break line
            return (<div className="instr" key={key}>{item}</div>)
        })
        let key = "KEY_" + txtFormatted.length

        return getFontSizeTitle(txtFormatted, question.titleFontSize, key)
    }

    const getFontSizeTitle = (item, fontSize, key) => {
        if (item !== constant.TEXT_EMPTY) {
            switch (fontSize) {
                case constant.FONT_SIZE_HEADING1:
                    return (<div className="instr-h1" key={key}>{item}</div>)
                case constant.FONT_SIZE_HEADING2:
                    return (<div className="instr-h2" key={key}>{item}</div>)
                case constant.FONT_SIZE_HEADING3:
                    return (<div className="instr-h3" key={key}>{item}</div>)
                case constant.FONT_SIZE_HEADING4:
                    return (<div className="instr-h4" key={key}>{item}</div>)
                case constant.FONT_SIZE_HEADING5:
                    return (<div className="instr-h5" key={key}>{item}</div>)
                case constant.FONT_SIZE_HEADING6:
                    return (<div className="instr-h6" key={key}>{item}</div>)
                default:
                    return (<div className="instr-h3" key={key}>{item}</div>)
            }
        }
    }
    return (<Row className="justify-content-md-center" style={{ padding: "10px" }}>
        {formatTitle()}
    </Row>);
}

function PSQuestionTitle(props) {
    const question = props.question

    const getFontSizeQuestion = (item, fontSize, key) => {
        let children = [];

        if (item !== constant.TEXT_EMPTY) {
            switch (fontSize) {
                case constant.FONT_SIZE_HEADING1:
                    children.push(<h1 className="mb-2" key={"KEY_" + key}>{item}</h1>)
                    break;
                case constant.FONT_SIZE_HEADING2:
                    children.push(<h2 className="mb-2" key={"KEY_" + key}>{item}</h2>)
                    break;
                case constant.FONT_SIZE_HEADING3:
                    children.push(<h3 className="mb-2" key={"KEY_" + key}>{item}</h3>)
                    break;
                case constant.FONT_SIZE_HEADING4:
                    children.push(<h4 className="mb-2" key={"KEY_" + key}>{item}</h4>)
                    break;
                case constant.FONT_SIZE_HEADING5:
                    children.push(<h5 className="mb-2" key={"KEY_" + key}>{item}</h5>)
                    break;
                case constant.FONT_SIZE_HEADING6:
                    children.push(<h6 className="mb-2" key={"KEY_" + key}>{item}</h6>)
                    break;
                default:
            }
        }

        return children;
    }

    return (getFontSizeQuestion(question.question, question.questionFontSize, question.questionCode));
}

function PSQuestionInputType(props) {
    const question = props.question

    return (<div style={{ display: "flex", alignItems: 'center' }}>
        <NumberFormat id={question.questionCode} autoFocus={true} onValueChange={props.inputResult.bind(this, question.questionCode)} decimalSeparator="," />
        <pre style={{ margingBottom: '0rem' }}> <h6>{question.answer}</h6></pre>
    </div>);
}

function PSQuestionChoiceType(props) {
    const question = props.question

    const getMultipleOptions = () => {
        const { answer, questionCode } = question
        let children = answer
            .filter((item) => item !== '' && item !== null)
            .map((item, id) => {
                return (
                    <FormGroup check key={questionCode + "_" + id}>
                        <Label>
                            <Input type="radio"
                                id={questionCode}
                                name="radio-button-demo"
                                value={item}
                                onChange={props.multipleChoicesResult}
                            />{' '}
                            {item}
                        </Label>
                    </FormGroup>
                )
            });

        return children
    }

    return (<Col lg="auto" style={{ marginTop: '1.5em' }}>{getMultipleOptions()}</Col>);
}

function PSQuestion(props) {
    const question = props.question

    const answer = (question.type === constant.INPUT_TYPE) ? <PSQuestionInputType key={question.questionCode} question={question} inputResult={props.inputResult} /> : <PSQuestionChoiceType key={question.questionCode} question={question} multipleChoicesResult={props.multipleChoicesResult} />

    return (<Card>
        <CardBody style={{ padding: '2em' }} key={question.questionCode}>
            <PSQuestionTitle question={question} />
            {answer}
        </CardBody>
    </Card>);// marginTop: '20px',);
}