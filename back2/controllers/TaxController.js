import Tax from "../models/TaxModel.js";

// Calculate tax based on Indian slabs (FY 2024-25)
export const calculateTax = async (req, res) => {
  try {
    const { userId, annualIncome, investments, deductions, otherIncome } = req.body;

    if (!userId || !annualIncome) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    let taxableIncome = annualIncome + otherIncome - investments - deductions;
    
    
    let taxPayable = 0;
    if (taxableIncome > 1000000) taxPayable = taxableIncome * 0.3; 
    else if (taxableIncome > 500000) taxPayable = taxableIncome * 0.2; 
    else if (taxableIncome > 250000) taxPayable = taxableIncome * 0.05; 

    
    const newTaxRecord = new Tax({
      userId,
      annualIncome,
      investments,
      deductions,
      otherIncome,
      taxableIncome,
      taxPayable,
    });

    await newTaxRecord.save(); 

    res.json({
      message: "Tax calculated and saved successfully!",
      taxableIncome,
      taxPayable,
      savingsTips: taxPayable > 0 ? "Invest more in 80C to save tax!" : "No tax payable",
    });

  } catch (error) {
    console.error("Error Saving Tax Record:", error);
    res.status(500).json({ message: "Error calculating tax", error });
  }
};


export const getUserTaxHistory = async (req, res) => {
  try {
    const { userId } = req.params;
    const taxHistory = await Tax.find({ userId }).sort({ createdAt: -1 });

    res.json({ taxHistory });
  } catch (error) {
    console.error(" Error Fetching Tax History:", error);
    res.status(500).json({ message: "Error fetching tax history", error });
  }
};
