import React, { Component } from "react";
import NewsListings from "../NewsListings";

// seed-data
import newsSources from "../../seed-data/newsSources";

import "./Jargon.css";

// to deal with CORS-related issues and other constants
const CORS_API_URL = "https://cors-anywhere.herokuapp.com/";
const REACT_APP_API_KEY = "1ac76a8ce51442738b51ba627fd92210";
const JARGONSTEIN_EXPRESS_SERVER =
  "https://jargonstein-express-server.herokuapp.com/jargon";

class Jargon extends Component {
  constructor() {
    super();
    this.state = {
      jargon: "",
      explanation: "",
      articles: [],
      isLoaded: false
    };
    this.fetchContent = this.fetchContent.bind(this);
  }

  componentDidMount() {
    this.fetchContent();
  }

  render() {
    if (this.state.isLoaded) {
      return (
        <NewsListings
          jargon={this.state.jargon}
          explanation={this.state.explanation}
          articles={this.state.articles}
          handleFetchContent={this.fetchContent}
        />
      );
    }
    return <div className="loader" />;
  }

  async fetchContent() {
    console.log("In client > Jargon.js > fetchContent");
    this.setState({ isLoaded: false });
    let jargon;

    await fetch(CORS_API_URL + JARGONSTEIN_EXPRESS_SERVER)
      .then(response => response.json())
      .then(data => {
        console.log("data received from server");
        console.log(data);
        this.setState({ jargon: data.jargon, explanation: data.explanation });
        jargon = data.jargon;
      });
    const apiEndpoint = this.buildFetchQuery(jargon);
    this.fetchArticles(apiEndpoint);
  }

  buildFetchQuery(jargon) {
    let searchJargon = jargon + "&";
    const url = CORS_API_URL + "https://newsapi.org/v2/everything?q=";
    // const apiKey = process.env.REACT_APP_API_KEY;
    // console.log(apiKey)
    const pageSize = "5&";
    const sources = newsSources.join(",") + "&";

    const apiEndpoint =
      url +
      searchJargon +
      "from=2010-01-01&" +
      "sortBy=relevancy&" +
      "pageSize=" +
      pageSize +
      "sources=" +
      sources +
      "apiKey=" +
      REACT_APP_API_KEY;

    return apiEndpoint;
  }

  fetchArticles(apiEndpoint) {
    fetch(apiEndpoint)
      .then(response => response.json())
      .then(json => json.articles)
      .then(articles =>
        this.setState({
          articles: articles,
          isLoaded: true
        })
      )
      .catch(error => console.log(error));
  }
}

export default Jargon;
