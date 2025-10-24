export const messages = {
  content: {
    title: "Iniciar sesión en tu cuenta",
    description: "Ingresa tu email para iniciar sesión en tu cuenta",
  },
  labels: {
    email: "Correo electrónico",
    password: "Contraseña",
  },
  actions: {
    login: "Iniciar sesión",
    forgotPassword: "¿Olvidaste tu contraseña?",
  },
  states: {
    loggingIn: "Iniciando sesión...",
  },
  signup: {
    text: "¿No tienes una cuenta?",
    link: "Regístrate",
  },
  validation: {
    passwordMinLength: "La contraseña debe tener al menos 8 caracteres",
  },
} as const;

export type LoginMessages = typeof messages;
