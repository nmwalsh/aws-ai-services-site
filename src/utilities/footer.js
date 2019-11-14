import React, { Component } from 'react'

export default class Footer extends Component {
  render() {
    return (
        <div className="row">
            <div className="footer-demo text-center">
                <style>position:relative;</style>
                <p>&copy; {new Date().getFullYear()} Amazon Web Services, Inc. or its affiliates. All rights reserved. <br></br> Made with ♥ by <a href="https://twitter.com/thenickwalsh" target="_blank" rel="noopener noreferrer">Nick Walsh</a> and <a href="https://twitter.com/kneekey23" target="_blank" rel="noopener noreferrer">Nicki Stone</a></p>
            </div>
        </div>
    )
  }
}