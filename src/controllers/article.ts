import { Request, Response, NextFunction } from "express";
import pino from "pino";
import article_data from "../data/articles.json";

interface PaginatedResult {
  page: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
  data: Article[];
}
interface Article {
  articleId: string;
  title: string;
  summary: string;
  body: string;
  imageURL: string;
}

// Setup pino logger
let logger = pino({
  formatters: {
    level(label) {
      return { level: label };
    },
  },
});
// Getting all articles. Returns paginated list.
const getArticles = async (req: Request, res: Response, next: NextFunction) => {
  logger.info(`Attempting to retrieve list of articles`);
  try {
    let articles: Article[] = article_data;
    let page = Number(req.query.page) || 1;
    let pageSize = Number(req.query.size) || 5;
    let offset = (page - 1) * pageSize; // number of records to skip
    let paginatedItems = articles.slice(offset).slice(0, pageSize);
    let totalPages = Math.ceil(articles.length / pageSize);

    let result: PaginatedResult = {
      page: page,
      pageSize: pageSize,
      totalItems: articles.length,
      totalPages: totalPages,
      data: paginatedItems,
    };

    if (!articles) {
      logger.info(`No articles available`);
      return res.status(400).json({ message: `No articles available` });
    }
    logger.info(`Success`);
    return res.status(200).json({
      message: result,
    });
  } catch (e) {
    logger.error(
      {
        error: e,
      },
      `getArticles: error getting articles`
    );
    return res.status(400).json({});
  }
};

// Getting a single article.
const getArticle = async (req: Request, res: Response, next: NextFunction) => {
  logger.info(`Attempting to retrieve article ${req.params.id}`);
  try {
    let id: string = req.params.id;
    let article: Article = article_data.find((item) => {
      return item.articleId == id;
    })!;
    if (!article) {
      logger.info(`Article ${req.params.id} not found`);
      return res
        .status(404)
        .json({ message: `article ${req.params.id} not found` });
    }
    logger.info(`Success`);
    return res.status(200).json({
      message: article,
    });
  } catch (e) {
    logger.error(
      {
        error: e,
      },
      `getArticle: error getting an article ${req.params.id}`
    );
    return res.status(400).json({});
  }
};

export default { getArticles, getArticle };
