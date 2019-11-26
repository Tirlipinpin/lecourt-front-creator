import React from 'react';
import { Spin, Icon } from 'antd';

export interface ILoaderProps {
  size?: number | string
}

export const Loader = ({ size }: ILoaderProps): React.ReactElement => (
  <Spin
    indicator={<Icon type="loading" style={{ fontSize: size, color: '#FF5242' }} />}
  />
);

export default Loader;
