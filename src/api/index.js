import urlResolver from './urlResolver';

const CONTENT_TYPE_JSON = 'application/json;charset=UTF-8';

export class api {
  static get(url, extraParams = {}) {
    return fetch(urlResolver(url, extraParams), { method: 'GET' });
  }

  static post(url, body, extraParams = {}) {
    const POST_CONFIG = { method: 'POST', headers: { 'Content-Type': CONTENT_TYPE_JSON } };

    return fetch(urlResolver(url, extraParams), { ...POST_CONFIG, body: JSON.stringify(body) });
  }

  static put(url, body, extraParams = {}) {
    const PUT_CONFIG = { method: 'PUT', headers: { 'Content-Type': CONTENT_TYPE_JSON } };

    return fetch(urlResolver(url, extraParams), { ...PUT_CONFIG, body: JSON.stringify(body) });
  }

  static remove(url, extraParams = {}) {
    return fetch(urlResolver(url, extraParams), { method: 'DELETE' });
  }
}

export const callApi = params => dispatch => {
  const [requestType, successType, errorType] = params.types;
  const handleErrors = res => {
    if (!res.ok) throw Error(`${res.status} (${res.statusText})`);
    return res.json();
  };

  dispatch(requestType());
  params.action()
    .then(handleErrors)
    .then(response => dispatch(successType(response)))
    .catch(error => dispatch(errorType(error)));
};
