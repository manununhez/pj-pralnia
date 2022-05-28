import React, { useCallback } from "react";

import { Table } from "reactstrap";

import { Dustbin } from "./DustbinV2";
import { ItemTypes, ItemTypesID, INDEX_HEADER_TOP } from "../../../helpers/constants";

export default function Container(props) {
    const dustbins = [
        { accepts: ItemTypes.PRODUCT_1, id: ItemTypesID.PRODUCT_1, droppedBoxNames: props.currentResult.p1 },
        { accepts: ItemTypes.PRODUCT_2, id: ItemTypesID.PRODUCT_2, droppedBoxNames: props.currentResult.p2 },
        { accepts: ItemTypes.PRODUCT_3, id: ItemTypesID.PRODUCT_3, droppedBoxNames: props.currentResult.p3 }
    ];

    function isNotDroppedYet(droppedBoxName, rating) {
        return !droppedBoxName.includes(rating);
    }
    const handleDrop = useCallback(
        (index, item) => {
            const droppedBoxName = dustbins[index].droppedBoxNames
            const rating = item.rating - 1;

            if (isNotDroppedYet(droppedBoxName, rating)) {
                dustbins[index].droppedBoxNames.pop() //remove index header value
                dustbins[index].droppedBoxNames.push(rating) //add latest value
                dustbins[index].droppedBoxNames.push(INDEX_HEADER_TOP)//add index header value

                props.action({
                    results: { p1: dustbins[0].droppedBoxNames, p2: dustbins[1].droppedBoxNames, p3: dustbins[2].droppedBoxNames }
                })
            }

        },
        [dustbins]
    );

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
                    {dustbins.map(({ accepts, id, droppedBoxNames }, index) => (
                        <td id={id} style={{ height: '100%' }}>
                            <Dustbin
                                accept={accepts}
                                lastDroppedItem={droppedBoxNames}
                                onDrop={(item) => handleDrop(index, item)}
                                key={index}
                                productIndex={index}
                            />
                        </td>
                    ))}
                </tr>
            </tbody>
        </Table>
    );
}