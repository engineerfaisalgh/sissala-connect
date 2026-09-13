import 'dotenv/config';
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import 'express-async-errors';
import pinoHttp from 'pino-http';
import { logger } from './config/logger';
import { errorHandler } from './middleware/errorHandler';

const app = express();
const PORT = process.env.PORT || 3000;

// Security Middleware
app.use(helmet());
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:3001',
  credentials: true,
}));

// Logging Middleware
app.use(pinoHttp({ logger }));

// Body Parser Middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// Health Check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// API Routes (will be added)
app.use('/api/v1', (req, res) => {
  res.status(501).json({ message: 'API routes coming soon' });
});

// 404 Handler
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Error Handler (must be last)
app.use(errorHandler);

// Start Server
const server = app.listen(PORT, () => {
  logger.info(`Server running on http://localhost:${PORT}`);
});

// Graceful Shutdown
process.on('SIGTERM', () => {
  logger.info('SIGTERM received, shutting down gracefully');
  server.close(() => {
    logger.info('Server closed');
    process.exit(0);
  });
});

export default app;
