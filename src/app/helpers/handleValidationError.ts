import mongoose from "mongoose"
import { TErrorSources, TGenericErrorResponse } from "../interfaces/error.types"

export const handleValidationError = (error : mongoose.Error.ValidationError): TGenericErrorResponse => {
        const errorSources: TErrorSources[] = []
        const errors = Object.values(error.errors)
        errors.forEach((errorObject : any) => errorSources.push({
            path : errorObject.path,
            message : errorObject.message,
        }))
        // message = error.message;
        return {
            statusCode : 400,
            message : "Validation Error",
            errorSources,
        }
    }