import React from 'react';
import { Link } from "react-router-dom";
import styled from 'styled-components' 
import Blockies from 'react-blockies';
import { ThumbsUp } from "react-feather";
import {
    Navbar,
    NavbarBrand,
    Nav,
    NavItem,
    Badge,
    NavLink,
    Container
} from 'reactstrap';
import { observer } from "mobx-react-lite";
import { NETWORK } from "../constants";
import accountStore from "../Stores/AccountStore";

const Wrapper = styled.div`
    position: fixed;
    width: 100%;
    height: 80px;
    z-index: 100;
    font-family: helvetica;
`;

const Header : React.FunctionComponent = () => {

    const counter = accountStore.count;
    const address = accountStore.address;

    const onShow = () => {
        accountStore.showInfo();
    }

    return (
        <Wrapper>
            <Navbar color="light" light expand="md" style={{ paddingLeft: "40px", paddingRight: "40px" }}>
                <Container>
                    <NavbarBrand><Link to="/" style={{color:"inherit"}}><ThumbsUp style={{marginBottom : "4px"}} size={18}/>{` `}Upmeet{` `}</Link></NavbarBrand><h6><Badge style={{marginBottom : "8px"}} size="sm" color="secondary">{NETWORK}</Badge></h6>
                    <Nav className="ml-auto" navbar>
                        { address &&
                        <>
                        <NavItem>
                            <Link to="/gas"><NavLink>Gas Station</NavLink></Link>
                        </NavItem>
                        <NavItem>
                            <NavLink style={{cursor:"pointer"}} onClick={onShow}>My Accounts</NavLink>
                        </NavItem>
                        </>
                        
                        }
                        
                    </Nav>
                </Container>
            </Navbar>
        </Wrapper>
    )
}

export default observer(Header);



