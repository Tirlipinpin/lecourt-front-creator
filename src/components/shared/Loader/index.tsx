import React from 'react';
import { Spin, Icon } from 'antd';
import styles from './index.module.scss';

export interface ILoaderProps {
  size?: number | string
  className?: string
}

export const Loader = ({ size, className }: ILoaderProps): React.ReactElement => (
  <Spin
      className={className}
      indicator={
        <Icon
            className={styles.loader}
            style={{ fontSize: size }}
            type="loading"
        />
      }
  />
);

export default Loader;
