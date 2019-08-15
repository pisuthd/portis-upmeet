import React, { useCallback } from 'react';
import { Jumbotron, Button, Row, Col, Badge } from 'reactstrap';

const Intro: React.FunctionComponent = () => {


    return (
        <div>
            <Jumbotron style={{height: "80vh"}}>
                <h1 className="display-4">Gas Stations Network</h1>
                <p className="lead">On this experiment version, we allowed anybody to funding a fee for all user. However on the advanced version this should need to be funded by the event organizer themselve.</p>
                <hr className="my-2" style={{marginTop: "10px", marginBottom: "10px"}} />
                <p>If there is no ETH avaiable in the pool, feel free to fund it as it's not real token at the moment.</p>
                
            </Jumbotron>
        </div>
    )
}

export default (Intro);