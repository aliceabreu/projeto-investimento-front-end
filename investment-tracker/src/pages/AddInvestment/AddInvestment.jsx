import { useState, useContext } from "react";
import { InvestmentContext } from "../../context/InvestmentContext";
import { useNavigate } from "react-router-dom";
import "./AddInvestment.css";

function AddInvestment() {
  const { addInvestment } = useContext(InvestmentContext);
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [value, setValue] = useState("");
  const [date, setDate] = useState("");
  const [dateError, setDateError] = useState("");
  const navigate = useNavigate();

  const formatCurrency = (valor) => {
    const numericValue = parseFloat(valor.replace(/[^\d]/g, "")) / 100;
    return numericValue.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  };

  const handleValueChange = (e) => {
    let rawValue = e.target.value.replace(/[^\d]/g, "");
    if (rawValue === "") {
      setValue("");
      return;
    }
    setValue(formatCurrency(rawValue));
  };

  const isValidDate = (day, month, year) => {
    if (month < 1 || month > 12) return false;
    if (day < 1) return false;

    const daysInMonth = [31, (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0 ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    return day <= daysInMonth[month - 1];
  };

  const formatDate = (value) => {
    let cleaned = value.replace(/\D/g, "");
    if (cleaned.length > 8) cleaned = cleaned.slice(0, 8);

    let formatted = cleaned.replace(/(\d{2})(\d{2})(\d{4})/, "$1/$2/$3");
    return formatted;
  };

  const handleDateChange = (e) => {
    const inputValue = e.target.value;

    if (inputValue === "") {
      setDate("");
      setDateError("");
      return;
    }

    const formatted = formatDate(inputValue);
    setDate(formatted);

    if (formatted.length === 10) {
      const [day, month, year] = formatted.split("/").map(Number);
      if (!isValidDate(day, month, year)) {
        setDateError("Data inválida!");
      } else {
        setDateError("");
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (dateError) return;

    const formattedDate = date.split("/").reverse().join("-"); 
    const numericValue = parseFloat(value.replace(/[^\d,]/g, "").replace(",", "."));
    addInvestment({ name, type, value: numericValue, date: formattedDate });
    navigate("/");
  };

  return (
    <div className="add-investment-container">
      <h1 className="addInvestment-title">Adicionar Investimento</h1>
      <form className="add-investment-form" onSubmit={handleSubmit}>
        <label>Nome:</label>
        <input
          type="text"
          placeholder="Ex: Ações Banco"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <label>Tipo:</label>
        <select value={type} onChange={(e) => setType(e.target.value)} required>
          <option value="">Selecione</option>
          <option value="Ação">Ação</option>
          <option value="Fundo">Fundo</option>
        </select>

        <label>Valor:</label>
        <input
          type="text"
          placeholder="R$ 0,00"
          value={value}
          onChange={handleValueChange}
          required
        />

        <label>Data:</label>
        <input
          type="text"
          placeholder="dd/mm/aaaa"
          value={date}
          onChange={handleDateChange}
          maxLength={10}
          required
        />
        {dateError && <p className="error">{dateError}</p>}

        <button type="submit" disabled={dateError}>Salvar</button>
      </form>
    </div>
  );
}

export default AddInvestment;
