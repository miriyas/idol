import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { groupBy } from 'lodash';
import Idol from './Idol';

import styles from './styles.module.scss';

function IdolYears({ data }) {
  const years = groupBy(data, 'debutYear');
  return (
    <div className={styles.years}>
      {Object.keys(years).map(year => {
        return (
          <Fragment key={`year-wrapper-${year}`}>
            <label>{year}년</label>
            <ul key={`year-list-${year}`} className={styles.year}>
              {years[year].map(idol => <Idol key={idol.name} data={idol} />)}
            </ul>
          </Fragment>
        )
      })}
    </div>
  );
};

IdolYears.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      debutYear: PropTypes.number.isRequired,
      major: PropTypes.bool,
      name: PropTypes.string.isRequired,
      category: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default IdolYears;
