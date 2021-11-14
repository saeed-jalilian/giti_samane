import axios from "axios";
import {message} from "antd";

axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.post['Accept'] = 'application/json';
axios.defaults.headers.get['Content-Type'] = 'application/json';
axios.defaults.headers.get['Accept'] = 'application/json';
axios.defaults.baseURL = process.env.BackendApiUrl

/*axios.interceptors.response.use(null, error => {
  const expectedErrors = error.response && error.response.status >= 400 && error.response.status < 500;
  if (!expectedErrors) {
    message.warning({
      content: 'مشکلی از سمت سرور رخ داده است.',
    })
  }

  return Promise.reject(error);

})*/

// eslint-disable-next-line
export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  patch: axios.patch
}
