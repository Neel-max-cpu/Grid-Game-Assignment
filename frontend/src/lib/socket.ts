import { io } from "socket.io-client";


export const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
export const socket = io(BASE_URL);