import app from "./app";
import { PORT, HOST } from "./config";
import logger from "./config/logger.config";

app.listen(PORT, () => {
  logger.info(`Server running at http://${HOST}:${PORT}`);
});
