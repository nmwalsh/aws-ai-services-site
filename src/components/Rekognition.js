import React, {Component} from 'react';
import { Form } from 'semantic-ui-react';
import Webcam from 'react-webcam';
var dataUriToBuffer = require('data-uri-to-buffer');
var AWS = require('aws-sdk');
AWS.config.region = 'us-east-1'; 
AWS.config.credentials = new AWS.CognitoIdentityCredentials({IdentityPoolId: 'us-east-1:1956382a-b3f6-472c-9a8d-3a246853c917'});

class Rekognition extends Component {
    constructor(props){
        super(props);

        this.state = {
            image: '',
            resultMessage: '',
            resultLabels: [],
            imageSrc: '',
      
        }
        this.handleCapture = this.handleCapture.bind(this);
        this.sendImageToRekognition = this.sendImageToRekognition.bind(this);
    }
    setRef = webcam => {
      this.webcam = webcam;
    };
  
    handleCapture=() => {

      const imageSrc = this.webcam.getScreenshot()
      this.sendImageToRekognition(imageSrc)
    }
    
    sendImageToRekognition = (imageSrc) => {
        
        // convert image to buffer from base64
        let buffer = dataUriToBuffer(imageSrc)
        
        // API call params
        var RekognitionParams = {
            Image: {
              Bytes: buffer
              /* Alternatively, you can provide an S3 object 
              S3Object: {
                Bucket: 'STRING_VALUE',
                Name: 'STRING_VALUE',
                Version: 'STRING_VALUE'
              }*/
            },
          };
        
        // instantiate Rekognition client
        var rekognition = new AWS.Rekognition({apiVersion: '2017-07-01'});
        let currentComponent = this;

        // call Rekognition's detectLabels method
        rekognition.detectLabels(RekognitionParams, function (err, data){
            if (err) {
                currentComponent.setState({resultMessage: err.message});
            }
            else {
                console.log(data);
                currentComponent.setState({resultLabels: data.Labels});
                currentComponent.setState({resultMessage: "Classification successful!"})
            }
        });

    }

    
    render(){
        let result, labels;
        if(this.state.resultMessage !== ''){
          result = <p>{this.state.resultMessage}</p>
          labels = this.state.resultLabels.map((label, i) => {
              return (<tr key={i}>
                        <td>
                          {label.Name}
                        </td>
                        <td>
                          {label.Confidence}
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
            <div className="container">
                <h1>Rekognition</h1>
                <p><code>detectLabels</code>: Detect object labels from an input image!</p>
                <div className="row">
                    <div className="col-md-8">
                        <Form>
                            <Webcam
                              audio={false}
                              height={350}
                              width={400}
                              ref={this.setRef}
                              screenshotFormat="image/png"
                              //screenshotWidth={IMAGE_WIDTH} // no sense capturing images in a resolution higher than what resnet wants
                              videoConstraints={videoConstraints}
                            />
                          <Form.Button onClick={this.handleCapture}>Detect Labels</Form.Button>
                        
                        </Form>
                    </div>
                    <div className="col-md-4">
                      <span>Results:</span>{result}
                      <table>
                        <thead>
                          <tr>
                            <th>
                              Object Name
                            </th>
                            <th>
                              Confidence
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                        {labels}
                        </tbody>
                      </table>
                    </div>
                </div>
            </div>
        </div>
        )
    }
}

export default Rekognition