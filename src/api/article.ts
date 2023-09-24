import API from "./root";

class ArticleAPI extends API {
  async createArticle(body: any) {
    const response = await API.post("/article", body);
    return response;
  }
}

export const articleAPI = new ArticleAPI();
