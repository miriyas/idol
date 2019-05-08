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
      desc: PropTypes.shape({
        namu: PropTypes.string,
        naver: PropTypes.string,
        melon: PropTypes.string
      }),
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
    const { major, name, category, youtube, desc, debutYear, endYear } = data;
    const isSelected = selected === name;

    let youtubeCode;
    if (isSelected && youtube) {
      const youtubeUrl = `https://www.youtube.com/embed/${youtube.url}?controls=0&amp;start=${youtube.start};autoplay=1;modestbranding=1`
      youtubeCode = <iframe width="228" height="152" src={youtubeUrl} frameBorder="0" allow="accelerometer; autoplay;" allowFullScreen />
    }

    let pictureStyle;
    if (youtube && youtube.url !== '') {
      pictureStyle = { backgroundImage: `url(./images/idols/${name.replace('#', '').replace(/\s/g, '')}.jpg)` }
    }

    let nameCode = <p className={styles.name}>{name}</p>;
    if (isSelected && endYear) {
      nameCode = <p className={styles.name}>{name}<span>{` (주 활동 : ${debutYear} - ${endYear})`}</span></p>;
    }

    let descCode;
    if (desc) {
      descCode = (
        <div className={styles.desc}>
          {desc.title && <p className={styles.title}>{desc.title}</p>}
          {desc.namu && <a href={desc.namu} target="_blank" rel="noopener noreferrer" className={styles.link}>나무위키</a>}
          {desc.naver && <a href={desc.naver} target="_blank" rel="noopener noreferrer" className={styles.link}>네이버</a>}
          {desc.melon && <a href={desc.melon} target="_blank" rel="noopener noreferrer" className={styles.link}>멜론</a>}
        </div>
      );
    }

    return (
      <div
        className={cx(`grid-item-${debutYear}`, styles.idol, styles[category], { [styles.major]: major, [styles.selected]: isSelected })}
        onClick={memobind(this, 'handleOnClick', data)}
        data-major={major === true ? 'major' : 'minor'}
      >
        <div className={styles.twrapper}>
          <div className={styles.top}>
            <div className={styles.picture} style={pictureStyle} />
            {descCode}
          </div>
          {nameCode}
          {youtubeCode}
        </div>
      </div>
    );
  }

  // handleOnClick(youtube) {
  //   if (youtube) {
  //     window.open(`https://www.youtube.com/watch?v=${youtube.url}`, '_blank');
  //   }
  // }

  handleOnClick(data) {
    const { name, debutYear, youtube } = data;
    if (this.props.selected === name) {
      console.log('cancel');
      this.props.setSelected(null, debutYear);
    } else if (youtube) {
      console.log(name);
      this.props.setSelected(name, debutYear);
    } else {
      console.log('go null');
      this.props.setSelected(null, debutYear);
    }
  }
}

export default Idol;
