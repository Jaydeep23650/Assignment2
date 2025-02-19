import express from "express";
import { calculateTax, getUserTaxHistory } from "../controllers/TaxController.js"; 

const router = express.Router();


router.post("/calculate", calculateTax);


router.get("/history/:userId", getUserTaxHistory);

export default router;
