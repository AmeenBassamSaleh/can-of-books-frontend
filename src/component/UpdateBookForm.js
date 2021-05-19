
import React, { Component } from 'react';
import { Button, Form } from 'react-bootstrap';

export class UpdateBookForm extends Component {
  render() {
    return (
      <div>
        <Form onSubmit={(e) => this.props.updateBook(e)}>
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Name of the book</Form.Label>
            <Form.Control onChange={(e) => this.props.updateName(e)} type='text' value={this.props.name} />
          </Form.Group>
          <Form.Group>
            <Form.Label>description of the book</Form.Label>
            <Form.Control onChange={(e) => this.props.updateDescription(e)} type='text' value={this.props.description} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Status of the book</Form.Label>
            <Form.Control onChange={(e) => this.props.updateStatus(e)} type='text' value={this.props.status} />
          </Form.Group>
          <Button type="submit" value="Update book" >Update book</Button>
        </Form>
      </div>
    );
  }
}

export default UpdateBookForm;
