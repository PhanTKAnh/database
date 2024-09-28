const jsonServer = require('json-server');
const path = require('path');
const fs = require('fs');

const server = jsonServer.create();
const filePath = path.join(__dirname, 'database.json');

let db;
try {
    const data = fs.readFileSync(filePath, 'utf-8');
    db = JSON.parse(data);
} catch (error) {
    console.error('Error reading database.json:', error.message);
    process.exit(1);  // Dừng server nếu không thể đọc tệp
}

const router = jsonServer.router(db);
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(jsonServer.rewriter({
    '/api/*': '/$1',
    '/blog/:resource/:id/show': '/:resource/:id'
}));
server.use(router);

// Xử lý lỗi
server.use((err, req, res, next) => {
    console.error('Server error:', err.message);
    res.status(500).json({ error: 'Internal Server Error' });
});

// Xuất server để Vercel có thể sử dụng
module.exports = server;
