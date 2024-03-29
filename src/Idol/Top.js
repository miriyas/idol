import React, { Component } from 'react';
import cx from 'classnames';
import memobind from 'memobind';
import autobind from 'autobind-decorator';

import styles from './Top.module.scss';

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
      filter: 'all'
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (
      this.state.filter !== nextState.filter
    );
  }

  render() {
    return (
      <div className={cx(styles.topSection, styles.centering)}>
        <div className={styles.desc}>
          <p>96년부터 현재까지 활동한 한국 아이돌을 정리중입니다. 소스는 나무위키 <a href="https://namu.wiki/w/%ED%95%9C%EA%B5%AD%20%EC%95%84%EC%9D%B4%EB%8F%8C/%EC%97%AD%EC%82%AC" target="_blank" rel="noopener noreferrer">한국 아이돌/역사</a> 문서이며, 굵게 표시한 부분도 나무위키의 기준을 따랐습니다. 일부 항목 사진을 클릭하면 해당 가수의 대표곡이 자동 재생됩니다. (모바일에선 반자동) 또한 maniaDB의 API를 이용하여 멤버 정보 / 주요곡 정보를 볼 수도 있습니다.(데스크탑에서만 가능) 일부 항목은 나무위키 / 네이버뮤직 / 멜론의 링크를 포함하고 있습니다. 대표 사진은 구할 수 있는 한 가장 오래되고 촌스러운 사진을 골랐습니다.</p>
          <p>현기증 주의 : 본 페이지 개발자는 SS501을 에스에스 오공일이라고 읽습니다. 하지만 god의 노래를 듣고 추억에 잠기기도 하지요.<br />468명 대량 편집의 부작용으로 의도하지 않은 얼굴 교체  miriya.lee@gmail.com으로 신고해주세요.</p>
        </div>
        <ul className={styles.filter}>
          <li key="filter-all" onClick={memobind(this, 'filter', 'all')} className={cx({ [styles.selected]: this.state.filter === 'all' })}>전체</li>
          {categories.map(c => {
            return <li key={`filter-${c.key}`} onClick={memobind(this, 'filter', c.key)} className={cx({ [styles.selected]: this.state.filter === c.key })}>{c.name}</li>;
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
