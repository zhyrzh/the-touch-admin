import { FC, createContext, useContext, useState } from "react";
import { MessageContext } from "./message";
import { LoadingContext } from "./loading";
import { articleAPI } from "../api/article";
import { IUploadedImage } from "../hooks/useUploadImage";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";

export interface IJournalistDetails {
  email: string;
  isApproved: boolean;
  firstName: string;
  lastName: string;
  course: string;
  position: string;
  profileImage: {
    id: number;
    publicId: string;
    url: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface IArticleDetails {
  id: number;
  isApproved: boolean;
  category: string;
  headline: string;
  content: string;
  author: {
    key: string;
    label: string;
  }[];
  photoJournalist: {
    key: string;
    label: string;
  }[];
  graphicsArtist: {
    key: string;
    label: string;
  }[];
  createdAt: string;
  uploadedFiles: IUploadedImage[];
}

interface IArticleContext {
  articles: Array<IArticleDetails>;
  createArticle: (body: Partial<IArticleDetails>) => void;
  acceptArticle: (id: number) => any;
  getHomePageArticles: () => void;
}

export const ArticleContext = createContext<IArticleContext>(
  null as unknown as IArticleContext
);

const ArticleContexttProvider: FC<{ children: any }> = ({ children }) => {
  const loadingContext = useContext(LoadingContext);
  const messageContext = useContext(MessageContext);
  const navigate = useNavigate();
  const [articles, setArticles] = useState<IArticleDetails[]>([]);

  const createArticle = async (body: Partial<IArticleDetails>) => {
    try {
      loadingContext.setIsLoading(true);
      await articleAPI.createArticle({
        ...body,
        author:
          body.author &&
          body.author.map(({ key, label }) => ({
            email: key,
            name: label,
          })),
        photoJournalist: body.photoJournalist!.map(({ key }) => ({
          email: key,
        })),
        graphicsArtist: body.graphicsArtist!.map(({ key }) => ({ email: key })),
        featuredImages:
          body.uploadedFiles &&
          body.uploadedFiles.map((file) => ({
            publicId: file.publicId,
            url: file.url,
          })),
        createdAt:
          body.createdAt !== ""
            ? body.createdAt
            : dayjs().format("YYYY-MM-DD HH:mm:ss").toString(),
      });
      navigate("/");
    } catch (error) {
      messageContext.onAddMessage("Something went wrong with the server.");
    } finally {
      loadingContext.setIsLoading(false);
    }
  };

  const acceptArticle = async (id: number) => {
    try {
      loadingContext.setIsLoading(true);
      const data = await articleAPI.acceptArticle(id);
      if (data !== undefined) {
        getHomePageArticles();
      }
      // return data;
    } catch (error: any) {
      messageContext.onAddMessage(
        "Something went wrong when accepting the article!"
      );
    } finally {
      loadingContext.setIsLoading(false);
    }
  };

  const getHomePageArticles = async () => {
    try {
      loadingContext.setIsLoading(true);
      const data = await articleAPI.getAll();
      setArticles((_prevData) =>
        data.map((artcle: any) => ({
          id: artcle.id,
          headline: artcle.headline,
          content: artcle.content,
          author: artcle.author,
          date: artcle.createdAt,
          uploadedFiles: artcle.images,
        }))
      );
    } catch (error) {
    } finally {
      loadingContext.setIsLoading(false);
    }
  };

  return (
    <ArticleContext.Provider
      value={{ articles, createArticle, acceptArticle, getHomePageArticles }}
    >
      {children}
    </ArticleContext.Provider>
  );
};

export default ArticleContexttProvider;
