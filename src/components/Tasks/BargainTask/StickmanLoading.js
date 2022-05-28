import React from 'react';
import styled, { keyframes } from "styled-components";

import "../style.css"

import loading from '../../../assets/stickman-walking.gif';

export default function StickmanLoading(props) {
    const currentStore = props.currentStore
    const marginOffSet = 30

    const slideToRightAnimation = keyframes`
        0%{
            -webkit-transform:translateX(0);
            transform:translateX(0)
        }
        100%{
            -webkit-transform:translateX(${currentStore.delay * marginOffSet}px);
            transform:translateX(${currentStore.delay * marginOffSet}px)
        }
    `;

    // Here we create a component that will rotate everything we pass in over two seconds
    const SlideRightFadeOutImg = styled.img`
        -webkit-animation: ${slideToRightAnimation} ${currentStore.delay}s linear forwards;
        animation: ${slideToRightAnimation} ${currentStore.delay}s linear forwards;
        vertical-align: bottom;
        margin-left: -75px;
    `;

    const lineStyle = ({
        width: `${currentStore.delay * marginOffSet - 60}px`,
        borderBottom: "10px solid black",
        display: "flex"
    });

    return (
        <div style={{ display: "inline" }}>
            <div className="square square-left stack-top"></div>
            <SlideRightFadeOutImg
                className="square-left stack-bottom"
                style={{ display: "inline-block" }}
                onAnimationEnd={props.onLoadingFinished}
                src={loading}
                alt="loading..."
            />
            <div className="square square-right stack-top"></div>
            <div style={lineStyle}></div>
        </div>);
}