import React from 'react'
import { Col } from 'antd';

function GridCards(props) {

    let result;
    if (props.landingPage) {
        result = (
            <Col lg={6} md={8} sm={24}>
                <div style={{ position: 'relative' }}>
                    <a href={`/movie/${props.movieId}`}>
                        <img style={{ width: '100%', height: '320px'}} src={props.image} alt={props.movieName}/>
                    </a>
                </div>
            </Col>
        )
    } else {
        result = (
            <Col lg={6} md={8} sm={24}>
                <div style={{ position: 'relative' }}>
                <img style={{ width: '100%', height: '320px'}} src={props.image} alt={props.name}/>
                </div>
            </Col>
        )
    }

    return result;
}

export default GridCards
