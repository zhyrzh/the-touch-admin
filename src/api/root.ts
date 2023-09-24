export enum HttpMethod {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
}

const BASE_API = "http://localhost:8000";

class API {
  static async call(
    method: HttpMethod,
    url: string,
    body?: any,
    isFormData: boolean = false
  ) {
    const ACCESS_TOKEN = localStorage.getItem("accessToken");
    let headers: HeadersInit = {
      Authorization: `Bearer ${ACCESS_TOKEN}`,
    };

    if (!isFormData) {
      headers = {
        ...headers,
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      };
    }

    try {
      const response: Response = await fetch(`${BASE_API}${url}`, {
        method,
        headers,
        body: !isFormData ? JSON.stringify(body) : body,
      });

      if (!response.ok) {
        return Promise.reject(await response.json());
      }

      return Promise.resolve(await response.json());
    } catch (error: any) {
      console.log("error");
      return Promise.reject(error);
    }
  }

  static async post<T>(url: string, body: T, isFormData: boolean = false) {
    return await API.call(HttpMethod.POST, url, body, isFormData);
  }

  static async get<T>(url: any, body?: T) {
    return await API.call(HttpMethod.GET, url, body);
  }

  static async put<T>(url: any, body: T) {
    console.log(url, body);
    return "get req response";
  }

  static async delete<T>(url: any, body: T) {
    console.log(url, body);
    return "get req response";
  }
}

export default API;
