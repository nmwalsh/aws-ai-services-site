import React, {Component} from 'react'
import GitHubButton from 'react-github-btn'
import Footer from '../utilities/footer';
import '../App.css';
//import * as THREE from "three";

class Main extends Component {

    render() {
        return(<div className="container">
                    <div className="bg-pattern"></div>
                    <div className="hero">
                        <div className="row">
                            <div className="col-xs-3 offset-1">
                                <a href="https://aws.amazon.com/machine-learning/ai-services/" target="_blank" rel="noopener noreferrer">
                                    <img src={require('../images/aws_logo.png')}  alt="AWS Logo" />
                                </a>
                            </div>
                            <div className="col-xs-4 offset-1">
                                    <h1>AWS AI Service Demos</h1>
                                    <p>
                                        AWS pre-trained AI Services provide ready-made intelligence for your applications and workflows.
                                        <br></br>
                                        Get started powering your applications in minutes: <i>no machine learning knowledge required</i>.
                                        <br></br>
                                        <br></br>
                                        See them in action in the examples below, and check out the code samples on GitHub.
                                    </p>  
                                    <GitHubButton href="https://github.com/nmwalsh/aws-ai-services-site" data-icon="octicon-star" data-show-count="true" aria-label="Star nmwalsh/aws-ai-services-site on GitHub">Star</GitHubButton>
                                    ' '
                                    <GitHubButton href="https://github.com/nmwalsh/aws-ai-services-site/fork" data-icon="octicon-repo-forked" data-show-count="true" aria-label="Fork nmwalsh/aws-ai-services-site on GitHub">Fork</GitHubButton> 
                            </div>
                        </div>
                    </div>
                    
                    <div className="col-xs-12">
                        <div className="row flex-container">
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">Amazon Transcribe</h5>
                                    <div class="bar">
                                        <div class="emptybar"></div>
                                        <div class="filledbar"></div>
                                    </div>
                                    <p className="card-text">Amazon Transcribe is an automatic speech recognition (ASR) service that makes it easy for developers to add speech-to-text capability to their applications.</p>
                                    <br></br>
                                    <a href="/transcribe" className="btn btn-info">Try Transcribe</a>
                                    <a href="https://docs.aws.amazon.com/transcribe/latest/dg/what-is-transcribe.html" target="_blank" rel="noopener noreferrer" className="btn btn-info">Docs</a>
                                </div>
                            </div>
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">Amazon Polly</h5>
                                    <div class="bar">
                                        <div class="emptybar"></div>
                                        <div class="filledbar"></div>
                                    </div>
                                    <p className="card-text">Amazon Polly is a service that turns text into lifelike speech, allowing you to create applications that talk, and build entirely new categories of speech-enabled products.</p>
                                    <br></br>
                                    <a href="/polly" className="btn btn-info">Try Polly</a>
                                    <a href="https://docs.aws.amazon.com/polly/latest/dg/what-is.html" target="_blank" rel="noopener noreferrer" className="btn btn-info">Docs</a>
                                </div>
                            </div>
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">Amazon Comprehend</h5>
                                    <div class="bar">
                                        <div class="emptybar"></div>
                                        <div class="filledbar"></div>
                                    </div>
                                    <p className="card-text">Amazon Comprehend is a natural language processing (NLP) service that uses machine learning to find insights and relationships in text. No machine learning experience required.</p>
                                    <br></br>
                                    <a href="/comprehend" className="btn btn-info">Try Comprehend</a>
                                    <a href="https://docs.aws.amazon.com/comprehend/latest/dg/what-is.html" target="_blank" rel="noopener noreferrer" className="btn btn-info">Docs</a>
                                </div>
                            </div>
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">Amazon Comprehend Medical</h5>
                                    <div class="bar">
                                        <div class="emptybar"></div>
                                        <div class="filledbar"></div>
                                    </div>
                                    <p className="card-text">Amazon Comprehend Medical is a HIPAA-eligible natural language processing (NLP) service that uses machine learning that has been pre-trained to understand and extract health data from medical text, such as prescriptions, procedures, or diagnoses.</p>
                                    <br></br>
                                    <a href="/comprehend-medical" className="btn btn-info">Try Comprehend Medical</a>
                                    <a href="https://docs.aws.amazon.com/comprehend-medical/latest/dev/comprehendmedical-welcome.html" target="_blank" rel="noopener noreferrer" className="btn btn-info">Docs</a>
                                </div>
                            </div>
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">Amazon Rekognition</h5>
                                    <div class="bar">
                                        <div class="emptybar"></div>
                                        <div class="filledbar"></div>
                                    </div>
                                    <p className="card-text">Amazon Rekognition allows you to automatically identify objects, people, text, scenes, and activities, in images and videos. Available for batch and streaming.</p>
                                    <br></br>
                                    <a href="/rekognition" className="btn btn-info">Try Rekognition</a>
                                    <a href="https://docs.aws.amazon.com/rekognition/latest/dg/what-is.html" target="_blank" rel="noopener noreferrer" className="btn btn-info">Docs</a>
                                </div>
                            </div>
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">Amazon Translate</h5>
                                    <div class="bar">
                                        <div class="emptybar"></div>
                                        <div class="filledbar"></div>
                                    </div>
                                    <p className="card-text">Amazon Translate is a neural machine translation service that delivers fast, high-quality, and affordable language to language translation, with the ability to autodetect source language.</p>
                                    <br></br>
                                    <a href="/translate" className="btn btn-info">Try Translate</a>
                                    <a href="https://docs.aws.amazon.com/translate/latest/dg/what-is.html" target="_blank" rel="noopener noreferrer" className="btn btn-info">Docs</a>
                                </div>
                            </div>
                        </div>
                        {/*
                        <div className="row">
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">Amazon Rekognition</h5>
                                    <div class="bar">
                                        <div class="emptybar"></div>
                                        <div class="filledbar"></div>
                                    </div>
                                    <p className="card-text">Amazon Rekognition allows you to automatically identify objects, people, text, scenes, and activities, in images and videos. Available for batch and streaming.</p>
                                    <a href="/rekognition" className="btn btn-info">Try Rekognition</a>
                                    <a href="https://docs.aws.amazon.com/rekognition/latest/dg/what-is.html" target="_blank" rel="noopener noreferrer" className="btn btn-info">Docs</a>
                                </div>
                            </div>
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">Amazon Translate</h5>
                                    <div class="bar">
                                        <div class="emptybar"></div>
                                        <div class="filledbar"></div>
                                    </div>
                                    <p className="card-text">Amazon Translate is a neural machine translation service that delivers fast, high-quality, and affordable language to language translation.</p>
                                    <a href="/translate" className="btn btn-info">Try Translate</a>
                                    <a href="https://docs.aws.amazon.com/translate/latest/dg/what-is.html" target="_blank" rel="noopener noreferrer" className="btn btn-info">Docs</a>
                                </div>
                            </div>
                    </div>
                        */}
                    </div>       
                    <div className="footer text-center">
                        <Footer></Footer>
                    </div>
                            
        </div>)
    }
}
export default Main