import React from "react";

import { BRANDS } from '../../helpers/constants';

import { Card, Input } from 'reactstrap';

// reactstrap components
import { Container, Row, Col, Alert } from "reactstrap";
import { TEXT_FOOTER, SPACE_KEY_CODE, EVENT_KEY_DOWN } from '../../helpers/constants';
import Footer from "../Footers/Footer";

class BrandTask extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedOption: [],
            selectCompleted: false
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
            const { selectedOption, selectCompleted } = this.state

            if (selectCompleted) {
                this.props.action(selectedOption) //return values
            }
        }
    }

    validateInput = (brand) => {
        let { selectedOption } = this.state
        let index = selectedOption.indexOf(brand)

        if (index === -1) {
            selectedOption.push(brand)
        } else {
            selectedOption = selectedOption.filter((item) => item !== brand);
        }

        this.setState({ selectedOption: selectedOption, selectCompleted: selectedOption.length > 0 })
    }

    render() {
        return (
            <Container className="justify-content-md-center">
                {this.props.text}
                {/* <Alert style={{ fontSize: "1.0rem" }} color="warning" isOpen={this.props.error.showError}>
                    <span className="alert-inner--text ml-1">
                        {this.props.error.textError}
                    </span>
                </Alert> */}
                <Row className="justify-content-center">
                    <Card body style={{ marginTop: "20px", width: "50%", alignItems: 'center' }}>
                        {getMultipleOptions(this.validateInput)}
                    </Card>
                </Row>
                {this.state.selectCompleted ? <div style={{ 'marginTop': '25px' }}><Footer text={TEXT_FOOTER} /></div> : <></>}
            </Container>
        );
    }
}

/**
 * 
 * @param {*} answers 
 * @param {*} questionCode 
 * @param {*} action 
 * @param {*} selectedAnswer 
 */
function getMultipleOptions(action) {
    let children = BRANDS.map((brand) => {
        return <Col md="auto" key={"id_" + brand}>
            <Input type="checkbox"
                onChange={action.bind(this, brand)}
                value={brand}
                name="radio-button-demo"
                inputProps={{ 'aria-label': 'A' }}
                size={'small'}
            />
            <h5 style={{ margin: '0px', alignSelf: 'center' }}>{brand}</h5>
        </Col>
    });

    return (<Row><Col xs="auto">{children}</Col></Row>)
}

export default BrandTask;