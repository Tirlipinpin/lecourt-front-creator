import React from 'react';
import { Spin, Icon } from 'antd';
import styles from './index.module.scss';

export interface ILoaderProps {
  size?: number | string
}

export const Loader = ({ size }: ILoaderProps): React.ReactElement => (
  <Spin
    indicator={<Icon className={styles.loader} style={{ fontSize: size }} type="loading"  />}
  />
);

export default Loader;
