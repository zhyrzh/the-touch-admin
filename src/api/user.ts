import API from "./root";

class UserAPI extends API {
  async setupProfile(body: any) {
    const response = await API.post("/user", body);
    return response;
  }

  async getAllByPosition(position: string) {
    const response = await API.get(`/user/by-position/${position}`);
    return response;
  }
}

export const userAPI = new UserAPI();
