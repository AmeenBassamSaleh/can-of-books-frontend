
import React, { Component } from 'react';
import { Button, Form } from 'react-bootstrap';

export class BookFormModal extends Component {
  render() {
    return (
      <div>
        <Form onSubmit={(e) => this.props.addBook(e)}>
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Name of the book</Form.Label>
            <Form.Control onChange={(e) => this.props.updateName(e)} type='text' />
          </Form.Group>
          <Form.Group>
            <Form.Label>description of the book</Form.Label>
            <Form.Control onChange={(e) => this.props.updateDescription(e)} type='text' />
          </Form.Group>
          <Form.Group>
            <Form.Label>Status of the book</Form.Label>
            <Form.Control onChange={(e) => this.props.updateStatus(e)} type='text' />
          </Form.Group>
          <Button type="submit" value="add Book" >add book</Button>
        </Form>
      </div>
    );
  }
}

export default BookFormModal;
