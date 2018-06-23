import axios from "axios";

export default {
  // Gets all books
  getArticles: function() {
    return axios.get("/api/articles");
  },
  // Gets the book with the given id
  getArticle: function(id) {
    return axios.get("/api/articles/" + id);
  },
  // Deletes the book with the given id
  deleteArticle: function(id) {
    return axios.delete("/api/articles/" + id);
  },
  // Saves a book to the database
  saveArticle: function(articleData) {
    return axios.post("/api/articles", articleData);
  },
  getNYT: function({ topic, startYear, endYear }) {
    let queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
    queryURL += "?api-key=dc7c0ef989c443eda67d430da4075a26";
    if (!endYear && startYear) {
      queryURL += `&q=${topic}&begin_date=${startYear}0101`;
    } else if (!startYear && endYear) {
      queryURL += `&q=${topic}&end_date=${endYear}1231`;
    } else if (!startYear && !endYear) {
      queryURL += `&q=${topic}`;
    } else {
      queryURL += `&q=${topic}&begin_date=${startYear}0101&end_date=${endYear}1231`;
    }
    console.log(queryURL);
    return axios.get(queryURL);
  }
};
