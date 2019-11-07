import React, {Component} from 'react';
var AWS = require('aws-sdk');
AWS.config.region = 'us-east-1'; 
AWS.config.credentials = new AWS.CognitoIdentityCredentials({IdentityPoolId: 'us-east-1:1956382a-b3f6-472c-9a8d-3a246853c917'});


class Textract extends Component {
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
      
      
        render() {
          let result;
          if(this.state.resultMessage !== ''){
            result = <p>{this.state.resultMessage}</p>
          }
          
         return (
            <div className="App">
                <div className="container">
                    <h1>Amazon Textract</h1>
                    <br></br>
                    <br></br>
                    <h5>Demo TBD</h5>
                </div>
            </div>
        )
        }
      
}

export default Textract;