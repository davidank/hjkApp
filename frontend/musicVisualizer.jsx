import React from 'react';
import init from './musicVisualizerUtil.js';
import soundFile from './music/test.mp3';

export default class MusicVisualizer extends React.Component {
  constructor(props) {
    super(props);
    console.log('musicVisualizer loaded');
  }

  componentDidMount() {
    init();
  }

  render() {
    return(
      <div>
        <div>
          <audio controls>
            <source src={soundFile} type="audio/mpeg"/>
          </audio>
        </div>
        <canvas id="musicVisualizer"></canvas>
      </div>
    );
  }
}