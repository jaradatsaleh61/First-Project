// Expense Tracker - frontend logic

// PHASE 2
// Your backend from Phase 1 is already running, with real expenses in the
// database (from schema.sql). Build this page directly against it with
// fetch and async/await - there is no in-memory or localStorage stage
// this time, and no sample data file.

const API_URL = "http://localhost:3000/api/expenses";
const loadingSpinner = document.getElementById("loadingSpinner");
const errorAlert = document.getElementById("errorAlert");
function showError(message)
{
  errorAlert.textContent = message;
  errorAlert.classList.remove("d-none");
}
function hideError()
{
  errorAlert.classList.add("d-none");
}
const expenseForm = document.getElementById("expenseForm");
const editModal = new bootstrap.Modal(document.getElementById("editModal"));

let editingExpenseId = null;
let allExpenses = [];


// ADD EXPENSE

expenseForm.addEventListener("submit", async function (event)
{
  event.preventDefault();

  const title = document.getElementById("title").value;
  const amount = document.getElementById("amount").value;
  const amountNumber = Number(amount);

  if (amountNumber <= 0)
  {
     showError("Amount must be greater than 0.");
  return;
  }

  const category = document.getElementById("category").value;
  const date = document.getElementById("date").value;

  const expense =
  {
    title: title,
    amount: amountNumber,
    category: category,
    date: date
  };

  try
  {
    const response = await fetch(API_URL,
    {
      method: "POST",
      headers:
      {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(expense)
    });

   if (!response.ok)
{
  const errorData = await response.json();
  throw new Error(errorData.message);
}

    await loadExpenses();
hideError();
    expenseForm.reset();
  }
  catch (error)
  {
showError(error.message);  }
});


// RENDER TABLE

function renderTable(expenses)
{
  const tableBody = document.getElementById("expenseTableBody");

  tableBody.innerHTML = "";

  expenses.forEach(function (expense)
  {
    const row = document.createElement("tr");


    const titleCell = document.createElement("td");

    titleCell.textContent = expense.title;

    row.appendChild(titleCell);


    const amountCell = document.createElement("td");

    amountCell.textContent = expense.amount;

    row.appendChild(amountCell);


    const categoryCell = document.createElement("td");

    const badge = document.createElement("span");

    badge.className = "badge bg-primary";

    badge.textContent = expense.category;

    categoryCell.appendChild(badge);

    row.appendChild(categoryCell);


    const dateCell = document.createElement("td");

    dateCell.textContent = expense.date;

    row.appendChild(dateCell);


    const actionsCell = document.createElement("td");


    // EDIT BUTTON

    const editButton = document.createElement("button");

    editButton.className = "btn btn-warning btn-sm";

    editButton.textContent = "Edit";

    actionsCell.appendChild(editButton);


    editButton.addEventListener("click", function()
    {
      editingExpenseId = expense.id;

      document.getElementById("editTitle").value = expense.title;

      document.getElementById("editAmount").value = expense.amount;

      document.getElementById("editCategory").value = expense.category;

      document.getElementById("editDate").value = expense.date;

      editModal.show();
    });


    // DELETE BUTTON

    const deleteButton = document.createElement("button");

    deleteButton.className = "btn btn-danger btn-sm";

    deleteButton.textContent = "Delete";


    deleteButton.addEventListener("click", async function()
    {
      const id = expense.id;

      try
      {
        const response = await fetch(API_URL + "/" + id,
        {
          method: "DELETE"
        });

       if (!response.ok)
{
  const errorData = await response.json();
  throw new Error(errorData.message);
}

        await loadExpenses();
        hideError();
      }
      catch (error)
      {
showError(error.message);      }
    });


    actionsCell.appendChild(deleteButton);

    row.appendChild(actionsCell);

    tableBody.appendChild(row);
  });
}


// LOAD EXPENSES

async function loadExpenses()
{
  try
  {
    loadingSpinner.classList.remove("d-none");
    const response = await fetch(API_URL);

    if (!response.ok)
{
  const errorData = await response.json();
  throw new Error(errorData.message);
}

    const expenses = await response.json();

    allExpenses = expenses;

    renderTable(expenses);


    // TOTAL

    const total = expenses.reduce(
      (sum, expense) => sum + Number(expense.amount),
      0
    );

    document.getElementById("totalAmount").textContent = total;


    // COUNT

    const count = expenses.length;

    document.getElementById("expenseCount").textContent = count;


    // HIGHEST

    const highest = expenses.reduce(
      (max, expense) =>
        Number(expense.amount) > max
          ? Number(expense.amount)
          : max,
      0
    );

    document.getElementById("highestExpense").textContent = highest;
    loadingSpinner.classList.add("d-none");
  }
  catch (error)
  {
   showError(error.message);
  }
    finally
  {
    loadingSpinner.classList.add("d-none");
  }
}


// EDIT EXPENSE

document.getElementById("editForm").addEventListener("submit", async function(event)
{
  event.preventDefault();

  const title = document.getElementById("editTitle").value;

  const amount = document.getElementById("editAmount").value;

  const amountNumber = Number(amount);

  if (amountNumber <= 0)
  {
showError("Amount must be greater than 0.");    return;
  }

  const category = document.getElementById("editCategory").value;

  const date = document.getElementById("editDate").value;


  const updatedExpense =
  {
    title: title,
    amount: amountNumber,
    category: category,
    date: date
  };


  try
  {
    const response = await fetch(API_URL + "/" + editingExpenseId,
    {
      method: "PUT",
      headers:
      {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(updatedExpense)
    });


    if (!response.ok)
{
  const errorData = await response.json();
  throw new Error(errorData.message);
}

    await loadExpenses();
hideError();
    editModal.hide();
  }
  catch (error)
  {
    showError(error.message);
  }
});


// CATEGORY FILTER

const categoryFilter = document.getElementById("categoryFilter");

if (categoryFilter)
{
  categoryFilter.addEventListener("change", function()
  {
    const selectedCategory = this.value;

    if (selectedCategory === "All")
    {
      renderTable(allExpenses);
    }
    else
    {
      const filteredExpenses = allExpenses.filter(function(expense)
      {
        return expense.category === selectedCategory;
      });

      renderTable(filteredExpenses);
    }
  });
}


// LOAD DATA WHEN PAGE OPENS

loadExpenses();