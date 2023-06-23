import React from 'react';
import {getImage} from '../entry/data'
import { useMediaQuery } from 'react-responsive'

export default function Gallery (props) {
    const imgName = "./art1.jpg"
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' });

    return (
        <React.Fragment>
            Gallery!
            <img src={getImage(imgName) ? getImage(imgName) : ""} style={isTabletOrMobile ? {} : {}} />
        </React.Fragment>
    );
}