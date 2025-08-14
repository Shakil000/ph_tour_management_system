import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { DivisionService } from "./division.service";
import { sendResponse } from "../../utils/sendResponse";

const createDivision = catchAsync(async (req: Request, res: Response) => {
    const result = await DivisionService.createDivision(req.body);
    sendResponse(res, {
        statusCode: 201,
        success: true,
        message: "Division Created",
        data: result,
    })
});

const getAllDivisions = catchAsync(async (req: Request, res: Response) => {
    const result = await DivisionService.getAllDivision();
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "All division retrieved successfully",
        data: result.data,
        meta: result.meta,
    })
});
const getSingleDivision = catchAsync(async (req: Request, res: Response) => {
    const slug = req.params.slug;
    const result = await DivisionService.getSingleDivision(slug);
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "The division retrieved successfully",
        data: result.data,
    })
});

const updateDivision = catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id
    const result = await DivisionService.updateDivision(id, req.body)
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Division updated successfully",
        data: result,
    })
});

const deleteDivision = catchAsync( async(req: Request, res: Response) => {
    const result = await DivisionService.deleteDivision(req.params.id)
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Division deleted successfully",
        data: result,
    })
});

export const  divisionController ={
    createDivision,
    getAllDivisions,
    getSingleDivision,
    updateDivision,
    deleteDivision,
}