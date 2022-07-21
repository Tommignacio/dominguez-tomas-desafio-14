import { Router } from 'express';

const chatsRouter = Router();

chatsRouter.get("/", (req, res) => {
    // res.send({ msg: "hola" })
})

export default chatsRouter