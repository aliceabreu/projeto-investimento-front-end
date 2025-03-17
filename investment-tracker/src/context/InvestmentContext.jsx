import React, { createContext, useState } from "react";

export const InvestmentContext = createContext();

export const InvestmentProvider = ({ children }) => {
  const [investments, setInvestments] = useState([]);

  const addInvestment = (investment) => {
    setInvestments([...investments, investment]);
  };

  const deleteInvestment = (index) => {
    const updatedInvestments = investments.filter((_, i) => i !== index);
    setInvestments(updatedInvestments);
  };

  const editInvestment = (index, updatedInvestment) => {
    const updatedInvestments = investments.map((inv, i) =>
      i === index ? updatedInvestment : inv
    );
    setInvestments(updatedInvestments);
  };

  return (
    <InvestmentContext.Provider
      value={{ investments, addInvestment, deleteInvestment, editInvestment }}
    >
      {children}
    </InvestmentContext.Provider>
  );
};
