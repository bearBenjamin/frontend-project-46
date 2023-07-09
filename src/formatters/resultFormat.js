import { getDiffTreeObject } from "./stylish.js";

export const getFormatResult = (format, treeFile) => {
    let result;
    if (format === 'stylish') {
        result = getDiffTreeObject(treeFile);
    }
    return result;
};