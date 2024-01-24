import React, { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";

import { Container, Row } from "reactstrap";
import { BreadCrumb, ChatBubble } from "components";

import { Button, Offcanvas, OffcanvasHeader, OffcanvasBody } from 'reactstrap';

//SimpleBar
import SimpleBar from "simplebar-react";



const Dashboard = () => {
    document.title = "Q8 Vision - Labor Approach";

    const currentUser = useSelector(state => state.Users.currentUser);
    const isStaff = currentUser?.isStaff;


    // open offcanvas
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);


    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid>
                    <BreadCrumb title="Dashboard" pageTitle="Dashboard" />
                    <h2>DASHBOARD</h2>
                    <p>this is the dashboard</p>
                </Container>
            </div>
        </React.Fragment>

    );
};

export default Dashboard;