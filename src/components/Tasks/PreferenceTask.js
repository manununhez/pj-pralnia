import React from 'react';

import { Card, Container, Table, Alert } from 'reactstrap';

import {
    ATTRIBUTE, TEXT_EMPTY, FIRST_TASK_PROPERTIES_TOTAL,
    TEXT_FOOTER, SPACE_KEY_CODE, EVENT_KEY_DOWN
} from '../../helpers/constants';
import Footer from "../Footers/Footer";

class PreferenceTask extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedOption: Array(FIRST_TASK_PROPERTIES_TOTAL).fill(TEXT_EMPTY),
            counter: 0
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
            let tempCounter = counter

            if (selectedOption[counter] !== TEXT_EMPTY) {
                for (let i = 0; i < document.getElementsByClassName('btn').length; i++) {  //Clear Focus
                    document.getElementsByClassName('btn')[i].blur()
                }

                tempCounter = (counter < FIRST_TASK_PROPERTIES_TOTAL - 1) ? (counter + 1) : counter //Control of the counter to avoid overflow
                this.setState({
                    counter: tempCounter,
                    selectionCompleted: false
                }, () => {
                    const optionsNotSelected = selectedOption.filter(item => item === TEXT_EMPTY)
                    console.log(optionsNotSelected.length)
                    if (optionsNotSelected.length === 0) { //If all elements were selected
                        this.props.action(selectedOption)
                    }
                })
            }
        }
    }

    validateInput = (item) => {
        const { selectedOption, counter } = this.state

        if (selectedOption[counter] !== item) {
            console.log(item)

            selectedOption[counter] = item

            this.setState({ selectedOption: selectedOption })
        }
    }

    render() {
        const { selectedOption, counter } = this.state
        const selectedAttribute = selectedOption[counter]
        const showError = false
        const textError = "Error!"
        return (
            <Container className="justify-content-md-center" key={this.props.counter}>
                <div className="instr-h3">{this.props.text}</div>
                <Alert style={{ fontSize: "1.0rem" }} color="warning" isOpen={showError}>
                    <span className="alert-inner--text ml-1">
                        {textError}
                    </span>
                </Alert>
                <Card body style={{ marginTop: "20px" }}>
                    {getTableProperty(this.validateInput, selectedAttribute, counter)}
                </Card>
                {(selectedAttribute !== TEXT_EMPTY) ? <div style={{ 'marginTop': '25px' }}><Footer text={TEXT_FOOTER} /></div> : <></>}
            </Container>
        );
    }
}

/**
 * 
 * @param {*} selectedValue 
 * @param {*} counter 
 * @param {*} handleChange 
 */
function getTableProperty(validateInput, selectedValue, counter) {
    return (
        <Table bordered>
            <thead>
                <tr>
                    <th></th>
                    <th className="align-middle" style={{ textAlign: 'center', padding: '7px' }}>
                        <h4>Preferencje (po prawej lepsze)</h4>
                    </th>
                    <th className="align-middle" style={{ textAlign: 'center', padding: '7px' }}>
                        <h4>Wybrane</h4>
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td className="align-middle" style={{ textAlign: 'center', padding: '7px' }}>
                        <h5>{ATTRIBUTE.data.text[counter]}</h5>
                    </td>
                    <td className="align-middle" style={{ textAlign: 'center', padding: '7px' }}>
                        {getPropertiesTableBody(selectedValue, ATTRIBUTE.data.value[counter], validateInput)}
                    </td>
                    <td className="align-middle" style={{ textAlign: 'center', padding: '7px' }}>
                        <h5>{getSelectedValueNameFormatted(counter, selectedValue)}</h5>
                    </td>
                </tr>
            </tbody>
        </Table>
    );
}

/**
 * 
 * @param {*} counter 
 * @param {*} selectedValue 
 */
function getSelectedValueNameFormatted(counter, selectedValue) {
    if (selectedValue !== TEXT_EMPTY)
        return ATTRIBUTE.data.prefix[counter] +
            ATTRIBUTE.data.value[counter][parseInt(selectedValue) - 1] + ATTRIBUTE.data.sufix[counter];
    else
        return "-"
}

/**
 * 
 * @param {*} selectedValue 
 * @param {*} data 
 * @param {*} handleChange 
 */
function getPropertiesTableBody(selectedValue, data, validateInput) {
    let children = data.map((item, i) => {
        return <button
            id={"btn" + (i + 1)}
            key={"btn" + (i + 1)}
            onClick={validateInput.bind(this, i + 1)}
            className={parseInt(selectedValue) === (i + 1) ? "btn btn-warning" : "btn btn-primary"} //Values from 1 to length
            style={{ marginTop: "0px", marginBottom: "0px", fontSize: "1.1em", marginLeft: "5px" }}>
            {item}
        </button>
    });

    return children;
}

export default PreferenceTask;