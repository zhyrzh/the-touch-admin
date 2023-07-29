import { FormEvent, useState } from "react";
import useInputChangeHandler from "../../../hooks/useInputChangeHandler";
import FileInput, {
  IUploadImageResponse,
} from "../../../components/input/FileInput";
import { articleAPI } from "../../../api/article";
import DropdownInput from "../../../components/input/DropdownInput";

interface IArticleFields {
  category: string;
  headline: string;
  content: string;
  author: {
    id: string;
    name: string;
  };
  graphicsArtist: {
    id: string;
    name: string;
  };
  photoJournalist: {
    id: string;
    name: string;
  };
  featuredImage: {
    id: string;
    url: string;
  };
  createdAt: string;
}

const AddArticle = () => {
  const [fields, setFields] = useState<IArticleFields>();
  const { data: inputData, onInputChangeHandler } =
    useInputChangeHandler<IArticleFields>();
  const [uploadedFiles, setUploadedFiles] = useState<
    Array<IUploadImageResponse>
  >([]);
  const options = [
    { email: "admin1@gmail.com", name: "John Doe" },
    { email: "admin2@gmail.com", name: "Jane Doe" },
    { email: "admin3@gmail.com", name: "Juan Doe" },
  ];

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const articleData = await articleAPI.createArticle({
      ...fields,
      ...inputData,
      featuredImages: uploadedFiles.map((file: IUploadImageResponse) => ({
        publicId: file.publicId,
        url: file.url,
      })),
    });
    console.log(articleData);
  };

  return (
    <div>
      {/* {console.log(fields, "check fields")} */}
      <form onSubmit={onSubmit}>
        <input
          type="text"
          name="category"
          value={inputData?.category ? inputData.category : ""}
          onChange={onInputChangeHandler}
          autoComplete="off"
        />
        <input
          type="text"
          name="headline"
          value={inputData?.headline ? inputData.headline : ""}
          onChange={onInputChangeHandler}
          autoComplete="off"
        />
        <textarea
          name="content"
          value={inputData?.content ? inputData.content : ""}
          onChange={onInputChangeHandler}
        />
        <DropdownInput
          isSearchable
          isMulti={true}
          placeHolder="Author"
          options={options}
          onChange={(value: any) =>
            setFields((prevData: any) => ({
              ...prevData,
              author: value,
            }))
          }
        />
        <DropdownInput
          isSearchable
          isMulti={true}
          placeHolder="Graphics Artist"
          options={options}
          onChange={(value: any) => {
            console.log("Graphics Artist: ", value);
            setFields((prevData: any) => ({
              ...prevData,
              graphicsArtist: value,
            }));
          }}
        />
        <DropdownInput
          isSearchable
          isMulti={true}
          placeHolder="Photo Journalist"
          options={options}
          onChange={(value: any) => {
            console.log("Photo Journalist: ", value);
            setFields((prevData: any) => ({
              ...prevData,
              photoJournalist: value,
            }));
          }}
        />
        <FileInput
          setUploadedFiles={(data: any) =>
            setUploadedFiles((prevFiles: any) => [...prevFiles, data])
          }
          uploadedFiles={uploadedFiles}
        />
        <input
          type="datetime-local"
          name="createdAt"
          value={inputData?.createdAt}
          onChange={onInputChangeHandler}
        />

        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default AddArticle;
