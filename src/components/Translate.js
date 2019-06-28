import React, {Component} from 'react'
var AWS = require('aws-sdk');
AWS.config.region = 'us-east-1'; 
AWS.config.credentials = new AWS.CognitoIdentityCredentials({IdentityPoolId: 'us-east-1:1956382a-b3f6-472c-9a8d-3a246853c917'});


class Translate extends Component {
    constructor(props){
        super(props);

        this.state = {
            text: '',
            resultMessage: '',
            resultTranslation: '' // constituent values are mixed, positive, neutral, and negative
        }
        this.onChangeText = this.onChangeText.bind(this);
        this.sendTextToTranslate = this.sendTextToTranslate.bind(this);
    }

    onChangeText(e){
        this.setState({text: e.target.value});
    }

    sendTextToTranslate = () => {
        // API call params
        // full list of language codes available here: https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/Translate.html#translateText-property
        var TranslateParams = {
            SourceLanguageCode: 'en',
            TargetLanguageCode: 'es',
            Text: ""
        };
        TranslateParams.Text = this.state.text;
        
        // instantiate Translate client
        var Translate = new AWS.Translate({apiVersion: '2017-07-01'});
        let currentComponent = this;

        // call translateText method
        Translate.translateText(TranslateParams, function (err, data){
            if (err) {
                currentComponent.setState({resultMessage: err.message});
            }
            else {
                currentComponent.setState({resultTranslation: data.TranslatedText});
                currentComponent.setState({resultMessage: "Text translation successful!"})
            }
        });

    }


    render() {
        let result, translation;
        if(this.state.resultMessage !== ''){
          result = <p>{this.state.resultMessage}</p>
          translation = <p>{this.state.resultTranslation}</p>
        }
        return (
          <div className="App">
             <div className="container">
              <h1>Amazon Translate</h1>
              <div className="row">
                <div className="col-md-6">
                  <form>
                      <div className="form-group">
                          <input type="text" className="form-control" value={this.state.text} onChange={this.onChangeText} placeholder="Enter the text for Translate to analyze!"/>
                      </div>
                      <button type="button" className="btn btn-success" onClick={this.sendTextToTranslate}>Translate text with Translate!</button>
                    </form>
                  </div>
                  <div className="col-md-6">
                {result}
                {translation}
                </div>
                </div>
              </div>
          </div>
        );
      }
}
export default Translate;