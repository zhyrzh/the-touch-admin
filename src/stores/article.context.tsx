import { FC, createContext, useContext, useState } from "react";
// import { MessageContext } from "./message";
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
  createArticle: (
    body: Pick<
      IArticleDetails,
      | "category"
      | "headline"
      | "content"
      | "author"
      | "graphicsArtist"
      | "photoJournalist"
      | "createdAt"
      | "uploadedFiles"
    >
  ) => void;
  acceptArticle: (id: number) => any;
}

export const ArticleContext = createContext<IArticleContext>(
  null as unknown as IArticleContext
);

const ArticleContexttProvider: FC<{ children: any }> = ({ children }) => {
  const loadingContext = useContext(LoadingContext);
  //   const messageContext = useContext(MessageContext);
  const navigate = useNavigate();
  const [articles] = useState<IArticleDetails[]>([]);

  const createArticle = async (
    body: Pick<
      IArticleDetails,
      | "category"
      | "headline"
      | "content"
      | "author"
      | "graphicsArtist"
      | "photoJournalist"
      | "createdAt"
      | "uploadedFiles"
    >
  ) => {
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
    } catch (error) {
    } finally {
      loadingContext.setIsLoading(false);
    }
  };

  const acceptArticle = (id: number) => {};

  //   const getLimitedArticles = () => {};

  return (
    <ArticleContext.Provider value={{ articles, createArticle, acceptArticle }}>
      {children}
    </ArticleContext.Provider>
  );
};

export default ArticleContexttProvider;
