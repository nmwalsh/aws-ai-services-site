import React, {Component} from 'react';
import NavBar from '../utilities/navbar';
import Footer from '../utilities/footer';
import { Form } from 'semantic-ui-react';
import S3Service from "aws-sdk/clients/s3";

var dataUriToBuffer = require('data-uri-to-buffer');
var AWS = require('aws-sdk');
var TextractClient = require("aws-sdk/clients/textract");

AWS.config.region = 'us-east-1'; 
AWS.config.credentials = new AWS.CognitoIdentityCredentials({IdentityPoolId: 'us-east-1:4cd56f13-a81b-4d2e-908e-afa6d321e6f7'});

var s3 = new S3Service();
s3.config.region = "us-east-1";


class Textract extends Component {
    constructor(props){
        super(props);

        this.state = {
            image: '',
            resultMessage: '',
            resultBlocks: [],
            imageSrc: '',
      
        }
        this.handleExtract = this.handleExtract.bind(this);
    }
  
    handleExtract = () => {
		
		var fileChooser = document.getElementById('file-chooser');
		var file1 = fileChooser.files;
		
		if(file1) {
			console.log("File found: " + file1[0].name );
			var myFile = file1[0]
		
			let currentComponent = this;
			var params = {
				Body: myFile,
				ContentType: myFile.type,
				Bucket: "textract-input-tool", 
				Key: "test-textract"
			   };

			s3.putObject(params, function(err, data) {
			if (err) console.log(err, err.stack); // an error occurred
			else{
				currentComponent.setState({s3URL: "https://s3.amazonaws.com/textract-input-tool/" + params.Key})
				console.log(data); // successful response

				// API call params
				var TextractParams = {
					Document: {
					  //Bytes: fileByteArray
					  // Alternatively, you can provide an S3 object 
					  S3Object: {
						Bucket: "awsramji-s3-monkey",
						Name: "test-textract"
					  }
					},
				  };
				
				// instantiate Textract client
				var textract = new TextractClient();

				// call Textract's detectDocumentText method
				textract.detectDocumentText(TextractParams, function (err, data){
					if (err) {
						currentComponent.setState({resultMessage: err.message});
					}
					else {
						console.log(data);
						currentComponent.setState({resultBlocks: data.Blocks});
						currentComponent.setState({resultMessage: "Text Extraction successful!"})
					}
				});

			}          
		});
	}
	}
    
    render(){
        let result, blocks;
        if(this.state.resultMessage !== ''){
          result = <p>{this.state.resultMessage}</p>
          blocks = this.state.resultBlocks.filter(item => item.BlockType == "LINE").map((block, i) => {
              return (<tr key={i}>
                        <td>
                          {block.Text}
                        </td>
                        <td>
                          {block.Confidence}
                        </td>
                    </tr>
              )
              
            })
          
        }
        const videoConstraints = {
          facingMode: "user"
        };
        return (
          <div className="App">
            <NavBar/>
            <div className="container">
              <div className="content-wrap">
                <div className="row text-left">
                <h1>Amazon Textract</h1>
                </div>
                <div class="titlebar"></div> 
                <div className="row text-left">
                <p><a href="https://aws.amazon.com/textract/" target="_blank" rel="noopener noreferrer">Amazon Textract</a> makes it easy to extract text from an image in your applications. You just provide an image to the Amazon Textract API, and the service can identify text. You can detect, analyze, and extract identification and Invoices for a wide variety of use cases, including user verification, cataloging.</p>
                <br></br>
                <p>In this example, we're going to show how easy it is to send an image to <code>Amazon Textract</code> to perform text extraction.</p>
                <p>
                  Methods:<br></br>
                  <ul><li><code><a href="https://docs.aws.amazon.com/textract/latest/dg/API_DetectDocumentText.html" target="_blank" rel="noopener noreferrer">detectDocumentText()</a></code>: Detect document text from an input image!</li></ul>
                </p>
              </div>
                <div className="row">
                    <div className="col-md-8 text-left">
                      <h4>Step 1: Upload file</h4>
						<input type="file" id="file-chooser" className="btn btn-info" />
                        <button type="button" className="btn btn-info" onClick={this.handleExtract}>Detect Text</button>
						<img id="selectedDoc" />
                    </div>
                    <div className="col-md-12 text-left">
                      <h4>Results:</h4>{result}
                      <table>
                        <thead>
                          <tr>
                            <th>
                              Blocks
                            </th>
                            <th>
                              Confidence
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                        {blocks}
                        </tbody>
                      </table>
                    </div>
                </div>
            </div>
            <Footer/>
            </div>
        </div>
        )
    }
}

export default Textract