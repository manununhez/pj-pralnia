import React from "react";

import { Container, Col, Row, Table } from "reactstrap";
import ReactStars from "react-rating-stars-component";

// get our fontawesome imports
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "./style.css";
import * as constant from '../../helpers/constants';
import FooterBack from "../Footers/FooterBack";

const DEBUG = (process.env.REACT_APP_DEBUG_LOG === "true") ? true : false;

class Instruction extends React.Component {
    handleKeyDownEvent = (event) => {
        if (event.keyCode === constant.SPACE_KEY_CODE) { //Transition between screens
            if (this.props.name.includes("Bargain") && this.props.name.includes("Finish")) {
                this.props.action(true)
            } else if (!this.props.name.includes("Bargain")) {
                this.props.action(true)
            }
        } else if (event.keyCode === constant.ENTER_KEY_CODE) { //Transition between screens
            if (DEBUG) console.log("PRessed ENter")
            if (DEBUG) console.log(this.props.name)
            if (this.props.name.includes("Bargain")) {
                if (!this.props.name.includes("Finish")) {
                    this.props.action(true)
                } else if (this.props.name.includes("Before")) {
                    if (DEBUG) console.log("Action back")
                    this.props.actionBack(true, 3)
                }
            }
        }
    }

    componentDidMount() {
        //for keyboard detection
        document.addEventListener(constant.EVENT_KEY_DOWN, this.handleKeyDownEvent, false);

        // HTML prevent space bar from scrolling page
        window.addEventListener(constant.EVENT_KEY_DOWN, function (e) {
            if (e.keyCode === constant.SPACE_KEY_CODE && e.target === document.body) {
                e.preventDefault();
            }
        });
    }

    componentWillUnmount() {
        document.removeEventListener(constant.EVENT_KEY_DOWN, this.handleKeyDownEvent, false);
    }

    render() {
        // const text = getTextForCurrentScreen(this.props.text, this.props.name);

        return (
            <Container fluid="md">
                <Row className="justify-content-md-center">
                    <HtmlFormattedText text={this.props.text} screen={this.props.name} typeTask={this.props.typeTask} />
                </Row>
                <Row className="justify-content-md-center">
                    <Col lg="8" style={{ marginTop: "20px" }}>
                        {this.props.name === "PralniaTaskSecondInstruction" ? getRatingStarBarTable() : <></>}
                    </Col>
                </Row>
                <br />
                <br />
                {this.props.name.includes("BeforeFinish") ?
                    <FooterBack textBack={"Press enter to restart training"} text={"Press spacebar to continue"} />
                    : <></>}
            </Container>
        )
    };
}

const HtmlFormattedText = ({ text, screen, typeTask }) => {
    let screenName = demoInstructionForTask(screen, typeTask)
    let children = text
        .filter((instruction) => instruction.screen === screenName)//Map the current screen with the correspondent text instruction to display
        .map((instruction, index) => {
            let txtFormatted = instruction.text.split('<br>')
                .filter(item => item !== constant.TEXT_EMPTY)
                .map(function (item, key) { //replace \n with margin bottom to emulate break line
                    if (item.includes("style='color:")) {
                        return (<div className="instr" key={key}><ColorableRedText text={item} /></div>) // re-markup!!
                    }
                    return (<div className="instr" key={key}>{item}</div>)
                })
            let key = "KEY_" + txtFormatted.length + "_" + index

            return HtmlTextFontSize(txtFormatted, instruction.size, key)
        });

    return children;
};

const demoInstructionForTask = (screen, typeTask) => {
    if (screen.includes(constant.BARGAIN_DEMO_INSTRUCTION_COND)) {
        if (typeTask === constant.EXPERIMENT_TYPE_LONG) return constant.BARGAIN_DEMO_INSTRUCTION_COND1
        else if (typeTask === constant.EXPERIMENT_TYPE_SHORT) return constant.BARGAIN_DEMO_INSTRUCTION_COND2
    } else return screen
}

/**
 * Map the correspondent font size for the text instruction
 * @param {Map the correspondent font size for the text instruction} param0 
 */
