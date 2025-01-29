import express from "express";
const InsertRoute = express.Router();

import * as InsertController from "../controllers/INSERTDATAController.js";


InsertRoute.get('/userdatainsertmany',InsertController.UserMODELDataINSERTMany);
InsertRoute.get('/userdatainsertone',InsertController.UserMODELDataINSERTOne);

export default InsertRoute;