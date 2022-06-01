import React from "react";

import ReactStars from "react-rating-stars-component";

// reactstrap components
import {
    Card,
    Container,
    Row,
    Col,
    Table,
    Alert
} from "reactstrap";

// get our fontawesome imports
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { ATTRIBUTE_CUSTOM, RED, INACTIVE_STAR, TEXT_FOOTER, SPACE_KEY_CODE, EVENT_KEY_DOWN } from '../../helpers/constants';
import Footer from "../Footers/Footer";

class RatingTask extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedOption: Array(ATTRIBUTE_CUSTOM.data.id.length).fill(0), //initialize and set to zero. This array of size 6, corresponds to each property rating (A1, A2, ...). +1 for the extra attribute added
            ratingCompleted: false,
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
            const { selectedOption, ratingCompleted } = this.state

            if (ratingCompleted) {
                this.props.action(selectedOption) //return values
            }
        }
    }

    validateInput = (id, rating) => {
        console.log(rating)
        const { selectedOption } = this.state
        let indexItem = 0

        for (let i = 0; i < ATTRIBUTE_CUSTOM.data.id.length; i++) {
            if (ATTRIBUTE_CUSTOM.data.id[i] === id) {
                indexItem = i
                break;
            }
        }

        selectedOption[indexItem] = rating

        if (selectedOption.filter((item) => item === 0).length === 0) { //all rating were selected
            this.setState({ ratingCompleted: true })
        }

        this.setState({ selectedOption: selectedOption })
    }

    render() {
        const { selectedOption, ratingCompleted } = this.state
        const showError = false
        const textError = "Error!"
        return (
            <Container className="justify-content-md-center">
                <div className="instr-h3">{this.props.text}</div>

                <Alert style={{ fontSize: "1.0rem" }} color="warning" isOpen={showError}>
                    <span className="alert-inner--text ml-1">
                        {textError}
                    </span>
                </Alert>
                <Row className="justify-content-center">
                    <Card body style={{ marginTop: "20px" }}>
                        <Col>
                            <Table responsive borderless size="sm">
                                <thead>
                                    <tr>
                                        <th></th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {getTableBodyRatingBar(this.validateInput, selectedOption)}
                                </tbody>
                            </Table>
                        </Col>
                    </Card>
                </Row>
                {ratingCompleted ? <div style={{ 'marginTop': '25px' }}><Footer text={TEXT_FOOTER} /></div> : <></>}
            </Container>
        );
    }
}

/**
 * 
 * @param {*} action 
 * @param {*} rating 
 */
function getTableBodyRatingBar(action, value) {
    let children = [];

    for (let i = 0; i < ATTRIBUTE_CUSTOM.data.id.length; i++) {
        children.push(
            <tr key={ATTRIBUTE_CUSTOM.data.id[i]}>
                <td className="align-middle" style={{ fontSize: '1.2em' }}>{ATTRIBUTE_CUSTOM.data.text[i]}</td>
                <td>{RatingBarDemo(action, ATTRIBUTE_CUSTOM.data.id[i], value[i])}</td>
            </tr>
        );
    }

    return children;
}

/**
 * 
 * @param {*} action 
 * @param {*} id 
 * @param {*} value 
 */
function RatingBarDemo(action, id, value) {
    return (<ReactStars
        size={30}
        count={6}
        value={value}
        half={false}
        onChange={action.bind(this, id)}
        color1={INACTIVE_STAR}
        activeColor={RED}
        emptyIcon={<FontAwesomeIcon icon={faPlus} style={{ marginLeft: "5px" }} />}
        filledIcon={<FontAwesomeIcon icon={faPlus} style={{ marginLeft: "5px" }} />}
    />);
}


export default RatingTask;