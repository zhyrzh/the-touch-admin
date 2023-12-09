import { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Input from "../../../components/input/Input";
import RichTextEditor from "../../../components/input/RichTextEditor";
import DropdownInput from "../../../components/input/DropdownInput";
import DateTimeInput from "../../../components/input/DateTimeInput";
import { useInputValidator } from "../../../hooks/useInputValidator";
import FileInputv2 from "../../../components/input/DragNDropInput";
import { useUploadAsset } from "../../../hooks/useUploadImage";
import { ArticleContext } from "../../../stores/article.context";
import dayjs from "dayjs";
import useGenerateDropdownOptions from "../../../hooks/useGenerateDropdownOptions";
import { MessageContext } from "../../../stores/message";

interface IArticleDetails {
  category: string;
  headline: string;
  content: string;
  author: { label: string; key: string }[];
  graphicsArtist: { label: string; key: string }[];
  photoJournalist: { label: string; key: string }[];
  createdAt: string;
}

const EditArticle = () => {
  const articleContext = useContext(ArticleContext);
  const messageContext = useContext(MessageContext);
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [isKeyPressed, setIsKeyPressed] = useState<boolean>(false);

  useEffect(() => {
    articleContext.getSpecific(+id!);
  }, []);

  const [authoredByOpts] = useGenerateDropdownOptions("default");
  const [graphicsByOpts] = useGenerateDropdownOptions("Graphics Artist");
  const [photoJournalistOpts] = useGenerateDropdownOptions("Photojournalist");

  const [data, setData] = useState<Partial<IArticleDetails>>({
    category: "",
    content: "",
    createdAt: "",
    headline: "",
    graphicsArtist: undefined,
    photoJournalist: undefined,
    author: undefined,
  });

  const { errors, removeErrors, checkHasValuesChanged } =
    useInputValidator<IArticleDetails>({
      content: data.content,
      category: data.category,
      headline: data.headline,
      author: data.author,
    });

  const { onUploadImage, onUploadDraggedImage, uploadedFileList } =
    useUploadAsset();

  const onSubmit = () => {
    const valuesChangeCount = checkHasValuesChanged(
      articleContext.article!,
      data
    );
    console.log(valuesChangeCount);
    if (valuesChangeCount === 0) {
      messageContext.onAddMessage("No changes has been made.");
    }
  };

  return (
    <>
      {/* {console.log(articleContext.article?.author, "check author")} */}
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
          value={
            !data?.category!
              ? articleContext.article?.category!
              : data?.category!
          }
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
          value={
            !data?.headline!
              ? articleContext.article?.headline!
              : data?.headline!
          }
        />
        <RichTextEditor
          placeHolder="Body (Required)"
          value={data?.content!}
          defaultValue={articleContext.article?.content!}
          onChange={(value) => {
            // console.log(value, "check mes");
            if (isKeyPressed) {
              setData((prevData) => ({
                ...prevData,
                content: value,
              }));
            }
          }}
          onKeyPressed={() => setIsKeyPressed(true)}
          errors={errors}
        />
        <div className="article__two-col">
          <div className="article__two-col-item">
            <DropdownInput
              title="Author (Required)"
              options={authoredByOpts}
              isSearchable
              onChange={(value) => {
                setData((prevData) => ({ ...prevData, author: value }));
              }}
              value={
                data.author ? data.author! : articleContext.article?.author!
              }
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
              value={
                !data.photoJournalist
                  ? articleContext.article?.photoJournalist!
                  : data.photoJournalist!
              }
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
              value={
                !data.graphicsArtist
                  ? articleContext.article?.graphicsArtist!
                  : data.graphicsArtist
              }
              name="graphicsArtist"
              errors={errors}
            />
            <DateTimeInput
              label="Date and Time created"
              value={
                !data?.createdAt!
                  ? dayjs(articleContext.article?.createdAt!)
                      .format("YYYY-MM-DDTHH:MM")
                      .toString()
                  : data.createdAt!
              }
              onChange={(event) => {
                setData((prevData) => ({
                  ...prevData,
                  createdAt: event.target.value,
                }));
              }}
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
            onClick={() => {
              onSubmit();
            }}
          >
            Submit
          </button>
        </div>
      </div>
    </>
  );
};

export default EditArticle;
