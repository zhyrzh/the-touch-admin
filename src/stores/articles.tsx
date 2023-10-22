import { createContext, useState, FC, useContext } from "react";
import { articleAPI } from "../api/article";
import { IUploadedImage } from "../hooks/useUploadImage";
import { LoadingContext } from "./loading";
import { MessageContext } from "./message";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";

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
  uploadedFiles: IUploadedImage[];
}

interface IArticleContext {
  articles: Array<IArticleDetails>;
  createArticle: (body: IArticleDetails) => void;
}

export const ArticleContext = createContext<IArticleContext>(
  null as unknown as IArticleContext
);

const ArticleContextProvider: FC<{ children: any }> = ({ children }) => {
  const [articles, setArticles] = useState<IArticleDetails[]>([]);
  const loadingContext = useContext(LoadingContext);
  const messageContext = useContext(MessageContext);
  const navigate = useNavigate();

  const getAllArticles = () => {};

  const getOneArticle = () => {};

  const createArticle: (body: IArticleDetails) => void = async (body) => {
    console.log("here");
    try {
      loadingContext.setIsLoading(true);
      const data = await articleAPI.createArticle({
        ...body,
        author: body.author.map(({ key }) => ({ email: key })),
        photoJournalist: body.photoJournalist!.map(({ key }) => ({
          email: key,
        })),
        graphicsArtist: body.graphicsArtist!.map(({ key }) => ({ email: key })),
        featuredImages: body.uploadedFiles.map((file) => ({
          publicId: file.publicId,
          url: file.url,
        })),
        createdAt:
          body.createdAt !== ""
            ? body.createdAt
            : dayjs().format("YYYY-MM-DD HH:mm:ss").toString(),
      });
      navigate("/");
    } catch (error: any) {
      error.message.map((msg: string) => messageContext.onAddMessage(msg));
    } finally {
      loadingContext.setIsLoading(false);
    }
  };

  const deleteArticle = async () => {};

  return (
    <ArticleContext.Provider value={{ articles, createArticle }}>
      {children}
    </ArticleContext.Provider>
  );
};

export default ArticleContextProvider;
