import React, { Component } from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom'
import Polly from './components/Polly';
import Transcribe from './components/Transcribe';
import Main from './components/Main';
import Comprehend from './components/Comprehend';
import Rekognition from './components/Rekognition';
import Translate from './components/Translate';
import Textract from './components/Textract';

class App extends Component {

  render() {
    return (<Switch>
      <Route exact path='/' component={Main} />
      <Route path='/polly' component={Polly}/>
      <Route path='/transcribe' component={Transcribe}/>
      <Route path='/comprehend' component={Comprehend}/>
      <Route path='/rekognition' component={Rekognition} />
      <Route path='/translate' component={Translate} />
      <Route path='/textract' component={Textract} />
    </Switch>
    )
  }
}

export default App;
