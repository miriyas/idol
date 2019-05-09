import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import autobind from 'autobind-decorator';
import cx from 'classnames';
import YearConstants from '../shared/YearConstants';
import Idol from './Idol';

import styles from './styles.module.scss';

@autobind
class IdolYear extends Component {
  static propTypes = {
    year: PropTypes.string.isRequired,
    selected: PropTypes.string,
    setSelected: PropTypes.func.isRequired,
    selectedYear: PropTypes.number,
    reLayout: PropTypes.func.isRequired,
    data: PropTypes.arrayOf(
      PropTypes.shape({
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
      }).isRequired
    )
  };

  componentDidMount() {
    const { year } = this.props;
    const elem = document.querySelector(`.grid-${year}`);
    window.iso[year] = new Isotope( elem, {
      itemSelector: `.grid-item-${year}`,
      layoutMode: 'packery',
      transitionDuration: 300,
      packery: {
        gutter: 28,
        columnWidth: 100,
        fitWidth: true
      },
      getSortData: {
        major: '[data-major]'
      },
      sortBy: 'major'
    });
  }

  shouldComponentUpdate(nextProps) {
    return (
      this.props.data !== nextProps.data
      || this.props.selected !== nextProps.selected
    );
  }

  componentDidUpdate(prevProps) {
    // 타 연도에서 클릭시 기존 연도 레이아웃 업데이트
    if (
      prevProps.selectedYear
      && this.props.selectedYear !== prevProps.selectedYear
      && this.props.selectedYear !== this.props.year
    ) {
      window.iso[prevProps.selectedYear].layout();
    }
  }

  render() {
    const { year, data, selected } = this.props;

    return (
      <Fragment >
        <h2>{year}년</h2>
        {YearConstants[year] && <p className={styles.yearDesc}>{YearConstants[year].desc}</p>}
        <ul key={`year-list-${year}`} className={cx(`grid-${year}`, styles.year)}>
          {data.map(idol => <Idol key={idol.name} data={idol} selected={selected} setSelected={this.props.setSelected} reLayout={this.props.reLayout} />)}
        </ul>
      </Fragment>
    );
  }
}

export default IdolYear;
