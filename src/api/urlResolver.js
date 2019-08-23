const apiKey = () => process.env.API_KEY;
const apiRoot = () => 'https://api.mlab.com/api/1/databases/form-constructor/collections/';

export default (url, extraParams) => {
  const params = { ...extraParams, apiKey: apiKey() };
  return `${apiRoot()}${url}?${Object.entries(params).map(([key, value]) => `${key}=${String(value)}`).join('&')}`;
};
