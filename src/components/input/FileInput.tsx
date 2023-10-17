import { forwardRef, useImperativeHandle, useRef, useEffect } from "react";
import { IUploadedImage, useUploadAsset } from "../../hooks/useUploadImage";

export interface IUploadImageResponse {
  articleId: null | string;
  createdAt: string;
  publicId: string;
  url: string;
}

interface IFileInputProps {
  setUploadedFiles: (data: any) => void;
  onAddAsset: (image: IUploadedImage) => void;
  uploadedFiles: IUploadImageResponse[];
  isHidden?: boolean;
}

type Ref = {
  click: () => void;
} | null;

const FileInput = forwardRef<Ref, IFileInputProps>(
  ({ onAddAsset, uploadedFiles, isHidden = false }, ref) => {
    const { onUploadProfileImage, uploadedFile } = useUploadAsset();
    const inputRef = useRef<HTMLInputElement>(null);

    useImperativeHandle(ref, () => ({
      click: () => {
        inputRef.current?.click();
      },
    }));

    useEffect(() => {
      onAddAsset(uploadedFile!);
    }, [uploadedFile]);

    return (
      <div hidden={isHidden}>
        <input
          type="file"
          onChange={onUploadProfileImage}
          accept="image/png, image/gif, image/jpeg"
          hidden={true}
          ref={inputRef}
        />
        <ul>
          {uploadedFiles?.map((file: IUploadImageResponse) => (
            <li key={file.articleId}>{file.url}</li>
          ))}
        </ul>
      </div>
    );
  }
);

export default FileInput;
