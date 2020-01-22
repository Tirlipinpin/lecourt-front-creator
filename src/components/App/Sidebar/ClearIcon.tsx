import React, { PureComponent } from 'react';
import posed from 'react-pose';

import { Icon } from 'antd';

export interface ClearIconProps {
    termLength: Number
    onChangeSearchTerm: (({}) => void)
}

const Box = posed.span({
    hidden: {
        opacity: 0,
        transition: {
            duration: 300,
        },
    },
    visible: {
        opacity: 1,
        transition: {
            duration: 300,
        },
    },
});

export default class ClearIcon extends PureComponent<ClearIconProps> {
    render() {
        const { termLength, onChangeSearchTerm } = this.props;

        return (
            <Box pose={ termLength > 0 ? 'visible': 'hidden' } >
                <Icon
                    type="close-circle"
                    onClick={() => onChangeSearchTerm({ target: { value: '' } })}
                    theme="filled"
                />
            </Box>
        );
    }
}
