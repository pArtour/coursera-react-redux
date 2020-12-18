import React from 'react';
import { Breadcrumb, BreadcrumbItem, Button, Label, Col, Row } from 'reactstrap'
import { Link } from "react-router-dom";
import { Control, Form, Errors } from "react-redux-form";

const isRequired = value => value && value.length;
const maxLength = length => value => !value || (value.length <= length);
const minLength = length => value => !value || (value.length >= length);
const isNumber = value => !isNaN(Number(value));
const isEmailValid = value => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value);

class Contact extends React.Component {
    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(values) {
        this.props.postFeedback(values);
        this.props.resetFeedbackForm()
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to='/home'>Home</Link></BreadcrumbItem>
                        <BreadcrumbItem active>Contact Us</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>Contact Us</h3>
                    </div>
                </div>
                <div className="row row-content">
                    <div className="col-12">
                        <h3>Location Information</h3>
                    </div>
                    <div className="col-12 col-sm-4 offset-sm-1">
                        <h5>Our Address</h5>
                        <address>
                            121, Clear Water Bay Road<br />
                            Clear Water Bay, Kowloon<br />
                            HONG KONG<br />
                            <i className="fa fa-phone"></i>: +852 1234 5678<br />
                            <i className="fa fa-fax"></i>: +852 8765 4321<br />
                            <i className="fa fa-envelope"></i>: <a href="mailto:confusion@food.net">confusion@food.net</a>
                        </address>
                    </div>
                    <div className="col-12 col-sm-6 offset-sm-1">
                        <h5>Map of our Location</h5>
                    </div>
                    <div className="col-12 col-sm-11 offset-sm-1">
                        <div className="btn-group" role="group">
                            <a role="button" className="btn btn-primary" href="tel:+85212345678"><i className="fa fa-phone"></i> Call</a>
                            <a role="button" className="btn btn-info"><i className="fa fa-skype"></i> Skype</a>
                            <a role="button" className="btn btn-success" href="mailto:confusion@food.net"><i className="fa fa-envelope-o"></i> Email</a>
                        </div>
                    </div>
                </div>
                <div className="row row-content">
                    <div className="col-12">
                        <h3>Send us your Feedback</h3>
                    </div>
                    <div className="col-12 col-md-9">
                        <Form model="feedback" onSubmit={(values) => this.handleSubmit(values)}>
                            <Row className="form-group">
                                <Label htmlFor="firstname" md={2}>First Name</Label>
                                <Col md={10}>
                                    <Control.text
                                        className="form-control"
                                        model=".firstname"
                                        id="firstname"
                                        name="firstname"
                                        placeholder="First Name"
                                        validators={{
                                            isRequired,
                                            minLength: minLength(3),
                                            maxLength: maxLength(16)
                                        }}
                                    />
                                    <Errors
                                        className="text-danger"
                                        model=".firstname"
                                        show="touched"
                                        messages={{
                                            isRequired: 'Required',
                                            minLength: 'Must be grater than 2 characters',
                                            maxLength: 'Must be less than 16 characters or less'
                                        }}
                                    />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="lastname" md={2}>Last Name</Label>
                                <Col md={10}>
                                    <Control.text
                                        className="form-control"
                                        model=".lastname"
                                        id="lastname"
                                        name="lastname"
                                        placeholder="Last Name"
                                        validators={{
                                            isRequired,
                                            minLength: minLength(3),
                                            maxLength: maxLength(16)
                                        }}
                                    />
                                    <Errors
                                        className="text-danger"
                                        model=".lastname"
                                        show="touched"
                                        messages={{
                                            isRequired: 'Required',
                                            minLength: 'Must be grater than 2 characters',
                                            maxLength: 'Must be less than 16 characters or less'
                                        }}
                                    />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="telnum" md={2}>Contact Tel.</Label>
                                <Col md={10}>
                                    <Control.text
                                        className="form-control"
                                        model=".telnum"
                                        id="telnum"
                                        name="telnum"
                                        placeholder="Tel. Number"
                                        validators={{
                                            isRequired,
                                            isNumber,
                                            minLength: minLength(3),
                                            maxLength: maxLength(16)
                                        }}
                                    />
                                    <Errors
                                        className="text-danger"
                                        model=".telnum"
                                        show="touched"
                                        messages={{
                                            isRequired: 'Required',
                                            isNumber: 'Must be a number',
                                            minLength: 'Must be grater than 2 characters',
                                            maxLength: 'Must be less than 16 characters or less'
                                        }}
                                    />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="email" md={2}>Email</Label>
                                <Col md={10}>
                                    <Control.text
                                        className="form-control"
                                        model=".email"
                                        id="email"
                                        name="email"
                                        placeholder="Email"
                                        validators={{
                                            isRequired,
                                            isEmailValid
                                        }}
                                    />
                                    <Errors
                                        className="text-danger"
                                        model=".email"
                                        show="touched"
                                        messages={{
                                            isRequired: 'Required',
                                            isEmailValid: "Email is not valid"
                                        }}
                                    />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col md={{size: 6, offset: 2}}>
                                    <div className="form-check">
                                        <Label check>
                                            <Control.checkbox
                                                model=".agree"
                                                className="form-check-input"
                                            />
                                            {' '}
                                            <strong>May we contact you?</strong>
                                        </Label>
                                    </div>
                                </Col>
                                <Col md={{size: 3, offset: 1}}>
                                    <Control.select
                                        model=".contactType"
                                        name="contactType"
                                        className="form-control"
                                    >
                                        <option>Tel.</option>
                                        <option>Email</option>
                                    </Control.select>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="message" md={2}>Your Feedback</Label>
                                <Col md={10}>
                                    <Control.textarea
                                        model=".message"
                                        id="message"
                                        name="message"
                                        rows="12"
                                        className="form-control"
                                    />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col md={{size: 10, offset: 2}}>
                                    <Button type="submit" color="primary">Send Feedback</Button>
                                </Col>
                            </Row>
                        </Form>
                    </div>
                </div>
            </div>
        );
    }
}

export default Contact;