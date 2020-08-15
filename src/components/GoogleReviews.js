import React, { useState } from "react";
import Review from "./ReviewCard";
import { data } from "./GoogleReviewData";

const reviewCards = [];
data.forEach((card) => {
  reviewCards.push(
    <Review
      key={card.name}
      name={card.name}
      time={card.time}
      text={card.text}
      rating={card.rating}
      avatar={card.avatar}
      isGoogle
    />
  );
});
const GoogleReviews = () => {
  return reviewCards;
};

export default GoogleReviews;
