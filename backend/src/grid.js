
// 50x50 grid
const grid = Array.from({ length: 50 }, () =>
    Array.from({ length: 50 }, () => null)
);

export const getGrid = () => grid;

export const claimCell = (x, y, user, color) => {
    if (!grid[y][x]) {
        grid[y][x] = { user, color };
        return true;
    }
    return false;
};


export const unclaimCell = (x, y, user) => {
    if (grid[y][x] && grid[y][x].user === user) {
        grid[y][x] = null;
        return true;
    }
    return false;
};


export const getLeaderboard = () => {
    const counts = {};

    for (let row of grid) {
        for (let cell of row) {
            if (cell?.user) {
                counts[cell.user] = (counts[cell.user] || 0) + 1;
            }
        }
    }

    // convert to sorted array
    return Object.entries(counts)
        .map(([user, count]) => ({ user, count }))
        .sort((a, b) => b.count - a.count);
};