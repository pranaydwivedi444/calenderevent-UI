"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = checkValidation;
const zod_1 = require("zod");
const registerSchema = zod_1.z.object({
    name: zod_1.z.string().min(1, "Name is required"),
    email: zod_1.z.string().email("Invalid email address"),
    password: zod_1.z
        .string()
        .min(8, "Password must be at least 8 characters long")
        .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
        .regex(/[@$!%*?&]/, "Password must contain at least one special character"),
});
function checkValidation(obj) {
    const result = registerSchema.safeParse(obj);
    if (result.success) {
        return { isValid: true };
    }
    else {
        const errors = result.error.errors.map((err) => err.message);
        console.log(result, errors);
        return { isValid: false, errors };
    }
}
