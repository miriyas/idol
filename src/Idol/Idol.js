import React, { Component } from 'react';
import PropTypes from 'prop-types';
import autobind from 'autobind-decorator';
import memobind from 'memobind';
import cx from 'classnames';

import styles from './styles.module.scss';


@autobind
class Idol extends Component {
  static propTypes = {
    selected: PropTypes.string,
    setSelected: PropTypes.func.isRequired,
    data: PropTypes.shape({
      debutYear: PropTypes.number.isRequired,
      major: PropTypes.bool,
      name: PropTypes.string.isRequired,
      category: PropTypes.string.isRequired,
      youtube: PropTypes.shape({
        url: PropTypes.string,
        start: PropTypes.number
      }),
      desc: PropTypes.string
    })
  };

  shouldComponentUpdate(nextProps) {
    return (
      this.props.data !== nextProps.data
      || this.props.selected !== nextProps.selected
    );
  }

  render() {
    const { data, selected } = this.props;
    const { major, name, category, youtube, desc, debutYear } = data;
    const isSelected = selected === name;
    let youtubeCode;
    if (isSelected && youtube) {
      const youtubeUrl = `https://www.youtube.com/embed/${youtube.url}?controls=0&amp;start=${youtube.start};autoplay=1`
      youtubeCode = <iframe width="0" height="0" src={youtubeUrl} frameBorder="0" allow="accelerometer; autoplay;" allowFullScreen />
    }

    return (
      <div
        className={cx(`grid-item-${debutYear}`, styles.idol, styles[category], { [styles.major]: major, [styles.selected]: isSelected })}
        onClick={memobind(this, 'handleOnClick', name, debutYear)}
        data-major={major === true ? 'major' : 'minor'}
      >
        <div className={styles.top}>
          <div className={styles.picture} style={{ backgroundImage: `url(./images/idols/${name.replace('#', '').replace(/\s/g, '')}.jpg)` }} />
          <div className={styles.desc}>
            {desc && `"${desc}"`}
          </div>
        </div>
        <p className={styles.name}>{name}</p>
        {youtubeCode}
      </div>
    );
  }

  // handleOnClick(youtube) {
  //   if (youtube) {
  //     window.open(`https://www.youtube.com/watch?v=${youtube.url}`, '_blank');
  //   }
  // }

  handleOnClick(name, debutYear) {
    if (this.props.selected === name) {
      console.log('go null');
      this.props.setSelected(null, debutYear);
    } else {
      console.log(name);
      this.props.setSelected(name, debutYear);
    }
  }
}

export default Idol;
