import React, {Component} from 'react'
var AWS = require('aws-sdk');
AWS.config.region = 'us-east-1'; 
AWS.config.credentials = new AWS.CognitoIdentityCredentials({IdentityPoolId: 'us-east-1:1956382a-b3f6-472c-9a8d-3a246853c917'});

class Comprehend extends Component {
    constructor(props){
        super(props);
//resultEntities,resultEntitiesMessage, resultSyntax, resultSyntaxMessage, resultKeyPhrases, resultKeyPhrasesMessage
        this.state = {
            text: '',
            resultSentimentMessage: '',
            resultSentiment: '',
            resultSentimentScore: '',
            resultEntities: '',
            resultEntitiesMessage: '',
            resultSyntax: [],
            resultSyntaxMessage: '',
            resultKeyPhrases: [],
            resultKeyPhrasesMessage: [],
        }
        this.onChangeText = this.onChangeText.bind(this);
        this.sendTextToComprehend = this.sendTextToComprehend.bind(this);
    }

    onChangeText(e){
        this.setState({text: e.target.value});
    }

    sendTextToComprehend = () => {
        // API call params
        var comprehendParams = {
            LanguageCode: "en",
            Text: ""
        };
        comprehendParams.Text = this.state.text;
        
        // instantiate comprehend client
        var comprehend = new AWS.Comprehend({apiVersion: '2017-11-27'});
        let currentComponent = this;

        // call detectSentiment endpoint
        if (!!comprehendParams.Text){ 
        comprehend.detectSentiment(comprehendParams, function (err, data){
            if (err) {
                currentComponent.setState({resultSentimentMessage: err.message});
                currentComponent.setState({resultSentiment: ""});
                currentComponent.setState({resultSentimentScore: ""});
            }
            else {
                currentComponent.setState({resultSentimentMessage: ">>> Sentiment analyzed!"});
                currentComponent.setState({resultSentiment: data.Sentiment});
                currentComponent.setState({resultSentimentScore: JSON.stringify(data.SentimentScore)});
                /*
                for (var key in data.SentimentScore)
                {
                this.state.resultSentimentScore.push(data.SentimentScore[key]);
                }*/
            }
        });
        
        // Entities[i] .text, .type, .score
        comprehend.detectEntities(comprehendParams, function (err, data){
          if (err) {
              currentComponent.setState({resultEntitiesMessage: err.message});
              currentComponent.setState({resultEntities: ""})
          }
          else {
              currentComponent.setState({resultEntitiesMessage: ">>> Entities analyzed!"})
              currentComponent.setState({resultEntities: JSON.stringify(data.Entities)});
              //currentComponent.setState({resultEntitiesScores: JSON.stringify(data.SentimentScore)});
          }
        });
          
          comprehend.detectSyntax(comprehendParams, function (err, data){
            if (err) {
                currentComponent.setState({resultSyntaxMessage: err.message});
                currentComponent.setState({resultSyntax: ""})
            }
            else {
                currentComponent.setState({resultSyntaxMessage: ">>> Syntax analyzed!"})
                currentComponent.setState({resultSyntax: JSON.stringify(data.SyntaxTokens)});
            }
          });

          //KeyPhrases[n] .Text, .Score
          comprehend.detectKeyPhrases(comprehendParams, function (err, data){
          if (err) {
              currentComponent.setState({resultKeyPhrasesMessage: err.message});
              currentComponent.setState({resultKeyPhrases: ""})
          }
          else {
              currentComponent.setState({resultKeyPhrasesMessage: ">>> KeyPhrases analyzed!"})
              currentComponent.setState({resultKeyPhrases: JSON.stringify(data.KeyPhrases)});
          }
          
           // end API loop
          });
    }
  }


    render() {
        let sentimentStatus, sentiment, sentimentScore, entities, entitiesStatus, syntax, syntaxStatus, keyPhrases, keyPhrasesStatus;
        if(this.state.resultMessage !== ''){
          sentimentStatus = <p>{this.state.resultSentimentMessage}</p>
          sentiment = <code>{this.state.resultSentiment}</code> 
          sentimentScore = <code>{this.state.resultSentimentScore}</code>

          entitiesStatus = <p>{this.state.resultEntitiesMessage}</p>
          entities = <code>{this.state.resultEntities}</code> 

          syntaxStatus = <p>{this.state.resultSyntaxMessage}</p> 
          syntax = <code>{this.state.resultSyntax}</code>

          keyPhrasesStatus = <p>{this.state.resultKeyPhrasesMessage}</p> 
          keyPhrases = <code>{this.state.resultKeyPhrases}</code>
        }
        return (
          <div className="App">
             <div className="container">
              <div className="row text-left">
                <h1>Amazon Comprehend</h1>
                </div>
                <div class="titlebar"></div> 
                <div className="row text-left">
                <p>Amazon Comprehend uses natural language processing (NLP) to extract insights about the content of documents. Amazon Comprehend processes any text file in UTF-8 format. It develops insights by recognizing the entities, key phrases, language, sentiments, and other common elements in a document. Use Amazon Comprehend to create new products based on understanding the structure of documents. For example, using Amazon Comprehend you can search social networking feeds for mentions of products or scan an entire document repository for key phrases.</p>
                <br></br>
                <p>In this example, we're going to show how easy it is to send text to <code>Amazon Comprehend</code> to understand text sentiment or identify key phrases.</p>
                <p>
                  API Calls:<br></br>
                  <code>sendTextToComprehend</code>: Send text to Comprehend, returning all relevant results in the response body.<br></br>
                </p>
              </div>
              <div className="row">
                <div className="col-md-6 text-left">
                  <h4>Step 1: Insert Text</h4>
                  <form>
                      <div className="form-group">
                          <textarea class="form-control" rows="5" value={this.state.text} onChange={this.onChangeText} placeholder="Enter the text for Comprehend to analyze!"/>
                      </div>
                      <button type="button" className="btn btn-info" onClick={this.sendTextToComprehend}>Analyze text with Comprehend</button>
                    </form>
                  </div>
                  <div className="col-md-6 text-left">
                    <h4>Results: </h4>
                {sentimentStatus}
                {sentiment}<br></br>
                {sentimentScore}<br></br>
                {entitiesStatus}
                {entities}<br></br>
                {keyPhrasesStatus}
                {keyPhrases}<br></br>
                {syntaxStatus}
                {syntax}
                </div>
                </div>
              </div>
          </div>
        );
      }
}
export default Comprehend;