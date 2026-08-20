import { AppError } from "../../../lib/errors";
import { formatBytes } from "../../../lib/helpers";
import { getFileCategory } from "./fileCategory";

export function validateFile(
    file:File,
    max:number,
    requiredTypes?: ("image"|"model"|"document"|"video"|"pdf"|"other")[]
){
    if(file.size > max){
        throw new AppError(
            400,
            "FILE_TOO_LARGE",
            "File size of " + formatBytes(file.size) + " exceeds size limit of " + formatBytes(max)
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