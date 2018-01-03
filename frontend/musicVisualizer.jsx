import React from 'react';
import init from './musicVisualizerUtil.js';
import soundFile from './music/test.mp3';

export default class MusicVisualizer extends React.Component {
  constructor(props) {
    super(props);
    console.log('musicVisualizer loaded');
  }

  componentDidMount() {
    init(soundFile);
  }

  render() {
    return(
      <div>
        <div id="audioPlayer">
        </div>
        <canvas id="musicVisualizer" width="640" height="100"></canvas>
      </div>
    );
  }
}