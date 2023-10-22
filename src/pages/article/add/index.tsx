import { useContext, useEffect, MouseEventHandler } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../stores/auth";
import Input from "../../../components/input/Input";
import RichTextEditor from "../../../components/input/RichTextEditor";
import DropdownInput from "../../../components/input/DropdownInput";
import useInputChangeHandler from "../../../hooks/useInputChangeHandler";
import FileInputv2 from "../../../components/input/DragNDropInput";
import { useInputValidator } from "../../../hooks/useInputValidator";
import useGenerateDropdownOptions from "../../../hooks/useGenerateDropdownOptions";
import DateTimeInput from "../../../components/input/DateTimeInput";
import { useUploadAsset } from "../../../hooks/useUploadImage";
import { ArticleContext } from "../../../stores/articles";
import "react-quill/dist/quill.snow.css";

interface IUserInvolved {
  key: string;
  label: string;
}
interface IArticleDetails {
  category: string;
  headline: string;
  content: string;
  author: IUserInvolved[];
  graphicsArtist?: IUserInvolved[];
  photoJournalist?: IUserInvolved[];
  createdAt: string;
}

const Home = () => {
  const authContext = useContext(AuthContext);
  const articleContext = useContext(ArticleContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (authContext?.user === null) {
      navigate("/user/setup-profile");
    }
  }, [authContext?.user]);

  const {
    data,
    onQuillChange,
    onInputTimeChange,
    onInputChangeHandler,
    onMultiDropdownInputChangeHandler,
    onRemoveOption,
  } = useInputChangeHandler<IArticleDetails>({
    category: "",
    content: "",
    createdAt: "",
    headline: "",
    graphicsArtist: [],
    photoJournalist: [],
    author: [],
  });

  const { errors, removeErrors } = useInputValidator<IArticleDetails>({
    content: "",
    category: "",
    createdAt: "",
    headline: "",
    graphicsArtist: [],
    photoJournalist: [],
    author: [],
  });

  const { onUploadImage, onUploadDraggedImage, uploadedFileList } =
    useUploadAsset();

  const [authoredByOpts] = useGenerateDropdownOptions("default");
  const [graphicsByOpts] = useGenerateDropdownOptions("Graphics Artist");
  const [photoJournalistOpts] = useGenerateDropdownOptions("Photojournalist");

  const onSubmit: MouseEventHandler = async (event) => {
    event.preventDefault();
    articleContext.createArticle({
      ...data,
      author: data.author,
      photoJournalist: data.photoJournalist!,
      graphicsArtist: data.graphicsArtist!,
      uploadedFiles: uploadedFileList,
    });
  };

  return (
    <>
      <div
        className="article-add-edit"
        style={{ paddingInline: "10px", paddingTop: "15px" }}
      >
        <Input
          label="Category (Required)"
          errors={errors}
          name="category"
          onInputChangeHandler={onInputChangeHandler}
          removeErrors={removeErrors}
          value={data?.category!}
        />
        <Input
          label="Headline (Required)"
          errors={errors}
          name="headline"
          onInputChangeHandler={onInputChangeHandler}
          removeErrors={removeErrors}
          value={data?.headline!}
        />
        <RichTextEditor
          placeHolder="Body (Required)"
          value={data?.content!}
          onChange={onQuillChange}
        />
        <div className="article-add-edit__two-col">
          <div className="article-add-edit__two-col-item">
            <DropdownInput
              isSearchable={true}
              isMulti={true}
              placeHolder="Authored by (Required)"
              name="author"
              optionsKey="News Writer"
              options={authoredByOpts}
              errors={errors}
              listValue={data.author!}
              removeErrors={removeErrors}
              onChange={onMultiDropdownInputChangeHandler}
              onRemoveOption={onRemoveOption}
              value={null}
            />
            <DropdownInput
              isSearchable={true}
              isMulti={true}
              placeHolder="Graphics by"
              name="graphicsArtist"
              options={graphicsByOpts}
              errors={errors}
              listValue={data.graphicsArtist!}
              onChange={onMultiDropdownInputChangeHandler}
              removeErrors={removeErrors}
              onRemoveOption={onRemoveOption}
              value={null}
            />
          </div>
          <div className="article-add-edit__two-col-item">
            <DropdownInput
              isSearchable={true}
              isMulti={true}
              placeHolder="Images by"
              name="photoJournalist"
              options={photoJournalistOpts}
              errors={errors}
              listValue={data.photoJournalist!}
              onChange={onMultiDropdownInputChangeHandler}
              removeErrors={removeErrors}
              onRemoveOption={onRemoveOption}
              value={null}
            />
            <DateTimeInput
              label="Date and Time created"
              value={data?.createdAt!}
              onChange={onInputTimeChange}
            />
          </div>
        </div>
        <FileInputv2
          onUploadImage={onUploadImage}
          onUploadDraggedImage={onUploadDraggedImage}
          imageList={uploadedFileList}
        />
        <button
          onClick={(e) => {
            onSubmit(e);
          }}
        >
          Submit
        </button>
      </div>
    </>
  );
};

export default Home;
