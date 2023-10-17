import { useContext, useEffect } from "react";
import { AuthContext } from "../stores/auth";
import { useNavigate } from "react-router-dom";
import Input from "../components/input/Input";
import "react-quill/dist/quill.snow.css";
import RichTextEditor from "../components/input/RichTextEditor";
import DropdownInput from "../components/input/DropdownInput";
import useInputChangeHandler from "../hooks/useInputChangeHandler";
import FileInputv2 from "../components/input/DragNDropInput";
import { useInputValidator } from "../hooks/useInputValidator";
import useGenerateDropdownOptions from "../hooks/useGenerateDropdownOptions";
import DateTimeInput from "../components/input/DateTimeInput";
import dayjs from "dayjs";
import { useUploadAsset } from "../hooks/useUploadImage";

interface IUserInvolved {
  email: string;
  name: string;
}
interface IArticleDetails {
  headline: string;
  body: string;
  author: IUserInvolved;
  graphicsArtist?: IUserInvolved;
  photoJournalist?: IUserInvolved;
  createdAt: dayjs.Dayjs;
}

const Home = () => {
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (authContext?.user === null) {
      navigate("/user/setup-profile");
    }
  }, [authContext?.user]);

  const {
    data,
    onQuillChange,
    onDropdownInputChangeHandler,
    onInputTimeChange,
  } = useInputChangeHandler<IArticleDetails>();
  const { errors, removeErrors } = useInputValidator({});
  const { onUploadImage, onUploadDraggedImage, uploadedFileList } =
    useUploadAsset();

  const [authoredByOpts] = useGenerateDropdownOptions("default");
  const [graphicsByOpts] = useGenerateDropdownOptions("Graphics Artist");
  const [photoJournalistOpts] = useGenerateDropdownOptions("Photojournalist");

  return (
    <>
      {/* {console.log(uploadedFileList, "check uploaded")} */}
      <div
        className="article-add-edit"
        style={{ paddingInline: "10px", paddingTop: "15px" }}
      >
        <Input label="Headline" />
        <RichTextEditor value={data?.body!} onChange={onQuillChange} />
        <div className="article-add-edit__two-col">
          <div className="article-add-edit__two-col-item">
            <DropdownInput
              isSearchable={true}
              isMulti={false}
              placeHolder="Authored by"
              options={authoredByOpts}
              onChange={onDropdownInputChangeHandler}
              errors={errors}
              name="author"
              removeErrors={removeErrors}
              optionsKey="News Writer"
            />
            <DropdownInput
              isSearchable={true}
              isMulti={false}
              placeHolder="Graphics by"
              options={graphicsByOpts}
              onChange={onDropdownInputChangeHandler}
              errors={errors}
              name="graphicsArtist"
              removeErrors={removeErrors}
            />
          </div>
          <div className="article-add-edit__two-col-item">
            <DropdownInput
              isSearchable={true}
              isMulti={false}
              placeHolder="Images by"
              options={photoJournalistOpts}
              onChange={onDropdownInputChangeHandler}
              errors={errors}
              name="photoJournalist"
              removeErrors={removeErrors}
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
      </div>
    </>
  );
};

export default Home;
