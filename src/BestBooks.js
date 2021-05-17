import React from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Jumbotron from 'react-bootstrap/Jumbotron';
import { withAuth0 } from '@auth0/auth0-react';
import './BestBooks.css';

class MyFavoriteBooks extends React.Component {

  constructor(prop) {
    super(prop);
    this.state = {
      email: '',
      user : this.props.auth0
    }
  }
  // book = async (e)=> {
  //   e.preventDefault();


  // }
  // const axiosBooks = 
 
  componentDidMount = async () => {
    const myBooks = `${process.env.REACT_APP_HOST}/books?email=${this.state.email}`
    const showApiUrlbook = await axios.get(myBooks);
    console.log(showApiUrlbook.data);
    this.setState({email: this.state.user.email}) ;
  }

  render() {
    

    return (
      <Jumbotron>
        <h1>My Favorite Books</h1>
        <p>
          This is a collection of my favorite books
        </p>
        <p>
          {this.state.email}
        </p>
        
      </Jumbotron>
    )
  }
}

export default withAuth0( MyFavoriteBooks);

