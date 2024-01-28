import React from 'react';
import { Col, Container, Form, Row } from 'reactstrap';

const Contact = () => {
    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid>
                    <div className="layout-wrapper landing">

                        <section className="section" id="contact">
                            <Container>
                                <Row className="justify-content-center">
                                    <Col lg={8}>
                                        <div className="text-center mb-5">
                                            <h3 className="mb-3 fw-semibold">تواصل معنا</h3>
                                            <p className="text-muted mb-4 ff-secondary">ننجح عندما نقدم أفكاراً مبتكرة، ولكننا نفهم أيضًا أنه يجب دعم الأفكار الذكية بنتائج قابلة للقياس.</p>
                                        </div>
                                    </Col>
                                </Row>

                                <Row className="gy-4">
                                    <Col lg={4}>
                                        <div>
                                            <div className="mt-4">
                                                <h5 className="fs-13 text-muted text-uppercase">عنوان المكتب:</h5>
                                                <div className="ff-secondary fw-semibold">شركة نفط الكويت <br />الكويت</div>
                                            </div>
                                            <div className="mt-4">
                                                {/* <h5 className="fs-13 text-muted text-uppercase">ساعات العمل:</h5>
                                                <div className="ff-secondary fw-semibold">9:00 صباحًا إلى 6:00 مساءً</div> */}
                                            </div>
                                        </div>
                                    </Col>

                                    <Col lg={8}>
                                        <div>
                                            <Form>
                                                <Row>
                                                    <Col lg={6}>
                                                        <div className="mb-4">
                                                            <label htmlFor="name" className="form-label fs-13">الاسم</label>
                                                            <input name="name" id="name" type="text"
                                                                className="form-control bg-light border-light" placeholder="اسمك*" />
                                                        </div>
                                                    </Col>
                                                    <Col lg={6}>
                                                        <div className="mb-4">
                                                            <label htmlFor="email" className="form-label fs-13">البريد الإلكتروني</label>
                                                            <input name="email" id="email" type="email"
                                                                className="form-control bg-light border-light" placeholder="بريدك الإلكتروني*" />
                                                        </div>
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col lg={12}>
                                                        <div className="mb-4">
                                                            <label htmlFor="subject" className="form-label fs-13">الموضوع</label>
                                                            <input type="text" className="form-control bg-light border-light" id="subject"
                                                                name="subject" placeholder="موضوعك.." />
                                                        </div>
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col lg={12}>
                                                        <div className="mb-3">
                                                            <label htmlFor="comments" className="form-label fs-13">الرسالة</label>
                                                            <textarea name="comments" id="comments" rows="3"
                                                                className="form-control bg-light border-light"
                                                                placeholder="رسالتك..."></textarea>
                                                        </div>
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col lg={12} className="text-end">
                                                        <input type="submit" id="submit" name="send" className="submitBnt btn btn-primary"
                                                            value="إرسال الرسالة" />
                                                    </Col>
                                                </Row>
                                            </Form>
                                        </div>
                                    </Col>
                                </Row>
                            </Container>
                        </section>
                    </div >

                </Container>
            </div >
        </React.Fragment >
    );
};

export default Contact;
