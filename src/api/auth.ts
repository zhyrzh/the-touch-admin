import API from "./root";

class AuthAPI extends API {
  async login(body: any) {
    try {
      const response = await this.post("/auth/login", body);
      return Promise.resolve(response);
    } catch (error) {
      Promise.reject(error);
    }
  }

  async register(body: any) {
    const response = await this.post("/auth/register", body);
    return Promise.resolve(response);
  }
}

export const authAPI = new AuthAPI();
