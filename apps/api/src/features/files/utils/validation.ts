import { AppError } from "../../../lib/errors";
import { getFileCategory } from "./fileCategory";

export function validateFile(
    file:File,
    max:number,
    requiredTypes?: ("image"|"model"|"document"|"video"|"other")[]
){
    if(file.size > max){
        throw new AppError(
            400,
            "FILE_TOO_LARGE",
            "File exceeds size limit"
        );
    }

    if (requiredTypes && !requiredTypes.includes(getFileCategory(file.type))){
        throw new AppError(
            400,
            "INVALID_FILE_TYPE",
            "File type is not allowed"
        );
    }
}