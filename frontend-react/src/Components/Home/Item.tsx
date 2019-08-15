import React, { useState, useEffect, useCallback } from 'react';
import { Jumbotron,UncontrolledTooltip,Spinner,  Button,Table,  Media, Row, Col, Alert, Popover, PopoverHeader, PopoverBody } from 'reactstrap';
import faker from "faker";
import Blockies from 'react-blockies';

import { observer } from "mobx-react-lite";
import styled from 'styled-components' 
import accountStore from "../../Stores/AccountStore";


const StyledMedia = styled(Media)`
    padding-top: 5px;
    padding-bottom: 10px;
    padding-right: 10px;
    font-size: 12px;
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
    transition: 0.3s;
    border-radius: 5px; /* 5px rounded corners */
`;



const Item: React.FunctionComponent<{id : string, data: any}> = ({id , data}) => {

    const address = accountStore.address;

    const [ attendees, setAttendees ] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(()=>{
        const loadAttendees = async (id : number) => {
            const list : any[] = await accountStore.getAttendees(id);
            setAttendees(list);
        }
        loadAttendees(data.id);
    }, [data])

    

    const join = async (id: number, rate : string) => {
        setLoading(true)

        try {
            await accountStore.join(id,  rate);
            alert("Joined.")
            window.location.reload();

        } catch(e) {
            alert(`${e}`);
        }

        setLoading(false)

    }

    return (
                <StyledMedia>
                    
                    <Media style={{padding:"10px"}} body>
                            <Media heading>
                                {data.title}
                            </Media>
                            <Row>
                                <Col sm="6" style={{wordBreak: "break-all" }}>
                                    Description: {data.description}
                                </Col>
                                <Col sm="6">
                                    <Table bordered>

                                        <tbody>
                                            <tr>
                                                <td>On</td>
                                                <td>{data.eventAt}</td>
                                            </tr>
                                            <tr>
                                                <td>Deposit</td>
                                                <td>{data.rate}{` `}ETH</td>
                                            </tr>
                                        </tbody>
                                    </Table>
                                </Col>
                            </Row>
                            
                            <h6>Attendees{` `}({attendees.length})</h6>
                            <Row>
                                <Col sm="6">
                                    { attendees.map((item, index)=>{
                                        return (
                                            <span id={"B"+index} style={{cursor:"pointer", marginRight:"4px"}} key={index}>
                                                <Blockies seed={item}/>
                                                <UncontrolledTooltip placement="bottom" target={"B"+index}>
                                                      {item}
                                                 </UncontrolledTooltip>
                                            </span>
                                        )
                                    })
                                    }
                                </Col>
                                <Col sm="6" style={{textAlign : "right"}}>
                                    { loading && (<><Spinner color="secondary" />{` `}</>) }
                                    <Button disabled={!address || loading} onClick={()=> { join(data.id, data.rate) }} color="primary" size="sm">Join</Button>{` `}
                                    <Button disabled={!address || loading} onClick={()=> { alert("Not supported")}} color="success" size="sm">Withdraw</Button>
                                </Col>
                            </Row>
                            
                    </Media>
                </StyledMedia>
    )
}

export default observer(Item);