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
              </div>
                <div class="titlebar"></div>     
                <div className="row text-left">
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
                <h3>Demo</h3>
              </div>
                <div className="row">
                  <div className="col-md-3 text-left">
                    <h4>Step 1: Choose a voice</h4>
                    <form>
                        <div class="input-group mb-3">
                          {/*<select id="selectVoice" value={this.state.voiceId} onChange={this.onChangeVoiceId} engine={this.state.engine} onChange={this.onChangeEngine}>*/}
                          <select id="selectVoice" value={this.state.voiceId} onChange={this.onChangeVoiceId}>
                            <option selected>Click to see voice options...</option>
                            <optgroup label="English (US)"></optgroup>
                              <option value="Justin" engine="neural">Justin (Neural TTS)</option>
                              <option value="Justin" engine="standard">Justin</option>
                              <option value="Ivy" engine="standard">Ivy</option>
                              <option value="Joanna" engine="standard">Joanna</option>
                              <option value="Kendra" engine="standard">Kendra</option>
                            <optgroup label="Arabic" engine="standard"></optgroup>
                              <option value="Zeina" engine="standard">Zeina</option>
                            <optgroup label="Chinese, Mandarin" engine="standard"></optgroup>
                              <option value="Zhiyu" engine="standard">Zhiyu</option>
                            <optgroup label="Danish" engine="standard"></optgroup>
                              <option value="Naja" engine="standard">Naja</option>
                              <option value="Mads" engine="standard">Mads</option>
                            <optgroup label="Dutch" engine="standard"></optgroup>
                              <option value="Lotte" engine="standard">Lotte</option>
                              <option value="Ruben" engine="standard">Ruben</option> 
                            <optgroup label="English (Australian)" engine="standard"></optgroup>
                              <option value="Russell" engine="standard">Russell</option>
                              <option value="Nicole" engine="standard">Nicole</option>
                            <optgroup label="English (British)" engine="standard"></optgroup>
                              <option value="Amy" engine="standard">Amy</option>
                              <option value="Emma" engine="standard">Emma</option>  
                              <option value="Brian" engine="standard">Brian</option> 
                            <optgroup label="English (Indian)" engine="standard"></optgroup>
                              <option value="Aditi" engine="standard">Aditi</option>
                              <option value="Raveena" engine="standard">Raveena</option>              
                            <optgroup label="English (Welsh)" engine="standard"></optgroup>
                              <option value="Geraint" engine="standard">Geraint</option>
                            <optgroup label="French" engine="standard"></optgroup>
                              <option value="Celine" engine="standard">Celine</option>
                              <option value="Léa" engine="standard">Léa</option>
                              <option value="Mathieu" engine="standard">Mathieu</option>
                            <optgroup label="French (Canadian)" engine="standard"></optgroup>
                              <option value="Chantal" engine="standard">Chantal</option>
                            <optgroup label="German" engine="standard"></optgroup>
                              <option value="Marlene" engine="standard">Marlene</option>
                              <option value="Vicki" engine="standard">Vicki</option>
                              <option value="Hans" engine="standard">Hans</option>
                            <optgroup label="Hindi" engine="standard"></optgroup>
                              <option value="Aditi" engine="standard">Aditi</option>
                            <optgroup label="Icelandic" engine="standard"></optgroup>
                              <option value="Dora" engine="standard">Dora</option>
                              <option value="Karl" engine="standard">Karl</option>                                                                        
                            <optgroup label="Italian" engine="standard"></optgroup>
                              <option value="Giorgio" engine="standard">Giorgio</option>
                              <option value="Bianca" engine="standard">Bianca</option>
                            <optgroup label="Japanese"></optgroup>
                              <option value="Mizuki" engine="standard">Mizuki</option>
                              <option value="Takumi" engine="standard">Takumi</option>
                            <optgroup label="Korean" engine="standard"></optgroup>
                              <option value="Seoyeon" engine="standard">Seoyeon</option>
                            <optgroup label="Norwegian" engine="standard"></optgroup>
                              <option value="Liv" engine="standard">Liv</option>
                            <optgroup label="Polish"></optgroup>
                              <option value="Ewa" engine="standard">Ewa</option>                              
                              <option value="Maja" engine="standard">Maja</option>
                              <option value="Jacek" engine="standard">Jacek</option>
                              <option value="Jan" engine="standard">Jan</option>
                            <optgroup label="Portugese (Brazilian)" engine="standard"></optgroup>
                              <option value="Vitoria" engine="standard">Vitoria</option>
                              <option value="Ricardo" engine="standard">Ricardo</option>
                            <optgroup label="Portugese (European)" engine="standard"></optgroup>
                              <option value="Ines" engine="standard">Ines</option>
                              <option value="Cristiano" engine="standard">Cristiano</option>
                            <optgroup label="Romanian" engine="standard"></optgroup>
                              <option value="Carmen" engine="standard">Carmen</option>
                            <optgroup label="Russian" engine="standard"></optgroup>
                              <option value="Tatyana" engine="standard">Tatyana</option> 
                              <option value="Maxim" engine="standard">Maxim</option> 
                            <optgroup label="Spanish (European)" engine="standard"></optgroup>
                              <option value="Conchita" engine="standard">Conchita</option>
                              <option value="Lucia" engine="standard">Lucia</option>
                              <option value="Enrique" engine="standard">Enrique</option>                            
                            <optgroup label="Spanish (Mexican)" engine="standard"></optgroup>
                              <option value="Mia" engine="standard">Mia</option>
                            <optgroup label="Spanish (US)" engine="standard"></optgroup>
                              <option value="Penelope" engine="standard">Penelope</option>
                              <option value="Miguel" engine="standard">Miguel</option>
                            <optgroup label="Sweish" engine="standard"></optgroup>
                              <option value="Astrid" engine="standard">Astrid</option>
                            <optgroup label="Turkish" engine="standard"></optgroup>
                              <option value="Filiz" engine="standard">Filiz</option>                             
                            <optgroup label="Welsh" engine="standard"></optgroup>
                              <option value="Gwyneth" engine="standard">Gwyneth</option>
                          </select>
                        </div>
                      </form>
                    </div>
                    <div className="col-md-5 text-left">
                    <h4>Step 2: Write text</h4>
                    <form>
                        <div className="form-group">       
                            <input type="text" className="form-control" value={this.state.text} onChange={this.onChangeText} placeholder="Enter the text you would like Polly to say"/>
                        </div>
                        <button type="button" className="btn btn-info" onClick={this.sendTextToPolly}>Voice My Message Using Polly</button>
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
                  {/*} 
                  Placeholder for live json pane of glass feature
                  <br></br>
                  <div className="row">
                  <h4>API Call:</h4>
                  </div>
                  <div className="row">
                  <pre><code>
                    print 
                      some example
                      json for the API request
                  </code></pre>
                </div>*/}
                </div>
            </div>
          );
        }
      
}

export default Polly;