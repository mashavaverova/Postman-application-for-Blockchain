/*Class for creating standardized response objects with properties indicating 
success/failure, 
status code, 
error message, 
number of items in the data, 
and the data returned.*/

export default class ResponseModel {
  constructor({ statusCode = 404, data = null, error = null }) {
    this.success = false;
    this.statusCode = statusCode;
    if (statusCode >= 200 && statusCode < 299) this.success = true;

    this.error = error;
    if (data && data.chain) {
      this.items = data.chain.length;
    } else {
      this.items = 0;
    }

    this.data = data;
  }
}
