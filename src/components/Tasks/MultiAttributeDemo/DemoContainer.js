import React, { useState, useEffect, useCallback } from "react";

import { Table } from "reactstrap";

import { Dustbin } from "./Dustbin";
import { ItemTypes } from "../../../helpers/constants";
import update from "immutability-helper";

export default function Container(props) {
    const [dustbins, setDustbins] = useState([
        { accepts: [ItemTypes.PRODUCT_1], lastDroppedItem: [], droppedBoxNames: [] },
        { accepts: [ItemTypes.PRODUCT_2], lastDroppedItem: [], droppedBoxNames: [] },
        { accepts: [ItemTypes.PRODUCT_3], lastDroppedItem: [], droppedBoxNames: [] }
    ]);

    function isNotDroppedYet(droppedBoxName, boxName) {
        return droppedBoxName.indexOf(boxName) === -1;
    }
    const handleDrop = useCallback(
        (index, item) => {
            const droppedBoxName = dustbins[index].droppedBoxNames
            const { name } = item;

            if (isNotDroppedYet(droppedBoxName, name)) {
                setDustbins(
                    update(dustbins, {
                        [index]: {
                            lastDroppedItem: {
                                $push: [item]
                            },
                            droppedBoxNames: {
                                $push: [name]
                            }
                        }
                    })
                );
            }

        },
        [dustbins]
    );

    useEffect(() => {
        props.action({
            isTaskCompleted: false,
            results: dustbins
        })
    }, [dustbins]);

    return (
        <Table borderless responsive style={{ textAlign: 'center', height: '600px' }}>
            <thead>
                <tr>
                    <th><h5>Pralka 1</h5></th>
                    <th><h5>Pralka 2</h5></th>
                    <th><h5>Pralka 3</h5></th>
                </tr>

            </thead>
            <tbody>
                <tr>
                    {dustbins.map(({ accepts, lastDroppedItem }, index) => (
                        <td style={{ height: '100%' }}>
                            <Dustbin
                                accept={accepts}
                                lastDroppedItem={lastDroppedItem}
                                onDrop={(item) => handleDrop(index, item)}
                                key={index}
                            />
                        </td>
                    ))}
                </tr>
            </tbody>
        </Table>
    );
}