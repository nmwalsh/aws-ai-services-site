import React, {Component} from 'react';
import NavBar from '../utilities/navbar';
import Footer from '../utilities/footer';
import RecorderJS from 'recorder-js';
import ReactAudioPlayer from 'react-audio-player';
import { getAudioStream, exportBuffer } from '../utilities/audio';
import TranscribeService from "aws-sdk/clients/transcribeservice";
import S3Service from "aws-sdk/clients/s3";
import '../App.css';

var transcribeservice = new TranscribeService({apiVersion: '2017-10-26'});
var s3 = new S3Service();
s3.config.region = "us-east-1";

class Transcribe extends Component {
    constructor(props){
        super(props);
        this.state = {
            stream: null,
            recording: false,
            recorder: null,
            transcriptionJobName: '',
            transcription:'',
            transcriptionJobComplete: false,
            transcriptionInProgress: false,
            s3URL:'',
            outputURL:''
        }
        this.startRecord = this.startRecord.bind(this);
        this.stopRecord = this.stopRecord.bind(this);
        this.transcribeAudio = this.transcribeAudio.bind(this);
        this.getTranscription = this.getTranscription.bind(this);
       
    }

    async componentDidMount() {
        let stream;
    
        try {
          stream = await getAudioStream();
        } catch (error) {
          // Users browser doesn't support audio.
          // Add your handler here.
          console.log(error);
        }
    
        this.setState({ stream });
      }
   
      startRecord() {
        const { stream } = this.state;
    
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const recorder = new RecorderJS(audioContext);
        recorder.init(stream);
    
        this.setState(
          {
            recorder,
            recording: true
          },
          () => {
            recorder.start();
          }
        );
      }
     
      async stopRecord() {
        const { recorder } = this.state;
    
        const { buffer } = await recorder.stop()
        const audio = exportBuffer(buffer[0]);
    
        // Process the audio here.
        console.log(audio);
    
        this.setState({recording: false});
         //send audio file to s3 bucket to prepare for transcription
       
        let currentComponent = this;
        var params = {
            ACL: "public-read",
            Body: audio, 
            Bucket: "transcribe-output-js", 
            Key: "test.wav"
           };
     
        s3.putObject(params, function(err, data) {
        if (err) console.log(err, err.stack); // an error occurred
        else{
            currentComponent.setState({s3URL: "https://s3.amazonaws.com/transcribe-output-js/" + params.Key})
            console.log(data); // successful response
            currentComponent.transcribeAudio();
        }          

        });     
      }

    transcribeAudio() {
       
        let job = Math.random();
        this.setState({transcriptionJobName: 'TRANSCRIBE_DEMO_JOB_' + job});
        var params = {
            LanguageCode: "en-US", /* required */
            Media: { /* required */
                MediaFileUri: this.state.s3URL
            },
            MediaFormat: "wav", /* required */
            TranscriptionJobName: this.state.transcriptionJobName, /* required*/
            //OutputBucketName: "transcribe-output-js"
            };
            transcribeservice.startTranscriptionJob(params, function(err, data) {
            if (err) console.log(err, err.stack); // an error occurred
            else{
                console.log(data);  // successful response
            }         
        });
    }
  
   givePublicAccessToTranscriptObject(key) {

    return new Promise((resolve, reject) => {
      var params = { 
        ACL: 'public-read',
        Bucket: "aws-transcribe-us-east-1-prod",
        Key: key
       };
      s3.putObjectAcl(params, function(err, data) {
         if (err){ 
           console.log(err, err.stack);
           reject(err);
         }// an error occurred
         else{ // successful response
          console.log(data);  
          console.log("public access updated");
           resolve(data);
                   
         }     

       });
    })
      
    }
    
    /*
    reqListener () {
      console.log(this.responseText);
    }*/

    getS3Object(bucket, key){
      var params = {
        Bucket: bucket,
        Key: key
       };
       s3.getObject(params, function(err, data) {
         if (err) console.log(err, err.stack); // an error occurred
         else     console.log(data);           // successful response*/
       });

    }

