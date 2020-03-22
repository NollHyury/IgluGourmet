import {Router} from "express";
import ProductController from "../controllers/ProductController";
import { checkJwt } from "../middlewares/checkJwt";
import { checkRole } from "../middlewares/checkRole";


const controller = new ProductController()
const router = Router()

//getall Appetizers
router.get("/",controller.getAllProducts);
router.get("/:id", controller.getOneProduct);
router.post("/",[checkJwt,checkRole(["ADMIN"])],controller.createOneProduct);


export default router