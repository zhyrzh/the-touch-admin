import { ChangeEvent, useContext, useState } from "react";
import { MessageContext } from "../stores/message";
import { assetsAPI } from "../api/assets";
import { LoadingContext } from "../stores/loading";

export interface IUploadedImage {
  createdAt: string;
  id: number;
  publicId: string;
  url: string;
  name: string;
}

export const useUploadAsset = () => {
  const messageContext = useContext(MessageContext);
  const loadingContext = useContext(LoadingContext);
  const [uploadedFile, setUploadedFile] = useState<IUploadedImage>();
  const [uploadedFileList, setUploadedFileList] = useState<IUploadedImage[]>(
    []
  );

  // Dimension checking for profile images
  const onCheckDimensions = (file: File) => {
    return new Promise((resolve, reject) => {
      const toBeCheckedImage = new Image();
      const url = URL.createObjectURL(file);
      toBeCheckedImage.src = url;
      let width;
      let height;
      toBeCheckedImage.onload = async () => {
        width = toBeCheckedImage.naturalWidth || toBeCheckedImage.width;
        height = toBeCheckedImage.naturalHeight || toBeCheckedImage.height;
        if (Number.parseInt((width % height).toFixed(1)) === 0) {
          resolve(true);
        } else {
          messageContext.onAddMessage("Image should have 1:1 ratio");
          reject(false);
        }
      };
    });
  };

  const onUploadProfileImage = async (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const selectedFile = event.target.files[0];
      const toBeCheckedImage = new Image();
      const url = URL.createObjectURL(selectedFile);
      toBeCheckedImage.src = url;

      try {
        loadingContext.setIsLoading(true);
        const res = await onCheckDimensions(selectedFile);
        if (res) {
          const imageFormData = new FormData();
          imageFormData.append("image", selectedFile);
          const data = await assetsAPI.uploadProfileAsset(imageFormData, true);
          setUploadedFile((_prevUploaded) => ({
            ...data,
          }));
          // onAddFile(uploadedFile);
        }
      } catch (error) {
        return;
      } finally {
        loadingContext.setIsLoading(false);
      }
    }
  };

  const onUploadImage = async (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const selectedFile = event.target.files[0];

      try {
        loadingContext.setIsLoading(true);
        const imageFormData = new FormData();
        imageFormData.append("image", selectedFile);
        const data = await assetsAPI.uploadAsset(imageFormData, true);

        setUploadedFileList((prevFileList) => [...prevFileList, data]);
      } catch (error) {
        return;
      } finally {
        loadingContext.setIsLoading(false);
      }
    }
  };

  const onUploadDraggedImage = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();

    const file = e.dataTransfer.files[0];

    if (file) {
      const selectedFile = file;

      try {
        loadingContext.setIsLoading(true);
        const imageFormData = new FormData();
        imageFormData.append("image", selectedFile);
        const data = await assetsAPI.uploadAsset(imageFormData, true);
        setUploadedFileList((prevFileList) => [...prevFileList, data]);
      } catch (error) {
        return;
      } finally {
        loadingContext.setIsLoading(false);
      }
    }
  };

  return {
    uploadedFile,
    uploadedFileList,
    onUploadProfileImage,
    onUploadImage,
    onUploadDraggedImage,
  } as const;
};
