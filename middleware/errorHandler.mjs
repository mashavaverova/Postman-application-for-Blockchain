import fs from 'fs';
import path from 'path';

// --- central error handler for all errors, write to error.log --- 
const errorHandler = (error, req, res, next) => {
  const filePath = path.join(__appdir, 'logs', 'error.log');

  error.statusCode = error.statusCode || 500;
  error.status = error.status || 'internal server error';

  const message = `${new Date().toLocaleDateString('sv-SE')},
    ${new Date().toLocaleTimeString('sv-SE')}, 
    Method: ${req.method},
    URL: ${req.originalUrl},
    Success: ${error.success},
    message: ${error.message},\n`;

  fs.appendFileSync(filePath, message);
  res.status(error.statusCode).json({ message: error.message });
};
export default errorHandler;
