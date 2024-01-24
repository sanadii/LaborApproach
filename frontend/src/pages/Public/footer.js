import React from 'react';
import { Link } from 'react-router-dom';
import { Col, Container, Row } from 'reactstrap';

// Import Images
import logolight from "assets/images/logo-light.png";

const Footer = () => {
    return (
        <React.Fragment>
            <footer className="custom-footer bg-dark py-5 position-relative">
                <Container>
                    <Row>
                        <Col lg={4} className="mt-4">
                            <div>
                                <div>
                                    <img src={logolight} alt="logo light" height="17" />

                                </div>
                                <div className="mt-4">
                                    <p>قائمة النهج العمالي</p>
                                    <p>الموقع الرسمي لقائمة النهج العمالي، قائمة تنهض بالعمال بنهج نقابي معتدل و نسيج اجتماعي منسجم. #نهجٌ_جديد #شركة_نفط_الكويت #القطاع_النفطي.</p>
                                </div>
                            </div>
                        </Col>
                        <Col lg={7} className="ms-lg-auto">
                           
                        </Col>

                    </Row>

                    <Row className="text-center text-sm-start align-items-center mt-5">
                        <Col sm={6}>

                            <div>
                                <p className="copy-rights mb-0">
                                    {new Date().getFullYear()} © LabourApproach - KOC
                                </p>
                            </div>
                        </Col>
                        <Col sm={6}>
                            <div className="text-sm-end mt-3 mt-sm-0">
                                <ul className="list-inline mb-0 footer-social-link">
                                    <li className="list-inline-item">
                                        <Link to="https://www.instagram.com/laborapproach/" className="avatar-xs d-block">
                                            <div className="avatar-title rounded-circle">
                                                <i className="ri-instagram-fill"></i>
                                            </div>
                                        </Link>
                                    </li>
                                    <li className="list-inline-item">
                                        <Link to="https://twitter.com/LaborApproach" className="avatar-xs d-block">
                                            <div className="avatar-title rounded-circle">
                                                <i className="ri-twitter-fill"></i>
                                            </div>
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </footer>
        </React.Fragment >
    );
};

export default Footer;