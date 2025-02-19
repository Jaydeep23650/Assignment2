import { useState } from "react";
import "./styles.css";

export default function TaxForm() {
  const [formData, setFormData] = useState({
    userId: new Date(), // Hardcoded for now, can be replaced with dynamic user input
    annualIncome: "",
    investments: "",
    deductions: "",
    otherIncome: "",
  });
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: Number(e.target.value) || "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await fetch("http://localhost:5000/api/tax/calculate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch tax data");
      }

      const data = await response.json();
      setResult(data);
    } catch (error) {
      setError("Error calculating tax. Please try again.");
      console.error("API Error:", error);
    }
  };

  return (
    <div className="form-container">
      <h1 className="title">Tax Calculation Portal</h1>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit} className="form">
        <input
          type="number"
          name="annualIncome"
          placeholder="Annual Income"
          className="input"
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="investments"
          placeholder="Investments (80C, 80D)"
          className="input"
          onChange={handleChange}
        />
        <input
          type="number"
          name="deductions"
          placeholder="Other Deductions (HRA, LTA)"
          className="input"
          onChange={handleChange}
        />
        <input
          type="number"
          name="otherIncome"
          placeholder="Income from Other Sources"
          className="input"
          onChange={handleChange}
        />
        <button type="submit" className="submit-button">Calculate Tax</button>
      </form>
      {result && (
        <div className="result-container">
          <h2 className="result-title">Results:</h2>
          <p className="result-text">
            Taxable Income: <span className="result-value">₹{result.taxableIncome}</span>
          </p>
          <p className="result-text">
            Tax Payable: <span className="result-value">₹{result.taxPayable}</span>
          </p>
          <p className="result-savings">{result.savingsTips}</p>
        </div>
      )}
    </div>
  );
}
