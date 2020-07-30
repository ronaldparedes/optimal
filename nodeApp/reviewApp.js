const fetch = require("node-fetch");

const YELP_API_KEY =
  "w8uQv046531_c25osdbeZm3kkvK3G5I5DmK9bmIeeuJuOatLqVrV9KVWss7EaFvbW3cYkcricx9ItFTWnWH7LfC-Xvs4F-ldIwz4x_Re9eaJrXJkxIVRl8ryAecRX3Yx";
// const [name, setName] = useState("Name");
// const [reviews, setReviews] = useState(null);
// const [isLoaded, setIsLoaded] = useState(false);
// const [error, setError] = useState(null);
const corsAnywhereURL = "https://cors-anywhere.herokuapp.com/";
const yelpAPI_URL =
  "https://api.yelp.com/v3/businesses/C6zSWewDs7-yaATp1Fh0BA/reviews";
// "https://api.yelp.com/v3/businesses/o9ds9z_6W2bFhAr0yA6HdA/reviews";
const reviewComponents = [];

fetch(yelpAPI_URL, {
  method: "GET",
  headers: {
    Authorization: `Bearer ${YELP_API_KEY}`,
    "Content-Type": "application/json",
  },
})
  .then((response) => response.json())
  .then((result) => {
    console.log(result.reviews);
    // setReviews(result.reviews);
    // setIsLoaded(true);
  })
  .catch((error) => {
    console.log("error", error);
  });
