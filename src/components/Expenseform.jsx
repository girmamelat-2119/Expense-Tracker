
import { useState } from "react";

function ExpenseForm({
  onAddExpense,
  onUpdateExpense,
  editingExpense,
  onCancelEdit,
}) {
  const [title, setTitle] = useState(
    editingExpense?.title ?? ""
  );

  const [category, setCategory] = useState(
    editingExpense?.category ?? "Food"
  );

  const [amount, setAmount] = useState(
    editingExpense?.amount?.toString() ?? ""
  );

  function handleSubmit(e) {
    e.preventDefault();

    if (!title.trim() || Number(amount) <= 0) {
      return;
    }

    const expenseData = {
      title: title.trim(),
      category,
      amount: Number(amount),
    };

    if (editingExpense) {
      onUpdateExpense(editingExpense.id, expenseData);
    } else {
      onAddExpense({
        id: crypto.randomUUID(),
        ...expenseData,
      });
    }

    setTitle("");
    setCategory("Food");
    setAmount("");
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>
        {editingExpense ? "Edit Expense" : "Add New Expense"}
      </h2>

      <input
        type="text"
        placeholder="Expense title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />

      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        <option value="Food">Food</option>
        <option value="Transport">Transport</option>
        <option value="Utilities">Utilities</option>
        <option value="Other">Other</option>
      </select>

      <input
        type="number"
        placeholder="Amount in ETB"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        min="0.01"
        step="0.01"
        required
      />

      <button type="submit">
        {editingExpense ? "Save Changes" : "Add Expense"}
      </button>

      {editingExpense && (
        <button type="button" onClick={onCancelEdit}>
          Cancel
        </button>
      )}
    </form>
  );
}

export default ExpenseForm;
