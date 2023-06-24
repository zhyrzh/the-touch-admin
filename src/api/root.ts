export enum HttpMethod {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
}

const BASE_API = "http://localhost:8000";

class API {
  async call(method: HttpMethod, url: string, body?: any) {
    console.log("Not triggered?");
    const response: Response = await fetch(`${BASE_API}${url}`, {
      method,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(body),
    });
    console.log(response, "check response from base api");
    if (response.ok) {
      return await response.json();
    }
  }

  async post<T>(url: string, body: T) {
    return await this.call(HttpMethod.POST, url, body);
  }

  async get<T>(url: any, body: T) {
    return await this.call(HttpMethod.GET, url, body);
  }

  async put<T>() {
    return "get req response";
  }

  async delete<T>() {
    return "get req response";
  }
}

export default API;
