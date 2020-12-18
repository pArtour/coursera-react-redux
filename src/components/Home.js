import React from "react";
import { Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle } from 'reactstrap';
import {Loading} from "./Loading";
import {baseURL} from "../shared/baseURL";
import { FadeTransform } from "react-animation-components";

const RenderCard = ({ item, isLoading, errorMessage }) => {
    if (isLoading) {
        return (
            <Loading />
        );
    } else if (errorMessage) {
        return (
            <h4>{errorMessage}</h4>
        );
    } else {
        return (
            <FadeTransform in
                transformProps={{
                    exitTransform: 'scale(0.5) translateY(-50%)'
                }}
            >
                <Card>
                    <CardImg src={baseURL + item.image} alr={item.name} />
                    <CardBody>
                        <CardTitle>{item.name}</CardTitle>
                        {item.designation ? <CardSubtitle>{item.designation}</CardSubtitle> : null}
                        <CardText>{item.description}</CardText>
                    </CardBody>
                </Card>
            </FadeTransform>
        );
    }
}

const Home = ({ dish, dishesLoading, dishesErrorMessage, promotion, promosErrorMessage, promosLoading, leader, leaderLoading, leaderErrorMessage }) => {
    return(
        <div className="container">
            <div className="row align-items-start">
                <div className="col-12 col-md m-1">
                    <RenderCard item={dish} isLoading={dishesLoading} errorMessage={dishesErrorMessage} />
                </div>
                <div className="col-12 col-md m-1">
                    <RenderCard item={promotion} isLoading={promosLoading} errorMessage={promosErrorMessage} />
                </div>
                <div className="col-12 col-md m-1">
                    <RenderCard item={leader} isLoading={leaderLoading} errorMessage={leaderErrorMessage} />
                </div>
            </div>
        </div>
    );
}

export default Home;