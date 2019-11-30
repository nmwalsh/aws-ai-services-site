import React, {Component} from 'react'
import NavBar from '../utilities/navbar';
import Footer from '../utilities/footer';
var AWS = require('aws-sdk');
AWS.config.region = 'us-east-1'; 
AWS.config.credentials = new AWS.CognitoIdentityCredentials({IdentityPoolId: 'us-east-1:1956382a-b3f6-472c-9a8d-3a246853c917'});


class Translate extends Component {
    constructor(props){
        super(props);

        this.state = {
            text: '',
            resultMessage: '',
            sourceLang: 'auto',
            targetLang: 'es',
            resultTranslation: '' 
        }
        this.onChangeText = this.onChangeText.bind(this);
        this.onChangeSourceLanguage = this.onChangeSourceLanguage.bind(this);
        this.onChangeTargetLanguage = this.onChangeTargetLanguage.bind(this);
        this.sendTextToTranslate = this.sendTextToTranslate.bind(this);

    }

    onChangeText(e){
        this.setState({text: e.target.value});
    }

    onChangeSourceLanguage(e){
        this.setState({sourceLang: e.target.value});
    }

    onChangeTargetLanguage(e){
        this.setState({targetLang: e.target.value});
    }

    sendTextToTranslate = () => {
        // API call params
        // full list of language codes available here: https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/Translate.html#translateText-property
        var TranslateParams = {
            SourceLanguageCode: "",
            TargetLanguageCode: "",
            Text: ""
        };
        TranslateParams.Text = this.state.text;
        TranslateParams.SourceLanguageCode = this.state.sourceLang;
        TranslateParams.TargetLanguageCode = this.state.targetLang;

        // instantiate Translate client
        var Translate = new AWS.Translate({apiVersion: '2017-07-01'});
        let currentComponent = this;

        // call translateText method
        if (!!TranslateParams.Text) {
          Translate.translateText(TranslateParams, function (err, data){
            if (err) {
                currentComponent.setState({resultMessage: err.message});
                currentComponent.setState({resultTranslation: 'No translation occurred - check the error!'})
            }
            else {
                currentComponent.setState({resultTranslation: data.TranslatedText});
                currentComponent.setState({resultMessage: "Text translation successful!"})
            }
            document.getElementById("chck1").checked = true;
        });
      };

    }


