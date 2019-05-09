import React, { Component } from 'react';
import PropTypes from 'prop-types';
import autobind from 'autobind-decorator';
import memobind from 'memobind';
import cx from 'classnames';
import axios from 'axios';
import convert from 'xml-js';
import { throttle } from 'lodash';

import styles from './Idol.module.scss';

@autobind
class Idol extends Component {
  static propTypes = {
    selected: PropTypes.string,
    setSelected: PropTypes.func.isRequired,
    reLayout: PropTypes.func.isRequired,
    data: PropTypes.shape({
      debutYear: PropTypes.number.isRequired,
      major: PropTypes.bool,
      name: PropTypes.string.isRequired,
      searchName: PropTypes.string,
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

  constructor(props) {
    super(props);
    this.state = {
      result: null
    };
    this.throttledSearchArtist = throttle(this.searchArtist, 1000);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.data.name !== nextProps.selected) {
      this.setState({
        result: null
      });
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    let slided = false;
    if (
      (this.props.selected === this.props.data.name && nextProps.selected !== this.props.selected) // 선택이 풀렸을 때
      || (this.props.selected !== this.props.data.name && nextProps.selected === this.props.data.name) // 선택이 되었을 때
    ) {
      slided = true;
    }

    return (
      this.props.data !== nextProps.data
      || this.state.result !== nextState.result
      || slided
    );
  }

  render() {
    const { data, selected } = this.props;
    const { result } = this.state;
    const { major, name, category, youtube, desc, debutYear, searchName } = data;
    const isSelected = selected === name;

    let youtubeCode;
    if (isSelected && youtube && youtube.url !== '') {
      const youtubeUrl = `https://www.youtube.com/embed/${youtube.url}?controls=0&amp;start=${youtube.start};autoplay=1;modestbranding=1;playsinline=1`
      youtubeCode = <iframe width="292" height="184" src={youtubeUrl} frameBorder="0" allow="accelerometer; autoplay;" allowFullScreen />
    }

    let pictureStyle = { backgroundImage: `url(./images/idols/${name.replace('#', '').replace('*', '').replace(/\s/g, '').replace('(', '').replace(')', '')}.jpg)` }

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

    let fullDescCode;
    if (isSelected && result) {
      fullDescCode = (
        <div className={styles.fullDesc}>
          {result.demo && <p className={styles.demo}>분류 : {result.demo}</p>}
          {result.desc && <p className={styles.desc}>{result.desc}</p>}
          {result.artist && <p className={styles.member}>구성원 : {result.artist}</p>}
          {result.songs && <p className={styles.songs}>주요곡 : {result.songs}</p>}
          {descCode}
        </div>
      );
    }

    const style = cx(
      `grid-item-${debutYear}`,
      styles.idol,
      'category-all', `category-${category}`, styles[category],
      {
        [styles.major]: major,
        [styles.noClick]: searchName === 'null',
        [styles.selected]: isSelected && ((youtube && youtube.url !== '') || result),
        [styles.fullDesc]: fullDescCode && youtubeCode
      }
    );

    return (
      <div
        className={style}
        data-major={major === true ? 'major' : 'minor'}
      >
        <div className={styles.twrapper}>
          <div className={styles.top}>
            <div className={styles.picture} style={pictureStyle} onClick={memobind(this, 'handleOnClick', data)} />
          </div>
          <p className={styles.name}>{name}</p>
          <p className={styles.period}>{result && result.period && ` (활동기 : ${result.period})`}</p>
          {fullDescCode}
          {youtubeCode}
        </div>
      </div>
    );
  }

  async searchArtist(data) {
    const { name, searchName, searchIndex, debutYear } = data;
    console.log(name);

    const isChrome = window.navigator.userAgent.toLowerCase().indexOf('chrome') !== -1;
    if (searchName !== 'null' && isChrome) {
      let result = {};
      await axios.get(`http://localhost:9000/testAPI/${searchName || name}`)
      .then(function (response) {
        const json = convert.xml2js(response.data, { compact: true });
        let { item } = json.rss.channel;
        if (Array.isArray(item)) {
          item = item[searchIndex || 0];
        };

        if (item) {
          if (item.title) result.title = item.title._cdata;
          if (item.description) result.desc = item.description._cdata;
          if (item.demographic) result.demo = item.demographic._cdata;
          if (item.image) result.image = item.image._cdata;
          if (item['maniadb:majorsonglist']) result.songs = item['maniadb:majorsonglist']._cdata.replace(/&nbsp;/g, ' ');
          if (item.period) result.period = item.period._cdata;
          if (item['maniadb:relatedartistlist']) result.artist = item['maniadb:relatedartistlist']._cdata;
        }
      })
      .catch(function (error) {
        console.log(error);
      });

      this.setState({
        result
      });
      this.props.reLayout(debutYear);
    } else {
      this.setState({
        result: null
      });
      this.props.reLayout(debutYear);
    }
  }

  async handleOnClick(data) {
    const { name, debutYear } = data;
    if (this.props.selected === name) {
      console.log('cancel');
      this.setState({
        result: null
      });
      this.props.setSelected(null, debutYear);
    } else {
      console.log('GET full');
      this.throttledSearchArtist(data);
      this.props.setSelected(name, debutYear);
    }
  }
}

export default Idol;
