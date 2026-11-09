
import { useEffect,useState } from "react";
import ExpenseForm from "./components/Expenseform";
import ExpenseFilter from "./components/Expensefilter";
import "./App.css";

function App() {
  
const [expenses, setExpenses] = useState(() => {
  const savedExpenses = localStorage.getItem("expenses");

  if (savedExpenses !== null) {
    try {
      const parsedExpenses = JSON.parse(savedExpenses);

      if (Array.isArray(parsedExpenses)) {
        return parsedExpenses;
      }
    } catch (error) {
      console.error("Failed to load saved expenses:", error);
    }
  }

  return [
    { id: 1, title: "Lunch", category: "Food", amount: 250 },
    { id: 2, title: "Taxi", category: "Transport", amount: 150 },
    { id: 3, title: "Internet", category: "Utilities", amount: 600 },
  ];
});

useEffect(() => {
  localStorage.setItem(
    "expenses",
    JSON.stringify(expenses)
  );
}, [expenses]);

  const [editingExpense, setEditingExpense] = useState(null);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  function addExpense(newExpense) {
    setExpenses((prevExpenses) => [
      ...prevExpenses,
      newExpense,
    ]);
  }
function deleteExpense(id) {
  setExpenses((prevExpenses) =>
    prevExpenses.filter((expense) => expense.id !== id)
  );
  if (editingExpense?.id === id) {
  setEditingExpense(null);
}
}
function updateExpense(id, updatedData) {
  setExpenses((prevExpenses) =>
    prevExpenses.map((expense) =>
      expense.id === id
        ? { ...expense, ...updatedData }
        : expense
    )
  );

  setEditingExpense(null);
}
const totalExpenses = expenses.reduce(
  (total, expense) => total + expense.amount,
  0
);
const filteredExpenses = expenses.filter((expense) => {
  const matchesSearch = expense.title
    .toLowerCase()
    .includes(search.toLowerCase());

  const matchesCategory =
    categoryFilter === "All" ||
    expense.category === categoryFilter;

  return matchesSearch && matchesCategory;
});
  
return (
  <div className="app-container">
    <header className="app-header">
      <div>
        <h1>ExpenseTracker</h1>
        <p>Manage your daily expenses easily.</p>
      </div>
    </header>

    <div className="stats-container">
      <div className="stat-card">
        <h3>Total Expenses</h3>
        <h2>{totalExpenses.toLocaleString()} ETB</h2>
      </div>

      <div className="stat-card">
        <h3>Total Transactions</h3>
        <h2>{expenses.length}</h2>
      </div>
    </div>

    <div className="dashboard-grid">
      <section className="form-section">
        <ExpenseForm
          key={editingExpense?.id ?? "new"}
          onAddExpense={addExpense}
          onUpdateExpense={updateExpense}
          editingExpense={editingExpense}
          onCancelEdit={() => setEditingExpense(null)}
        />
      </section>

      <section className="expense-section">
        <ExpenseFilter
          search={search}
          setSearch={setSearch}
          categoryFilter={categoryFilter}
          setCategoryFilter={setCategoryFilter}
        />

        <h2>My Expenses</h2>

        {filteredExpenses.length === 0 ? (
          <p>No matching expenses found.</p>
        ) : (
          filteredExpenses.map((expense) => (
            <div className="expense-card" key={expense.id}>
              <div>
                <h3>{expense.title}</h3>
                <p>{expense.category}</p>
                <strong>{expense.amount} ETB</strong>
              </div>

              <div className="expense-actions">
                <button
                  className="edit-btn"
                  onClick={() => setEditingExpense(expense)}
                >
                  Edit
                </button>

                <button
                  className="delete-btn"
                  onClick={() => deleteExpense(expense.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </section>
    </div>
  </div>
);

}

export default App;
