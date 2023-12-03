import API from "./root";

interface IQueryGetAllJournalist {
  position: string;
  isApproved: boolean;
  hasProfile: boolean;
}
class UserAPI extends API {
  async setupProfile(body: any) {
    const response = await API.post("/user", body);
    return response;
  }

  async getAllByPosition(position: string) {
    const response = await API.get(`/user/by-position/${position}`);
    return response;
  }

  async acceptJournalist(id: string) {
    const response = await API.put(`/user/accept-reject/${id}`);
    return response;
  }

  async getAll(query?: Partial<IQueryGetAllJournalist>) {
    const queryList = [];
    if (query?.position !== undefined) {
      queryList.push(`position=${query.position}`);
    }
    if (query?.isApproved !== undefined) {
      queryList.push(`isApproved=${query.isApproved}`);
    }
    if (query?.hasProfile !== undefined) {
      queryList.push(`hasProfile=${query.hasProfile}`);
    }
    const response = await API.get(
      `/user/all${queryList.length >= 1 ? `?${queryList.join("")}` : ""}`
    );
    return response as unknown;
  }
}

export const userAPI = new UserAPI();
