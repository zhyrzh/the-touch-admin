import API from "./root";

class AuthAPI extends API {
  async login(body: any) {
    const response = await API.post("/auth/login", body);
    return response;
  }

  async register(body: any) {
    const response = await API.post("/auth/register", body);
    return response;
  }

  async getProfile() {
    const response = await API.get(`/user`);
    return response;
  }
}

export const authAPI = new AuthAPI();
