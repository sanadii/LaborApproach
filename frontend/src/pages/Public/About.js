import React from 'react';

import Values from "./Values"
import { Container, Row } from "reactstrap";


const About = () => {
    document.title = " النهج العمالي | عن قائمة النهج العمالي";

    const toTop = () => {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    };

    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid>
                    <div className="layout-wrapper landing">
                        <Values />
                    </div>
                </Container>
            </div >

        </React.Fragment>
    );
};

export default About;