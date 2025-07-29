import mongoose from "mongoose"
import { TGenericErrorResponse } from "../interfaces/error.types"

export const handleCastError = (error: mongoose.Error.CastError): TGenericErrorResponse => {
        return {
            statusCode : 400,
            message : "Invalid mongoDB ObjectID, Please provide a valid ID."
        }
    }