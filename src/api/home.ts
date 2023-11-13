import API from "./root";

class HomeAPI extends API {
  async getAllHomePageData() {
    const response = await API.get("/home-page-data");
    return response;
  }
}

export const homeAPI = new HomeAPI();
