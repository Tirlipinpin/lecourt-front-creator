import React from 'react';
import axios, { AxiosResponse, AxiosError } from 'axios';
import { Modal } from 'antd';

export default (logout: () => void) =>  {
    axios.interceptors.response.use((response: AxiosResponse) => {
        return response;
    }, (error: AxiosError) => {
        if (error.response && error.response.status === 401) {
            Modal.error({
                title: 'You have been disconnected',
                content: (
                    <div>
                        <p>Please log in to continue watching shorts!</p>
                    </div>
                ),
                onOk() {
                    logout();
                },
            });
        }
    });
}
