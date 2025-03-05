import { AxiosResponse } from 'axios';

export function canIgnoreToast(response: AxiosResponse) {
  if (
    response.config.url === '/api/v3/settings/globals' &&
    response.config.method === 'patch'
  ) {
    const body = JSON.parse(response.config.data);
    return 'logo_image' in body || 'login_image' in body || 'favicon' in body;
  }
  if (
    response.config.url === '/api/v3/files' &&
    response.config.method === 'put'
  ) {
    const body = JSON.parse(response.config.data);
    return body.name.includes('attachment-');
  }
  if (
    response.config.url?.includes('/api/v3/cmms/tickets/') &&
    response.config.url?.includes('/status') &&
    response.config.method === 'patch'
  ) {
    return true;
  }
  if (
    response.config.url?.includes('/subscription/v1/subscriptions/customer/') &&
    response.config.url?.includes('/query-products') &&
    response.config.method === 'post'
  ) {
    return true;
  }
  return false;
}
