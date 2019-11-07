import React, {Component} from 'react';
import RecorderJS from 'recorder-js';
import ReactAudioPlayer from 'react-audio-player';
import { getAudioStream, exportBuffer } from '../utilities/audio';
import TranscribeService from "aws-sdk/clients/transcribeservice";
import S3Service from "aws-sdk/clients/s3";
import '../App.css';

var transcribeservice = new TranscribeService();
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
            s3URL:''
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
        this.setState({transcriptionJobName: 'BYTECONF_' + job});
        var params = {
            LanguageCode: "en-US", /* required */
            Media: { /* required */
                MediaFileUri: this.state.s3URL
            },
            MediaFormat: "wav", /* required */
            TranscriptionJobName: this.state.transcriptionJobName,
            OutputBucketName: "transcribe-output-js"
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
        Bucket: "transcribe-output-js",
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

    getTranscription() {
        this.setState({transcriptionJobComplete: true});
        var currentComponent = this;
        var params = {
            TranscriptionJobName: this.state.transcriptionJobName /* required */
          };
         transcribeservice.getTranscriptionJob(params, function(err, data) {
            if (err) console.log(err, err.stack); // an error occurred
            else{    // successful response
                console.log(data);
                if(data.TranscriptionJob.TranscriptionJobStatus === 'IN_PROGRESS'){
                  setTimeout(() => {
                    currentComponent.getTranscription();
                  }, 5000);
                }
                else if(data.TranscriptionJob.TranscriptionJobStatus === 'COMPLETED'){
                  
                  let url = data.TranscriptionJob.Transcript.TranscriptFileUri
                  let key = url.replace('https://s3.amazonaws.com/transcribe-output-js/', '');
                  console.log(key);
                  currentComponent.givePublicAccessToTranscriptObject(key)
                    .then(data => {
                        //download data file
                        console.log("ready to download json file")

                        fetch(url)
                          .then(response => response.json())
                          .then(json => {
                            currentComponent.setState({transcriptionJobComplete: false});
                            console.log(json.results.transcripts[0].transcript);
                            currentComponent.setState({transcription: json.results.transcripts[0].transcript})
                          
                          })
                          .catch(error => console.log(`Failed because: ${error}`));

                    })
                   
                 
               }
            }           
          });
       
    }

    render() {
        const { recording, stream } = this.state;
        let transcribeBtn;
        if(!this.state.transcriptionJobComplete){
          transcribeBtn =  <button className="btn btn-info" onClick={this.getTranscription}>Get Transcription</button>
        }
        else{
          transcribeBtn = <button className="btn btn-info" type="button" disabled>
                            <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                            <span className="sr-only">Transcribing...</span>
                          </button>
        }
        
        // Don't show record button if their browser doesn't support it.
        if (!stream) {
        return null;
        }
        return (
        <div className="container">
         <div className="row">
            <h1>Amazon Transcribe</h1>
            </div>
            <div class="titlebar"></div> 
            <div className="row text-left">
            <p>Amazon Transcribe uses advanced machine learning technologies to recognize speech in audio files and transcribe them into text. You can use Amazon Transcribe to convert audio to text and to create applications that incorporate the content of audio files. For example, you can transcribe the audio track from a video recording to create closed captioning for the video.</p>
            <br></br>
            <p>In this example, we're going to show how easy it is to record audio, upload it to <code>Amazon S3</code>, and use <code>Amazon Transcribe</code> to perform a transcription job.</p>
            <p>
              API Calls:<br></br>
              <code>startTranscriptionJob</code>: Initialize a transcription from a source audio file<br></br>
              <code>getTranscription</code>: Get the text output from a transcription job
            </p>
          </div>
            <div className="col-xs-12">
                <div className="row">
                  <div className="col-xs-2 step">
                    <h3 className="stepTitle">Step 1</h3>
                    <button
                    className={recording? 'btn btn-danger' : 'btn btn-info'}
                    onClick={() => {
                    recording ? this.stopRecord() : this.startRecord();
                    }}
                    >
                    {recording ? 'Stop Recording' : 'Start Recording'}
                    </button>
                    <h4 className="stepInstructions">Record something to transcribe</h4>
                    </div>
                    <div className="col-xs-2 step">
                    <h3 className="stepTitle">Step 2</h3>
                    <ReactAudioPlayer
                    src={this.state.s3URL}
                    autoPlay
                    controls
                    />
                    <h4 className="stepInstructions">Recording is uploaded to S3</h4>
                  </div>
                  <div className="col-xs-2 step">
                    <h3 className="stepTitle">Step 3</h3>
                    {transcribeBtn}
                    
                    <h4 className="stepInstructions">Get the transcription!</h4>
                  </div>
                </div>
                <div className="row">
                    <div className="col-xs-12 step">
                    <h4>Transcription Result: </h4>
                    <br></br>
                    <p>{this.state.transcription}</p>
                    </div>
                </div>

            </div>
        </div>)
    }
}

export default Transcribe;