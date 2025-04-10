{
  "version": 2,
  "builds": [
    {
      "src": "server.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/api/(.*)", // semua rute API diarahkan ke server.js
      "dest": "/server.js"
    }
  ]
}
