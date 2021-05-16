import React, { Component } from 'react';
import { withAuth0 } from '@auth0/auth0-react';
class Profile extends Component {
render() {
const { user } = this.props.auth0;
return<> <h1>Hello {user.name}</h1>
<img src={user.picture} alt={user.name} />
<h2>Email: {user.email}</h2>
</>;
}
}
export default withAuth0(Profile);
