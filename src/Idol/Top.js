import React, { Component } from 'react';
import cx from 'classnames';
import memobind from 'memobind';
import autobind from 'autobind-decorator';
import axios from 'axios';

import styles from './styles.module.scss';

const categories = [
  {
    key: 'mixed-group',
    name: '혼성그룹'
  },
  {
    key: 'girl-group',
    name: '걸그룹'
  },
  {
    key: 'boy-group',
    name: '보이그룹'
  },
  {
    key: 'girl-solo',
    name: '여성솔로'
  },
  {
    key: 'boy-solo',
    name: '남성솔로'
  }
];


@autobind
class Top extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filter: null
    };

    fetch('http://www.maniadb.com/api/search/metallica/?sr=artist&display=10&key=example&v=0.5?callback=foo', {
    method: 'get',
    mode: 'no-cors',
}).then(e => {
    console.log(e);
    console.log('xWorks!');
});


    axios.get('http://www.maniadb.com/api/search/metallica/?sr=artist&display=10&key=example&v=0.5?callback=foo', { crossdomain: true }).then(res => {
      console.log(res);
    })
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (
      this.state.filter !== nextState.filter
    );
  }

  render() {
    return (
      <div className={styles.topSection}>
        <div className={styles.desc}>96년부터 현재까지 활동한 한국 아이돌을 정리중입니다. 소스는 나무위키 <a href="https://namu.wiki/w/%ED%95%9C%EA%B5%AD%20%EC%95%84%EC%9D%B4%EB%8F%8C/%EC%97%AD%EC%82%AC" target="_blank" rel="noopener noreferrer">한국 아이돌/역사</a> 문서이며, 굵게 표시한 부분도 나무위키의 기준을 따랐습니다. 사진이 있는 항목을 클릭하면 해당 가수의 대표곡이 자동 재생됩니다. (모바일에선 반자동) 일부 항목은 나무위키 / 네이버뮤직 / 멜론의 링크를 포함하고 있습니다. 대표 사진은 구할 수 있는 한 가장 오래되고 촌스러운 사진을 골랐습니다.
        </div>
        <ul className={styles.filter}>
          <li key="filter-all" onClick={memobind(this, 'filter', 'all')}>전체</li>
          {categories.map(c => {
            return <li key={`filter-${c.key}`} onClick={memobind(this, 'filter', c.key)}>{c.name}</li>;
          })}
        </ul>
        <div className={cx('yearsNav', styles.yearsNav)} />
      </div>
    );
  }

  filter(category) {
    Object.keys(window.iso).map(key => {
      window.iso[key].arrange({ filter: `.category-${category}` });
    });
    this.setState({
      filter: category
    });
    scrollnav.updatePositions();
  }
}

export default Top;
