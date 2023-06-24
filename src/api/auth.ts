import API from "./root";

class AuthAPI extends API {
  async login(body: any) {
    const response = await this.post("/auth/login", body);

    return response;
  }
}

export const authAPI = new AuthAPI();
