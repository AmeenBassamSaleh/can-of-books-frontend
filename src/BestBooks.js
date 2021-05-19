import React from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Jumbotron from 'react-bootstrap/Jumbotron';
import { withAuth0 } from '@auth0/auth0-react';
import './BestBooks.css';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { BookFormModal } from './component/BookFormModal';
import { Button } from 'react-bootstrap';
import UpdateBookForm from './component/UpdateBookForm';

class MyFavoriteBooks extends React.Component {

  constructor(prop) {
    super(prop);
    this.state = {
      book:[],
      name: '',
      description: '',
      status: '',
      showUpdateForm:false,
      index: 0,
    };
  }


  componentDidMount = async () => {
    const { user } = this.props.auth0;
    const myBooks = `${process.env.REACT_APP_HOST}/books?email=${user.email}`;
    const showApiUrlbook = await axios.get(myBooks);

    this.setState({book:showApiUrlbook.data});

  }


  addBook = async (e) => {
    e.preventDefault();

    // TODO: send the request to the backend
    const bodyData = {
      name: this.state.name,
      description: this.state.description,
      status: this.state.status,
      email:this.props.auth0.user.email
    };
    const newBook = await axios.post(`${process.env.REACT_APP_HOST}/books`, bodyData);

    // TODO: get the new data and update it in the state
    this.setState({
      book: newBook.data
    });
  }
  updateName = (e) => this.setState({ name: e.target.value });
  updateDescription = (e) => this.setState({ description: e.target.value });
  updateStatus = (e) => this.setState({status: e.target.value });

  deleteBook = async (index) => {

    const { user } = this.props.auth0;
    const newArrayOfBooks = this.state.book.filter((book, idx) => {
      return idx !== index;
    });


    this.setState({
      book: newArrayOfBooks
    });

    const query = {
      email:user.email
    };

    await axios.delete(`${process.env.REACT_APP_HOST}/books/${index}`, { params:query });

  }

  showUpdateForm = (idx) => {


    const newBookArr = this.state.book.filter((value, index) => {
      return idx === index;
    });
    this.setState({
      index: idx,
      name: newBookArr[0].name,
      description: newBookArr[0].description,
      status: newBookArr[0].status,
      showUpdateForm: true,
    });
  }


  updateBook = async (e) => {
    e.preventDefault();
    const { user } = this.props.auth0;

    const reqBody = {
      email:user.email,
      name: this.state.name,
      description: this.state.description,
      status: this.state.status
    };
    const booksArray = await axios.put(`${process.env.REACT_APP_HOST}/books/${this.state.index}`, reqBody);

    this.setState({
      book: booksArray.data
    });

  }
  render() {


    return (
      <>
        {this.state.book.length > 0 &&
      <Jumbotron>

        <h1>My Favorite Books</h1>
        <p>
          This is a collection of my favorite books
        </p>
        <BookFormModal addBook={this.addBook} updateName={this.updateName} updateDescription={this.updateDescription} updateStatus={this.updateStatus}/>
        <>
          {this.state.showUpdateForm &&
              <UpdateBookForm name={this.state.name}
                description={this.state.description}
                status={this.state.status}
                updateName={this.updateName}
                updateDescription={this.updateDescription}
                updateStatus={this.updateStatus}
                updateBook={this.updateBook}
              />

          }
        </>
        {this.state.book.map((ele,idx)=>{
          return <Card style={{ width: '18rem' }} key={idx}>
            <ListGroup variant="flush">
              <ListGroup.Item as="li" active>book Nam:
                {ele.name}</ListGroup.Item>
              <ListGroup.Item>description: {ele.description}</ListGroup.Item>
              <ListGroup.Item>status: {ele.status}</ListGroup.Item>
            </ListGroup>
            <Button onClick={() =>this.deleteBook (idx)} >remove</Button>
            <Button onClick={() =>this.showUpdateForm (idx)} >update this book</Button>
          </Card>;
        })}


      </Jumbotron>}
      </>);
  }
}

export default withAuth0( MyFavoriteBooks);

