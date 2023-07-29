import { ChangeEvent, useState, FC } from "react";

export interface IUploadImageResponse {
  articleId: null | string;
  createdAt: string;
  publicId: string;
  url: string;
}

interface IFileInputProps {
  setUploadedFiles: (daya: any) => void;
  uploadedFiles: IUploadImageResponse[];
}

const FileInput: FC<IFileInputProps> = ({
  setUploadedFiles,
  uploadedFiles,
}) => {
  // const [uploadedFiles, setUploadedFiles] = useState<
  //   Array<IUploadImageResponse>
  // >([]);
  const onFileInputChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const ACCESS_TOKEN = localStorage.getItem("accessToken");
    console.log(event.target.files);
    const imageFormData = new FormData();
    if (event.target.files) {
      imageFormData.append("image", event.target.files[0]);
    }
    const res = await fetch("http://localhost:8000/upload-library/image", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
      body: imageFormData,
    });
    const data = await res.json();
    console.log(data, "check response data");
    setUploadedFiles(data);
  };

  return (
    <div>
      {/* {console.log(uploadedFiles, "Check uploaded")} */}
      <input
        type="file"
        onChange={onFileInputChange}
        accept="image/png, image/gif, image/jpeg"
      />
      <ul>
        {uploadedFiles?.map((file: IUploadImageResponse) => (
          <li key={file.articleId}>{file.url}</li>
        ))}
      </ul>
    </div>
  );
};

export default FileInput;