    render() {
        let result, translation;
        if(this.state.resultMessage !== ''){
          result = <code>{this.state.resultMessage}</code>
          translation = <code>{this.state.resultTranslation}</code>
        }
        return (
          <div className="App">
             <NavBar/>
             <div className="container">
               <div className="content-wrap">
             <div className="row text-left">
            <h1>Amazon Translate</h1>
          </div>
            <div class="titlebar"></div> 
            <div className="row text-left">
            <p>Amazon Translate is a neural machine translation service that delivers fast, high-quality, and affordable language translation. Neural machine translation is a form of language translation automation that uses deep learning models to deliver more accurate and more natural sounding translation than traditional statistical and rule-based translation algorithms. Amazon Translate allows you to localize content - such as websites and applications - for international users, and to easily translate large volumes of text efficiently.</p>
            <br></br>
            <p>In this example, we're going to show how easy it is to translate text from one language to another using <code>Amazon Translate</code>.</p>
            <p>
              Methods:<br></br>
              <ul><li><a href="https://docs.aws.amazon.com/translate/latest/dg/API_TranslateText.html" target="_blank" rel="noopener noreferrer"><code>translateText()</code></a>: Initialize a translation from sample text for a given target language</li></ul>
            </p>
          </div>
              <div className="row">
                <div className="col-md-4">
                  <h4>Step 1: Enter Text</h4>
                  <form>
                      <div className="form-group">
                          <input type="text" className="form-control" value={this.state.text} onChange={this.onChangeText} placeholder="Enter the text for Translate to analyze!"/>
                      </div>
                    </form>
                  </div>
                  <div className="col-md-4">
                    <h4>Step 2: Choose Languages</h4>
                    <form>
                    <div className="input-group mb-3">
                      <div class="input-group-prepend"><div class="input-group-text">Input</div></div>
                          <select id="selectSourceVoice" className="custom-select" value={this.state.sourceLang} onChange={this.onChangeSourceLanguage}>
                            <option selected value="auto">Autodetect (Powered by Amazon Comprehend)</option>
                            <option value="af">Afrikaans</option>
                            <option value="sq">Albanian</option>
                            <option value="am">Amharic</option>
                            <option value="ar">Arabic</option>
                            <option value="az">Azerbaijani</option>
                            <option value="bn">Bengali</option>
                            <option value="bs">Bosnian</option>
                            <option value="bg">Bulgarian</option>
                            <option value="zh">Chinese (Simplified)</option>
                            <option value="zh-TW">Chinese (Traditional)</option>
                            <option value="hr">Croatian</option>
                            <option value="cs">Czech</option>
                            <option value="da">Danish</option>
                            <option value="fa-AF">Dari</option>
                            <option value="nl">Dutch</option>
                            <option value="en">English</option>
                            <option value="et">Estonian</option>
                            <option value="fi">Finnish</option>
                            <option value="fr">French</option>
                            <option value="fr-CA">French (Canadian)</option>
                            <option value="ka">Georgian</option>
                            <option value="de">German</option>
                            <option value="el">Greek</option>
                            <option value="ha">Hausa</option>
                            <option value="he">Hebrew</option>
                            <option value="hi">Hindi</option>
                            <option value="hu">Hungarian</option>
                            <option value="id">Indonesian</option>
                            <option value="it">Italian</option>
                            <option value="ja">Japanese</option>
                            <option value="ko">Korean</option>
                            <option value="lv">Latvian</option>
                            <option value="ms">Malay</option>
                            <option value="no">Norwegian</option>
                            <option value="fa">Persian</option>
                            <option value="ps">Pashto</option>
                            <option value="pl">Polish</option>
                            <option value="pt">Portugese</option>
                            <option value="ro">Romanian</option>
                            <option value="ru">Russian</option>
                            <option value="sr">Serbian</option>
                            <option value="sk">Slovak</option>
                            <option value="sl">Slovenian</option>
                            <option value="so">Somali</option>
                            <option value="es">Spanish</option>
                            <option value="sw">Swahili</option>
                            <option value="sv">Swedish</option>
                            <option value="tl">Tagalog</option>
                            <option value="ta">Tamil</option>
                            <option value="th">Thai</option>
                            <option value="tr">Turkish</option>
                            <option value="uk">Ukranian</option>
                            <option value="ur">Urdu</option>
                            <option value="vi">Vietnamese</option>
                          </select>
                        </div>
                    </form>
                    <form>
                    <div className="input-group mb-3">
                      <div class="input-group-prepend"><div class="input-group-text">Output</div></div>
                          <select id="selectTargetVoice" className="custom-select" value={this.state.targetLang} onChange={this.onChangeTargetLanguage}>                       
                            <option value="af">Afrikaans</option>
                            <option value="sq">Albanian</option>
                            <option value="am">Amharic</option>
                            <option value="ar">Arabic</option>
                            <option value="az">Azerbaijani</option>
                            <option value="bn">Bengali</option>
                            <option value="bs">Bosnian</option>
                            <option value="bg">Bulgarian</option>
                            <option value="zh">Chinese (Simplified)</option>
                            <option value="zh-TW">Chinese (Traditional)</option>
                            <option value="hr">Croatian</option>
                            <option value="cs">Czech</option>
                            <option value="da">Danish</option>
                            <option value="fa-AF">Dari</option>
                            <option value="nl">Dutch</option>
                            <option value="en">English</option>
                            <option value="et">Estonian</option>
                            <option value="fi">Finnish</option>
                            <option value="fr">French</option>
                            <option value="fr-CA">French (Canadian)</option>
                            <option value="ka">Georgian</option>
                            <option value="de">German</option>
                            <option value="el">Greek</option>
                            <option value="ha">Hausa</option>
                            <option value="he">Hebrew</option>
                            <option value="hi">Hindi</option>
                            <option value="hu">Hungarian</option>
                            <option value="id">Indonesian</option>
                            <option value="it">Italian</option>
                            <option value="ja">Japanese</option>
                            <option value="ko">Korean</option>
                            <option value="lv">Latvian</option>
                            <option value="ms">Malay</option>
                            <option value="no">Norwegian</option>
                            <option value="fa">Persian</option>
                            <option value="ps">Pashto</option>
                            <option value="pl">Polish</option>
                            <option value="pt">Portugese</option>
                            <option value="ro">Romanian</option>
                            <option value="ru">Russian</option>
                            <option value="sr">Serbian</option>
                            <option value="sk">Slovak</option>
                            <option value="sl">Slovenian</option>
                            <option value="so">Somali</option>
                            <option selected value="es">Spanish</option>
                            <option value="sw">Swahili</option>
                            <option value="sv">Swedish</option>
                            <option value="tl">Tagalog</option>
                            <option value="ta">Tamil</option>
                            <option value="th">Thai</option>
                            <option value="tr">Turkish</option>
                            <option value="uk">Ukranian</option>
                            <option value="ur">Urdu</option>
                            <option value="vi">Vietnamese</option>
                          </select>
                        </div>
                    </form>
                    <button type="button" className="btn btn-info" onClick={this.sendTextToTranslate}>Translate text with Translate!</button>
                  </div>
                  <div className="col-md-4">
                    <h4>Result:</h4>
                    <div class ="tabs">
                    <div class="tab">
                          <input hidden type="checkbox" id="chck1"/>
                          <label class="tab-label" htmlFor="chck1">Translation</label>
                          <div class="tab-content">
                            {result}<br></br>
                            {translation}
                          </div>
                        </div>
                      </div>
                </div>
              </div>
            </div>
            <Footer/>
          </div>
          </div>
        );
      }
}
export default Translate;