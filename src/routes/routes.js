import { Router } from "express";
const routes = Router();
import categoriaRoutes from "./categoriaRoutes.js"
import produtoRoutes from "./produtoRoutes.js";
import clienteRoutes from "./clienteRoutes.js";

routes.use('/clientes', clienteRoutes)
routes.use('/categoria', categoriaRoutes)
routes.use('/produtos', produtoRoutes)


export default routes