export const host = process.env.HOST === 'development'?
 "http://localhost:5000" : "https://funtalkserver.onrender.com";

export const registerRoute = `${host}/api/register`;
export const loginRoute = `${host}/api/login`;
export const logoutRoute = `${host}/api/logout`;
export const uploadDPRoute = `${host}/api/dp`;
export const usersRoute = `${host}/api/users`;
export const sendMessegeRoute = `${host}/api/message`;
export const getMessagesRoute = `${host}/api/messages`;
export const deleteMessegeRoutes = `${host}/api/deletemessege/`;
export const renameRoute = `${host}/api/auth/updateUsername`;