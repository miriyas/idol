import React, { Component } from 'react';
import PropTypes from 'prop-types';
import autobind from 'autobind-decorator';
import memobind from 'memobind';
import cx from 'classnames';
import axios from 'axios';
import convert from 'xml-js';
import { throttle } from 'lodash';

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

  async componentWillMount() {
    const { name, searchName, debutYear } = this.props.data;
    if (debutYear > 2006) {
      console.log(1);
      const result = await this.throttledSearchArtist(searchName || name);
      this.setState({
        result
      });
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (
      this.props.data !== nextProps.data
      || this.props.selected !== nextProps.selected
      || this.state.result !== nextState.result
    );
  }

  render() {
    const { data, selected } = this.props;
    const { result } = this.state;
    const { major, name, category, youtube, desc, debutYear } = data;
    const isSelected = selected === name;

    let youtubeCode;
    if (isSelected && youtube) {
      const youtubeUrl = `https://www.youtube.com/embed/${youtube.url}?controls=0&amp;start=${youtube.start};autoplay=1;modestbranding=1;playsinline=1`
      youtubeCode = <iframe width="228" height="152" src={youtubeUrl} frameBorder="0" allow="accelerometer; autoplay;" allowFullScreen />
    }

    let pictureStyle;
    // if (result && result.image) {
      pictureStyle = { backgroundImage: `url(./images/idols/${name.replace('#', '').replace(/\s/g, '')}.jpg)` }
    // }

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

    let nameCode = <p className={styles.name}>{name}</p>;

    let fullDescCode;
    if (isSelected && result) {
      nameCode = <p className={styles.name}>{name}<span>{` (활동기 : ${result.period})`}</span></p>;
      fullDescCode = (
        <div className={styles.fullDesc}>
          <p className={styles.demo}>분류 : {result.demo && result.demo}</p>
          {result.desc && <p className={styles.desc}>{result.desc}</p>}
          {result.artist && <p className={styles.member}>구성원 : {result.artist}</p>}
          {result.songs && <p className={styles.songs}>주요곡 : {result.songs}</p>}
        </div>
      );
    }

    const style = cx(
      `grid-item-${debutYear}`,
      styles.idol,
      'category-all', `category-${category}`, styles[category],
      {
        [styles.major]: major,
        [styles.selected]: isSelected,
        [styles.fullDesc]: fullDescCode
      }
    );

    return (
      <div
        className={style}
        data-major={major === true ? 'major' : 'minor'}
      >
        <div className={styles.twrapper}>
          <div className={styles.top}>
            <img src={result && result.image} className={styles.picture}/>
            {/* <div className={styles.picture} style={pictureStyle} onClick={memobind(this, 'handleOnClick', data)} /> */}
            {descCode}
          </div>
          {nameCode}
          {fullDescCode}
          {youtubeCode}
        </div>
      </div>
    );
  }

  async searchArtist(name) {
    console.log(name);
    let result = {};
    await axios.get(`http://localhost:9000/testAPI/${name}`)
      .then(function (response) {
        const json = convert.xml2js(response.data, { compact: true });
        let { item } = json.rss.channel;
        if (Array.isArray(item)) item = item[0];

        console.log(item);
        if (item) {
          if (item.title) result.title = item.title._cdata;
          if (item.description) result.desc = item.description._cdata;
          if (item.demographic) result.demo = item.demographic._cdata;
          if (item.image) result.image = item.image._cdata;
          if (item['maniadb:majorsonglist']) result.songs = item['maniadb:majorsonglist']._cdata;
          if (item.period) result.period = item.period._cdata;
          if (item['maniadb:relatedartistlist']) result.artist = item['maniadb:relatedartistlist']._cdata;
        }
      })
      .catch(function (error) {
        console.log(error);
      });
    return result;
  }

  async handleOnClick(data) {
    const { name, debutYear, searchName } = data;
    if (this.props.selected === name) {
      console.log('cancel');
      this.setState({
        result: null
      });
      this.props.setSelected(null, debutYear);
    } else {
      console.log('GET full');
      if (searchName !== 'null') {
        const result = await this.throttledSearchArtist(searchName || name);
        this.setState({
          result
        });
      }
      this.props.setSelected(name, debutYear);
    }
  }
}

export default Idol;
