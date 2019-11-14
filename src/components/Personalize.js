import React, {Component} from 'react';
var AWS = require('aws-sdk');
AWS.config.region = 'us-east-1'; 
AWS.config.credentials = new AWS.CognitoIdentityCredentials({IdentityPoolId: 'us-east-1:1956382a-b3f6-472c-9a8d-3a246853c917'});


class Personalize extends Component {
    constructor(props){
        super(props);
      
        this.state = {
          text: '',
          resultMessage: '',
          pollyUrl: ''
        }
        this.onChangeText = this.onChangeText.bind(this);
        this.sendTextToPolly = this.sendTextToPolly.bind(this);
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
              VoiceId: "Brian"
          };
      
          speechParams.Text = this.state.text;
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
          /*
          return (
            <div className="App">
               <div className="container">
                <h1>Amazon Personalize</h1>
                <div className="row">
                  <div className="col-md-6">
                    <form>
                        <div className="form-group">
                        
                            <input type="text" className="form-control" value={this.state.text} onChange={this.onChangeText} placeholder="Enter the text you would like Polly to say"/>
                        </div>
                        <button type="button" className="btn btn-success" onClick={this.sendTextToPolly}>Voice My Message Using Polly</button>
                      </form>
                    </div>
                    <div className="col-md-6">
                     
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
            */
           return (
            <div className="App">
                <div className="container">
                    <h1>Amazon Personalize</h1>
                    <br></br>
                    <br></br>
                    <h5>Demo TBD</h5>
                </div>
            </div>
          );
        }
      
}

export default Personalize;