import React, {Component} from 'react';
import NavBar from '../utilities/navbar';
import Footer from '../utilities/footer';

var AWS = require('aws-sdk');
AWS.config.region = 'us-east-1'; 
AWS.config.credentials = new AWS.CognitoIdentityCredentials({IdentityPoolId: 'us-east-1:1956382a-b3f6-472c-9a8d-3a246853c917'});

class ComprehendMedical extends Component {
  constructor(props){
    super(props);
    this.state = {
        text: '',
        resultEntities: '',
        resultEntitiesMessage: '',
        resultDetectPhiEntitiesMessage: '',
        resultDetectPhiEntities: [],
    }
    this.onChangeText = this.onChangeText.bind(this);
    this.sendTextToComprehendMedical = this.sendTextToComprehendMedical.bind(this);
  }

  onChangeText(e){
    this.setState({text: e.target.value});
  }

  sendTextToComprehendMedical = () => {
    var comprehendMedicalParams = {
      Text: ""
    };
    comprehendMedicalParams.Text = this.state.text;
    
    // Initialize Comprehend Medical client
    var comprehendMedical = new AWS.ComprehendMedical({apiVersion: '2018-10-30'});
    let currentComponent = this;
    
    // Detect Entities
    comprehendMedical.detectEntities(comprehendMedicalParams, function (err, data){
      if (err) {
        currentComponent.setState({resultEntitiesMessage: err.message});
        currentComponent.setState({resultEntities: ""})
        console.log(err)
      }
      else {
        currentComponent.setState({resultEntitiesMessage: ">>> Entities analyzed!"})
        currentComponent.setState({resultEntities: JSON.stringify(data.Entities)});
      }
      document.getElementById("chck1").checked = true;
    });

    // Detect PHI entities
    comprehendMedical.detectPHI(comprehendMedicalParams, function (err, data){
      if (err) {
        currentComponent.setState({resultDetectPhiEntitiesMessage: err.message});
        currentComponent.setState({resultDetectPhiEntities: ""});
      }
      else {
        currentComponent.setState({resultDetectPhiEntitiesMessage: ">>> Detect PHI operation complete!"});
        currentComponent.setState({resultDetectPhiEntities: JSON.stringify(data.Entities)});
      }
      document.getElementById("chck2").checked = true;
    });
  }

  render() {
    let entities, phiEntities, entitiesStatus, phiEntitiesStatus;
    if(this.state.resultEntitiesMessage !== '' && this.state.resultDetectPhiEntitiesMessage != '') {
      entities = <code>{this.state.resultEntities}</code>
      phiEntities = <code>{this.state.resultDetectPhiEntities}</code>
      entitiesStatus = <code>{this.state.resultEntitiesMessage}</code>
      phiEntitiesStatus = <code>{this.state.resultDetectPhiEntitiesMessage}</code>
    }
    return (
      <div className="App">
        <NavBar/>
        <div className="container">
        <div className="content-wrap">
        <div className="row text-left">
          <h1>Amazon Comprehend Medical</h1>
        </div>
        <div class="titlebar"></div> 
          <div className="row text-left">
            <p><a href="https://aws.amazon.com/comprehend/medical/" target="_blank" rel="noopener noreferrer">Amazon Comprehend Medical</a> detects and returns useful information in unstructured clinical text such as physician's notes, discharge summaries, test results, and case notes. Amazon Comprehend Medical uses natural language processing (NLP) models to detect entities, which are textual references to medical information such as medical conditions, medications, or Protected Health Information (PHI).</p>
            <p>In this example, we're going to show how easy it is to send text to <code>Amazon Comprehend Medical</code> to understand and extract health data from medical text, such as prescriptions, procedures, or diagnoses.</p>
            <p>
              <b>Methods:</b>
              <br></br>
              <code>sendTextToComprehendMedical()</code>: Send text to Comprehend Medical, returning all relevant results in the response body.<br></br>
                <li><code><a href="https://docs.aws.amazon.com/comprehend-medical/latest/dev/textanalysis-entities.html" target="_blank" rel="noopener noreferrer">detectEntities()</a></code></li>
                <li><code><a href="https://docs.aws.amazon.com/comprehend-medical/latest/dev/textanalysis-phi.html" target="_blank" rel="noopener noreferrer">detectPHI()</a></code></li>
            </p>
          </div>
          <div className="row">
            <div className="col-md-5 text-left">
              <h4>Step 1: Insert Text</h4>
              <form>
                <div className="form-group">
                  <textarea class="form-control" rows="5" value={this.state.text} onChange={this.onChangeText} placeholder="Enter the text for Comprehend to analyze!"/>
                </div>
                <button type="button" className="btn btn-info" onClick={this.sendTextToComprehendMedical}>Analyze text with Comprehend Medical</button>
              </form>
            </div>
            <div className="col-md-7 text-left">
              <h4>Results: </h4>
              <div class="row">
                <div class="col">
                  <div class="tabs">
                    <div class="tab">
                      <input hidden type="checkbox" id="chck1"/>
                      <label class="tab-label" htmlFor="chck1">Entities</label>
                      <div class="tab-content">
                        {entitiesStatus}
                        {entities}
                      </div>
                    </div>
                    <div class="tab">
                      <input hidden type="checkbox" id="chck2"/>
                      <label class="tab-label" htmlFor="chck2">PHI Entities</label>
                      <div class="tab-content">
                        {phiEntitiesStatus}
                        {phiEntities}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        <Footer/>
        </div> 
      </div>
    </div>
    );
  }
}

export default ComprehendMedical;