"use strict";
// import { createServer } from "node:http";
// const hostname: string = "127.0.0.1";
// const port: number = 3000;
// const server = createServer((req, res) => {
//     res.statusCode = 200;
//     res.setHeader("Content-Type", "text/plain");
//     res.end("Hello TypeScript + Node.js!");
// });
// server.listen(port, hostname, () => {
//     console.log(`Server running at http://${hostname}:${port}/`);
// });
const greet = (name) => {
    return `Hello, ${name}!`;
};
console.log(greet("World"));
