import { Router } from "express";
import cartsRouter from "./cartRoutes/CartRoutes.js";
import chatsRouter from "./ChatRoutes/chatRoutes.js";
import productsRouter from "./ProductRoutes/ProductRoutes.js";
import testProductsRouter from "./test/testProductsRouter.js";


const router = Router();

router.use("/api/productos", productsRouter);
router.use("/api/carrito", cartsRouter);
router.use("/api/productos-test", testProductsRouter);
router.use("/api/chat", chatsRouter)

export default router;
