import React from 'react';
import ReactDOM from 'react-dom';
import { Auth0Provider } from '@auth0/auth0-react';
import App from './App';
ReactDOM.render(
  <Auth0Provider
  domain="dev-ngutpckr.eu.auth0.com"
  clientId="lawF8haKxm0gvoonIGlU3Hf0dUBBto0n"
    redirectUri={window.location.origin}
>
  <App />
</Auth0Provider>,
document.getElementById('root')
);