import http from "http";
import express, { Express } from "express";
import routes from "./routes/article";
import pino from "pino";

const router: Express = express();

// Setup Pino Logging
let logger = pino({
  formatters: {
    level(label) {
      return { level: label };
    },
  },
});
// Parse request
router.use(express.urlencoded({ extended: false }));
// Parse JSON data
router.use(express.json());

// API ROUTER RULES
router.use((req, res, next) => {
  // set the CORS policy
  res.header("Access-Control-Allow-Origin", "*");
  // set the CORS headers
  res.header(
    "Access-Control-Allow-Headers",
    "origin, X-Requested-With,Content-Type,Accept, Authorization"
  );
  // set the CORS method headers
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "GET PATCH DELETE POST");
    return res.status(200).json({});
  }
  next();
});

// Expose the two article endpoints
router.use("/", routes);

// Handle error when calls made to non-existing endpoints
// return 404
router.use((req, res, next) => {
  const error = new Error("not found");
  return res.status(404).json({
    message: error.message,
  });
});

// Start the server, expose port
const httpServer = http.createServer(router);
const PORT: any = process.env.PORT ?? 6060;
httpServer.listen(PORT, () =>
  logger.info(`The server is running on port ${PORT}`)
);
