import { z } from "zod";

const registerSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[@$!%*?&]/, "Password must contain at least one special character"),
});

type userInput = {
  name: String;
  password: String;
  email: String;
};
export default function checkValidation(obj: userInput) {
  const result = registerSchema.safeParse(obj);
  if (result.success) {
    return { isValid: true };
  } else {
    const errors = result.error.errors.map((err) => err.message);
    console.log(result, errors);
    return { isValid: false, errors };
  }
}
