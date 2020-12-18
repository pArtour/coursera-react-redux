import React from "react";
import {
    Card,
    CardImg,
    CardText,
    CardBody,
    CardTitle,
    Breadcrumb,
    BreadcrumbItem,
    Button,
    ModalHeader, ModalBody,
    Label,
    Modal,
    Row,
} from "reactstrap";
import { Link } from "react-router-dom";
import { Control, LocalForm, Errors } from "react-redux-form";
import { Loading } from "./Loading";
import { baseURL } from "../shared/baseURL";
import { FadeTransform, Fade, Stagger } from "react-animation-components";

const isRequired = value => value && value.length;
const maxLength = length => value => !value || (value.length <= length);
const minLength = length => value => !value || (value.length >= length);

function CommentForm(props) {
    return (
        <LocalForm onSubmit={(values) => props.handleSubmit(values, props.dishId)}>
            <Row className="form-group" >
                <Label htmlFor="rating">Rating</Label>
                <Control.select
                    id="rating"
                    model=".rating"
                    name="rating"
                    className="form-control"
                >
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                </Control.select>
            </Row>
            <Row className="form-group" >
                <Label htmlFor="author">Your Name</Label>
                <Control.text
                    className="form-control"
                    model=".author"
                    id="author"
                    name="author"
                    placeholder="Your Name"
                    validators={{
                        isRequired,
                        minLength: minLength(3),
                        maxLength: maxLength(15)
                    }}
                />
                <Errors
                    className="text-danger"
                    model=".your-name"
                    show="touched"
                    messages={{
                        isRequired: 'Required',
                        minLength: 'Must be grater than 2 characters',
                        maxLength: 'Must be less than 15 characters or less'
                    }}
                />

            </Row>
            <Row className="form-group" >
                <Label htmlFor="comment">Comment</Label>
                <Control.textarea
                    model=".comment"
                    id="comment"
                    name="comment"
                    rows="6"
                    className="form-control"
                />
            </Row>
            <Button type="submit" value="submit" className="bg-primary">Submit</Button>
        </LocalForm>
    );
}

function parseDate(string) {
    const date = new Date(string);
    const dateArray = String(date).split(' ');
    const result = {
        day: parseInt(dateArray[2]) + 1,
        month: dateArray[1],
        year: dateArray[3]
    }
    return `${result.month} ${result.day < 9 ? '0' + result.day : result.day}, ${result.year}`;
}

function RenderDish({dish}) {
    return (
        <FadeTransform in
            transformProps={{
                exitTransform: 'scale(0.5) translateY(-50%)'
            }}>
            <Card>
                <CardImg top src={baseURL + dish.image} alt={dish.name} />
                <CardBody>
                    <CardTitle>{dish.name}</CardTitle>
                    <CardText>{dish.description}</CardText>
                </CardBody>
            </Card>
        </FadeTransform>
    );
}

function RenderComments({comments}) {
    const commentsLiItems = comments.map(item => {
        return (
            <Fade in >
                <li key={item.id}>
                    <CardText>{item.comment}</CardText>
                    <CardText>-- {item.author}, {parseDate(item.date)}</CardText>
                </li>
            </Fade>
        );
    });
    return (
        <>
            <h4>Comments</h4>
            <ul className="list-unstyled">
                <Stagger in >
                    {commentsLiItems}
                </Stagger>
            </ul>
        </>
    );
}

class DishDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isModalOpen: false
        }
        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }

    handleSubmit(values, dishId) {
        this.toggleModal()
        this.props.postComment(dishId, values.rating, values.author, values.comment)
    }

    render() {
        const { dish, comments } = this.props;
        if (this.props.dishesLoading) {
            return (
                <div className="container">
                    <div className="row">
                        <Loading />
                    </div>
                </div>
            );
        } else if (this.props.dishesErrorMessage) {
            return (
                <div className="container">
                    <div className="row">
                        <h4>{this.props.dishesErrorMessage}</h4>
                    </div>
                </div>
            );
        }
        else if (dish) {
            return (
                <>
                    <div className="container">
                        <div className="row">
                            <Breadcrumb>
                                <BreadcrumbItem><Link to='/menu'>Menu</Link></BreadcrumbItem>
                                <BreadcrumbItem active>{dish.name}</BreadcrumbItem>
                            </Breadcrumb>
                            <div className="col-12">
                                <h3>{dish.name}</h3>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12 col-md-5 m-1">
                                <RenderDish dish={dish} />
                            </div>
                            <div className="col-12 col-md-5 m-1">
                                <RenderComments comments={comments} />
                                <Button outline onClick={this.toggleModal}>
                                    <span className="fa fa-sign-in fa-lg"></span> Submit Comment
                                </Button>
                            </div>
                        </div>
                    </div>

                    <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                        <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                        <ModalBody>
                            <CommentForm handleSubmit={this.handleSubmit} dishId={dish.id} />
                        </ModalBody>
                    </Modal>
                </>
            );
        } else {
            return <div></div>
        }
    }

// () => {

}

export default DishDetails;