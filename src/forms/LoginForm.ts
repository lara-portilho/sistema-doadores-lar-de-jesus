import { RegisterOptions } from "react-hook-form";

export type LoginFormValues = {
  email: string;
  pass: string;
};

type LoginValidationRules = Record<
  keyof LoginFormValues,
  RegisterOptions<LoginFormValues>
>;

export const loginForm = {
  defaultValues: {
    email: "",
    pass: "",
  },

  getValidationRules(): LoginValidationRules {
    return {
      email: {
        required: "O email é obrigatório!",
      },
      pass: {
        required: "A senha é obrigatória!",
      },
    };
  },
};
