import React, { useState, useEffect } from 'react';
import { Jumbotron, Button, Media, Row, Col, Alert, Popover, PopoverHeader, PopoverBody } from 'reactstrap';
import faker from "faker";
import { observer } from "mobx-react-lite";
import styled from 'styled-components' 
import accountStore from "../../Stores/AccountStore"; 
import Item from "./Item";


const Upcoming: React.FunctionComponent = () => {

    const events  = accountStore.events;
    

    useEffect(()=> {
        accountStore.loadEvents(20);
    }, [])


    return (
        <Row>
            <Col sm="12">
                <h2>Events ({events.length})</h2>
                { events.map((item : any , index : any) => {
                    return (<div key={index}>
                        <Item data={item} id={item.name}  />
                    </div>)
                })
                }
                
            </Col>
        </Row>
    )
}

export default observer(Upcoming);