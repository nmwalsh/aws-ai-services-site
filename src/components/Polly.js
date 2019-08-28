import React, {Component} from 'react';
import ReactAudioPlayer from 'react-audio-player';
var AWS = require('aws-sdk');
AWS.config.region = 'us-east-1'; 
AWS.config.credentials = new AWS.CognitoIdentityCredentials({IdentityPoolId: 'us-east-1:1956382a-b3f6-472c-9a8d-3a246853c917'});



class Polly extends Component {
    constructor(props){
        super(props);
      
        this.state = {
          text: '',
          voiceId: '',
          engine: '',
          resultMessage: '',
          pollyUrl: ''
        }
        this.onChangeText = this.onChangeText.bind(this);
        this.onChangeVoiceId = this.onChangeVoiceId.bind(this);
        this.onChangeEngine = this.onChangeEngine.bind(this);
        this.sendTextToPolly = this.sendTextToPolly.bind(this);
      }
      
      onChangeVoiceId(e){
        this.setState({voiceId: e.target.value});
      }
      
      onChangeEngine(e){
        this.setState({engine: e.target.value});
      }

      onChangeText(e){
      
        this.setState({text: e.target.value});
        
      }
      
      sendTextToPolly = () => {
            // Create synthesizeSpeech params JSON
            var speechParams = {
              OutputFormat: "mp3",
              SampleRate: "16000",
              Text: "",
              TextType: "text",
              Engine: "standard", //standard, neural
              VoiceId: "Justin"
          };
      
          speechParams.Text = this.state.text;
          speechParams.VoiceId = this.state.voiceId;
          //speechParams.Engine = this.state.engine;
          
          //your polly call goes here, this is extra credit!
          // Create the Polly service object and presigner object
          var polly = new AWS.Polly({apiVersion: '2016-06-10'});
          var signer = new AWS.Polly.Presigner(speechParams, polly)
          let currentComponent = this;
          // Create presigned URL of synthesized speech file
          signer.getSynthesizeSpeechUrl(speechParams, (error, url) => {
              if (error) {
                currentComponent.setState({resultMessage: error.message});
      
              } else {
                 //audioSource.src = url;
                currentComponent.setState({pollyUrl: url});
           
                currentComponent.setState({resultMessage: "Speech ready to play"});
             
              }
          });
          
      }

      
      
        render() {
          let result;
          if(this.state.resultMessage !== ''){
            result = <p>{this.state.resultMessage}</p>
          }
          return (
            <div className="App">
               <div className="container">
               <div className="row text-left">
                <h1>Amazon Polly</h1>
                <div class="filledbar"></div>
                <br></br>
                <p>Amazon Polly is a cloud service that converts text into lifelike speech. You can use Amazon Polly to develop applications that increase engagement and accessibility. Amazon Polly supports multiple languages and includes a variety of lifelike voices, so you can build speech-enabled applications that work in multiple locations and use the ideal voice for your customers. With Amazon Polly, you only pay for the text you synthesize. You can also cache and replay Amazon Polly’s generated speech at no additional cost.</p>
                <br></br>
                <p>For a full breakdown of the available voices and their respective locales, <a href="https://docs.aws.amazon.com/polly/latest/dg/voicelist.html" target="_blank" rel="noopener noreferrer">view the docs here</a>.</p>
                <br></br>
                <p>In this example, we're going to show how easy it is to send text to <code>Amazon Polly</code> to synthesize audio.</p>
                <p>
                  API Calls:<br></br>
                  <code>getSynthesizeSpeechUrl</code>: Initialize a audio generation, and return the URL that the resulting file will be returned at.<br></br>
                </p>
              </div>
                <div className="row">
                  <div className="col-md-4 text-left">
                    <h4>Step 1: Choose a voice</h4>
                    <form>
                        <div class="input-group mb-3">
                          <div class="input-group-prepend">
                            <label for="selectVoice">Voices</label>
                          </div>
                          {/*<select id="selectVoice" value={this.state.voiceId} onChange={this.onChangeVoiceId} engine={this.state.engine} onChange={this.onChangeEngine}>*/}
                          <select id="selectVoice" value={this.state.voiceId} onChange={this.onChangeVoiceId}>
                            <option selected>Click to see voice options...</option>
                            <optgroup label="English (US)"></optgroup>
                              <option value="Justin" engine="neural">Justin (Neural TTS)</option>
                              <option value="Justin" engine="standard">Justin</option>
                              <option value="Ivy" engine="standard">Ivy</option>
                              <option value="Joanna" engine="standard">Joanna</option>
                              <option value="Kendra" engine="standard">Kendra</option>
                            <optgroup label="Italian" engine="standard"></optgroup>
                              <option value="Giorgio" engine="standard">Giorgio</option>
                              <option value="Bianca" engine="standard">Bianca</option>
                            <optgroup label="Japanese"></optgroup>
                              <option value="Mizuki" engine="standard">Mizuki</option>
                              <option value="Takumi" engine="standard">Takumi</option>

                          </select>
                        </div>
                      </form>
                    </div>
                    <div className="col-md-4 text-left">
                    <h4>Step 2: Write text</h4>
                    <form>
                        <div className="form-group">
                        
                            <input type="text" className="form-control" value={this.state.text} onChange={this.onChangeText} placeholder="Enter the text you would like Polly to say"/>
                        </div>
                        <button type="button" className="btn btn-success" onClick={this.sendTextToPolly}>Voice My Message Using Polly</button>
                      </form>
                    </div>
                    <div className="col-md-4 text-left">
                    <h4>Step 3: Get Result</h4>
                    <ReactAudioPlayer
                    src={this.state.pollyUrl}
                    autoPlay
                    controls
                  />
                  {result}
                  </div>
                  </div>
                </div>
            </div>
          );
        }
      
}

export default Polly;