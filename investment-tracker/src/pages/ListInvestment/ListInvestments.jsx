import { useContext } from "react";
import { InvestmentContext } from "../../context/InvestmentContext";
import { Link } from "react-router-dom";
import "./ListInvestments.css";

function ListInvestments() {
  const { investments, deleteInvestment } = useContext(InvestmentContext);
  return (
    <div className="container">
      <h1 className="listInvestment-title">Investimentos</h1>
      <div className="add-investment-seccion">
        <Link to="/add">
          <button className="add-button">Adicionar Investimento</button>
        </Link>
      </div>

      <div className="investment-list">
        <div className="investment-header">
          <div className="investment-item">Nome</div>
          <div className="investment-item">Tipo</div>
          <div className="investment-item">Valor</div>
          <div className="investment-item">Data</div>
          <div className="investment-item">Ações</div>
        </div>

        {investments.map((inv, index) => (
          <div key={index} className="investment-row">
            <div className="investment-item">{inv.name}</div>
            <div className="investment-item">{inv.type}</div>
            <div className="investment-item">{formatCurrency(inv.value)}</div>
            <div className="investment-item">{formatDate(inv.date)}</div>
            <div className="investment-actions">
              <button
                className="delete-button"
                onClick={() => deleteInvestment(index)}
              >
                Excluir
              </button>
              <Link to="/edit" state={{ index }}>
                <button className="edit-button">Editar</button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function formatDate(dateString) {
  if (!dateString) return ""; // Evita erro caso a data seja undefined
  const [year, month, day] = dateString.split("-");
  return `${day}/${month}/${year}`;
}

function formatCurrency(value) {
  if (typeof value !== "number") {
    value = Number(value); // Converte string para número
  }
  if (isNaN(value)) return "R$ 0,00"; // Evita erro se não for um número válido

  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

export default ListInvestments;
