const asyncHandler = (fn) => async (req, res, next) => {
  try {
    return await fn(req, res, next)
  } catch (err) {
    return res.status(err.code || 500).json({
      message: err.message || 'Something Went Wrong',
      success: false,
    })
  }
}

export { asyncHandler }
