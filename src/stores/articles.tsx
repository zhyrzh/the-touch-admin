import { createContext, useState, FC } from "react";

export interface IArticle {
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

interface IArticleContext {
  articles: Array<IArticle>;
}

export const ArticleContext = createContext<IArticleContext>(
  null as unknown as IArticleContext
);

const ArticleContextProvider: FC<{ children: any }> = ({ children }) => {
  const [articles, setArticles] = useState<IArticle[]>([]);

  const getAllArticles = () => {};

  const getOneArticle = () => {};

  const createArticle = async (body: IArticle) => {
    const data = await fetch("");
  };

  const deleteArticle = async () => {};

  return (
    <ArticleContext.Provider value={{ articles }}>
      {children}
    </ArticleContext.Provider>
  );
};

export default ArticleContextProvider;
