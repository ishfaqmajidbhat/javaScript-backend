import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const verifyJWT = asyncHandler(async (req, res, next) => {
  try {
    const token =
      req.cookies?.accessToken ||
      req.headers("Authorization")?.replace("Brearer ", "");
    if (!token) {
      throw new ApiError(401, "Unauthorized request");
    }

    const decodedToken = await jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET
    );
    const user = await User.findById(decodedToken?._id).select(
      "-password -refreshToken"
    );
    if (!user) {
      throw new ApiError(401, "invalid accessToken");
    }
    req.user = user;
    next();
  } catch (error) {
    throw new ApiError(410, error?.message || "invalid access Token");
  }
});
export { verifyJWT };