const HtmlTextFontSize = (text, fontSize, key) => {
    switch (fontSize) {
        case constant.FONT_SIZE_HEADING1:
            return (<div className="instr-h1" key={key}>{text}</div>)
        case constant.FONT_SIZE_HEADING2:
            return (<div className="instr-h2" key={key}>{text}</div>)
        case constant.FONT_SIZE_HEADING3:
            return (<div className="instr-h3" key={key}>{text}</div>)
        case constant.FONT_SIZE_HEADING4:
            return (<div className="instr-h4" key={key}>{text}</div>)
        case constant.FONT_SIZE_HEADING5:
            return (<div className="instr-h5" key={key}>{text}</div>)
        case constant.FONT_SIZE_HEADING6:
            return (<div className="instr-h6" key={key}>{text}</div>)
        default:
            return (<div className="instr-h3" key={key}>{text}</div>)
    }
};

const ColorableRedText = ({ text }) => {
    // shortest match for marked text with <b> tag
    const re1 = /<span style='color: red;'>(.+?)<\/span>/g;
    // for removing tags included in the string matched by re1
    const re2 = /<span style='color: red;'>(.+)<\/span>/;

    // strings to re-markup with JSX
    const matched = text
        .match(re1) // ["<b>a bold text<b>", "<b>another one</b>"]
        .map(s => s.match(re2)[1]); // ["a bold text", "another one"]

    // split strings to re-markup
    const texts = text.split(re1); // ["This sentense has ", "a bold text", " and", ...]

    const markedJsx = texts.map((s, index) => {
        if (index === 0 || index === texts.length - 1) {
            // first and last item is not the target to re-markup
            // because "<b>foo bar</b> buz..." generates ["", "foo bar", " buz"...]
            return s;
        }

        if (matched.includes(s)) {
            return <span style={{ color: "red" }} key={index + "-key"}>{s}</span>; // re-markup!!
        }

        return s;
    });

    return markedJsx;
};

function getRatingStarBarTable() {
    return (
        <Table responsive borderless size="sm">
            <thead>
                <tr>
                    <th><h5>Właściwość</h5></th>
                    <th><h5>Ważność</h5></th>
                </tr>
            </thead>
            <tbody>
                {/* TODO Actualizar estos atributos */}
                <tr>
                    <td style={{ textAlign: 'left', fontSize: '1.3em' }}>{constant.ATTRIBUTE_CUSTOM.data.text[0]}</td>
                    <td className="align-middle">{RatingBarDemo(6)}</td>
                </tr>
                <tr>
                    <td style={{ textAlign: 'left', fontSize: '1.3em' }}>{constant.ATTRIBUTE_CUSTOM.data.text[1]}</td>
                    <td className="align-middle">{RatingBarDemo(5)}</td>
                </tr>
                <tr>
                    <td style={{ textAlign: 'left', fontSize: '1.3em' }}>{constant.ATTRIBUTE_CUSTOM.data.text[2]}</td>
                    <td className="align-middle">{RatingBarDemo(4)}</td>
                </tr>
                <tr>
                    <td style={{ textAlign: 'left', fontSize: '1.3em' }}>{constant.ATTRIBUTE_CUSTOM.data.text[3]}</td>
                    <td className="align-middle">{RatingBarDemo(3)}</td>
                </tr>
                <tr>
                    <td style={{ textAlign: 'left', fontSize: '1.3em' }}>{constant.ATTRIBUTE_CUSTOM.data.text[4]}</td>
                    <td className="align-middle">{RatingBarDemo(2)}</td>
                </tr>
                <tr>
                    <td style={{ textAlign: 'left', fontSize: '1.3em' }}>{constant.ATTRIBUTE_CUSTOM.data.text[5]}</td>
                    <td className="align-middle">{RatingBarDemo(1)}</td>
                </tr>
            </tbody>
        </Table>
    );
}


/**
 * 
 * @param {*} value 
 */
function RatingBarDemo(value) {
    return (<ReactStars
        edit={false}
        size={20}
        count={6}
        value={value}
        half={false}
        color1={constant.HIDDEN_STAR}
        activeColor={constant.RED}
        emptyIcon={<FontAwesomeIcon icon={faPlus} style={{ marginLeft: "5px" }} />}
        filledIcon={<FontAwesomeIcon icon={faPlus} style={{ marginLeft: "5px" }} />}
    />);
}


export default Instruction;