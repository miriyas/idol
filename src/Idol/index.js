import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { groupBy } from 'lodash';
import Idol from './Idol';

import styles from './styles.module.scss';

class IdolYears extends Component {
  static propTypes = {
    data: PropTypes.arrayOf(
      PropTypes.shape({
        debutYear: PropTypes.number.isRequired,
        major: PropTypes.bool,
        name: PropTypes.string.isRequired,
        category: PropTypes.string.isRequired,
      })
    ).isRequired,
  };

  render() {
    const { data } = this.props;
    const years = groupBy(data, 'debutYear');
    return (
      <div className={styles.years}>
        {Object.keys(years).map(year => {
          return (
            <Fragment key={`year-wrapper-${year}`}>
              <label>{year}</label>
              <ul key={`year-list-${year}`} className={styles.year}>
                {years[year].map(idol => <Idol key={idol.name} data={idol} />)}
              </ul>
            </Fragment>
          )
        })}
      </div>
    );
  }
}

export default IdolYears;
