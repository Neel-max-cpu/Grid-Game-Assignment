'use client'
import { socket } from '@/lib/socket';
import React, { useEffect, useState } from 'react'
import Grid from './Grid';
import toast from 'react-hot-toast';
import LeaderBoard from './LeaderBoard';

const getUser = () => {
    let user = localStorage.getItem("user");
    let colour = localStorage.getItem("colour");

    if (!user) {
        user = "user_" + Math.floor(Math.random() * 1000);
        localStorage.setItem("user", user);
    }

    if (!colour) {
        colour = "#" + Math.floor(Math.random() * 16777215).toString(16);
        localStorage.setItem("colour", colour);
    }

    return { user, colour };
};

const Home = () => {
    const { user, colour } = getUser();
    const [grid, setGrid] = useState<any[][]>([]);
    const [cooldown, setCooldown] = useState(false);
    const [leaderBoard, setLeaderBoard] = useState<any[]>([]);
    

    useEffect(() => {
        socket.on("init", (data) => {
            setGrid(data);
        });

        socket.on("leaderboard", (data) => {
            setLeaderBoard(data);
        });

        socket.on("cell_updated", ({ x, y, user, color }) => {
            setGrid((prev) => {
                const newGrid = prev.map((row) => [...row]);
                newGrid[y][x] = { user, color };
                return newGrid;
            });
        });

        socket.on("cell_unclaimed", ({ x, y }) => {
            setGrid((prev) => {
                const newGrid = prev.map((row) => [...row]);
                newGrid[y][x] = null;
                return newGrid;
            });
        });

        return () => {
            socket.off("init");
            socket.off("cell_updated");
            socket.off("cell_unclaimed");
            socket.off("leaderboard");
        }
    }, []);

    const handleClick = (x: number, y: number) => {
        if (cooldown) {
            toast('Theres a 3 second cooldown!', {
                icon: '🙂‍↔️🙅‍♂️',
            });
            return;
        }
        socket.emit("claim_cell", { x, y, user, color: colour });

        setCooldown(true);
        setTimeout(() => setCooldown(false), 3000);
    };

    const handleRightClick = (x: number, y: number, cell: any) => {
        if (!cell) return;

        if (cell.user !== user) {
            toast("You can only unclaim your own cells!", {
                icon: '🙂‍↔️🙅‍♂️',
            });            
            return;
        }

        socket.emit("unclaim_cell", { x, y, user });
    };

    return (
        <main className="flex flex-col items-center p-6 bg-black text-white">
            <h1 className="text-2xl font-bold mb-4">
                Grid
            </h1>
            <div className="flex flex-col items-center">
                <div className="flex items-center gap-2 mb-2">
                    <span>Your color:</span>
                    <div
                        className="w-6 h-6 rounded"
                        style={{ backgroundColor: colour }}
                    />
                </div>
                <div className="flex items-center gap-2 mb-2">
                    <span>Your name:</span>
                    <span>{user}</span>

                </div>
                <div className="flex mb-4 space-x-2">
                    <div className="flex items-center space-x-1">
                        <div className="w-2 h-2 rounded-full bg-white"/>
                        <span className="">Left Click to claim</span>
                    </div>
                    <div className="flex items-center space-x-1">
                        <div className="w-2 h-2 rounded-full bg-white"/>
                        <span className="">Right Click to unclaim</span>                    
                    </div>
                </div>
            </div>

            {/* leader board */}
            <LeaderBoard
                leaderBoard={leaderBoard}
                user={user}
            />

            {grid.length > 0 && (
                <Grid
                    grid={grid}
                    onCellClick={handleClick}
                    onCellRightClick={handleRightClick}
                    user={user}
                />
            )}            
        </main>
    )
}

export default Home