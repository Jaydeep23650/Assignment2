import mongoose from "mongoose";

const TaxSchema = new mongoose.Schema({
  userId: { type: String, required: true }, 
  annualIncome: { type: Number, required: true },
  investments: { type: Number, default: 0 },
  deductions: { type: Number, default: 0 },
  otherIncome: { type: Number, default: 0 },
  taxableIncome: { type: Number, required: true },
  taxPayable: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Tax", TaxSchema);
