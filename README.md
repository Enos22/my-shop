# 🛒 Grocery Shop

A React-based grocery shopping application where customers can browse products, search and filter groceries, add products to a shopping cart, update quantities, and checkout using Cash or M-Pesa.

The application also includes an Admin Dashboard where administrators can add, edit, and delete products through a JSON Server backend.

---

## 📌 Project Description

This project is a grocery shop web application built with React.

Customers can:

- View grocery products
- Search for products
- Filter products by category
- Add products to the cart
- Increase or decrease product quantities
- Remove products from the cart
- View the total price
- Checkout
- Choose Cash or M-Pesa as a payment method
- Access customer discounts

Administrators can:

- Login as an Admin
- View products
- Add new products
- Edit existing products
- Delete products

The products are stored in `db.json` and accessed through JSON Server.

---

# 🚀 Technologies Used

- React
- JavaScript
- Vite
- React Router
- CSS
- CSS Modules
- JSON Server
- Fetch API
- Git
- GitHub

---

# 📁 Project Structure

```text
grocery-shop/
│
├── public/
│
├── src/
│   │
│   ├── components/
│   │   ├── Header.jsx
│   │   ├── Footer.jsx
│   │   ├── Sidebar.jsx
│   │   ├── ProductCard.jsx
│   │   └── ProductList.jsx
│   │
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── About.jsx
│   │   ├── Contact.jsx
│   │   ├── Login.jsx
│   │   ├── Cart.jsx
│   │   ├── Checkout.jsx
│   │   └── Admin.jsx
│   │
│   ├── products.js
│   ├── App.jsx
│   ├── App.css
│   └── main.jsx
│
├── db.json
├── package.json
├── vite.config.js
├── .gitignore
└── README.md