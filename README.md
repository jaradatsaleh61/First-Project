# Expense Tracker

A full-stack Expense Tracker application built with HTML, CSS, JavaScript, Express.js, and PostgreSQL.

## Technologies

### Frontend

- HTML5
- CSS3
- JavaScript
- Bootstrap 5.3.8
- Fetch API
- Async/Await

### Backend

- Node.js
- Express.js
- PostgreSQL
- pg
- CORS
- dotenv

---

## Project Structure

```text
Expense Tracker/
│
├── frontend/
│   ├── index.html
│   ├── css/
│   │   └── style.css
│   └── js/
│       └── app.js
│
└── backend/
    ├── server.js
    ├── schema.sql
    ├── package.json
    ├── package-lock.json
    └── .env
```

---

# Backend

The backend provides a REST API for managing expenses and connects the application to PostgreSQL.

## Database

**Database name:**

```text
expense_tracker
```

**Main table:**

```text
expenses
```

### Expense Data

The expense data includes:

- `id`
- `title`
- `amount`
- `category`
- `date`

### Available Categories

- Food
- Transport
- Bills
- Entertainment
- Other

## Setup

1. Create a PostgreSQL database called `expense_tracker`.
2. Run `schema.sql`.
3. Create a `.env` file with your PostgreSQL information.
4. Install the dependencies:

```bash
npm install
```

5. Start the server:

```bash
npm start
```

The backend runs on:

```text
http://localhost:3000
```

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/expenses` | Get all expenses |
| GET | `/api/expenses/:id` | Get one expense |
| POST | `/api/expenses` | Add an expense |
| PUT | `/api/expenses/:id` | Update an expense |
| DELETE | `/api/expenses/:id` | Delete an expense |

## Validation

The backend validates:

- Required fields
- Expense title
- Amount greater than 0
- Valid category
- Valid date format
- Valid expense ID

It also uses parameterized SQL queries for database operations.

---

# Frontend

The frontend provides the user interface for managing expenses.

## Main Features

- Display all expenses
- Add a new expense
- Edit an expense
- Delete an expense
- Filter expenses by category
- Display total expenses
- Display number of expenses
- Display highest expense
- Show loading status
- Show error messages
- Responsive design

## Main Files

### `index.html`

Contains the page structure, including:

- Navigation bar
- Summary cards
- Add Expense form
- Category filter
- Expenses table
- Edit modal

### `style.css`

Contains the custom styling and responsive layout.

### `app.js`

Handles:

- API requests
- Adding expenses
- Editing expenses
- Deleting expenses
- Loading expenses
- Filtering expenses
- Rendering the table
- Calculating summary values
- Error handling

---

# Frontend and Backend Connection

The frontend connects to the backend using the Fetch API.

**API URL:**

```javascript
const API_URL = "http://localhost:3000/api/expenses";
```

The frontend uses:

| Method | Purpose |
|---|---|
| GET | Load expenses |
| POST | Add expense |
| PUT | Edit expense |
| DELETE | Delete expense |

---

# Expense Format

Example:

```json
{
  "id": 1,
  "title": "Lunch",
  "amount": 12.5,
  "category": "Food",
  "date": "2026-10-03"
}
```

---

# Running the Project

1. Make sure PostgreSQL is running.
2. Make sure the `expense_tracker` database is created.
3. Run `schema.sql`.
4. Configure the backend `.env` file.
5. Install backend dependencies:

```bash
npm install
```

6. Start the backend:

```bash
npm start
```

7. Open `index.html` using a browser or Live Server.

The frontend will communicate with the backend through:

```text
http://localhost:3000/api/expenses
```

---

# Error Handling

The application handles:

- Invalid expense data
- Invalid IDs
- Missing expenses
- Database errors
- Failed API requests

Both the frontend and backend perform validation.

---

# Project Status

The project includes a complete connection between:

```text
Frontend
   ↓
Fetch API
   ↓
Express.js Backend
   ↓
PostgreSQL Database
```

The application supports full CRUD operations for expenses.
