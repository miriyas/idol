import React, { Component } from 'react';
import PropTypes from 'prop-types';
import autobind from 'autobind-decorator';
import memobind from 'memobind';
import cx from 'classnames';

import styles from './styles.module.scss';

@autobind
class Idol extends Component {
  static propTypes = {
    data: PropTypes.shape({
      debutYear: PropTypes.number.isRequired,
      major: PropTypes.bool,
      name: PropTypes.string.isRequired,
      category: PropTypes.string.isRequired,
      youtube: PropTypes.shape({
        url: PropTypes.string,
        start: PropTypes.number
      }),
    })
  };

  constructor(props) {
    super(props);
    this.state = {
      selected: null
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (
      this.props.data !== nextProps.data
      || this.state.selected !== nextState.selected
    );
  }

  render() {
    console.log('render');
    const { major, name, category, youtube } = this.props.data;
    let youtubeCode;
    if (this.state.selected === name && youtube) {
      const youtubeUrl = `https://www.youtube.com/embed/${youtube.url}?controls=0&amp;start=${youtube.start};autoplay=1`
      youtubeCode = <iframe width="0" height="0" src={youtubeUrl} frameBorder="0" allow="accelerometer; autoplay;" allowFullScreen />
    }

    return (
      <div
        className={cx(styles.idol, styles[category], { [styles.major]: major })}
        onMouseEnter={memobind(this, 'handleOnMouseEnter', name)}
        onMouseLeave={this.handleOnMouseLeave}
      >
        <div className={styles.picture} style={{ backgroundImage: `url(./images/idols/${name}.jpg)` }} />
        <p className={styles.name}>{name}</p>
        {youtubeCode}
      </div>
    );
  }

  handleOnMouseEnter(name) {
    console.log('handleOnMouseEnter');
    if (!this.state.selected) {
      console.log(name);
      this.setState({
        selected: name
      });
    }
  }

  handleOnMouseLeave() {
    console.log('handleOnMouseLeave');
    if (this.state.selected) {
      console.log('go null');
      this.setState({
        selected: null
      });
    }
  }
}

export default Idol;
