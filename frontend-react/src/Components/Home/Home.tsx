import React, { useState, useCallback, useEffect } from 'react';
import { Jumbotron, Spinner, Button, Row, Col, Alert, Popover, PopoverHeader, PopoverBody,  Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, FormText, CustomInput } from 'reactstrap';
import Blockies from 'react-blockies';
import Welcome from "./Welcome";
import Upcoming from "./Upcoming";
import { observer } from "mobx-react-lite";
import faker from "faker";
import accountStore from "../../Stores/AccountStore";

const Home: React.FunctionComponent = () => {
    const counter = accountStore.count;
    const address = accountStore.address;

    const [popoverOpen, setPopoverOpen] = useState(false);
    const [isNewEventModal, setNewEventModal] = useState(false);
    const [ saving, setSaving] = useState(false);
    const [ date, setDate ] = useState("");
    const [ time, setTime ] = useState("");
    const [ deposit, setDeposit ] = useState(0.1);
    const [ title, setTitle ] = useState(`Understands ${faker.commerce.productName()}`);
    const [ description, setDescription ] = useState(faker.lorem.sentence()+" "+faker.lorem.sentence());

    useEffect(()=>{
        // random date & time
        setDate(`2019-08-2${Math.floor(Math.random() * 9) + 0}`)

        setTime(`1${Math.floor(Math.random() * 2) + 0}:00`);
    },[]);

    const onDismiss = () => {
        window.location.reload();
    }

    const popoverToggle = () => {
        setPopoverOpen(!popoverOpen);
    }

    const onShow = () => {
        accountStore.showInfo();
    }

    const toggleNewEventModal = () => {
        setNewEventModal(!isNewEventModal);
    }


    const handleChange = useCallback((e: any) => {
        if (e.target.name === 'title') {
            setTitle(e.target.value)
        } else if (e.target.name === 'description') {
            setDescription(e.target.value)
        }  
    }, [])

    const submit = useCallback( async () => {

        if (!title) {
            alert("No Title.")
            return;
        }
        if (!description) {
            alert("No Description.")
            return;
        }
        if ((deposit <= 0) && (deposit > 1)) {
            alert("Amount must be over 0.00 ETH and below than 1.00 ETH")
            return;
        }


        setSaving(true);

        const y = Number(date.substring(0,4));
        const m = Number(date.substring(5,7));
        const d = Number(date.substring(8,10));
        const hours = Number(time.substring(0,2));
        const mins = Number(time.substring(3,5));
        
        const timestamp = Math.round(new Date(y,m,d,hours, mins).valueOf()/1000);

        const event = {
            title : title,
            description : description,
            rate : (deposit* 10 ** 18)+"",
            timestamp : timestamp
        }
        

        try {
            await accountStore.addEvent(event);
            alert("Added.");
            window.location.reload();
        } catch (error) {
            alert(`${error}`);
        }
        

        setSaving(false);
    }, [title, description, deposit, date, time]);

    const handleDepositChange = useCallback((e: any) => {
        setDeposit(e.target.value);
    }, [])

    return (
        <>
            {!address &&
                <Alert color="danger" toggle={onDismiss}>
                    User not found. Please login via  <a href="#" onClick={onDismiss} style={{ color: "inherit", textDecoration: "underline" }}>Portis's popup.</a>
                </Alert>
            }

            <Row>
                <Col sm="6">
                    <Welcome
                        showNewEventModal={toggleNewEventModal}
                    />
                </Col>
                <Col sm="6">
                    <Upcoming />

                </Col>
            </Row>
            <Modal isOpen={isNewEventModal} toggle={toggleNewEventModal}>
                <ModalHeader toggle={toggleNewEventModal}>New Event</ModalHeader>
                <ModalBody>
                    <Form>
                        <FormGroup>
                            <Label for="title">Title</Label>
                            <Input disabled={saving} type="text" name="title" id="title" value={title} onChange={handleChange} placeholder="Event's Title" />
                        </FormGroup>
                        <FormGroup>
                            <Label for="description">Description</Label>
                            <Input disabled={saving} type="textarea" rows={4} name="description" id="description" value={description} onChange={handleChange} placeholder="Event's Description" />
                        </FormGroup>
                        <Row>
                            <Col sm="6">
                                <FormGroup>
                                    <Label for="exampleDate">Event Date</Label>
                                    <Input
                                        type="date"
                                        name="date"
                                        id="exampleDate"
                                        disabled={true}
                                        value={date}
                                    />
                                    <p style={{fontSize:"10px"}}>Not supported change date</p>
                                </FormGroup>
                            </Col>
                            <Col sm="6">
                                <FormGroup>
                                    <Label for="exampleTime">Event Time</Label>
                                    <Input
                                        type="time"
                                        name="time"
                                        disabled={true}
                                        id="exampleTime"
                                        value={time}
                                        placeholder="time placeholder"
                                    />
                                    <p style={{fontSize:"10px"}}>Not supported change time</p>
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col sm="6">
                                <FormGroup>
                                    <Label for="exampleNumber">Deposit Amount (ETH)</Label>
                                    <Input
                                        type="number"
                                        name="number"
                                        id="depositAmount"
                                        value={deposit}
                                        disabled={saving}
                                        onChange={handleDepositChange}
                                        step={0.1}
                                    />
                                </FormGroup>
                            </Col>
                            <Col sm="6">
                            <FormGroup>
                                    <Label for="exampleNumber">Gas Fee</Label>
                                    <Input
                                        type="text"
                                        name="gasFee"
                                        disabled={true}
                                        id="gasFee"
                                        value={`No need.`}
                                    />
                                </FormGroup>
                            </Col>
                        </Row>
                    </Form>
                </ModalBody>
                <ModalFooter>
                    { saving && (<Spinner color="secondary" />)}{` `}
                    <Button color="primary" onClick={submit} disabled={saving} >Submit</Button>{' '}
                    <Button color="secondary" disabled={saving} onClick={toggleNewEventModal}>Cancel</Button>
                </ModalFooter>
            </Modal>
        </>
    )
}

export default observer(Home);