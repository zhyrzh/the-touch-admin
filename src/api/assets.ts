import API from "./root";

class AssetsAPI extends API {
  async uploadAsset(body: any, isFileUpload: boolean = false) {
    const response = await API.post(
      "/upload-library/image",
      body,
      isFileUpload
    );
    return response;
  }
}

export const assetsAPI = new AssetsAPI();
