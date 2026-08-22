import { createApp } from '../src/app.js';
import http from 'http';

async function runTests() {
  console.log('--- Starting Backend Server & API Tests ---');
  const app = createApp();
  const server = http.createServer(app);

  await new Promise((resolve) => server.listen(0, resolve));
  const port = server.address().port;
  const baseUrl = `http://127.0.0.1:${port}`;
  console.log(`Test server running on ${baseUrl}`);

  let passed = 0;
  let failed = 0;

  const assert = (condition, message) => {
    if (condition) {
      console.log(`✅ PASS: ${message}`);
      passed++;
    } else {
      console.error(`❌ FAIL: ${message}`);
      failed++;
    }
  };

  try {
    // Test 1: GET /api/health
    {
      const res = await fetch(`${baseUrl}/api/health`);
      const data = await res.json();
      assert(res.status === 200, 'GET /api/health returns 200 OK');
      assert(data.status === 'ok', 'GET /api/health payload contains status ok');
    }

    // Test 2: POST /api/contact with valid payload (mock mode)
    {
      const res = await fetch(`${baseUrl}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'Jane Doe',
          email: 'jane@example.com',
          subject: 'Cloud Project Inquiry',
          message: 'Hello Peejay, I would like to discuss a cloud engineering project with you.',
        }),
      });
      const data = await res.json();
      assert(res.status === 200, 'POST /api/contact with valid data returns 200');
      assert(data.success === true, 'POST /api/contact valid data success flag is true');
    }

    // Test 3: POST /api/contact with invalid email
    {
      const res = await fetch(`${baseUrl}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'Jane Doe',
          email: 'not-an-email',
          subject: 'Project',
          message: 'This should fail validation',
        }),
      });
      const data = await res.json();
      assert(res.status === 400, 'POST /api/contact with invalid email returns 400 Bad Request');
      assert(data.success === false, 'POST /api/contact invalid email success flag is false');
    }

    // Test 4: POST /api/contact with missing/short message
    {
      const res = await fetch(`${baseUrl}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'Jane Doe',
          email: 'jane@example.com',
          subject: 'Hi',
          message: 'hi', // < 5 chars
        }),
      });
      const data = await res.json();
      assert(res.status === 400, 'POST /api/contact with short message returns 400 Bad Request');
      assert(data.success === false, 'POST /api/contact short message success flag is false');
    }

    // Test 5: POST /api/contact with Honeypot field filled (bot simulation)
    {
      const res = await fetch(`${baseUrl}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'Spam Bot',
          email: 'spambot@example.com',
          subject: 'Buy cheap watches',
          message: 'Spam text here...',
          _gotcha: 'http://spamurl.com', // Honeypot trap triggered
        }),
      });
      const data = await res.json();
      assert(res.status === 200, 'Honeypot trap silently returns 200 OK to bot');
      assert(data.success === true, 'Honeypot trap response contains success: true');
    }

    // Test 6: GET /api/contact should return 405 Method Not Allowed
    {
      const res = await fetch(`${baseUrl}/api/contact`);
      const data = await res.json();
      assert(res.status === 405, 'GET /api/contact returns 405 Method Not Allowed');
    }

    // Test 7: GET /api/unknown-endpoint should return 404
    {
      const res = await fetch(`${baseUrl}/api/unknown-route-12345`);
      const data = await res.json();
      assert(res.status === 404, 'GET unknown route returns 404 Not Found');
    }
  } finally {
    await new Promise((resolve) => server.close(resolve));
    console.log(`\nTest Summary: ${passed} passed, ${failed} failed`);
    if (failed > 0) {
      process.exit(1);
    }
  }
}

runTests().catch((err) => {
  console.error('Test execution failed:', err);
  process.exit(1);
});
