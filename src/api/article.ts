import API from "./root";

class ArticleAPI extends API {
  async createArticle(body: any) {
    const response = await this.post("/article", body);
    return response;
  }
}

export const articleAPI = new ArticleAPI();
