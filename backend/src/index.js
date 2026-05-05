import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import setupSocket from "./socket.js";

const app = express();
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "*",
    },
});


setupSocket(io);

app.get("/", (req, res) => {
    res.send("Health check - Server is running");
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});