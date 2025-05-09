import React from 'react';
import ReactDOM from 'react-dom';
import Banner from './banner';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Banner>Test Content</Banner>, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('displays the correct banner text', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Banner>Test Content</Banner>, div);
  const bannerText = div.querySelector('.defunct-banner').textContent;
  expect(bannerText).toBe('This demo site is no longer operational. To try out the latest capabilities, please visit the respective service demo within the AWS Console.');
  ReactDOM.unmountComponentAtNode(div);
});

it('renders children correctly', () => {
  const div = document.createElement('div');
  const testContent = 'Test Child Content';
  ReactDOM.render(<Banner>{testContent}</Banner>, div);
  expect(div.textContent).toContain(testContent);
  ReactDOM.unmountComponentAtNode(div);
});