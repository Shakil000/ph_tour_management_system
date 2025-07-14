import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status-codes"
import { UserServices } from "./user.service";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
// import AppError from "../../errorHelpers/AppError";


const createUser = catchAsync( async(req: Request, res: Response, next: NextFunction) => {
    const user = await UserServices.createUser(req.body)

    // res.status(httpStatus.CREATED).json({
    //     message: "User Created Successfully",
    //     user
    // })

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        message: "User Created Successfully",
        data: user,
    })
})

const getAllUsers = catchAsync(async (req: Request , res: Response, next: NextFunction) => {
    const result = await UserServices.getAllUsers();

    //    res.status(httpStatus.OK).json({
    //     success: true,
    //     message: "All User Retrieved Successfully",
    //     data: users
    //    })
       sendResponse(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        message: "All User Retrieved Successfully",
        data: result.data,
        meta: result.meta
    })
}) 

        
    


export const UserControllers = {
    createUser,
    getAllUsers
}