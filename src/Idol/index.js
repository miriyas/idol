import React, { Component } from 'react';
import { groupBy } from 'lodash';
import autobind from 'autobind-decorator';
import Top from './Top';
import IdolYear from './IdolYear';
import IdolConstants from '../shared/IdolConstants';

import styles from './styles.module.scss';

function layout(year) {
  window.tm = setTimeout(() => {
    window.iso[year].layout();
  }, 500);
}

@autobind
class IdolYears extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: null,
      selectedYear: null
    };
    window.iso = {};
  }

  componentWillUpdate(nextProps, nextState) {
    return (
      this.state.selected !== nextState.selected
    );
  }

  componentWillUnmount() {
    window.tm = null;
  }

  render() {
    const { selected, selectedYear } = this.state;
    const years = groupBy(IdolConstants, 'debutYear');
    return (
      <div className={styles.years}>
        <Top />
        {Object.keys(years).map(year => {
          return (
            <IdolYear
              key={`year-wrapper-${year}`}
              year={year}
              data={years[year]}
              setSelected={this.setSelected}
              selected={selected}
              selectedYear={selectedYear}
            />
          )
        })}
      </div>
    );
  }

  setSelected(selected, selectedYear) {
    this.setState({
      selected,
      selectedYear
    });
    layout(selectedYear);
  }
};

export default IdolYears;
