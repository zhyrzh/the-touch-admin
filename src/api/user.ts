import API from "./root";

class UserAPI extends API {
  async setupProfile(body: any) {
    const response = await API.post("/user", body);
    return response;
  }
}

export const userAPI = new UserAPI();
