import { getGrid, claimCell, unclaimCell, getLeaderboard } from "./grid.js";

export default function setupSocket(io) {
    io.on("connection", (socket) => {
        console.log("User connected:", socket.id);

        // initial grid
        socket.emit("init", getGrid());

        // claim
        socket.on("claim_cell", ({ x, y, user, color }) => {
            const success = claimCell(x, y, user, color);

            if (success) {
                io.emit("cell_updated", { x, y, user, color });
                console.log(`Cell claimed at (${x}, ${y}) by ${user}`);
                // update leaderboard
                io.emit("leaderboard", getLeaderboard());
            }
            else{
                socket.emit("error", "Cell already taken");
            }
        });

        // unclaim
        socket.on("unclaim_cell", ({ x, y, user }) => {
            const success = unclaimCell(x, y, user);
        
            if (success) {
                io.emit("cell_unclaimed", { x, y });
                console.log(`Cell unclaimed at (${x}, ${y}) by ${user}`);

                // update leaderboard
                io.emit("leaderboard", getLeaderboard());
            }
        });

        // leader board 
        socket.emit("leaderboard", getLeaderboard());

        socket.on("disconnect", () => {
            console.log("User disconnected:", socket.id);
        });
    });
}