import React from 'react';

import MusicVisualizer from './musicVisualizer.jsx';

export default class App extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <MusicVisualizer/>
      </div>
    );
  }
}