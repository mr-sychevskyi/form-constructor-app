const apiKey = process.env.API_KEY;
const baseURL = 'https://api.mlab.com/api/1/databases/form-constructor/collections';

export default (endpoint, extraParams) => {
  const params = { ...extraParams, apiKey };
  return `${baseURL}/${endpoint}?${Object.entries(params).map(([key, value]) => `${key}=${String(value)}`).join('&')}`;
};
