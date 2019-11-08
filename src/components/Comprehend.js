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
            }
            document.getElementById("chck1").checked = true;
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
          document.getElementById("chck2").checked = true;
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
            document.getElementById("chck3").checked = true;
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
          document.getElementById("chck4").checked = true;
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
              <div className="content-wrap">
              <div className="row text-left">
                <h1>Amazon Comprehend</h1>
                </div>
                <div class="titlebar"></div> 
                <div className="row text-left">
                <p>Amazon Comprehend uses natural language processing (NLP) to extract insights about the content of documents. Amazon Comprehend processes any text file in UTF-8 format. It develops insights by recognizing the entities, key phrases, language, sentiments, and other common elements in a document. Use Amazon Comprehend to create new products based on understanding the structure of documents. For example, using Amazon Comprehend you can search social networking feeds for mentions of products or scan an entire document repository for key phrases.</p>
                <p>In this example, we're going to show how easy it is to send text to <code>Amazon Comprehend</code> to understand text sentiment, identify entities and key phrases, and assess syntax tokens.</p>
                <p>
                  <b>Methods:</b>
                    <br></br>
                  <code>sendTextToComprehend()</code>: Send text to Comprehend, returning all relevant results in the response body.<br></br>
                    <li><code><a href="https://docs.aws.amazon.com/comprehend/latest/dg/get-started-api-sentiment.html" target="_blank" rel="noopener noreferrer">detectSentiment()</a></code></li>
                    <li><code><a href="https://docs.aws.amazon.com/comprehend/latest/dg/get-started-api-entities.html" target="_blank" rel="noopener noreferrer">detectEntities()</a></code></li>
                    <li><code><a href="https://docs.aws.amazon.com/comprehend/latest/dg/get-started-api-key-phrases.html" target="_blank" rel="noopener noreferrer">detectKeyPhrases()</a></code></li>
                    <li><code><a href="https://docs.aws.amazon.com/comprehend/latest/dg/get-started-api-syntax.html" target="_blank" rel="noopener noreferrer">detectSyntax()</a></code></li>
                </p>
              </div>
              <div className="row">
                <div className="col-md-5 text-left">
                  <h4>Step 1: Insert Text</h4>
                  <form>
                      <div className="form-group">
                          <textarea class="form-control" rows="5" value={this.state.text} onChange={this.onChangeText} placeholder="Enter the text for Comprehend to analyze!"/>
                      </div>
                      <button type="button" className="btn btn-info" onClick={this.sendTextToComprehend}>Analyze text with Comprehend</button>
                    </form>
                  </div>
                  <div className="col-md-7 text-left">
                    <h4>Results: </h4>
                  {/* test start */}
                  <div class="row">
                    <div class="col">
                      <div class="tabs">
                        <div class="tab">
                          <input hidden type="checkbox" id="chck1"/>
                          <label class="tab-label" htmlFor="chck1">Sentiment</label>
                          <div class="tab-content">
                            {sentiment}<br></br>
                            {sentimentScore}
                          </div>
                        </div>
                        <div class="tab">
                          <input hidden type="checkbox" id="chck2"/>
                          <label class="tab-label" htmlFor="chck2">Entities</label>
                          <div class="tab-content">
                            {entities}
                          </div>
                        </div>
                        <div class="tab">
                          <input hidden type="checkbox" id="chck3"/>
                          <label class="tab-label" htmlFor="chck3">Key Phrases</label>
                          <div class="tab-content">
                            {keyPhrases}
                          </div>
                        </div>
                        <div class="tab">
                          <input hidden type="checkbox" id="chck4"/>
                          <label class="tab-label" htmlFor="chck4">Syntax Tokens</label>
                          <div class="tab-content">
                            {syntax}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                </div>
              </div> 
              <div className="row">
              <div className="footer-demo text-center">
                        <style>position:relative;</style>
                        <p>&copy; {new Date().getFullYear()} Amazon Web Services, Inc. or its affiliates. All rights reserved. <br></br> Made with ♥ by <a href="https://twitter.com/thenickwalsh" target="_blank" rel="noopener noreferrer">Nick Walsh</a></p>
              </div>
              </div>
              </div> 
          </div> // app end
        );
      }
}
export default Comprehend;