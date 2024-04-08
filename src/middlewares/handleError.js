// import createError from "http-errors";

export class HandleError {
  static catchErrors(fn) {
    return (req, res, next) => {
      Promise.resolve(fn(req, res, next)).catch(next);
    };
  }


}
