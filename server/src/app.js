import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import contactRoutes from './routes/contactRoutes.js';
import { generalLimiter } from './middleware/rateLimiter.js';

export const createApp = () => {
  const app = express();

  // 1. Security Headers
  app.use(helmet());

  // 2. CORS Configuration
  const defaultOrigins = [
    'http://localhost:5173',
    'http://localhost:3000',
    'http://127.0.0.1:5173',
    'http://127.0.0.1:3000',
    'https://peejaydavid.dev',
    'https://www.peejaydavid.dev',
  ];

  const envOrigins = [
    ...(process.env.CLIENT_URL ? process.env.CLIENT_URL.split(',') : []),
    ...(process.env.ALLOWED_ORIGINS ? process.env.ALLOWED_ORIGINS.split(',') : []),
  ].map((origin) => origin.trim()).filter(Boolean);

  const allowedOrigins = Array.from(new Set([...defaultOrigins, ...envOrigins]));

  const corsOptions = {
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);

      if (
        allowedOrigins.includes(origin) ||
        process.env.NODE_ENV === 'development' ||
        origin.endsWith('.peejaydavid.dev') ||
        origin.endsWith('.vercel.app')
      ) {
        return callback(null, true);
      }

      console.warn(`[CORS Blocked] Origin "${origin}" not in allowed list.`);
      return callback(new Error(`Origin ${origin} not allowed by CORS`));
    },
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  };

  app.use(cors(corsOptions));

  // 3. Request Parsing
  app.use(express.json({ limit: '50kb' }));
  app.use(express.urlencoded({ extended: true, limit: '50kb' }));

  // 4. Trust Proxy
  app.set('trust proxy', 1);

  // 5. Health Check & Root Endpoint
  app.get('/api/health', generalLimiter, (req, res) => {
    res.status(200).json({
      status: 'ok',
      service: 'portfolio-backend',
      timestamp: new Date().toISOString(),
      uptime: Math.floor(process.uptime()),
    });
  });

  app.get('/', (req, res) => {
    res.status(200).json({
      name: 'Peejay David Portfolio API',
      status: 'online',
      documentation: '/api/health or POST /api/contact',
    });
  });

  // 6. Routes
  app.use('/api', contactRoutes);

  // 7. 404 Handler
  app.use((req, res) => {
    res.status(404).json({
      success: false,
      error: `Endpoint '${req.method} ${req.originalUrl}' not found.`,
    });
  });

  // 8. Global Error Handler
  app.use((err, req, res, next) => {
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
      return res.status(400).json({
        success: false,
        error: 'Malformed JSON payload provided.',
      });
    }

    if (err.message && err.message.includes('not allowed by CORS')) {
      return res.status(403).json({
        success: false,
        error: 'CORS policy violation: origin not allowed.',
      });
    }

    console.error('[Unhandled Server Error]', err);
    return res.status(500).json({
      success: false,
      error: 'An internal server error occurred.',
    });
  });

  return app;
};