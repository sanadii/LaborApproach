import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import background from 'assets/images/labor/background.png';

const Home = () => {

    const sectionStyle = {
        backgroundImage: `url(${background})`, // Corrected the backgroundImage property
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    };

    return (
        <React.Fragment>
            <section className="section" id="home" style={sectionStyle}>
                <div className="bg-overlay"></div>
                <Container>
                    <Row className="justify-content-center">
                        <Col lg={8} sm={10}>
                            <div className="text-center">
                                <h1 className="display-4 fw-medium mb-4 lh-base text-white">قائمة النهج العمالي </h1>
                                <h2 className="text-success">شركة نفط الكويت</h2>
                                <p className="lead text-white-50 lh-base mb-4 pb-2">قائمة تنهض بالعمال بنهج نقابي معتدل و نسيج اجتماعي منسجم</p>

                                <div className="hstack gap-2 justify-content-center">
                                    {/* <Link to="/laborApproach-create" className="btn btn-primary">Create Own <i className="ri-arrow-right-line align-middle ms-1"></i></Link>
                                    <Link to="/laborApproach-explore" className="btn btn-danger">Explore Now <i className="ri-arrow-right-line align-middle ms-1"></i></Link> */}
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
        </React.Fragment>
    );
}

export default Home;