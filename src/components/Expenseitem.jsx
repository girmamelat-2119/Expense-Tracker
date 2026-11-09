
function ExpenseItem({ expense, onDelete, onEdit }) {
  return (
    <div>
      <h3>{expense.title}</h3>
      <p>Category: {expense.category}</p>
      <p>Amount: {expense.amount} ETB</p>

      <button onClick={() => onEdit(expense)}>
        Edit
      </button>

      <button onClick={() => onDelete(expense.id)}>
        Delete
      </button>

      <hr />
    </div>
  );
}

export default ExpenseItem;
