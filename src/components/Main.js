import React, {Component} from 'react'
import '../App.css';

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
                                    <h1>AI Services</h1>
                                    <p>
                                        AWS pre-trained AI Services provide ready-made intelligence for your applications and workflows.
                                        <br></br>
                                        Get started powering your applications in minutes: <i>no machine learning knowledge required</i>.
                                        <br></br>
                                        <br></br>
                                        See them in action in the examples below!
                                    </p>   
                            </div>
                        </div>
                    </div>
                    <div className="col-xs-12">
                        <div className="row">
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">Amazon Transcribe</h5>
                                    <div class="bar">
                                        <div class="emptybar"></div>
                                        <div class="filledbar"></div>
                                    </div>
                                    <p className="card-text">Amazon Transcribe is an automatic speech recognition (ASR) service that makes it easy for developers to add speech-to-text capability to their applications.</p>
                                    <a href="/transcribe" className="btn btn-info">Try Transcribe</a>
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
                                    <a href="/polly" className="btn btn-info">Try Polly</a>
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
                                    <a href="/comprehend" className="btn btn-info">Try Comprehend</a>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">Amazon Rekognition</h5>
                                    <div class="bar">
                                        <div class="emptybar"></div>
                                        <div class="filledbar"></div>
                                    </div>
                                    <p className="card-text">The easy-to-use Rekognition API allows you to automatically identify objects, people, text, scenes, and activities, as well as detect any inappropriate content. Developers can quickly build a searchable content library to optimize media workflows, enrich recommendation engines by extracting text in images, or integrate secondary authentication into existing applications to enhance end-user security.</p>
                                    <a href="/rekognition" className="btn btn-info">Try Rekognition</a>
                                </div>
                            </div>
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">Amazon Translate</h5>
                                    <div class="bar">
                                        <div class="emptybar"></div>
                                        <div class="filledbar"></div>
                                    </div>
                                    <p className="card-text">Amazon Translate is a neural machine translation service that delivers fast, high-quality, and affordable language translation. Neural machine translation is a form of language translation automation that uses deep learning models to deliver more accurate and more natural sounding translation than traditional statistical and rule-based translation algorithms.</p>
                                    <a href="/translate" className="btn btn-info">Try Translate</a>
                                </div>
                            </div>
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">Amazon Forecast</h5>
                                    <div class="bar">
                                        <div class="emptybar"></div>
                                        <div class="filledbar"></div>
                                    </div>
                                    <p className="card-text">TBD</p>
                                    <a href="/translate" className="btn btn-info">Try Forecast</a>
                                </div>
                            </div>
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">Amazon Textract</h5>
                                    <div class="bar">
                                        <div class="emptybar"></div>
                                        <div class="filledbar"></div>
                                    </div>
                                    <p className="card-text">TBD</p>
                                    <a href="/translate" className="btn btn-info">Try Textract</a>
                                </div>
                            </div>
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">Amazon Personalize</h5>
                                    <div class="bar">
                                        <div class="emptybar"></div>
                                        <div class="filledbar"></div>
                                    </div>
                                    <p className="card-text">TBD</p>
                                    <a href="/translate" className="btn btn-info">Try Personalize</a>
                                </div>
                            </div>
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">Amazon Lex</h5>
                                    <div class="bar">
                                        <div class="emptybar"></div>
                                        <div class="filledbar"></div>
                                    </div>
                                    <p className="card-text">TBD</p>
                                    <a href="/translate" className="btn btn-info">Try Lex</a>
                                </div>
                            </div>
                    </div>
                    </div>
                    
        </div>)
    }
}
export default Main