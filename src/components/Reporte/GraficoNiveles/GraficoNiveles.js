import React, { Component } from 'react';
import './GraficoNiveles.css'

export default class GraficoNiveles extends Component {
     defaultProps = {
        GWidth: 120,
        GHeight: 300,
        width: 60,
        height: 100,
        value: 10,
        max: 50,
        min: 0
    }
    calcPos(value){
        return (-value + this.props.max) * this.props.GHeight/this.props.max;
    }

    render() {
        return (
            <svg width={this.props.GWidth} height={this.props.GHeight}>
                <defs>
                    <linearGradient 
                        id="gradient" x1="0%" y1="0%" x2="0%" y2="100%" spreadMethod="pad">
                        <stop offset="50%" stopColor="#c00" stopOpacity="1"></stop>
                        <stop offset="80%" stopColor="yellow" stopOpacity="1"></stop>
                        <stop offset="100%" stopColor="#0c0" stopOpacity="1"></stop>
                    </linearGradient>
                </defs>
                <g>
                    <rect x="0" y="0" width={this.props.width} height="100%" fill="url(#gradient)"></rect>
                </g>
                <g>
                    <line x1={this.props.width} y1={this.calcPos(5)} x2="0" y2={this.calcPos(5)} strokeWidth="3" stroke="black"></line>
                </g>
                <g>
                    <line x1={this.props.width} y1={this.calcPos(7)} x2="0" y2={this.calcPos(7)} strokeWidth="3" stroke="black"></line>
                </g>
                <g>
                    <line x1={this.props.width} y1={this.calcPos(10)} x2="0" y2={this.calcPos(10)} strokeWidth="3" stroke="black"></line>
                </g>
                <g>
                    <line x1={this.props.width} y1={this.calcPos(12.5)} x2="0" y2={this.calcPos(12.5)} strokeWidth="3" stroke="black"></line>
                </g>
                <g>
                    <line x1={this.props.width} y1={this.calcPos(this.props.value)} x2="0" y2={this.calcPos(this.props.value)} strokeWidth="3" stroke="black"></line>
                </g>
                <g>
                    <circle cx={this.props.width/2} cy={this.calcPos(this.props.value)} r="10"></circle>
                </g>
            </svg>
        )
    }
}