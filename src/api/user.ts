import API from "./root";

class UserAPI extends API {
  async setupProfile(body: any) {
    try {
      const response = await this.post("/user", body);
      return response;
    } catch (error) {
      Promise.reject(error);
    }
  }
}

export const userAPI = new UserAPI();
