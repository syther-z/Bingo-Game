export const Const = {
    connectionString: import.meta.env.VITE_BACKEND_URL || `https://bingo-backend-dbwn.onrender.com`,
    gameTimer: 12
}
// console.log("ENV:", import.meta.env.VITE_BACKEND_URL);