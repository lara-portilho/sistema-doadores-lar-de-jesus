export const UserType = {
  Edit: "edit",
  View: "view",
} as const;

export type UserType = (typeof UserType)[keyof typeof UserType];
