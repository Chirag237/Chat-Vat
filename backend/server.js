const expess=require("express");
const dotenv=require("dotenv");
const {chats}=require("./data/data");
const connectDB =require("./config/db");
const userRoutes=require('./routes/userRoutes')
const chatRoutes = require('./routes/chatRoutes')
const messageRoutes =require('./routes/messageRoutes')
const { errorHandler, notFound } = require('./middlewares/errorMiddleware');
const req = require("express/lib/request");

dotenv.config();
connectDB()
const app=expess();
app.use(expess.json());  //to tell server to accept the JSON  data
app.get('/', (req, res) => res.send('Hello World!'))

app.use('/api/user',userRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/message', messageRoutes);
app.use(notFound)
app.use(errorHandler)
const PORT=process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server ready at ${PORT}`))

