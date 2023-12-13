const promiseHandler = (fn) => async (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch((err) => next(err))
}