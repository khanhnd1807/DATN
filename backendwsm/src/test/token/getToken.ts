import request from "supertest";
export const getToken = (response: request.Response) => {
  return {
    token: response.header["set-cookie"][0]
      .split(";")
      .find((c: string) => c.trim().startsWith("token="))
      .split("=")[1],
    refreshtoken: response.header["set-cookie"][1]
      .split(";")
      .find((c: string) => c.trim().startsWith("refreshtoken="))
      .split("=")[1],
  };
};
