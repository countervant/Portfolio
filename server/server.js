import 'dotenv/config';
import { createApp } from './src/app.js';

const PORT = parseInt(process.env.PORT || '5000', 10);
const app = createApp();

const server = app.listen(PORT, () => {
  console.log(`
=====================================================
🚀 Portfolio Backend Server Running
=====================================================
- Port:        ${PORT}
- Environment: ${process.env.NODE_ENV || 'development'}
- HealthCheck: http://localhost:${PORT}/api/health
- Contact API: http://localhost:${PORT}/api/contact
=====================================================
  `);
});

// Handle graceful shutdown
const gracefulShutdown = (signal) => {
  console.log(`\n[Server] Received ${signal}. Closing server gracefully...`);
  server.close(() => {
    console.log('[Server] HTTP server closed. Exiting process.');
    process.exit(0);
  });

  // Force close if it takes too long
  setTimeout(() => {
    console.error('[Server] Forced shutdown due to timeout.');
    process.exit(1);
  }, 5000);
};

process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));
