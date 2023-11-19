import API from "./root";

class ArticleAPI extends API {
  async createArticle(body: any) {
    const response = await API.post("/article", body);
    return response;
  }

  async acceptArticle(id: number) {
    const response = await API.put(`/article/accept-reject/${id}`, { id });
    return response;
  }
}

export const articleAPI = new ArticleAPI();
