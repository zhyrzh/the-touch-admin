import { useContext, useEffect, MouseEventHandler, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../stores/auth";
import Input from "../../../components/input/Input";
import RichTextEditor from "../../../components/input/RichTextEditor";
import DropdownInput from "../../../components/input/DropdownInput";
import FileInputv2 from "../../../components/input/DragNDropInput";
import { useInputValidator } from "../../../hooks/useInputValidator";
import useGenerateDropdownOptions from "../../../hooks/useGenerateDropdownOptions";
import DateTimeInput from "../../../components/input/DateTimeInput";
import { useUploadAsset } from "../../../hooks/useUploadImage";
import "react-quill/dist/quill.snow.css";
import { ArticleContext } from "../../../stores/article.context";

interface IArticleDetails {
  category: string;
  headline: string;
  content: string;
  author: { label: string; key: string }[];
  graphicsArtist: { label: string; key: string }[];
  photoJournalist: { label: string; key: string }[];
  createdAt: string;
}

const ArticleAdd = () => {
  const authContext = useContext(AuthContext);
  const articleContext = useContext(ArticleContext);
  const navigate = useNavigate();

  const [data, setData] = useState<IArticleDetails>({
    category: "",
    content: "",
    createdAt: "",
    headline: "",
    graphicsArtist: [],
    photoJournalist: [],
    author: [],
  });

  useEffect(() => {
    if (authContext?.user === null) {
      navigate("/user/setup-profile");
    }
  }, [authContext?.user]);

  const { errors, removeErrors, validateArticleFields } =
    useInputValidator<IArticleDetails>({
      content: data.content,
      category: data.category,
      headline: data.headline,
      author: data.author,
    });

  const { onUploadImage, onUploadDraggedImage, uploadedFileList } =
    useUploadAsset();

  const [authoredByOpts] = useGenerateDropdownOptions("default");
  const [graphicsByOpts] = useGenerateDropdownOptions("Graphics Artist");
  const [photoJournalistOpts] = useGenerateDropdownOptions("Photojournalist");

  const onSubmit: MouseEventHandler = (event) => {
    event.preventDefault();
    const errorCount = validateArticleFields();
    if (errorCount === 0) {
      articleContext?.createArticle({
        ...data,
        photoJournalist: data.photoJournalist!,
        author: data.author!,
        graphicsArtist: data.graphicsArtist!,
        uploadedFiles: uploadedFileList,
      });
    } else {
      return;
    }
  };

  return (
    <>
      <div
        className="article"
        style={{ paddingInline: "10px", paddingTop: "15px" }}
      >
        <Input
          label="Category (Required)"
          errors={errors}
          name="category"
          onInputChangeHandler={(event) =>
            setData((prevData) => ({
              ...prevData,
              category: event.target.value,
            }))
          }
          removeErrors={removeErrors}
          value={data?.category!}
        />
        <Input
          label="Headline (Required)"
          errors={errors}
          name="headline"
          onInputChangeHandler={(event) =>
            setData((prevData) => ({
              ...prevData,
              headline: event.target.value,
            }))
          }
          removeErrors={removeErrors}
          value={data?.headline!}
        />
        <RichTextEditor
          placeHolder="Body (Required)"
          value={data?.content!}
          onChange={(value) =>
            setData((prevData) => ({
              ...prevData,
              content: value,
            }))
          }
          errors={errors}
        />
        <div className="article__two-col">
          <div className="article__two-col-item">
            <DropdownInput
              title="Author (Required)"
              options={authoredByOpts}
              isSearchable
              onChange={(value) =>
                setData((prevData) => ({ ...prevData, author: value }))
              }
              value={data.author}
              name="author"
              errors={errors}
              isRequired
            />
            <DropdownInput
              title="Photojournalist"
              options={photoJournalistOpts}
              isSearchable
              onChange={(value) =>
                setData((prevData) => ({ ...prevData, photoJournalist: value }))
              }
              value={data.photoJournalist}
              name="photoJournalist"
              errors={errors}
            />
          </div>
          <div className="article__two-col-item">
            <DropdownInput
              title="Graphics Artist"
              options={graphicsByOpts}
              isSearchable
              onChange={(value) =>
                setData((prevData) => ({ ...prevData, graphicsArtist: value }))
              }
              value={data.graphicsArtist}
              name="graphicsArtist"
              errors={errors}
            />
            <DateTimeInput
              label="Date and Time created"
              value={data?.createdAt!}
              onChange={(event) =>
                setData((prevData) => ({
                  ...prevData,
                  createdAt: event.target.value,
                }))
              }
            />
          </div>
        </div>
        <FileInputv2
          onUploadImage={onUploadImage}
          onUploadDraggedImage={onUploadDraggedImage}
          imageList={uploadedFileList}
        />
        <div className="article__two-col article__two-col--space-between">
          <button
            className="article__submit-btn article__submit-btn--no-fill"
            onClick={(_e) => {
              navigate("/");
            }}
          >
            Back
          </button>
          <button
            className="article__submit-btn"
            onClick={(e) => {
              onSubmit(e);
            }}
          >
            Submit
          </button>
        </div>
      </div>
    </>
  );
};

export default ArticleAdd;
