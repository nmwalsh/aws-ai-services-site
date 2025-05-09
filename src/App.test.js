import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Main from './components/Main';
import { BrowserRouter as Router } from 'react-router-dom';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('renders the defunct banner on Main component', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <Router>
      <Main />
    </Router>, 
    div
  );
  
  // Check if the banner exists
  const bannerElement = div.querySelector('.defunct-banner');
  expect(bannerElement).not.toBeNull();
  
  // Check if the banner has the correct text
  expect(bannerElement.textContent).toBe(
    "This demo site is no longer operational. To try out the latest capabilities, please visit the respective service demo within the AWS Console."
  );
  
  ReactDOM.unmountComponentAtNode(div);
});
