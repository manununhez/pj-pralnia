import React from 'react';

import { DragPreviewImage, useDrag } from "react-dnd";
import { ImageMapperRating } from './verticalRateImage';


export function Box({ name, type, index, showIndicator }) {
    const rating = index + 1

    const [{ opacity, isDragging }, drag, preview] = useDrag(
        () => ({
            type,
            item: { rating, name },
            collect: (monitor) => ({
                isDragging: monitor.isDragging(),
                opacity: isDragging ? 0.4 : 1
            })
        }),
        [name, type]
    );
    return (
        <>
            <DragPreviewImage connect={preview} src={ImageMapperRating(index)} />
            <div ref={drag} role="Box" style={{ opacity, cursor: isDragging ? "none" : "default", border: showIndicator ? '1px solid green' : '' }}>
                {<strong>{name}</strong>}
            </div>
        </>
    );
}
