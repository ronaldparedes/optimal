import React, { useState, useEffect } from "react";
import Review from "./ReviewCard";

const ReactReviews = () => {
  const [yelpReviews, setYelpReviews] = useState(null);
  const [googleReviews, setGoogleReviews] = useState(null);

  const [isYelpLoaded, setIsYelpLoaded] = useState(false);
  const [isGoogleLoaded, setIsGoogleLoaded] = useState(false);

  const getReviews = () => {
    const business_id = "o9ds9z_6W2bFhAr0yA6HdA";
    const cyclicYelpAPI_URL = `https://reviews-app.cyclic.app/yelp-review?business_id=${business_id}`;

    const cyclicGoogleAPI_URL = `https://reviews-app.cyclic.app/google-review`;

    $.ajax({
      url: cyclicYelpAPI_URL,
      method: "GET",
      "Content-Type": "application/json",
    }).then(
      (result) => {
        setYelpReviews(result);
        setIsYelpLoaded(true);
        let yelpReviewsTStamped = {
          timestamp: Date.now(),
          yelpReviews: result,
        };
        localStorage.setItem(
          "yelpReviews",
          JSON.stringify(yelpReviewsTStamped)
        );
      },
      (error) => {
        console.log("error", error);
      }
    );
    $.ajax({
      url: cyclicGoogleAPI_URL,
      method: "GET",
    }).then(
      (result) => {
        setGoogleReviews(result);
        setIsGoogleLoaded(true);
        let googleReviewsTStamped = {
          timestamp: Date.now(),
          googleReviews: result,
        };
        localStorage.setItem(
          "googleReviews",
          JSON.stringify(googleReviewsTStamped)
        );
      },
      (error) => {
        console.log("error", error);
      }
    );
  };
  useEffect(() => {
    const hoursToExpire = 24;
    const hasPrevReviews = localStorage.getItem("yelpReviews");
    if (hasPrevReviews) {
      console.log("Reviews found in localStorage");
      const revFromStorage = {
        yelpReviews: localStorage.getItem("yelpReviews"),
        googleReviews: localStorage.getItem("googleReviews"),
      };
      const timeToExpire = hoursToExpire * (60 * 60 * 1000); // hours in milliseconds
      const timeElapsed = Date.now() - revFromStorage.timestamp;
      if (timeElapsed < timeToExpire) {
        setYelpReviews(revFromStorage.yelpReviews);
        setGoogleReviews(revFromStorage.googleReviews);
        setIsYelpLoaded(true);
        setIsGoogleLoaded(true);
        console.log("Loaded reviews from localStorage");
      } else {
        console.log("Reviews in localStorage Expired\nGetting new Reviews.");
        localStorage.removeItem("yelpReviews");
        localStorage.removeItem("googleReviews");
        getReviews();
      }
    } else {
      console.log("No reviews found in localStorage.\nGetting reviews NOW");
      getReviews();
    }
  }, []);

  const reviewArr = [];

  if (isYelpLoaded && isGoogleLoaded) {
    yelpReviews.forEach((review, index) => {
      reviewArr.push(
        <Review
          key={index}
          name={review.user.name}
          avatar={review.user.image_url}
          time={review.time_created}
          text={review.text}
          rating={review.rating}
        />
      );
    });
    if (googleReviews) {
      googleReviews.forEach((review, index) => {
        reviewArr.push(
          <Review
            key={index + review.author_name}
            name={review.author_name}
            avatar={review.profile_photo_url}
            time={review.relative_time_description}
            text={review.text}
            rating={review.rating}
            isGoogle
          />
        );
      });
    }
  } else {
    Array(3)
      .fill()
      .forEach((review, index) => {
        reviewArr.push(<Review key={index}></Review>);
      });
  }
  return reviewArr;
};

export default ReactReviews;
