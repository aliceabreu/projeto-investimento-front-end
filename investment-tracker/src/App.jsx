import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import ListInvestments from "./pages/ListInvestment/ListInvestments";
import AddInvestment from "./pages/AddInvestment/AddInvestment";
import EditInvestment from "./pages/EditInvestment/EditInvestment";
import { InvestmentProvider } from "./context/InvestmentContext";

function App() {
  return (
    <InvestmentProvider>
      <Router>
      <Header /> {}
        <Routes>
          <Route path="/" element={<ListInvestments />} />
          <Route path="/add" element={<AddInvestment />} />
          <Route path="/edit" element={<EditInvestment />} />
        </Routes>
      </Router>
    </InvestmentProvider>
  );
}

export default App;
