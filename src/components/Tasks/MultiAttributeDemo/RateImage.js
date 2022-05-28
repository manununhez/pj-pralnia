import React from 'react'
import styled, { keyframes } from "styled-components";

const RateImage = (props) => {
    const visbility = props.visibility ? "block" : "none"

    const slideToRightAnimation = keyframes`
        0%{
            -webkit-transform:translate(${props.x1}px, ${props.y1}px);
            transform:translate(${props.x1}px, ${props.y1}px);
        }
        100%{
            -webkit-transform:translate(${props.x2}px, ${props.y2}px);
            transform:translate(${props.x2}px, ${props.y2}px);
            opacity: 0.6;
        }
    `;

    // Here we create a component that will rotate everything we pass in over two seconds
    const SlideRightFadeOutImg = styled.img`
        display: ${visbility};
        margin: 0 auto;
        -webkit-animation: ${slideToRightAnimation} 0.6s linear forwards;
    animation: ${slideToRightAnimation} 0.6s linear forwards;
    `;

    const onAnimationEnd = () => {
        props.action()
    }

    return (
        <SlideRightFadeOutImg
            style={props.style}
            onAnimationEnd={onAnimationEnd}
            src={props.image}
            alt="loading..."
        />
    )
}
export default RateImage