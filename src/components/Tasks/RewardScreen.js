import React from "react";

import { Container, Row } from "reactstrap";

import {
    REWARD_BONUS_MESSAGE, REWARD_RESULT_MESSAGE,
    SPACE_KEY_CODE, EVENT_KEY_DOWN, REWARD_INPUT
} from '../../helpers/constants';
const DEBUG = (process.env.REACT_APP_DEBUG_LOG === "true") ? true : false;

class RewardScreen extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            rewardInfo: []
        };
    }

    calculateReward = () => {
        const data = this.props.data
        const threshold = parseFloat(REWARD_INPUT.threshold)
        const totalTasks = parseFloat(data.length);
        const totalCorrect = parseFloat(data.filter(item => item.isCorrectAnswer).length)
        let result = (totalCorrect / totalTasks) * 100;
        // if (DEBUG) console.log("result Before: " + result)
        result = result.toFixed(2);
        // if (DEBUG) console.log("result After: " + result)

        // if (DEBUG) console.log("TotalTasks: " + totalTasks)
        // if (DEBUG) console.log("TotalCorrect: " + totalCorrect)
        // if (DEBUG) console.log("result: " + result)
        // if (DEBUG) console.log("Threshold: " + threshold)

        this.setState({
            rewardInfo: { isRewardObtained: (result >= threshold), result: result }
        }, () => {
            if (DEBUG) console.log(this.state)
        })
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

        this.calculateReward()
    }

    componentWillUnmount() {
        document.removeEventListener(EVENT_KEY_DOWN, this.handleKeyDownEvent, false);
    }

    handleKeyDownEvent = (event) => {
        if (event.keyCode === SPACE_KEY_CODE) { //Transition between screens
            const { rewardInfo } = this.state
            if (DEBUG) console.log("RewardOBTAINED:")
            if (DEBUG) console.log(rewardInfo.isRewardObtained)
            this.props.action(rewardInfo.isRewardObtained)
        }
    }

    render() {
        const { rewardInfo } = this.state
        return (
            <Container fluid="md">
                <Row className="justify-content-md-center" style={{ padding: "20px" }}>
                    {parserResults(rewardInfo)}
                </Row>
            </Container>
        )
    };
}

function parserResults(rewardInfo) {
    const threshold = parseFloat(REWARD_INPUT.threshold)
    const bonusPoint = REWARD_INPUT.bonusPoint
    const { isRewardObtained, result } = rewardInfo

    let textToDisplay = REWARD_RESULT_MESSAGE(result);
    let textBonus = "";

    if (DEBUG) console.log("result: " + rewardInfo.result)
    if (DEBUG) console.log("Threshold: " + threshold)

    // if (isRewardObtained)
    //     textBonus = textBonus + REWARD_BONUS_MESSAGE(bonusPoint);

    return (<div style={{ textAlign: "justify" }}>
        <h2>{textToDisplay}</h2><br />
        <h2>{textBonus}</h2><br />
    </div>);
}

export default RewardScreen;