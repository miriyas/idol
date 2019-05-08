import React, { Component } from 'react';
import IdolYears from './Idol';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.initPackery();
  }

  componentDidMount() {
    const content = document.querySelector('.App');
    const insertTarget = document.querySelector('.yearsNav');
    scrollnav.init(content, {
      debug: false,
      insertTarget: insertTarget,
      insertLocation: 'append'
    });
  }

  render() {
    return (
      <div className="App">
        <IdolYears />
      </div>
    );
  }

  initPackery() {
    const PackeryMode = Isotope.LayoutMode.modes.packery;
    const __resetLayout = PackeryMode.prototype._resetLayout;
    PackeryMode.prototype._resetLayout = function() {
      __resetLayout.call( this );
      // reset packer
      const parentSize = getSize( this.element.parentNode );
      const colW = this.columnWidth + this.gutter;
      this.fitWidth = Math.floor( ( parentSize.innerWidth + this.gutter ) / colW ) * colW;
      this.packer.width = this.fitWidth;
      this.packer.height = Number.POSITIVE_INFINITY;
      this.packer.reset();
    };

    PackeryMode.prototype._getContainerSize = function() {
      return {
        width: this.fitWidth - this.gutter,
        height: this.maxY - this.gutter
      };
    };

    // always resize
    PackeryMode.prototype.needsResizeLayout = function() {
      return true;
    };
  }
}

export default App;
