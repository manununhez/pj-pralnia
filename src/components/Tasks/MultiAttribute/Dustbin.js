import React from 'react';
import { Table } from 'reactstrap'
import { useDrop } from "react-dnd";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { INDEX_HEADER_TEXT, INDEX_HEADER_TOP } from "../../../helpers/constants";

const style = {
    color: 'white',
    textAlign: 'center',
    fontSize: '1rem',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    position: 'relative'
};

export function Dustbin({ accept, lastDroppedItem, onDrop, productIndex }) {
    const [{ isOver, canDrop }, drop] = useDrop({
        accept,
        drop: onDrop,
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop()
        })
    });
    const isActive = isOver && canDrop;
    let backgroundColor = "";
    if (isActive) {
        backgroundColor = "darkgreen";
    } else if (canDrop) {
        backgroundColor = "darkkhaki";
    }
    return (
        <div ref={drop} role="Dustbin" style={{ ...style, backgroundColor, verticalAlign: 'bottom' }}>
            <Table borderless responsive style={{ position: 'absolute', bottom: 0 }}>
                <thead></thead>
                <tbody>
                    {[...lastDroppedItem].reverse().map((rating) => {
                        if (rating === INDEX_HEADER_TOP) {
                            return <tr id={INDEX_HEADER_TEXT + productIndex} />
                        } else {
                            return (getPropertiesVerticalRating(rating))
                        }
                    })}
                </tbody>
            </Table>
        </div>
    );
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
    return <tr style={{ border: '1px solid black', textAlign: '-webkit-center', fontSize: '1.3em', display: 'block ruby' }}>{children}</tr>
}
