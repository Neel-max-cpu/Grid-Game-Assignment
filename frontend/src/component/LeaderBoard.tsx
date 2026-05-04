import React from 'react'

const LeaderBoard = ({ leaderBoard, user }: any) => {
    return (
        <div className="mt-6 w-full max-w-xs bg-white/10 backdrop-blur rounded-lg p-4 mb-4 shadow-lg">
            <h2 className="text-lg text-center font-semibold mb-3">
                🏆 Leaderboard
            </h2>

            {leaderBoard.slice(0, 5).map((player: any, index: number) => {
                const isCurrentUser = player.user === user;

                let bgClass = "";
                let medal = "";

                if (index === 0) {
                    bgClass = "bg-yellow-400/30 border border-yellow-400";
                    medal = "👑";
                } else if (index === 1) {
                    bgClass = "bg-gray-300/30 border border-gray-400";
                    medal = "🥈";
                } else if (index === 2) {
                    bgClass = "bg-orange-400/30 border border-orange-400";
                    medal = "🥉";
                }

                return (
                    <div
                        key={player.user}
                        className={`
                            flex justify-between items-center text-sm py-2 px-3 rounded-md mb-4 transition-all
                            ${bgClass}
                            ${isCurrentUser ? "ring-2 ring-blue-400 scale-105 animate-pulse" : ""}                            
                        `}                                                
                    >
                        <span className="flex items-center gap-2">
                            <span>{medal || index + 1 + "."}</span>
                            <span className={isCurrentUser ? "font-bold text-blue-400" : ""}>
                                {isCurrentUser ? "You" : player.user}
                            </span>
                        </span>

                        <span className="font-medium">
                            {player.count}
                        </span>
                    </div>
                );
            })}
        </div>
    )
}

export default LeaderBoard