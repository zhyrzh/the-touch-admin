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
  acceptArticle: (id: number) => any;
}

export const ArticleContext = createContext<IArticleContext>(
  null as unknown as IArticleContext
);

const ArticleContextProvider: FC<{ children: any }> = ({ children }) => {
  const [articles] = useState<IArticleDetails[]>([]);
  const loadingContext = useContext(LoadingContext);
  const messageContext = useContext(MessageContext);
  const navigate = useNavigate();

  const getAllArticles = () => {};

  const getOneArticle = () => {};

  const createArticle: (body: IArticleDetails) => void = async (body) => {
    try {
      loadingContext.setIsLoading(true);
      await articleAPI.createArticle({
        ...body,
        author: body.author.map(({ key, label }) => ({
          email: key,
          name: label,
        })),
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

  const acceptArticle = async (id: number) => {
    try {
      loadingContext.setIsLoading(true);
      const data = await articleAPI.acceptArticle(id);
      return data;
    } catch (error: any) {
      messageContext.onAddMessage(
        "Something went wrong when accepting the article!"
      );
    } finally {
      loadingContext.setIsLoading(false);
    }
  };

  const deleteArticle = async () => {};

  return (
    <ArticleContext.Provider value={{ articles, createArticle, acceptArticle }}>
      {children}
    </ArticleContext.Provider>
  );
};

export default ArticleContextProvider;
