import got from 'got';

export default class HTTPClient {
  // baseURL = '';
  constructor({ baseURL } = {}) {
    // this.baseURL = baseURL;
    this.client = got.extend({ prefixUrl: baseURL });
  }

  deslash(url) {
    return url && url.charAt(0) === '/' ? url.slice(1, url.length) : url;
  }
  // TODO: add tracing info?
  async get(url) {
    // We dont want the have confusion about beginning slash or not so just take it out if it exists
    const deslashedURL = this.deslash(url);
    console.log('deslashed', deslashedURL);
    return this.client.get(deslashedURL).json();
  }
}
