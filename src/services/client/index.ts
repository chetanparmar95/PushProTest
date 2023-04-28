import axios from 'axios';
// import AsyncStorage from '@react-native-community/async-storage';
import config from '../../config';

/**
 * Request Wrapper with default success/error actions
 */

const request = async function (options: any, external: boolean = false) {
  const header = {
    'Content-Type': 'application/json',
    // add authorization
    ['x-api-key']: config.apiKey,
  };

  const apiConfig = {
    baseURL: external ? options.url : config.endpoint,
    headers: header,
  };

  const get = (url: string, params: object = {}) =>
    axios.get(url, {...apiConfig, params});

  const post = (url: string, data: any, params: any = {}) =>
    axios.post(url, data, {...apiConfig, params});

  const put = (url: string, data: any) => axios.put(url, data, {...apiConfig});

  const onSuccess = function (response: any) {
    console.log('Request Successful!', response);
    return response;
  };

  const onError = function (error: any) {
    console.log('Request Failed:', error.config, error.response);

    if (error.response) {
      // Request was made but server responded with something
      // other than 2xx
      console.debug('Status:', error.response.status);
      console.debug('Data:', error.response.data);
      console.debug('Headers:', error.response.headers);
    } else {
      // Something else happened while setting up the request
      // triggered the error
      console.debug('Error Message:', error.message);
    }

    return Promise.reject(error.response || error.message);
  };

  if (options.method === 'GET') {
    return get(options.url, options.params).then(onSuccess).catch(onError);
  }

  if (options.method === 'POST') {
    return post(options.url, options.data, options.params)
      .then(onSuccess)
      .catch(onError);
  }

  if (options.method === 'PUT') {
    return put(options.url, options.data).then(onSuccess).catch(onError);
  }
};

export default request;
