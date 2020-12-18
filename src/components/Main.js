import React from 'react';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import Header from "./Header";
import Menu from "./Menu";
import Home from "./Home";
import Footer from "./Footer";
import Contact from "./Contact";
import DishDetails from "./DishDetails";
import About from "./About";
import { connect } from 'react-redux';
import {fetchDishes, fetchComments, fetchPromos, postComment, fetchLeaders, postFeedback } from "../redux/actionCreators";
import { actions } from "react-redux-form";
import { TransitionGroup, CSSTransition } from "react-transition-group";


const mapStateToProps = state => {
    return {
        dishes: state.dishes,
        comments: state.comments,
        promotions: state.promotions,
        leaders: state.leaders
    };
}

const mapDispatchToProps = dispatch => ({
    postComment: (dishId, rating, author, comment) => dispatch(postComment(dishId, rating, author, comment)),
    fetchDishes: () => {dispatch(fetchDishes())},
    resetFeedbackForm: () => {dispatch(actions.reset('feedback'))},
    fetchComments: () => {dispatch(fetchComments())},
    fetchPromos: () => {dispatch(fetchPromos())},
    fetchLeaders: () => {dispatch(fetchLeaders())},
    postFeedback: ({firstname, lastname, telnum, email, agree, contactType, message}) => {dispatch(postFeedback({firstname, lastname, telnum, email, agree, contactType, message}))}
});

class Main extends React.Component {

    componentDidMount() {
        this.props.fetchDishes();
        this.props.fetchComments();
        this.props.fetchPromos();
        this.props.fetchLeaders();
    }

    render() {

        const HomePage = () => {
            return (
                <Home
                    dish={this.props.dishes.dishes.filter(dish => dish.featured)[0]}
                    dishesLoading={this.props.dishes.isLoading}
                    dishesErrorMessage={this.props.dishes.errorMessage}
                    promotion={this.props.promotions.promotions.filter(promo => promo.featured)[0]}
                    promosLoading={this.props.promotions.isLoading}
                    promosErrorMessage={this.props.promotions.errorMessage}
                    leader={this.props.leaders.leaders.filter(leader => leader.featured)[0]}
                    leaderLoading={this.props.leaders.isLoading}
                    leaderErrorMessage={this.props.leaders.errorMessage}
                />
            );
        }

        const DishWithId = ({ match }) => {
            return (
                <DishDetails
                    dish={this.props.dishes.dishes.filter(dish => dish.id === parseInt(match.params.dishId, 10))[0]}
                    dishesLoading={this.props.dishes.isLoading}
                    dishesErrorMessage={this.props.dishes.errorMessage}
                    comments={this.props.comments.comments.filter(comment => comment.dishId === parseInt(match.params.dishId,10))}
                    commentsErrorMessage={this.props.comments.errorMessage}
                    postComment={this.props.postComment}
                />
            );
        }

        return (
            <div>
                <Header/>
                    <TransitionGroup>
                        <CSSTransition key={this.props.location.key} classNames="page" timeout={300}>
                            <Switch>
                                <Route path="/home" component={HomePage} />
                                <Route exact path="/menu" component={() => <Menu dishes={this.props.dishes} />} />
                                <Route path="/menu/:dishId" component={DishWithId} />
                                <Route exact path="/contactus" component={() => <Contact postFeedback={this.props.postFeedback} resetFeedbackForm={this.props.resetFeedbackForm} />} />
                                <Route path="/aboutus" component={() => <About leaders={this.props.leaders.leaders}/>}/>
                                <Redirect to="/home" />
                            </Switch>
                        </CSSTransition>
                    </TransitionGroup>
                <Footer/>
            </div>
        );
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
