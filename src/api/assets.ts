import API from "./root";

class AssetsAPI extends API {
  async uploadProfileAsset(body: any, isFileUpload: boolean = false) {
    const response = await API.post(
      "/upload-library/profile-image",
      body,
      isFileUpload
    );
    return response;
  }

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
