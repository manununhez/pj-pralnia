import React from 'react';
import { Table } from 'reactstrap'
import { useDrop } from "react-dnd";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const style = {
    color: 'white',
    textAlign: 'center',
    fontSize: '1rem',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    position: 'relative'
};

export function Dustbin({ accept, lastDroppedItem, onDrop }) {
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
                    {[...lastDroppedItem].reverse().map(({ rating }) => {
                        return (<tr style={{ border: '1px solid black', textAlign: '-webkit-center', fontSize: '1.3em', display: 'block ruby' }}>
                            {getPropertiesVerticalRating(rating - 1)}
                        </tr>)
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
    return children
}
