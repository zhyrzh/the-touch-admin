import API from "./root";

interface IQueryGetAll {
  authoredBy: {
    value: string;
  };
  limit: {
    value: string;
  };
  page: {
    value: string;
  };
}
class ArticleAPI extends API {
  async createArticle(body: any) {
    const response = await API.post("/article", body);
    return response;
  }

  async acceptArticle(id: number) {
    const response = await API.put(`/article/accept-reject/${id}`, { id });
    return response;
  }

  async getAll(query?: Partial<IQueryGetAll>) {
    const queryList = [];
    if (query && query.authoredBy) {
      queryList.push(`authoredBy=${query.authoredBy.value}`);
    }
    if (query && query.limit) {
      queryList.push(`limit=${query.limit.value}`);
    }
    if (query && query.page) {
      queryList.push(`page=${query.page.value}`);
    }
    const response = API.get(
      `/article/all${queryList.length >= 1 ? `?${queryList.join("")}` : ""}`
    );
    return response;
  }
}

export const articleAPI = new ArticleAPI();
