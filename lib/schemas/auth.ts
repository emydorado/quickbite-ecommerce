import { z } from "zod";

export const signUpSchema = z.object({
  name: z.string().min(2, "Cuéntanos cómo te llamas."),
  email: z.string().email("Ese correo no se ve válido."),
  password: z.string().min(6, "Mínimo 6 caracteres."),
});

export const loginSchema = z.object({
  email: z.string().email("Ese correo no se ve válido."),
  password: z.string().min(1, "Escribe tu contraseña."),
});

export type SignUpValues = z.infer<typeof signUpSchema>;
export type LoginValues = z.infer<typeof loginSchema>;
