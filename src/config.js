import "dotenv/config"


const DB_PASSWORD = process.env.DB_PASSWORD


export default {

    mongoDB: {
        URL: `mongodb+srv://tomas:${DB_PASSWORD}@cluster0.lefks.mongodb.net/chat?retryWrites=true&w=majority`,
        options: {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
    }

}
