import React, { Component } from 'react'

export default class Footer extends Component {
  render() {
    return (
        <div className="row">
            <div className="footer-demo text-center">
                <style>position:relative;</style>
                <p>Made with ♥ by <a href="https://twitter.com/thenickwalsh" target="_blank" rel="noopener noreferrer">Nick Walsh</a> and <a href="https://twitter.com/kneekey23" target="_blank" rel="noopener noreferrer">Nicki Stone</a>
                <br></br>
                <a href="https://aws.amazon.com/privacy/" target="_blank" rel="noopener noreferrer">Privacy</a> | <a href="https://aws.amazon.com/terms/" target="_blank" rel="noopener noreferrer">Site Terms</a> | © 2020, Amazon Web Services, Inc. or its affiliates. All rights reserved.</p>
            </div>
        </div>
    )
  }
}