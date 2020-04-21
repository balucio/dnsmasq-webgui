import axios, { AxiosRequestConfig } from 'axios';

export default class Api {

    static call = (method: AxiosRequestConfig["method"], url: string, body?: any): Promise<any> => {

        const axiosConf: AxiosRequestConfig = {
            url: '/dnsapi/' + url,
            method: method,
            headers: {
                'content-type': 'application/json',
            },
            data: body,
        };
        return new Promise((resolve, reject) => {
            axios.request(axiosConf)
                .then((response: { data: any; }) => {
                    if (!response) {
                        return
                    }
                    resolve(response.data);
                })
                .catch(function (error) {
                    console.error(error)
                    const errorMessage = error.response && error.response.data && error.response.data.message
                        ? error.response.data.message
                        : error
                    reject(errorMessage);
                });
        });
    }
}