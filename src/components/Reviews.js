import React, { useState, useEffect } from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import avatar from "../assets/google-avatar.png";
import yelpLogo from "../assets/yelpLogo@2x.png";
import star from "../assets/star.svg";

const Review = (props) => {
  let dateFormatted;
  if (props.time) {
    const date = new Date(props.time.replace(/-/g, "/"));
    dateFormatted = `${
      date.getMonth() + 1
    }/${date.getDate()}/${date.getFullYear()}`;
  }
  return (
    <div
      className="rv--box"
      style={!props.name ? { backgroundColor: "#fcfcfc" } : null}
    >
      <div className="row no-gutters rv--head">
        <div>
          {props.name ? (
            props.avatar ? (
              <img className="rv-avatar" src={props.avatar}></img>
            ) : (
              <img className="rv-avatar" src={avatar}></img>
            )
          ) : (
            <Skeleton
              className="rv-avatar"
              style={{ boxShadow: "none" }}
              circle
              height={54}
              width={54}
            />
          )}
        </div>
        <div className="col">
          <div className="rv-name">
            {props.name || <Skeleton height={24} width={120} />}
          </div>
          {props.rating ? (
            <div className={`rv--stars rating-${props.rating}`}></div>
          ) : (
            <Skeleton width={110} height={20} />
          )}
          <div className="rv-review-date">
            {props.time ? dateFormatted : <Skeleton width={54} />}
          </div>
        </div>
      </div>
      <div className="row no-gutters rv--content">
        <span className="rv--content--text">
          {props.text || <Skeleton count={5} />}
        </span>
        <span className="rv--badge">
          {props.name ? (
            <a
              href="https://www.yelp.com/biz/optimal-physical-therapy-sports-and-wellness-center-gaithersburg-2"
              target="_blank"
              rel="noopener"
            >
              <img src={yelpLogo}></img>
            </a>
          ) : (
            <Skeleton width={60} height={30} />
          )}
        </span>
      </div>
    </div>
  );
};

const ReactReviews = () => {
  const [name, setName] = useState("");
  const [reviews, setReviews] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);
  const getReviews = () => {
    const testBusID = "C6zSWewDs7-yaATp1Fh0BA";
    const business_id = "o9ds9z_6W2bFhAr0yA6HdA";
    const herokuAPI_URL = `https://review-app-rp.herokuapp.com/yelp-review?business_id=${business_id}`;
    $.ajax({
      url: herokuAPI_URL,
      method: "GET",
      "Content-Type": "application/json",
    }).then(
      (result) => {
        setReviews(result);
        setIsLoaded(true);
        let reviewsTStamped = {
          timestamp: Date.now(),
          reviews: result,
        };
        localStorage.setItem("reviews", JSON.stringify(reviewsTStamped));
      },
      (error) => {
        console.log("error", error);
      }
    );
  };
  useEffect(() => {
    const hoursToExpire = 24;
    const hasPrevReviews = localStorage.getItem("reviews");
    if (hasPrevReviews) {
      console.log("Reviews found in localStorage");
      const revFromStorage = JSON.parse(hasPrevReviews);
      const timeToExpire = hoursToExpire * (60 * 60 * 1000); // hours in milliseconds
      const timeElapsed = Date.now() - revFromStorage.timestamp;
      if (timeElapsed < timeToExpire) {
        setReviews(revFromStorage.reviews);
        setIsLoaded(true);
        console.log("Loaded reviews from localStorage");
      } else {
        console.log("Reviews in localStorage Expired\nGetting new Reviews.");
        localStorage.removeItem("reviews");
        getReviews();
      }
    } else {
      console.log("No reviews found in localStorage.\nGetting reviews NOW");
      getReviews();
    }
  }, []);
  return isLoaded
    ? reviews.map((review, index) => {
        return (
          <Review
            key={index}
            name={review.user.name}
            avatar={review.user.image_url}
            time={review.time_created}
            text={review.text}
            rating={review.rating}
          />
        );
      })
    : Array(3)
        .fill()
        .map((review, index) => {
          return <Review key={index}></Review>;
        });
};

export default ReactReviews;
