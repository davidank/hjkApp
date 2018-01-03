import React from 'react';
import init from './musicVisualizerUtil.js';

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
        <canvas id="musicVisualizer"></canvas>
      </div>
    );
  }
}