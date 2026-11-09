
function ExpenseFilter({
  search,
  setSearch,
  categoryFilter,
  setCategoryFilter,
}) {
  return (
    <div>
      <h2>Search and Filter</h2>

      <input
        type="text"
        placeholder="Search expenses..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <select
        value={categoryFilter}
        onChange={(e) =>
          setCategoryFilter(e.target.value)
        }
      >
        <option value="All">All Categories</option>
        <option value="Food">Food</option>
        <option value="Transport">Transport</option>
        <option value="Utilities">Utilities</option>
        <option value="Other">Other</option>
      </select>
    </div>
  );
}

export default ExpenseFilter;
