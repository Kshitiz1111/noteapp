export type userInfoType = {
  name?: string;
  email: string;
  pwd: string;
  role: "ADMIN" | "USER" | undefined;
};
