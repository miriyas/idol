import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import styles from './styles.module.scss';

class Idol extends Component {
  static propTypes = {
    data: PropTypes.shape({
      debutYear: PropTypes.number.isRequired,
      major: PropTypes.bool,
      name: PropTypes.string.isRequired,
      category: PropTypes.string.isRequired,
    })
  };

  render() {
    const { major, name, category } = this.props.data;
    return (
      <div className={cx(styles.idol, styles[category], { [styles.major]: major })}>
        <div className={styles.picture} style={{ backgroundImage: `url(./images/idols/${name}.jpg)` }} />
        <p className={styles.name}>{name}</p>
      </div>
    );
  }
}

export default Idol;
