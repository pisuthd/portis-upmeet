import React, { useCallback } from 'react';
import { Jumbotron, Button, Row, Col, Badge } from 'reactstrap';
import { observer } from "mobx-react-lite";
import accountStore from "../../Stores/AccountStore";

interface IWelcome {
    showNewEventModal : () => void;
}


const Welcome: React.FunctionComponent<IWelcome> = ({showNewEventModal}) => {

    const address = accountStore.address;

    const test = useCallback((e : any) => {
        accountStore.increase();
    },[])

    const logout = useCallback((e: any)=> {
        accountStore.logout();
    }, [])

    return (
        <div>
            <Jumbotron style={{height: "80vh"}}>
                <h1 className="display-4">Meet People</h1>
                <p style={{marginBottom: "10px"}} className="lead">Make friends who the same interests with Upmeet which is an Ethereum-based dapp to organize in-person events made for crypto communities. </p>
                <hr className="my-2" />
                <p style={{marginTop: "10px"}}>This application is inspired by Kickback App that the attendees will need to reserve a spot by deposit a small amount of ETH, the pain point is that many time the event comprise of no shown people that brought the organizer put unnecessary effort into preparing beverages and so-on, the app will spread out a deposit from no shown to all attendee who come equally.</p>
                <p className="lead">
                    <a target="_blank" href="https://github.com/pisuthd/portis-upmeet"><Button color="primary">Github</Button></a>{` `}
                    { address &&
                    <>
                        <Button onClick={showNewEventModal} color="success">New Event</Button>{` `}
                    </>
                    }
                    
                </p>
            </Jumbotron>
        </div>
    )
}

export default observer(Welcome);