/* eslint-disable @typescript-eslint/no-unused-vars */
import httpStatus  from 'http-status-codes';
import { NextFunction, Request, Response } from "express"
import { catchAsync } from "../../utils/catchAsync"
import { sendResponse } from "../../utils/sendResponse"
import { AuthServices } from './auth.service';
import AppError from '../../errorHelpers/AppError';
import { setAuthCookie } from '../../utils/setCookie';
import { createUserTokens } from '../../utils/userTokens';
import { envVars } from '../../config/env';
import { JwtPayload } from 'jsonwebtoken';
import passport from 'passport';

const credentialsLogin = catchAsync( async(req: Request, res: Response, next: NextFunction) => {

    passport.authenticate("local", async(error: any, user: any, info: any) => {

        if(error){
            // return next(error)
            return next(new AppError(401, error))
        }

        if(!user){
            // return new AppError(401, info.message)
             return next(new AppError(401, info.message))
        }

        const userTokens = await createUserTokens(user);

        const {Password: pass, ...rest} = user.toObject()

        setAuthCookie(res, userTokens);

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Logged in successfully",
        data: {
            accessToken: userTokens.accessToken,
            refreshToken: userTokens.refreshToken,
            user: rest,
        },
    })
    })(req, res, next)

    // const loginInfo = await AuthServices.credentialsLogin(req.body)
    // res.cookie("accessToken", loginInfo.accessToken, {
    //     httpOnly: true,
    //     secure: false,
    // })
    // res.cookie("refreshToken", loginInfo.refreshToken, {
    //     httpOnly: true,
    //     secure: false,
    // })
    
})

const getNewAccessToken = catchAsync( async(req: Request, res: Response, next: NextFunction) => {
    const refreshToken = req.cookies.refreshToken;
    if(!refreshToken){
        throw new AppError(httpStatus.BAD_REQUEST, "No refresh token received from cookies")
    }
    const tokenInfo = await AuthServices.getNewAccessToken(refreshToken)

    //  res.cookie("accessToken", tokenInfo.accessToken, {
    //     httpOnly: true,
    //     secure: false,
    // })

    setAuthCookie(res, tokenInfo);

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "New access token retrived successfully",
        data: tokenInfo,
    })
})
const logout = catchAsync( async(req: Request, res: Response, next: NextFunction) => {
    
    res.clearCookie("accessToken",{
        httpOnly: true,
        secure: false,
        sameSite: "lax",
    })
    res.clearCookie("refreshToken",{
        httpOnly: true,
        secure: false,
        sameSite: "lax",
    })

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Logged out successfully",
        data: null,
    })
})
const resetPassword = catchAsync( async(req: Request, res: Response, next: NextFunction) => {
    
    const decodedToken = req.user;
    const newPassword = req.body.newPassword;
    const oldPassword = req.body.oldPassword;
    await AuthServices.resetPassword(oldPassword, newPassword, decodedToken as JwtPayload)

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Password reset successfully",
        data: null,
    })
})
const googleCallbackController = catchAsync( async(req: Request, res: Response, next: NextFunction) => {

    let redirectTo = req.query.state ? req.query.state as string : "" ;

    if(redirectTo.startsWith("/")){
        redirectTo = redirectTo.slice(1);
    }
    const user = req.user;

    if(!user){
        throw new AppError(httpStatus.NOT_FOUND, "User Not Found")
    }
    const tokenInfo = createUserTokens(user)

    setAuthCookie(res, tokenInfo)
    // sendResponse(res, {
    //     success: true,
    //     statusCode: httpStatus.OK,
    //     message: "Password reset successfully",
    //     data: null,
    // })
    res.redirect(`${envVars.FRONTEND_URL}/${redirectTo}`)
})


export const AuthControllers = {
    credentialsLogin,
    getNewAccessToken,
    logout,
    resetPassword,
    googleCallbackController,
}