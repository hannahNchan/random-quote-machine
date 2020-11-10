import URL_STRING from '../constants';

const api = async () => {
  const body = await fetch(URL_STRING)
  return body.json();
}

export default api;
