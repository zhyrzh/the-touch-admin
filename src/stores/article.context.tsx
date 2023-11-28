import { FC, createContext, useContext, useState } from "react";
// import { MessageContext } from "./message";
import { LoadingContext } from "./loading";

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
    >
  ) => void;
  acceptArticle: (id: number) => any;
}

export const ArticleContextt = createContext<IArticleContext>(
  null as unknown as IArticleContext
);

const ArticleContexttProvider: FC<{ children: any }> = () => {
  const loadingContext = useContext(LoadingContext);
  //   const messageContext = useContext(MessageContext);
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
    >
  ) => {
    try {
      loadingContext.setIsLoading(true);
    } catch (error) {
    } finally {
      loadingContext.setIsLoading(false);
    }
  };

  const acceptArticle = (id: number) => {};

  //   const getLimitedArticles = () => {};

  return (
    <ArticleContextt.Provider
      value={{ articles, createArticle, acceptArticle }}
    ></ArticleContextt.Provider>
  );
};

export default ArticleContexttProvider;
