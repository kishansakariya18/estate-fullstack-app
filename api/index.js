import express from "express"
import dotenv from 'dotenv';
import cookieParser  from 'cookie-parser'
import cors from "cors"
import authRoutes from "./routes/auth.routes.js"
import testRoutes from "./routes/test.routes.js"
import userRoutes from "./routes/user.routes.js"
import postRoutes from "./routes/post.routes.js"
import chatRoutes from "./routes/chat.routes.js"
import messageRoutes from "./routes/message.routes.js"
const app = express()

dotenv.config();

app.use(cors({ origin: "http://localhost:5173", credentials: true  })) //? chage in production
app.use(cookieParser());
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/auth', authRoutes)
app.use('/api/test', testRoutes)
app.use('/api/user', userRoutes)
app.use('/api/post', postRoutes)
app.use('/api/chat', chatRoutes)
app.use('/api/message', messageRoutes)



app.listen(8080, () => {
    console.log('server is starting on ::> ', 8080)
})