    getTranscription() {
        //this.setState({transcriptionJobComplete: true});
        var currentComponent = this;
        var params = {
            TranscriptionJobName: this.state.transcriptionJobName /* required */
          };
         transcribeservice.getTranscriptionJob(params, function(err, data) {
            if (err) console.log(err, err.stack); // an error occurred
            else{    // successful response
                console.log(data);
                if(data.TranscriptionJob.TranscriptionJobStatus === 'IN_PROGRESS'){
                  currentComponent.setState({transcriptionInProgress: true});
                  currentComponent.setState({transcriptionJobComplete: false});
                  setTimeout(() => {
                    currentComponent.getTranscription();
                  }, 5000);
                }
                else if(data.TranscriptionJob.TranscriptionJobStatus === 'COMPLETED'){
                  currentComponent.setState({transcriptionJobComplete: true});
                  currentComponent.setState({transcriptionInProgress: false});
                  let url = data.TranscriptionJob.Transcript.TranscriptFileUri
                  let signedKey = url.split('https://s3.amazonaws.com/aws-transcribe-us-east-1-prod/')            
                  let bucket = "aws-transcribe-us-east-1-prod"
                  let key = signedKey[1].split('?')[0]
                  currentComponent.setState({outputURL: url});
                  
                  // currentComponent.givePublicAccessToTranscriptObject(key).then(data => {
                  //   currentComponent.getS3Object(bucket, key)
                  // })

                  /*
                  let options = {
                    mode: 'no-cors',
                    method: 'GET'
                  }
                  
                  var request = new XMLHttpRequest();
                  //oReq.addEventListener("load", reqListener);
                  request.open("GET", url);
                  //request.setRequestHeader('X-PINGOTHER', 'pingpong');
                  request.setRequestHeader('Access-Control-Allow-Origin', '*');
                  request.setRequestHeader('Content-Type', 'application/xml');
                  console.log(url)
                  request.send();
                  console.log(request);

                  fetch(url, options)
                    .then(response => console.log(response))
                    .then(data => {
                      // Work with JSON data here
                      console.log(data)
                      currentComponent.setState({transcriptionJobComplete: false});
                      console.log(data.results.transcripts[0].transcript);
                      currentComponent.setState({transcription: data.results.transcripts[0].transcript})
                    })
                    .catch(err => {
                      // Do something for an error here
                    })
                  */
                
               }
            }           
          });
       
    }

    render() {
        const { recording, stream } = this.state;
        let transcribeBtn;
        
        if(this.state.transcriptionInProgress){
          transcribeBtn = <button className="btn btn-info" type="button" disabled>
                            <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                            <span className="sr-only">Transcribing...</span>
                          </button>
        }
        else if(this.state.transcriptionJobComplete){
          transcribeBtn =  <button className="btn btn-info"><a href={this.state.outputURL} target="_blank" rel="noopener noreferrer">Transcription Ready! Click to Download</a></button>
        }
        else{
          transcribeBtn =  <button className="btn btn-info" onClick={this.getTranscription}>Get Transcription</button>
        }
        //let outputURL = <p><a href={this.state.outputURL} target="_blank" rel="noopener noreferrer">Transcription link</a></p>
        
        // Don't show record button if their browser doesn't support it.
        if (!stream) {
        return null;
        }
        return (
        <div className="App">
          <NavBar/>
        <div className="container">
         <div className="row">
            <h1>Amazon Transcribe</h1>
            </div>
            <div class="titlebar"></div> 
            <div className="row text-left">
            <p><a href="https://aws.amazon.com/transcribe/" target="_blank" rel="noopener noreferrer">Amazon Transcribe</a> uses advanced machine learning technologies to recognize speech in audio files and transcribe them into text. You can use Amazon Transcribe to convert audio to text and to create applications that incorporate the content of audio files. For example, you can transcribe the audio track from a video recording to create closed captioning for the video.</p>
            <br></br>
            <p>In this example, we're going to show how easy it is to record audio, upload it to <code>Amazon S3</code>, and use <code>Amazon Transcribe</code> to perform a batch transcription job.</p>
            <p>This demo doesn't include the realtime transcription functionality of <code>Amazon Transcribe</code>, but you can <a href="https://transcribe-websockets.go-aws.com/" target="_blank" rel="noopener noreferrer">find a demo that does here.</a></p>
            <p>
              <b>Methods:</b><br></br>
              <ul>
              <li><code><a href="https://docs.aws.amazon.com/transcribe/latest/dg/API_StartTranscriptionJob.html" target="_blank" rel="noopener noreferrer">startTranscriptionJob()</a></code>: Initialize a transcription from a source audio file</li>
              <li><code><a href="https://docs.aws.amazon.com/transcribe/latest/dg/API_GetTranscriptionJob.html" target="_blank" rel="noopener noreferrer">getTranscriptionJob()</a></code>: Get the text output from a transcription job</li>
              </ul>
            </p>
          </div>
            <div className="col-xs-12">
                <div className="row">
                  <div className="col-xs-2 step">
                    <h4 className="stepTitle">Step 1: Record Audio</h4>
                    <button
                    className={recording? 'btn btn-danger' : 'btn btn-info'}
                    onClick={() => {
                    recording ? this.stopRecord() : this.startRecord();
                    }}
                    >
                    {recording ? 'Stop Recording' : 'Start Recording'}
                    </button>
                    </div>
                    <div className="col-xs-2 step">
                    <h4 className="stepTitle">Step 2: Upload to S3</h4>
                    <ReactAudioPlayer
                    src={this.state.s3URL}
                    autoPlay
                    controls
                    />
                  </div>
                  <div className="col-xs-2 step">
                    <h4 className="stepTitle">Step 3: Get transcription</h4>
                    {transcribeBtn}
                  </div>
                </div>
            </div>
            <Footer />
        </div>
        </div>
        )
    }
}

export default Transcribe;