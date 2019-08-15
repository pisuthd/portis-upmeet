import React, { useState, useEffect, useCallback } from 'react';
import { Jumbotron, Button, Row, Col,Spinner, Alert, Form, FormGroup, Label, Input } from "reactstrap";
import accountStore from "../../Stores/AccountStore";
import Intro from "./Intro";

const Gas: React.FunctionComponent = () => {
    
    const [ gasBalance, setGasBalance ] = useState(0);
    const [ amount, setAmount ] = useState(0.1);
    const [ loading, setLoading] = useState(false);

    const loadGasBalance = async () => {
            try {
                const result = await accountStore.checkGasBalance();
                setGasBalance(result);
            } catch (error) {
                console.log(error);
            }
    }

    useEffect(  () => {
        setLoading(true);
        loadGasBalance();
        setLoading(false);
    },[])

    const handleChange = useCallback((e: any) => {
        setAmount(e.target.value);
    }, [])


    const submit = useCallback( async () => {
        if ((amount <= 0) && (amount > 1)) {
            alert("Amount must be over 0.00 ETH and below than 1.00 ETH")
            return;
        }
        setLoading(true);
        try {
            await accountStore.fund(amount);
            setAmount(0.1);
            alert(`Completed.`);

        } catch (error) {
            alert(`${error}`);
        }
        await loadGasBalance();
        setLoading(false);

    }, [])

    return (
        <>
           <Row>
                <Col sm="6">
                    <Intro/>
                </Col>
                <Col sm="6">
                    <Row
                        style={{
                            fontSize: "24px",
                            marginTop: "40px",
                            marginBottom: "40px"
                        }}
                    >
                        <Col sm="6">
                            Available Balance : 
                        </Col>
                        <Col sm="6" style={{textAlign : "right"}}>
                            {gasBalance.toFixed(4)}{` `}ETH
                        </Col>
                    </Row>
                    <hr/>
                    <Row>
                        <Col sm="12">
                            <Form inline>
                                <FormGroup>
                                    <Label style={{ marginRight: "10px" }} for="fundAmount" >Amount</Label>{` `}
                                    <Input onChange={handleChange} style={{ marginRight: "10px" }} type="number" step={0.1} value={amount} name="fundAmount" id="fundAmount" />
                                </FormGroup>
                                {' '}
                                <Button style={{ marginRight: "10px" }} disabled={loading} onClick={submit} color="primary">Fund</Button>{` `}{ loading && (<Spinner color="secondary" />) }
                            </Form>
                        </Col>
                        
                    </Row>
                </Col>
            </Row> 
        </>
    )
}

export default Gas;