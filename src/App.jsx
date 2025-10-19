import React, { useState } from "react";
import { Sun, Moon, Home, LogOut } from "lucide-react";

function App() {
  const [activePage, setActivePage] = useState("Dashboard");
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Sample data
  const [products, setProducts] = useState([
    { id: 1, name: "Kurta", price: 1500, stock: 12, image: "https://via.placeholder.com/300x200?text=Kurta" },
    { id: 2, name: "Jeans", price: 2500, stock: 25, image: "https://via.placeholder.com/300x200?text=Jeans" },
  ]);

  const [users, setUsers] = useState([
    { id: 1, name: "Raj Kumar", email: "raj@example.com" },
    { id: 2, name: "Priya Sharma", email: "priya@example.com" },
  ]);

  const [orders, setOrders] = useState([
    { id: 1, customer: "Raj Kumar", product: "Kurta", amount: 1500, status: "Pending" },
    { id: 2, customer: "Priya Sharma", product: "Jeans", amount: 2500, status: "Pending" },
  ]);

  // Toast notification
  const [toast, setToast] = useState({ show: false, message: "", type: "" });
  const showToast = (message, type = "success") => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: "", type: "" }), 3000);
  };

  // Modals
  const [showProductModal, setShowProductModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [productForm, setProductForm] = useState({ name: "", price: "", stock: "", image: "" });
  const [editProductForm, setEditProductForm] = useState({ id: "", name: "", price: "", stock: "", image: "" });

  const [showUserModal, setShowUserModal] = useState(false);
  const [userForm, setUserForm] = useState({ name: "", email: "" });

  // Theme colors
  const colors = {
    light: {
      bg: "bg-white",
      text: "text-gray-800",
      header: "bg-green-950",
      headerText: "text-white",
      sidebar: "bg-white border-r border-amber-200",
      sidebarText: "text-gray-800",
      card: "bg-amber-50 border border-amber-200",
      cardText: "text-gray-800",
      cardHover: "hover:bg-amber-100 hover:shadow-md",
      button: "bg-green-700 hover:bg-green-800 text-white",
      input: "bg-white border-gray-300 text-gray-800",
      footer: "bg-gray-800",
      footerText: "text-gray-200",
      modal: "bg-white",
    },
    dark: {
      bg: "bg-black",
      text: "text-gray-100",
      header: "bg-green-900",
      headerText: "text-white",
      sidebar: "bg-gradient-to-b from-slate-900 to-black",
      sidebarText: "text-slate-200",
      card: "bg-gray-900 border border-gray-800",
      cardText: "text-gray-100",
      cardHover: "hover:bg-gray-800 hover:shadow-md",
      button: "bg-green-700 hover:bg-green-600 text-white",
      input: "bg-gray-900 border-gray-700 text-gray-100",
      footer: "bg-green-900",
      footerText: "text-white",
      modal: "bg-gray-900",
    },
  };

  const theme = isDarkMode ? colors.dark : colors.light;

  const dashboardStats = {
    totalOrders: orders.length,
    totalRevenue: orders.reduce((sum, o) => sum + o.amount, 0),
    totalProducts: products.length,
    totalUsers: users.length,
  };

  const menuItems = ["Dashboard", "Products", "Orders", "Users", "Reviews", "Settings"];
  
  const menuLabels = {
    Dashboard: "Dashboard",
    Products: "Products",
    Orders: "Orders",
    Users: "Users",
    Reviews: "Reviews",
    Settings: "Settings"
  };

  // Handlers
  const handleAddProduct = () => setShowProductModal(true);
  const handleAddUser = () => setShowUserModal(true);

  const submitProduct = () => {
    const { name, price, stock, image } = productForm;
    if (name && !isNaN(price) && !isNaN(stock) && image) {
      setProducts([...products, { id: Date.now(), name, price: Number(price), stock: Number(stock), image }]);
      setProductForm({ name: "", price: "", stock: "", image: "" });
      setShowProductModal(false);
      showToast("✨ Product added successfully!");
    } else showToast("⚠️ Fill all fields including image!", "error");
  };

  const openEditModal = (product) => {
    setEditProductForm(product);
    setShowEditModal(true);
  };

  const submitEditProduct = () => {
    setProducts(products.map(p => p.id === editProductForm.id ? editProductForm : p));
    setShowEditModal(false);
    showToast("✏️ Product updated successfully!");
  };

  const removeProduct = (id) => {
    setProducts(products.filter(p => p.id !== id));
    showToast("🗑️ Product removed successfully!");
  };

  const submitUser = () => {
    const { name, email } = userForm;
    if (name && email) {
      setUsers([...users, { id: Date.now(), name, email }]);
      setUserForm({ name: "", email: "" });
      setShowUserModal(false);
      showToast("👤 User added successfully!");
    } else showToast("⚠️ Invalid user data!", "error");
  };

  const removeUser = (id) => {
    setUsers(users.filter(u => u.id !== id));
    showToast("🗑️ User removed successfully!");
  };

  const renderPage = () => {
    switch (activePage) {
      case "Dashboard":
        return (
          <div>
            <h1 className={`text-3xl font-bold ${theme.text} mb-6`}>👋 Welcome Back, Admin!</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {Object.entries(dashboardStats).map(([key, value]) => (
                <div key={key} className={`${theme.card} p-6 rounded shadow ${theme.cardText} text-center`}>
                  <h3 className="capitalize">
                    {key === "totalOrders" && "Total Orders"}
                    {key === "totalRevenue" && "Total Revenue"}
                    {key === "totalProducts" && "Total Products"}
                    {key === "totalUsers" && "Total Users"}
                  </h3>
                  <p className="text-2xl font-bold mt-2">{value}</p>
                </div>
              ))}
            </div>
          </div>
        );

      case "Products":
        return (
          <div>
            <div className="flex justify-between mb-4">
              <h2 className={`text-2xl font-bold ${theme.text}`}>Products</h2>
              <button
                onClick={handleAddProduct}
                className={`${theme.button} px-4 py-2 rounded font-semibold`}
              >
                + Add Product
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 overflow-auto max-h-[70vh]">
              {products.map((product) => (
                <div
                  key={product.id}
                  className={`${theme.card} p-4 rounded shadow ${theme.cardText} flex flex-col justify-between ${theme.cardHover}`}
                >
                  <div>
                    <img src={product.image} alt={product.name} className="w-full h-40 object-cover rounded mb-3" />
                    <h3 className="text-lg font-semibold">{product.name}</h3>
                    <p>Price: ₹{product.price}</p>
                    <p>Stock: {product.stock}</p>
                  </div>
                  <div className="flex gap-2 mt-2">
                    <button
                      onClick={() => openEditModal(product)}
                      className={`${theme.button} px-2 py-1 rounded font-semibold`}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => removeProduct(product.id)}
                      className="bg-red-600 hover:bg-red-700 text-white px-2 py-1 rounded font-semibold"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case "Users":
        return (
          <div>
            <div className="flex justify-between mb-4">
              <h2 className={`text-2xl font-bold ${theme.text}`}>Users</h2>
              <button
                onClick={handleAddUser}
                className={`${theme.button} px-4 py-2 rounded font-semibold`}
              >
                + Add User
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 overflow-auto max-h-[70vh]">
              {users.map((user) => (
                <div
                  key={user.id}
                  className={`${theme.card} p-4 rounded shadow ${theme.cardText} flex flex-col justify-between ${theme.cardHover}`}
                >
                  <div>
                    <h3 className="text-lg font-semibold">{user.name}</h3>
                    <p>Email: {user.email}</p>
                  </div>
                  <button
                    onClick={() => removeUser(user.id)}
                    className="mt-2 bg-red-600 hover:bg-red-700 text-white px-2 py-1 rounded font-semibold"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          </div>
        );

      case "Orders":
        return (
          <div>
            <h2 className={`text-2xl font-bold ${theme.text} mb-4`}>Orders</h2>
            {orders.length === 0 ? (
              <p className={theme.text}>No orders yet.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 overflow-auto max-h-[70vh]">
                {orders.map((order) => (
                  <div
                    key={order.id}
                    className={`${theme.card} p-4 rounded shadow ${theme.cardText} ${theme.cardHover} flex flex-col gap-2`}
                  >
                    <h3 className="text-lg font-semibold">Order #{order.id}</h3>
                    <p>Customer: {order.customer}</p>
                    <p>Product: {order.product}</p>
                    <p>Amount: ₹{order.amount}</p>

                    <div className="flex flex-wrap gap-2 mt-2">
                      {["Pending", "Out for Delivery", "Shipped", "Delivered"].map((status) => (
                        <button
                          key={status}
                          className={`px-2 py-1 rounded font-semibold ${
                            order.status === status
                              ? theme.button
                              : isDarkMode
                              ? "bg-gray-700 text-gray-200 hover:bg-gray-600"
                              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                          }`}
                          onClick={() => {
                            setOrders(
                              orders.map((o) =>
                                o.id === order.id ? { ...o, status } : o
                              )
                            );
                            if (status === "Delivered") showToast("🚚 Order delivered!");
                            else if (status === "Shipped") showToast("📦 Order shipped!");
                            else if (status === "Out for Delivery") showToast("🚗 Order out for delivery!");
                            else showToast("⏳ Order pending!");
                          }}
                        >
                          {status}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        );

      case "Reviews":
        return (
          <div>
            <h2 className={`text-2xl font-bold ${theme.text} mb-4`}>Reviews</h2>
            <p className={theme.text}>No reviews yet.</p>
          </div>
        );

      case "Settings":
        return <p className={theme.text}>Settings page content here.</p>;

      default:
        return null;
    }
  };

  return (
    <div className={`flex flex-col h-screen ${theme.bg} ${theme.text} relative`}>
      {/* Toast - Bottom Right */}
      {toast.show && (
        <div
          className={`fixed bottom-6 right-6 px-5 py-3 rounded-lg shadow-lg text-white font-semibold flex items-center gap-3 z-50 animate-pulse ${
            toast.type === "success" ? "bg-green-600" : "bg-red-600"
          }`}
        >
          <span className={`text-lg ${toast.type === "success" ? "text-green-200" : "text-red-200"}`}>
            {toast.type === "success" ? "✓" : "✕"}
          </span>
          {toast.message}
        </div>
      )}

      {/* Header */}
      <header className={`flex justify-between items-center ${theme.header} p-4 shadow-md`}>
        <div>
          <h1 className={`text-2xl font-bold ${theme.headerText}`}>NaroStore Admin</h1>
          <p className={`text-sm ${theme.headerText} opacity-80`}>Store Management Panel</p>
        </div>
        <div className="flex gap-3 items-center">
          <button
            onClick={() => setActivePage("Dashboard")}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg font-semibold transition ${
              isDarkMode
                ? "bg-slate-700 hover:bg-slate-600 text-white"
                : "bg-slate-200 hover:bg-slate-300 text-gray-800"
            }`}
          >
            <Home size={16} />
          </button>
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg font-semibold transition ${
              isDarkMode
                ? "bg-slate-700 hover:bg-slate-600 text-yellow-300"
                : "bg-slate-200 hover:bg-slate-300 text-gray-800"
            }`}
          >
            {isDarkMode ? <Sun size={16} /> : <Moon size={16} />}
          </button>
          <button
            onClick={() => alert("Logging out...")}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg font-semibold transition bg-red-600 hover:bg-red-700 text-white`}
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className={`w-64 ${theme.sidebar} p-4 flex flex-col gap-6 overflow-auto`}>
          {menuItems.map((item) => (
            <button
              key={item}
              onClick={() => setActivePage(item)}
              className={`p-2 rounded w-full text-left font-semibold ${
                activePage === item
                  ? theme.button
                  : `${theme.sidebarText} ${isDarkMode ? "hover:bg-green-700" : "hover:bg-green-600"}`
              }`}
            >
              {item}
            </button>
          ))}
        </aside>

        {/* Main */}
        <main className="flex-1 p-6 overflow-auto">{renderPage()}</main>
      </div>

      {/* Footer */}
      <footer className={`${theme.footer} ${theme.footerText} p-6 shadow-inner flex flex-col md:flex-row justify-between items-start md:items-center gap-4`}>
        <div>
          <h2 className="font-bold text-lg">NaroStore</h2>
          <p className="text-sm">Your one-stop shop for trendy fashion - Express your style!</p>
        </div>
        <div className="flex gap-4 text-sm flex-wrap">
          <a href="#" className="hover:underline">About Us</a>
          <a href="#" className="hover:underline">Privacy Policy</a>
          <a href="#" className="hover:underline">Contact</a>
          <a href="#" className="hover:underline">Help</a>
        </div>
      </footer>

      {/* Product Modal */}
      {showProductModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className={`${theme.modal} p-6 rounded shadow-lg w-96 max-h-[80vh] overflow-y-auto`}>
            <h2 className={`text-xl font-bold mb-4 ${theme.text}`}>Add Product</h2>
            {productForm.image && (
              <div className="mb-4">
                <img src={productForm.image} alt="preview" className="w-full h-40 object-cover rounded mb-2" />
              </div>
            )}
            <input
              type="text"
              placeholder="Product Name"
              value={productForm.name}
              onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
              className={`w-full mb-2 p-2 border rounded ${theme.input}`}
            />
            <input
              type="number"
              placeholder="Price (₹)"
              value={productForm.price}
              onChange={(e) => setProductForm({ ...productForm, price: e.target.value })}
              className={`w-full mb-2 p-2 border rounded ${theme.input}`}
            />
            <input
              type="number"
              placeholder="Stock"
              value={productForm.stock}
              onChange={(e) => setProductForm({ ...productForm, stock: e.target.value })}
              className={`w-full mb-2 p-2 border rounded ${theme.input}`}
            />
            <input
              type="url"
              placeholder="Image URL"
              value={productForm.image}
              onChange={(e) => setProductForm({ ...productForm, image: e.target.value })}
              className={`w-full mb-4 p-2 border rounded ${theme.input}`}
            />
            <div className="flex justify-end gap-2">
              <button onClick={() => setShowProductModal(false)} className="px-3 py-1 bg-red-600 text-white rounded">Cancel</button>
              <button onClick={submitProduct} className="px-3 py-1 bg-green-900 text-yellow-100 rounded">Add</button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Product Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className={`${theme.modal} p-6 rounded shadow-lg w-96 max-h-[80vh] overflow-y-auto`}>
            <h2 className={`text-xl font-bold mb-4 ${theme.text}`}>Edit Product</h2>
            {editProductForm.image && (
              <div className="mb-4">
                <img src={editProductForm.image} alt="preview" className="w-full h-40 object-cover rounded mb-2" />
              </div>
            )}
            <input
              type="text"
              placeholder="Product Name"
              value={editProductForm.name}
              onChange={(e) => setEditProductForm({ ...editProductForm, name: e.target.value })}
              className={`w-full mb-2 p-2 border rounded ${theme.input}`}
            />
            <input
              type="number"
              placeholder="Price (₹)"
              value={editProductForm.price}
              onChange={(e) => setEditProductForm({ ...editProductForm, price: e.target.value })}
              className={`w-full mb-2 p-2 border rounded ${theme.input}`}
            />
            <input
              type="number"
              placeholder="Stock"
              value={editProductForm.stock}
              onChange={(e) => setEditProductForm({ ...editProductForm, stock: e.target.value })}
              className={`w-full mb-2 p-2 border rounded ${theme.input}`}
            />
            <input
              type="url"
              placeholder="Image URL"
              value={editProductForm.image}
              onChange={(e) => setEditProductForm({ ...editProductForm, image: e.target.value })}
              className={`w-full mb-4 p-2 border rounded ${theme.input}`}
            />
            <div className="flex justify-end gap-2">
              <button onClick={() => setShowEditModal(false)} className="px-3 py-1 bg-red-600 text-white rounded">Cancel</button>
              <button onClick={submitEditProduct} className="px-3 py-1 bg-green-900 text-yellow-100 rounded">Save</button>
            </div>
          </div>
        </div>
      )}

      {/* Add User Modal */}
      {showUserModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className={`${theme.modal} p-6 rounded shadow-lg w-80`}>
            <h2 className={`text-xl font-bold mb-4 ${theme.text}`}>Add User</h2>
            <input
              type="text"
              placeholder="Name"
              value={userForm.name}
              onChange={(e) => setUserForm({ ...userForm, name: e.target.value })}
              className={`w-full mb-2 p-2 border rounded ${theme.input}`}
            />
            <input
              type="email"
              placeholder="Email"
              value={userForm.email}
              onChange={(e) => setUserForm({ ...userForm, email: e.target.value })}
              className={`w-full mb-4 p-2 border rounded ${theme.input}`}
            />
            <div className="flex justify-end gap-2">
              <button onClick={() => setShowUserModal(false)} className="px-3 py-1 bg-red-600 text-white rounded">Cancel</button>
              <button onClick={submitUser} className="px-3 py-1 bg-green-900 text-yellow-100 rounded">Add</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;