import { asyncHandler } from '../utils/asyncHandler.js'
import { ApiError } from '../utils/ApiError.js'

const userRegister = asyncHandler(async (req, res) => {
  const {
    username,
    fullName,
    email,
    phoneNumber,
    password,
    confirmPassword,
    address: { street, city, state, pincode },
    aadharNumber,
  } = req.body

  if (
    [
      username,
      fullName,
      email,
      phoneNumber,
      password,
      confirmPassword,
      address.street,
      address.city,
      address.state,
      address.pincode,
      aadharNumber,
    ].some((field) => field?.trim === '')
  ) {
    throw new ApiError(400, "Please fill all required fileds!!");
  }

  if(password != confirmPassword) throw new ApiError(400, "Password and Confirm Password should be same!!")

  
})

const cameraRegister = asyncHandler(async (req, res) => {})

const adminRegister = asyncHandler(async (req, res) => {})

export { userRegister, cameraRegister, adminRegister }
