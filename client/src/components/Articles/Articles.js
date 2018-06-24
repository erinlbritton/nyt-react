import React, { Component } from "react";
import DeleteBtn from "../../components/DeleteBtn";
import SaveBtn from "../../components/SaveBtn";
import Jumbotron from "../../components/Jumbotron";
import API from "../../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import { Input, TextArea, FormBtn } from "../../components/Form";

class Articles extends Component {
  state = {
    articles: [],
    savedArticles: [],
    topic: "",
    startYear: "",
    endYear: "" 
  };

  componentDidMount() {
    this.loadArticles();
  }

  loadArticles = () => {
    API.getArticles()
      .then(res => this.setState({ savedArticles: res.data, title: "", author: "", date: "" }))
      .catch(err => console.log(err));
  };

  deleteArticle = id => {
    API.deleteArticle(id)
      .then(res => this.loadArticles())
      .catch(err => console.log(err));
  };

  saveArticle = (id) => {
    const article = this.state.articles.filter(article => article.id === id);
    console.log(article);
    API.saveArticle(article)
      .then(res => this.loadArticles())
      .catch(err => console.log(err));
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    if (this.state.topic) {
      API.getNYT(this.state)
        .then(res => {
          let array = res.data.response.docs.map(article => {
            return {
              title: article.headline.main,
              author: article.byline.original, 
              date: article.pub_date,
              url: article.web_url,
              id: article._id
            }
          });
          this.setState({ articles: array });
        })
        .catch(err => console.log(err));
    }
  };

  render() {
    return (
      <Container>
      <br />
      <Row>
          <Col size="md-12">
            <form>
              <Input
                value={this.state.topic}
                onChange={this.handleInputChange}
                name="topic"
                placeholder="Topic (required)"
              />
              <Input
                value={this.state.startYear}
                onChange={this.handleInputChange}
                name="startYear"
                placeholder="Start Year (optional)"
              />
              <Input
                value={this.state.endYear}
                onChange={this.handleInputChange}
                name="endYear"
                placeholder="End Year (optional)"
              />
              <FormBtn
                disabled={!(this.state.topic)}
                onClick={this.handleFormSubmit}
              >
                Search
              </FormBtn>
            </form>
          </Col>
      </Row>
      <br />
      <Row>
          <Col size="md-6">
            {this.state.articles.length ? (
              <List>
              <div className="card card-header"><h3>Search Results</h3></div>
                {this.state.articles.map(article => (
                  <ListItem key={article.id}>
                    <a href={article.url} target="blank">
                      <strong>
                        {article.title} by {article.author}
                      </strong>
                    </a>
                    <SaveBtn onClick={() => this.saveArticle(article.id)} />
                  </ListItem>
                ))}
              </List>
            ) : (
              <div className="card card-header"><h3>No Search Results to Display</h3></div>
            )}
          </Col>
          <Col size="md-6">
            {this.state.savedArticles.length ? (
              <List>
              <div className="card card-header"><h3>Saved Articles</h3></div>
                {this.state.savedArticles.map(article => (
                  <ListItem key={article.id}>
                    <a href={article.url} target="blank">
                      <strong>
                        {article.title} by {article.author}
                      </strong>
                    </a>
                    <DeleteBtn onClick={() => this.deleteArticle(article._id)} />
                  </ListItem>
                ))}
              </List>
            ) : (
              <div className="card card-header"><h3>No Saved Articles to Display</h3></div>
            )}
          </Col>
      </Row>
    </Container>
    );
  }
}

export default Articles;
