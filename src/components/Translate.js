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
             <div className="row text-left">
            <h1>Amazon Translate</h1>
            <div class="filledbar"></div>
            <br></br>
            <p>Amazon Transcribe uses advanced machine learning technologies to recognize speech in audio files and transcribe them into text. You can use Amazon Transcribe to convert audio to text and to create applications that incorporate the content of audio files. For example, you can transcribe the audio track from a video recording to create closed captioning for the video.</p>
            <br></br>
            <p>In this example, we're going to show how easy it is to translate text to a target language of choice using <code>Amazon Translate</code>.</p>
            <p>
              API Calls:<br></br>
              <code>startTranslation</code>: Initialize a transcription from a source audio file<br></br>
            </p>
          </div>
              <div className="row">
                <div className="col-md-4">
                  <h4>Step 1: Enter Text</h4>
                  <form>
                      <div className="form-group">
                          <input type="text" className="form-control" value={this.state.text} onChange={this.onChangeText} placeholder="Enter the text for Translate to analyze!"/>
                      </div>
                      <button type="button" className="btn btn-success" onClick={this.sendTextToTranslate}>Translate text with Translate!</button>
                    </form>
                  </div>
                  <div className="col-md-4">
                    <h4>Step 2: Choose Language</h4>
                    <form>
                    <div class="input-group mb-3">
                          <div class="input-group-prepend">
                            <label class="input-group-text" for="inputGroupSelect01" value={this.state.text} onChange={this.onChangeText}></label>
                          </div>
                          <select class="custom-select" id="inputGroupSelect01">
                            <option selected>Target language options</option>
                            <option value="Spanish">Spanish</option>
                            <option value="Italian">Italian</option>
                            <option value="German">German</option>
                          </select>
                        </div>
                    </form>
                  </div>
                  <div className="col-md-4">
                    <h4>Result:</h4>
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