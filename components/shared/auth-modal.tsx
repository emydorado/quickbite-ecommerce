"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/lib/store/auth-store";
import {
  signUpSchema,
  loginSchema,
  type SignUpValues,
  type LoginValues,
} from "@/lib/schemas/auth";

type Mode = "login" | "signup";

export interface AuthModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialMode?: Mode;
}

function AuthModal({ open, onOpenChange, initialMode = "signup" }: AuthModalProps) {
  const [mode, setMode] = useState<Mode>(initialMode);
  const [showPassword, setShowPassword] = useState(false);
  const signUp = useAuthStore((s) => s.signUp);
  const logIn = useAuthStore((s) => s.logIn);

  const signUpForm = useForm<SignUpValues>({
    resolver: zodResolver(signUpSchema),
  });
  const loginForm = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
  });

  const close = () => {
    onOpenChange(false);
    setShowPassword(false);
    signUpForm.reset();
    loginForm.reset();
  };

  const onSignUp = signUpForm.handleSubmit((values) => {
    signUp({ name: values.name, email: values.email });
    close();
  });

  const onLogin = loginForm.handleSubmit((values) => {
    logIn(values.email);
    close();
  });

  const switchMode = (next: Mode) => {
    setMode(next);
    setShowPassword(false);
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        onOpenChange(next);
        if (!next) close();
      }}
    >
      <DialogContent>
        {mode === "signup" ? (
          <>
            <DialogTitle>Crea tu cuenta QuickBite</DialogTitle>
            <DialogDescription className="mt-1">
              Guarda tus favoritos y repite tus pedidos en un clic.
            </DialogDescription>
            <form onSubmit={onSignUp} className="mt-6 flex flex-col gap-4" noValidate>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="signup-name" className="text-sm font-medium text-neutral">
                  Nombre
                </label>
                <Input
                  id="signup-name"
                  autoComplete="name"
                  placeholder="Mariana Restrepo"
                  {...signUpForm.register("name")}
                />
                {signUpForm.formState.errors.name && (
                  <p className="text-xs text-orange">
                    {signUpForm.formState.errors.name.message}
                  </p>
                )}
              </div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="signup-email" className="text-sm font-medium text-neutral">
                  Correo electrónico
                </label>
                <Input
                  id="signup-email"
                  type="email"
                  autoComplete="email"
                  placeholder="tu@correo.com"
                  {...signUpForm.register("email")}
                />
                {signUpForm.formState.errors.email && (
                  <p className="text-xs text-orange">
                    {signUpForm.formState.errors.email.message}
                  </p>
                )}
              </div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="signup-password" className="text-sm font-medium text-neutral">
                  Contraseña
                </label>
                <div className="relative">
                  <Input
                    id="signup-password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="new-password"
                    placeholder="Mínimo 6 caracteres"
                    className="pr-11"
                    {...signUpForm.register("password")}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                    className="absolute right-1 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full text-primary/60 hover:bg-primary-subtle"
                  >
                    {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                  </button>
                </div>
                {signUpForm.formState.errors.password && (
                  <p className="text-xs text-orange">
                    {signUpForm.formState.errors.password.message}
                  </p>
                )}
              </div>
              <Button type="submit" size="md" className="mt-2 w-full">
                Registrarse
              </Button>
            </form>
            <p className="mt-5 text-center text-sm text-neutral/60">
              ¿Ya tienes cuenta?{" "}
              <button
                type="button"
                onClick={() => switchMode("login")}
                className="font-medium text-primary hover:underline"
              >
                Inicia sesión
              </button>
            </p>
          </>
        ) : (
          <>
            <DialogTitle>Inicia sesión</DialogTitle>
            <DialogDescription className="mt-1">
              Tu despensa te está esperando.
            </DialogDescription>
            <form onSubmit={onLogin} className="mt-6 flex flex-col gap-4" noValidate>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="login-email" className="text-sm font-medium text-neutral">
                  Correo electrónico
                </label>
                <Input
                  id="login-email"
                  type="email"
                  autoComplete="email"
                  placeholder="tu@correo.com"
                  {...loginForm.register("email")}
                />
                {loginForm.formState.errors.email && (
                  <p className="text-xs text-orange">
                    {loginForm.formState.errors.email.message}
                  </p>
                )}
              </div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="login-password" className="text-sm font-medium text-neutral">
                  Contraseña
                </label>
                <div className="relative">
                  <Input
                    id="login-password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    placeholder="Tu contraseña"
                    className="pr-11"
                    {...loginForm.register("password")}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                    className="absolute right-1 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full text-primary/60 hover:bg-primary-subtle"
                  >
                    {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                  </button>
                </div>
                {loginForm.formState.errors.password && (
                  <p className="text-xs text-orange">
                    {loginForm.formState.errors.password.message}
                  </p>
                )}
              </div>
              <Button type="submit" size="md" className="mt-2 w-full">
                Iniciar sesión
              </Button>
            </form>
            <p className="mt-5 text-center text-sm text-neutral/60">
              ¿Nuevo en QuickBite?{" "}
              <button
                type="button"
                onClick={() => switchMode("signup")}
                className="font-medium text-primary hover:underline"
              >
                Crea tu cuenta
              </button>
            </p>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}

export { AuthModal };
