import React, { Component } from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom'
import Polly from './components/Polly';
import Transcribe from './components/Transcribe';
import Main from './components/Main';
import Comprehend from './components/Comprehend';
import Rekognition from './components/Rekognition';
import Translate from './components/Translate';
import Forecast from './components/Forecast';
import Textract from './components/Textract';
import Personalize from './components/Personalize';
import Lex from './components/Lex';

class App extends Component {

  render() {
    return (<Switch>
      <Route exact path='/' component={Main} />
      <Route path='/polly' component={Polly}/>
      <Route path='/transcribe' component={Transcribe}/>
      <Route path='/comprehend' component={Comprehend}/>
      <Route path='/rekognition' component={Rekognition} />
      <Route path='/translate' component={Translate} />
      <Route path='/forecast' component={Forecast} />
      <Route path='/textract' component={Textract} />
      <Route path='/personalize' component={Personalize} />
      <Route path='/lex' component={Lex} />
    </Switch>
    )
  }
}

export default App;
