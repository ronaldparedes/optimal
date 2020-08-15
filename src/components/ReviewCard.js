import React from "React";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import avatar from "../assets/google-avatar.png";
import yelpLogo from "../assets/yelpLogo@2x.png";
import googleLogo from "../assets/googleLogo@2x.png";
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
            props.isGoogle ? (
              <div className={`rv--google-stars rating-${props.rating}`}></div>
            ) : (
              <div className={`rv--stars rating-${props.rating}`}></div>
            )
          ) : (
            <Skeleton width={110} height={20} />
          )}
          <div className="rv-review-date">
            {props.time ? (
              props.isGoogle ? (
                props.time
              ) : (
                dateFormatted
              )
            ) : (
              <Skeleton width={54} />
            )}
          </div>
        </div>
      </div>
      <div className="row no-gutters rv--content">
        <span className="rv--content--text">
          {props.text || <Skeleton count={5} />}
        </span>
        <span className="rv--badge">
          {props.name ? (
            props.isGoogle ? (
              <a
                href="http://google.com/search?q=Pillar+Physical+Therapy"
                target="_blank"
                rel="noopener"
              >
                <img src={googleLogo}></img>
              </a>
            ) : (
              <a
                href="https://www.yelp.com/biz/optimal-physical-therapy-sports-and-wellness-center-gaithersburg-2"
                target="_blank"
                rel="noopener"
              >
                <img src={yelpLogo}></img>
              </a>
            )
          ) : (
            <Skeleton width={60} height={30} />
          )}
        </span>
      </div>
    </div>
  );
};

export default Review;
