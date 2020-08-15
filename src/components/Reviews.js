import React, { useState, useEffect } from "react";
import Review from "./ReviewCard";

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
