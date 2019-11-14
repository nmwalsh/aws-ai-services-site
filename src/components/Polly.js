import React, {Component} from 'react';
import NavBar from '../utilities/navbar';
import Footer from '../utilities/footer';
import ReactAudioPlayer from 'react-audio-player';
import $ from 'jquery';
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
          speechParams.Engine = this.state.engine;
          
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
          
          var $topSelect = $('select[name="voice-choose"]');
          var $nestedSelects = $('select[name!="voice-choose"]');
          $nestedSelects.hide();
          showApplicableSelect();
          $topSelect.change(showApplicableSelect);
          function showApplicableSelect() {
              $nestedSelects.hide();
              $('select[name="' + $topSelect.val() + '"]').show();
          }
          
          return (
            <div className="App">
              <NavBar/>
               <div className="container">
                 <div className="content-wrap">
               <div className="row text-left">
                <h1>Amazon Polly</h1>
              </div>
                <div class="titlebar"></div>     
                <div className="row text-left">
                <p><a href="https://aws.amazon.com/polly/" target="_blank" rel="noopener noreferrer">Amazon Polly</a> is a cloud service that converts text into lifelike speech. You can use Amazon Polly to develop applications that increase engagement and accessibility. Amazon Polly supports multiple languages and includes a variety of lifelike voices, so you can build speech-enabled applications that work in multiple locations and use the ideal voice for your customers. With Amazon Polly, you only pay for the text you synthesize. You can also cache and replay Amazon Polly’s generated speech at no additional cost.</p>
                <br></br>
                <p>For a full breakdown of the available voices and their respective locales, <a href="https://docs.aws.amazon.com/polly/latest/dg/voicelist.html" target="_blank" rel="noopener noreferrer">view the docs here</a>.</p>
                <br></br>
                <p>In this example, we're going to show how easy it is to send text to <code>Amazon Polly</code> to synthesize audio.</p>
                <p>
                  <b>Methods:</b><br></br>
                  <ul><li><code><a href="https://docs.amazonaws.cn/AWSJavaScriptSDK/latest/AWS/Polly/Presigner.html#getSynthesizeSpeechUrl-property" target="_blank" rel="noopener noreferrer">getSynthesizeSpeechUrl()</a></code></li> Send audio data to Polly, and return the URL where the result will be.<br></br></ul>
                </p>
              </div>
                <div className="row">
                  <div className="col-md-3 text-left">
                    <h4>Step 1: Choose a voice</h4>
                    <form>
                        <div id="voiceChoiceDropdowns" class="input-group mb-3">
                          <select name="voice-choose" id="" title="" value={this.state.engine} onChange={this.onChangeEngine}>
                            <option selected>Choose an engine:</option>
                            <option value="neural">Neural</option>
                            <option value="standard">Standard</option>
                          </select>
                          <select name="standard" id="" title="" value={this.state.voiceId} onChange={this.onChangeVoiceId} style={{display:'none'}}>
                            <option selected>Choose a voice:</option>
                            <optgroup label="English (US)"></optgroup>
                              <option value="Ivy" >Ivy</option>
                              <option value="Joanna" >Joanna</option>
                              <option value="Kendra" >Kendra</option>
                              <option value="Kimberly" >Kimberly</option>
                              <option value="Salli" >Salli</option>
                              <option value="Joey" >Joey</option>
                              <option value="Justin" >Justin</option>
                              <option value="Matthew" >Matthew</option>
                            <optgroup label="Arabic" ></optgroup>
                              <option value="Zeina" >Zeina</option>
                            <optgroup label="Chinese, Mandarin" ></optgroup>
                              <option value="Zhiyu" >Zhiyu</option>
                            <optgroup label="Danish" ></optgroup>
                              <option value="Naja" >Naja</option>
                              <option value="Mads" >Mads</option>
                            <optgroup label="Dutch" ></optgroup>
                              <option value="Lotte" >Lotte</option>
                              <option value="Ruben" >Ruben</option> 
                            <optgroup label="English (Australian)" ></optgroup>
                              <option value="Russell" >Russell</option>
                              <option value="Nicole" >Nicole</option>
                            <optgroup label="English (British)" ></optgroup>
                              <option value="Amy" >Amy</option>
                              <option value="Emma" >Emma</option>  
                              <option value="Brian" >Brian</option> 
                            <optgroup label="English (Indian)" ></optgroup>
                              <option value="Aditi" >Aditi</option>
                              <option value="Raveena" >Raveena</option>              
                            <optgroup label="English (Welsh)" ></optgroup>
                              <option value="Geraint" >Geraint</option>
                            <optgroup label="French" ></optgroup>
                              <option value="Celine" >Celine</option>
                              <option value="Léa" >Léa</option>
                              <option value="Mathieu" >Mathieu</option>
                            <optgroup label="French (Canadian)" ></optgroup>
                              <option value="Chantal" >Chantal</option>
                            <optgroup label="German" ></optgroup>
                              <option value="Marlene" >Marlene</option>
                              <option value="Vicki" >Vicki</option>
                              <option value="Hans" >Hans</option>
                            <optgroup label="Hindi" ></optgroup>
                              <option value="Aditi" >Aditi</option>
                            <optgroup label="Icelandic" ></optgroup>
                              <option value="Dora" >Dora</option>
                              <option value="Karl" >Karl</option>                                                                        
                            <optgroup label="Italian" ></optgroup>
                              <option value="Giorgio" >Giorgio</option>
                              <option value="Bianca" >Bianca</option>
                            <optgroup label="Japanese"></optgroup>
                              <option value="Mizuki" >Mizuki</option>
                              <option value="Takumi" >Takumi</option>
                            <optgroup label="Korean" ></optgroup>
                              <option value="Seoyeon" >Seoyeon</option>
                            <optgroup label="Norwegian" ></optgroup>
                              <option value="Liv" >Liv</option>
                            <optgroup label="Polish"></optgroup>
                              <option value="Ewa" >Ewa</option>                              
                              <option value="Maja" >Maja</option>
                              <option value="Jacek" >Jacek</option>
                              <option value="Jan" >Jan</option>
                            <optgroup label="Portugese (Brazilian)" ></optgroup>
                              <option value="Vitoria" >Vitoria</option>
                              <option value="Ricardo" >Ricardo</option>
                            <optgroup label="Portugese (European)" ></optgroup>
                              <option value="Ines" >Ines</option>
                              <option value="Cristiano" >Cristiano</option>
                            <optgroup label="Romanian" ></optgroup>
                              <option value="Carmen" >Carmen</option>
                            <optgroup label="Russian" ></optgroup>
                              <option value="Tatyana" >Tatyana</option> 
                              <option value="Maxim" >Maxim</option> 
                            <optgroup label="Spanish (European)" ></optgroup>
                              <option value="Conchita" >Conchita</option>
                              <option value="Lucia" >Lucia</option>
                              <option value="Enrique" >Enrique</option>                            
                            <optgroup label="Spanish (Mexican)" ></optgroup>
                              <option value="Mia" >Mia</option>
                            <optgroup label="Spanish (US)" ></optgroup>
                              <option value="Lupe" >Lupe</option>
                              <option value="Penelope" >Penelope</option>
                              <option value="Miguel" >Miguel</option>
                            <optgroup label="Sweish" ></optgroup>
                              <option value="Astrid" >Astrid</option>
                            <optgroup label="Turkish" ></optgroup>
                              <option value="Filiz" >Filiz</option>                             
                            <optgroup label="Welsh" ></optgroup>
                              <option value="Gwyneth" >Gwyneth</option>
                          </select>
                          <select name="neural" id="" title="" value={this.state.voiceId} onChange={this.onChangeVoiceId} style={{display:'none'}}>
                          <option selected>Choose a voice:</option>
                          <optgroup label="English (US)" ></optgroup>
                              <option value="Ivy" >Ivy</option>
                              <option value="Joanna" >Joanna</option>
                              <option value="Kendra" >Kendra</option>
                              <option value="Kimberly" >Kimberly</option>
                              <option value="Salli" >Salli</option>
                              <option value="Joey" >Joey</option>
                              <option value="Justin" >Justin</option>
                              <option value="Matthew" >Matthew</option>
                            <optgroup label="English (British)" ></optgroup>
                              <option value="Amy" >Amy</option>
                              <option value="Emma" >Emma</option>  
                              <option value="Brian" >Brian</option> 
                            <optgroup label="Spanish (US)"></optgroup>
                              <option value="Lupe" >Lupe</option>
                            <optgroup label="Portugese (Brazilian)"></optgroup>
                              <option value="Camila" >Camila</option>
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
                <Footer/>
              </div>
            </div>
          );
        };
      
}

export default Polly;