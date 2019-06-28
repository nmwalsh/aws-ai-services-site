import React, {Component} from 'react'
import '../App.css';

class Main extends Component {

    render() {
        return(<div className="container">
                    <h1>Welcome ByteConf!</h1>
                    <div className="col-xs-12">
                        <div className="row">
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">Amazon Transcribe</h5>
                                    <p className="card-text">Amazon Transcribe is an automatic speech recognition (ASR) service that makes it easy for developers to add speech-to-text capability to their applications.</p>
                                    <a href="/transcribe" className="btn btn-info">Transcribe</a>
                                </div>
                            </div>
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">Amazon Polly</h5>
                                    <p className="card-text">Amazon Polly is a service that turns text into lifelike speech, allowing you to create applications that talk, and build entirely new categories of speech-enabled products.</p>
                                    <a href="/polly" className="btn btn-info">Polly</a>
                                </div>
                            </div>
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">Amazon Comprehend</h5>
                                    <p className="card-text">Amazon Comprehend is a natural language processing (NLP) service that uses machine learning to find insights and relationships in text. No machine learning experience required.</p>
                                    <a href="/comprehend" className="btn btn-info">Comprehend</a>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">Amazon Rekognition</h5>
                                    <p className="card-text">The easy-to-use Rekognition API allows you to automatically identify objects, people, text, scenes, and activities, as well as detect any inappropriate content. Developers can quickly build a searchable content library to optimize media workflows, enrich recommendation engines by extracting text in images, or integrate secondary authentication into existing applications to enhance end-user security.</p>
                                    <a href="/rekognition" className="btn btn-info">Rekognition</a>
                                </div>
                            </div>
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">Amazon Translate</h5>
                                    <p className="card-text">Amazon Translate is a neural machine translation service that delivers fast, high-quality, and affordable language translation. Neural machine translation is a form of language translation automation that uses deep learning models to deliver more accurate and more natural sounding translation than traditional statistical and rule-based translation algorithms.</p>
                                    <a href="/translate" className="btn btn-info">Translate</a>
                                </div>
                            </div>
                    </div>
                    </div>
                    
        </div>)
    }
}
export default Main