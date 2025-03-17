import { useState, useEffect, useContext } from "react";
import { InvestmentContext } from "../../context/InvestmentContext";
import { useNavigate, useLocation } from "react-router-dom";
import "./EditInvestment.css";

function EditInvestment() {
  const { investments, editInvestment } = useContext(InvestmentContext);
  const navigate = useNavigate();
  const location = useLocation();
  const { index } = location.state;
  const investment = investments[index];

  const [name, setName] = useState(investment.name);
  const [type, setType] = useState(investment.type);
  const [value, setValue] = useState(investment.value);
  const [date, setDate] = useState(investment.date);
  const [dateError, setDateError] = useState("");

  useEffect(() => {
    setName(investment.name);
    setType(investment.type);
    setValue(investment.value);
    setDate(investment.date);
  }, [investment]);

  const formatCurrency = (valor) => {
    let numericValue = valor;
    if (!isNumber(valor)) {
      numericValue = parseFloat(valor.replace(/[^\d]/g, "")) / 100;
    }
    return numericValue.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  };

  function isNumber(value) {
    return typeof value === "number" && Number.isFinite(value);
  }

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

    const daysInMonth = [
      31,
      (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0 ? 29 : 28,
      31,
      30,
      31,
      30,
      31,
      31,
      30,
      31,
      30,
      31,
    ];

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

  function convertToDateFormat(dateString) {
    // Verifica se a data já está no formato dd/mm/aaaa
    const regex = /^(\d{2})\/(\d{2})\/(\d{4})$/;

    // Se já estiver no formato correto, retorna a data sem modificações
    if (regex.test(dateString)) {
      return dateString;
    }

    // Caso não esteja no formato dd/mm/aaaa, converte de yyyy-mm-dd para dd/mm/aaaa
    const [year, month, day] = dateString.split("-"); // Divide a data no formato yyyy-mm-dd

    // Verifica se todas as partes da data (ano, mês e dia) estão presentes
    if (year && month && day) {
      return `${String(day).padStart(2, "0")}/${String(month).padStart(
        2,
        "0"
      )}/${year}`;
    }

    // Se a data estiver incompleta, retorna a data original sem alterações
    return dateString;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const formattedDate = date.split("/").reverse().join("-");
    let numericValue = value;
    if (!isNumber(numericValue)) {
      numericValue = parseFloat(value.replace(/[^\d,]/g, "").replace(",", "."));
    }
    editInvestment(index, {
      name,
      type,
      value: numericValue,
      date: formattedDate,
    });
    navigate("/");
  };

  return (
    <div className="edit-investment-container">
      <h1 className="editInvestment-title">Editar Investimento</h1>
      <form className="edit-investment-form" onSubmit={handleSubmit}>
        <label>Nome:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <label>Tipo:</label>
        <select value={type} onChange={(e) => setType(e.target.value)} required>
          <option value="Ação">Ação</option>
          <option value="Fundo">Fundo</option>
        </select>

        <label>Valor:</label>
        <input
          type="text"
          value={formatCurrency(value)}
          onChange={handleValueChange}
          required
          placeholder="R$ 0,00"
        />

        <label>Data:</label>
        <input
          type="text"
          value={convertToDateFormat(date)}
          onChange={handleDateChange}
          required
          placeholder="dd/mm/aaaa"
        />
        {dateError && <span className="error-message">{dateError}</span>}

        <button type="submit">Salvar</button>
      </form>
    </div>
  );
}

export default EditInvestment;
