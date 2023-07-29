export enum HttpMethod {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
}

const BASE_API = "http://localhost:8000";

class API {
  async call(method: HttpMethod, url: string, body?: any) {
    const ACCESS_TOKEN = localStorage.getItem("accessToken");
    try {
      const response: Response = await fetch(`${BASE_API}${url}`, {
        method,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          Authorization: `Bearer ${ACCESS_TOKEN}`,
        } as HeadersInit,
        body: JSON.stringify(body),
      });
      // console.log(await response.json(), "check response");
      // if (response.ok) {
      //   return await response.json();
      // }
      return await response.json();
    } catch (error: any) {
      return Promise.reject(error);
    }
  }

  async post<T>(url: string, body: T) {
    return await this.call(HttpMethod.POST, url, body);
  }

  async get<T>(url: any, body: T) {
    return await this.call(HttpMethod.GET, url, body);
  }

  async put<T>(url: any, body: T) {
    console.log(url, body);
    return "get req response";
  }

  async delete<T>(url: any, body: T) {
    console.log(url, body);
    return "get req response";
  }
}

export default API;
