// import React, { useEffect, useState } from "react";
// import StatCard from "../components/StatCard";
// import { Users, Package, ShoppingCart, ClipboardList } from "lucide-react";
// import axios from "../utils/Axios";
// import AxiosToastError from "../utils/AxiosToastError";
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   Tooltip,
//   CartesianGrid,
//   ResponsiveContainer,
//   BarChart,
//   Bar,
// } from "recharts";

// const AdminDashboard = () => {
//   const [analytics, setAnalytics,] = useState(null);

//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const fetchAnalytics = async () => {
//       try {
//         const res = await axios.get("/api/analytics");
//         setAnalytics(res.data);
//       } catch (err) {
//         setError("Gagal memuat data analytics.");
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchAnalytics();
//   }, []);

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p style={{ color: "red" }}>{error}</p>;
//   if (!analytics) return <p>Data tidak tersedia.</p>;

//   return (
//     <div className="p-6">
//       <h2 className="text-2xl font-bold mb-4">Admin Analytics Dashboard</h2>

//       {/* Stat Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
//         <StatCard
//           title="Total Users"
//           value={analytics.totalUsers}
//           icon={<Users />}
//         />
//         <StatCard
//           title="Total Products"
//           value={analytics.totalProducts}
//           icon={<Package />}
//         />
//         <StatCard
//           title="Total Orders"
//           value={analytics.totalOrders}
//           icon={<ShoppingCart />}
//         />
//         <StatCard
//           title="Total Requests"
//           value={analytics.totalRequests}
//           icon={<ClipboardList />}
//         />
//       </div>

//       {/* Top Selling Items */}
//       <div className="bg-white p-6 rounded-2xl shadow-md mb-10">
//         <h3 className="text-xl font-semibold mb-4">Top Selling Items</h3>
//         {analytics.topSellingItems.length > 0 ? (
//           <ul className="space-y-2">
//             {analytics.topSellingItems.map((item, index) => (
//               <li
//                 key={item.productId || index}
//                 className="flex items-center justify-between"
//               >
//                 <span className="font-medium">
//                   {index + 1}. {item.name}
//                 </span>
//                 <span className="text-sm text-gray-500">
//                   Terjual: {item.quantity}
//                 </span>
//               </li>
//             ))}
//           </ul>
//         ) : (
//           <p className="text-gray-400">Belum ada data penjualan</p>
//         )}
//       </div>

//       {/* Grafik Tren Permintaan */}
//       <div className="bg-white p-6 rounded-2xl shadow-md mb-10">
//         <h3 className="text-xl font-semibold mb-4">Tren Permintaan Harian</h3>
//         {analytics.requestTrends.length > 0 ? (
//           <ResponsiveContainer width="100%" height={300}>
//             <LineChart data={analytics.requestTrends}>
//               <CartesianGrid strokeDasharray="3 3" />
//               <XAxis dataKey="date" />
//               <YAxis allowDecimals={false} />
//               <Tooltip />
//               <Line
//                 type="monotone"
//                 dataKey="count"
//                 stroke="#4F46E5"
//                 strokeWidth={2}
//               />
//             </LineChart>
//           </ResponsiveContainer>
//         ) : (
//           <p className="text-gray-400">Belum ada data tren permintaan</p>
//         )}
//       </div>

//       {/* Grafik Kategori Terbanyak
//       <div className="bg-white p-6 rounded-2xl shadow-md">
//         <h3 className="text-xl font-semibold mb-4">Kategori Permintaan Terbanyak</h3>
//         {analytics.topCategories.length > 0 ? (
//           <ResponsiveContainer width="100%" height={300}>
//             <BarChart data={analytics.topCategories}>
//               <CartesianGrid strokeDasharray="3 3" />
//               <XAxis dataKey="category" />
//               <YAxis allowDecimals={false} />
//               <Tooltip />
//               <Bar dataKey="count" fill="#10B981" />
//             </BarChart>
//           </ResponsiveContainer>
//         ) : (
//           <p className="text-gray-400">Belum ada data kategori</p>
//         )}
//       </div> */}

//               {/* Tabel Semua Pesanan */}
//       <div className="bg-white p-6 rounded-2xl shadow-md">
//         <h3 className="text-xl font-semibold mb-4">Semua Pesanan</h3>
//         {analytics.allOrders.length > 0 ? (
//           <div className="overflow-auto">
//             <table className="min-w-full text-sm text-left border border-gray-200">
//               <thead className="bg-gray-100">
//                 <tr>
//                   <th className="px-4 py-2">ID Pesanan</th>
//                   <th className="px-4 py-2">Nama</th>
//                   <th className="px-4 py-2">Email</th>
//                   <th className="px-4 py-2">Alamat</th>
//                   <th className="px-4 py-2">Jumlah Produk</th>
//                   <th className="px-4 py-2">ID Pengguna</th>
//                   <th className="px-4 py-2">Status</th>
//                   <th className="px-4 py-2">Tanggal Order</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {analytics.allOrders.map((order) => (
//                   <tr key={order.orderId} className="border-t">
//                     <td className="px-4 py-2">{order.orderId}</td>
//                     <td className="px-4 py-2">{order.name}</td>
//                     <td className="px-4 py-2">{order.email}</td>
//                     <td className="px-4 py-2">{order.address}</td>
//                     <td className="px-4 py-2 text-center">{order.totalQuantity}</td>
//                     <td className="px-4 py-2">{order.userId}</td>
//                     <td className="px-4 py-2">{order.status}</td>
//                     <td className="px-4 py-2">
//                       {new Date(order.orderDate).toLocaleDateString("id-ID", {
//                         day: "2-digit",
//                         month: "short",
//                         year: "numeric",
//                       })}
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         ) : (
//           <p className="text-gray-400">Belum ada data pesanan.</p>
//         )}
//       </div>

//     </div>
//   );
// };
// export default AdminDashboard;

// import React, { useEffect, useState } from "react";
// import StatCard from "../components/StatCard";
// import { Users, Package, ShoppingCart, ClipboardList } from "lucide-react";
// import axios from "../utils/Axios";
// import AxiosToastError from "../utils/AxiosToastError";
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   Tooltip,
//   CartesianGrid,
//   ResponsiveContainer,
//   BarChart,
//   Bar,
// } from "recharts";
// import Orders from "./Orders";

// const AdminDashboard = () => {
//   const [analytics, setAnalytics] = useState(null);
//   const [orders, setOrders] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const fetchAnalytics = async () => {
//       try {
//         const res = await axios.get("/api/analytics");
//         setAnalytics(res.data);
//       } catch (err) {
//         setError("Gagal memuat data analytics.");
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     const fetchOrders = async () => {
//       try {
//         const res = await axios.get("/api/order/all-orders");
//         setOrders(res.data.data); // sesuaikan dengan respons dari backend
//       } catch (error) {
//         console.error("Gagal ambil data orders", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchAnalytics();
//     fetchOrders();
//   }, []);

//   const handleUpdateStatus = async (orderId, newStatus) => {
//     try {
//       const response = await axios.put("/api/order/update-status", {
//         orderId,
//         newStatus,
//       });

//       // Update status di state frontend
//       setOrders((prevOrders) =>
//         prevOrders.map((order) =>
//           order.orderId === orderId ? { ...order, status: newStatus } : order
//         )
//       );

//       console.log("Status updated:", response.data);
//     } catch (error) {
//       console.error("Gagal update status", error);
//     }
//   };

//   const getStatusBadge = (status) => {
//     switch (status) {
//       case "Diajukan":
//         return "bg-[#efe62f]";
//       case "Diproses":
//         return "bg-blue-500";
//       case "Dikirim":
//         return "bg-green-500";
//       case "Selesai":
//         return "bg-green-700";
//       case "Dibatalkan":
//         return "bg-red-500";
//       default:
//         return "bg-gray-400";
//     }
//   };

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p style={{ color: "red" }}>{error}</p>;
//   if (!analytics) return <p>Data tidak tersedia.</p>;

//   return (
//     <div className="p-6">
//       <h2 className="text-2xl font-bold mb-4">Admin Analytics Dashboard</h2>

//       {/* Stat Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
//         <StatCard
//           title="Total Users"
//           value={analytics.totalUsers}
//           icon={<Users />}
//         />
//         <StatCard
//           title="Total Products"
//           value={analytics.totalProducts}
//           icon={<Package />}
//         />
//         <StatCard
//           title="Total Orders"
//           value={analytics.totalOrders}
//           icon={<ShoppingCart />}
//         />
//         <StatCard
//           title="Total Requests"
//           value={analytics.totalRequests}
//           icon={<ClipboardList />}
//         />
//       </div>

//       {/* Tabel Semua Pesanan
//       <div className="bg-white p-6 rounded-2xl shadow-md">
//         <h3 className="text-xl font-semibold mb-4">Semua Pesanan</h3>
//         {orders && orders.length > 0 ? (
//           <div className="overflow-auto">
//         <table className="min-w-full text-sm text-left border border-gray-200">
//           <thead className="bg-gray-100">
//             <tr>
//               <th className="px-4 py-2">ID Pesanan</th>
//               <th className="px-4 py-2">Nama</th>
//               <th className="px-4 py-2">Email</th>
//               <th className="px-4 py-2">Alamat</th>
//               <th className="px-4 py-2">Jumlah Produk</th>
//               <th className="px-4 py-2">ID Pengguna</th>
//               <th className="px-4 py-2">Status</th>
//               <th className="px-4 py-2">Tanggal Order</th>
//             </tr>
//           </thead>
//           <tbody>
//             {analytics.allOrders.map((order) => (
//               <tr key={order.orderId} className="border-t">
//                 <td className="px-4 py-2">{order.orderId}</td>
//                 <td className="px-4 py-2">{order.name}</td>
//                 <td className="px-4 py-2">{order.email}</td>
//                 <td className="px-4 py-2">{order.address}</td>
//                 <td className="px-4 py-2 text-center">{order.totalQuantity}</td>
//                 <td className="px-4 py-2">{order.userId}</td>
//                 <td className="px-4 py-2">
//                   <span
//                     className={`px-2 py-1 rounded-full text-white text-xs font-s ${getStatusBadge(
//                       order.status
//                     )}`}
//                   >
//                     {order.status}
//                   </span>
//                 </td>
//                 <td className="px-4 py-2">
//                   {new Date(order.orderDate).toLocaleDateString("id-ID", {
//                     day: "2-digit",
//                     month: "short",
//                     year: "numeric",
//                   })}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//        ) : (
//         <p className="text-gray-400">Belum ada data pesanan.</p>
//       )}
//     </div> */}

//     </div>
//   );
// };

// export default AdminDashboard;

// import React, { useEffect, useState } from "react";
// import StatCard from "../components/StatCard";
// import { Users, Package, ShoppingCart, ClipboardList } from "lucide-react";
// import axios from "../utils/Axios";
// import AxiosToastError from "../utils/AxiosToastError";

// const AdminDashboard = () => {
//   const [analytics, setAnalytics] = useState(null);
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const [analyticsRes, ordersRes] = await Promise.all([
//           axios.get("/api/analytics"),
//           axios.get("/api/order/all-orders"),
//         ]);
//         setAnalytics(analyticsRes.data);
//         setOrders(ordersRes.data.data);
//       } catch (err) {
//         setError("Gagal memuat data dashboard.");
//         AxiosToastError(err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   const getStatusBadge = (status) => {
//     switch (status) {
//       case "Diajukan":
//         return "bg-yellow-400";
//       case "Diproses":
//         return "bg-blue-500";
//       case "Dikirim":
//         return "bg-green-500";
//       case "Selesai":
//         return "bg-green-700";
//       case "Dibatalkan":
//         return "bg-red-500";
//       default:
//         return "bg-gray-400";
//     }
//   };

//   if (loading) return <div className="p-6 text-gray-500">Memuat data...</div>;
//   if (error) return <div className="p-6 text-red-500">{error}</div>;
//   if (!analytics) return <div className="p-6">Data tidak tersedia.</div>;

//   return (

//     <div className="p-6 overflow-auto">
//       <h2 className="text-2xl font-bold mb-4">Admin Analytics Dashboard</h2>
//       {/* Stat Cards */}
//       <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-6 gap-6 overflow-auto">
//         <StatCard
//           title="Total Users"
//           value={analytics.totalUsers}
//           icon={<Users />}
//           bgColor="bg-blue-100"
//           textColor="text-blue-800"
//         />
//         <StatCard
//           title="Total Products"
//           value={analytics.totalProducts}
//           icon={<Package />}
//           bgColor="bg-green-100"
//           textColor="text-green-800"
//         />
//         <StatCard
//           title="Total Orders"
//           value={analytics.totalOrders}
//           icon={<ShoppingCart />}
//           bgColor="bg-yellow-100"
//           textColor="text-yellow-800"
//         />
//         <StatCard
//           title="Total Requests"
//           value={analytics.totalRequests}
//           icon={<ClipboardList />}
//           bgColor="bg-purple-100"
//           textColor="text-purple-800"
//         />
//       </div>

//       {/* Tabel Semua Pesanan */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 overflow-auto">
//         <div className="col-span-full bg-white p-6 rounded-2xl shadow-md overflow-x-auto border border-grey-300">
//           <h3 className="text-xl font-semibold mb-4">Semua Pesanan</h3>
//           {/* <input type="text" placeholder="Cari nama pemesan..."  value={searchName} onChange={(e) => setSearchName(e.target.value)}className="mb-4 px-4 py-2 border rounded-md w-full sm:w-1/2"/> */}
//           {analytics.allOrders.length > 0 ? (
//             <table className="min-w-[1200px] w-full text-sm text-left border border-grey-500">

//               <thead className="bg-gray-100">
//                 <tr>
//                   <th className="px-4 py-2">ID Pesanan</th>
//                   <th className="px-4 py-2">Nama</th>
//                   <th className="px-4 py-2">Email</th>
//                   <th className="px-4 py-2 max-w-[200px] break-words">
//                     Alamat
//                   </th>
//                   <th className="px-4 py-2">Jumlah Produk</th>
//                   <th className="px-4 py-2">ID Pengguna</th>
//                   <th className="px-4 py-2">Status</th>
//                   <th className="px-4 py-2">Tanggal Order</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {analytics.allOrders.map((order) => (
//                   <tr key={order.orderId} className="border-t hover:bg-gray-50">
//                     <td className="px-4 py-2">{order.orderId}</td>
//                     <td className="px-4 py-2">{order.name}</td>
//                     <td className="px-4 py-2">{order.email}</td>
//                     <td className="px-4 py-2 max-w-[200px] break-words">
//                       {order.address}
//                     </td>
//                     <td className="px-4 py-2 text-center">
//                       {order.totalQuantity}
//                     </td>
//                     <td className="px-4 py-2">{order.userId}</td>
//                     <td className="px-4 py-2">
//                       <span
//                         className={`px-2 py-1 rounded-full text-white text-xs font-medium ${getStatusBadge(
//                           order.status
//                         )}`}
//                       >
//                         {order.status}
//                       </span>
//                     </td>
//                     <td className="px-4 py-2">
//                       {new Date(order.orderDate).toLocaleDateString("id-ID", {
//                         day: "2-digit",
//                         month: "short",
//                         year: "numeric",
//                       })}
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           ) : (
//             <p className="text-gray-400">Belum ada data pesanan.</p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminDashboard;

// import React, { useEffect, useState } from "react";
// import StatCard from "../components/StatCard";
// import { Users, Package, ShoppingCart, ClipboardList } from "lucide-react";
// import axios from "../utils/Axios";
// import AxiosToastError from "../utils/AxiosToastError";
// import { saveAs } from "file-saver";

// const AdminDashboard = () => {
//   const [analytics, setAnalytics] = useState(null);
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [searchName, setSearchName] = useState("");
//   const [selectedMonth, setSelectedMonth] = useState("");

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const [analyticsRes, ordersRes] = await Promise.all([
//           axios.get("/api/analytics"),
//           axios.get("/api/order/all-orders"),
//         ]);
//         setAnalytics(analyticsRes.data);
//         setOrders(ordersRes.data.data);
//       } catch (err) {
//         setError("Gagal memuat data dashboard.");
//         AxiosToastError(err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   const getStatusBadge = (status) => {
//     switch (status) {
//       case "Diajukan":
//         return "bg-yellow-400";
//       case "Diproses":
//         return "bg-blue-500";
//       case "Dikirim":
//         return "bg-green-500";
//       case "Selesai":
//         return "bg-green-700";
//       case "Dibatalkan":
//         return "bg-red-500";
//       default:
//         return "bg-gray-400";
//     }
//   };

//   const filteredOrders = analytics?.allOrders
//     ? analytics.allOrders.filter((order) => {
//         const matchName = order.name.toLowerCase().includes(searchName.toLowerCase());
//         const matchMonth = selectedMonth
//           ? new Date(order.orderDate).getMonth() + 1 === parseInt(selectedMonth)
//           : true;
//         return matchName && matchMonth;
//       })
//     : [];

//   const downloadCSV = () => {
//     if (!filteredOrders || filteredOrders.length === 0) return;

//     const headers = [
//       "ID Pesanan",
//       "Nama",
//       "Email",
//       "Alamat",
//       "Jumlah Produk",
//       "ID Pengguna",
//       "Status",
//       "Tanggal Order",
//     ];

//     const rows = filteredOrders.map((order) => [
//       order.orderId,
//       order.name,
//       order.email,
//       `"${order.address}"`,
//       order.totalQuantity,
//       order.userId,
//       order.status,
//       new Date(order.orderDate).toLocaleDateString("id-ID"),
//     ]);

//     const csvContent = [headers, ...rows]
//       .map((row) => row.join(","))
//       .join("\n");

//     const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
//     saveAs(blob, "data_pesanan.csv");
//   };

//   if (loading) return <div className="p-6 text-gray-500">Memuat data...</div>;
//   if (error) return <div className="p-6 text-red-500">{error}</div>;
//   if (!analytics) return <div className="p-6">Data tidak tersedia.</div>;

//   return (
//     <div className="p-6 overflow-auto">
//       <h2 className="text-2xl font-bold mb-4">Admin Analytics Dashboard</h2>

//       <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-6 gap-6 overflow-auto mb-6">
//         <StatCard title="Total Users" value={analytics.totalUsers} icon={<Users />} bgColor="bg-blue-100" textColor="text-blue-800" />
//         <StatCard title="Total Products" value={analytics.totalProducts} icon={<Package />} bgColor="bg-green-100" textColor="text-green-800" />
//         <StatCard title="Total Orders" value={analytics.totalOrders} icon={<ShoppingCart />} bgColor="bg-yellow-100" textColor="text-yellow-800" />
//         <StatCard title="Total Requests" value={analytics.totalRequests} icon={<ClipboardList />} bgColor="bg-purple-100" textColor="text-purple-800" />
//       </div>

//       <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6 flex-wrap">
//   {/* Search */}
//   <input
//     type="text"
//     placeholder="Cari nama pengguna..."
//     className="p-2 border rounded-md w-full  md:w-[64px]"
//     value={searchName}
//     onChange={(e) => setSearchName(e.target.value)}
//   />

//   {/* Bungkus filter dan tombol di satu flex kanan */}
//   <div className="flex flex-col md:flex-row md:items-center md:space-x-2 ml-auto w-full md:w-auto">
//     {/* Filter bulan */}
//     <select
//       value={selectedMonth}
//       onChange={(e) => setSelectedMonth(e.target.value)}
//       className="p-2 border rounded-md w-full md:w-48"
//     >
//       <option value="">Semua Bulan</option>
//       {[...Array(12)].map((_, i) => (
//         <option key={i} value={i + 1}>
//           {new Date(0, i).toLocaleString("id-ID", { month: "long" })}
//         </option>
//       ))}
//     </select>

//     {/* Tombol Download */}
//     <button
//       onClick={downloadCSV}
//       className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 w-full md:w-auto mt-2 md:mt-0"
//     >
//       Download CSV
//     </button>
//   </div>
// </div>

//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 overflow-auto">
//         <div className="col-span-full bg-white p-6 rounded-2xl shadow-md overflow-x-auto border border-grey-300">
//           <div className="mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
//             {/* <input
//               type="text"
//               placeholder="Cari nama pengguna..."
//               className="p-2 border rounded-md w-full sm:w-64"
//               value={searchName}
//               onChange={(e) => setSearchName(e.target.value)}
//             />
//             <select
//               value={selectedMonth}
//               onChange={(e) => setSelectedMonth(e.target.value)}
//               className="p-2 border rounded-md w-full sm:w-48"
//             >
//               <option value="">Semua Bulan</option>
//               {[...Array(12)].map((_, i) => (
//                 <option key={i} value={i + 1}>{new Date(0, i).toLocaleString("id-ID", { month: "long" })}</option>
//               ))}
//             </select>
//             <button
//               onClick={downloadCSV}
//               className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 w-full sm:w-auto"
//             >
//               Download CSV
//             </button> */}
//           </div>

//           <h3 className="text-xl font-semibold mb-4">Semua Pesanan</h3>
//           {filteredOrders.length > 0 ? (
//             <table className="min-w-[1200px] w-full text-sm text-left border border-grey-500">
//               <thead className="bg-gray-100">
//                 <tr>
//                   <th className="px-4 py-2">ID Pesanan</th>
//                   <th className="px-4 py-2">Nama</th>
//                   <th className="px-4 py-2">Email</th>
//                   <th className="px-4 py-2 max-w-[200px] break-words">Alamat</th>
//                   <th className="px-4 py-2">Jumlah Produk</th>
//                   <th className="px-4 py-2">ID Pengguna</th>
//                   <th className="px-4 py-2">Status</th>
//                   <th className="px-4 py-2">Tanggal Order</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {filteredOrders.map((order) => (
//                   <tr key={order.orderId} className="border-t hover:bg-gray-50">
//                     <td className="px-4 py-2">{order.orderId}</td>
//                     <td className="px-4 py-2">{order.name}</td>
//                     <td className="px-4 py-2">{order.email}</td>
//                     <td className="px-4 py-2 max-w-[200px] break-words">{order.address}</td>
//                     <td className="px-4 py-2 text-center">{order.totalQuantity}</td>
//                     <td className="px-4 py-2">{order.userId}</td>
//                     <td className="px-4 py-2">
//                       <span className={`px-2 py-1 rounded-full text-white text-xs font-medium ${getStatusBadge(order.status)}`}>{order.status}</span>
//                     </td>
//                     <td className="px-4 py-2">{new Date(order.orderDate).toLocaleDateString("id-ID", { day: "2-digit", month: "short", year: "numeric" })}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           ) : (
//             <p className="text-gray-400">Belum ada data pesanan.</p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminDashboard;
// import React, { useEffect, useState } from "react";
// import StatCard from "../components/StatCard";
// import { Users, Package, ShoppingCart, ClipboardList } from "lucide-react";
// import axios from "../utils/Axios";
// import AxiosToastError from "../utils/AxiosToastError";
// import { saveAs } from "file-saver";

// const AdminDashboard = () => {
//   const [analytics, setAnalytics] = useState(null);
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [searchName, setSearchName] = useState("");
//   const [selectedMonth, setSelectedMonth] = useState("");

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const [analyticsRes, ordersRes] = await Promise.all([
//           axios.get("/api/analytics"),
//           axios.get("/api/order/all-orders"),
//         ]);
//         setAnalytics(analyticsRes.data);
//         setOrders(ordersRes.data.data);
//       } catch (err) {
//         setError("Gagal memuat data dashboard.");
//         AxiosToastError(err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   const getStatusBadge = (status) => {
//     switch (status) {
//       case "Diajukan":
//         return "bg-yellow-400";
//       case "Diproses":
//         return "bg-blue-500";
//       case "Dikirim":
//         return "bg-green-500";
//       case "Selesai":
//         return "bg-green-700";
//       case "Dibatalkan":
//         return "bg-red-500";
//       default:
//         return "bg-gray-400";
//     }
//   };

//   const filteredOrders = analytics?.allOrders
//     ? analytics.allOrders.filter((order) => {
//         const matchName = order.name
//           ?.toLowerCase()
//           .includes(searchName.toLowerCase());
//         const matchMonth = selectedMonth
//           ? new Date(order.orderDate).getMonth() + 1 === parseInt(selectedMonth)
//           : true;
//         return matchName && matchMonth;
//       })
//     : [];

//   const downloadCSV = () => {
//     if (!filteredOrders || filteredOrders.length === 0) return;

//     const headers = [
//       "ID Pesanan",
//       "Nama",
//       "Email",
//       "Alamat",
//       "Jumlah Produk",
//       "ID Pengguna",
//       "Status",
//       "Tanggal Order",
//     ];

//     const rows = filteredOrders.map((order) => [
//       order.orderId,
//       order.name,
//       order.email,
//       `"${order.address?.addressLine || ""}"`,
//       order.totalQuantity,
//       order.userId,
//       order.status,
//       new Date(order.orderDate).toLocaleDateString("id-ID"),
//     ]);

//     const csvContent = [headers, ...rows]
//       .map((row) => row.join(","))
//       .join("\n");

//     const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
//     saveAs(blob, "data_pesanan.csv");
//   };

//   if (loading) return <div className="p-6 text-gray-500">Memuat data...</div>;
//   if (error) return <div className="p-6 text-red-500">{error}</div>;
//   if (!analytics) return <div className="p-6">Data tidak tersedia.</div>;

//   const getAddressString = (address) => {
//     if (typeof address === "string") return address;
//     return address?.addressLine || "Alamat tidak tersedia";
//   };

//   return (
//     <div className="p-6 overflow-auto">
//       <h2 className="text-2xl font-bold mb-4">Admin Analytics Dashboard</h2>

//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-6 overflow-auto mb-6">
//         <StatCard
//           title="Total Pengguna"
//           value={analytics.totalUsers}
//           icon={<Users />}
//           bgColor="bg-blue-100"
//           textColor="text-blue-800"
//           className="p-4 rounded-lg shadow-md flex items-center justify-between"
//         />
//         <StatCard
//           title="Total Produk"
//           value={analytics.totalProducts}
//           icon={<Package />}
//           bgColor="bg-green-100"
//           textColor="text-green-800"
//           className="p-4 rounded-lg shadow-md flex items-center justify-between"
//         />
//         <StatCard
//           title="Total Pesanan"
//           value={analytics.totalOrders}
//           icon={<ShoppingCart />}
//           bgColor="bg-yellow-100"
//           textColor="text-yellow-800"
//           className="p-4 rounded-lg shadow-md flex items-center justify-between"
//         />
//         <StatCard
//           title="Total Permintaan"
//           value={analytics.totalRequests}
//           icon={<ClipboardList />}
//           bgColor="bg-purple-100"
//           textColor="text-purple-800"
//           className="p-4 rounded-lg shadow-md flex items-center justify-between"
//         />
//       </div>

//   {/* SEARCH, FILTER & BUTTON DOWNLOAD CSV */}
// <div className="flex flex-wrap items-center gap-4 mb-6">
//   <input
//     type="text"
//     placeholder="Cari nama pengguna..."
//     className="p-2 border rounded-md flex-grow min-w-[200px] max-w-[400px]"
//     value={searchName}
//     onChange={(e) => setSearchName(e.target.value)}
//   />

//   <select
//     value={selectedMonth}
//     onChange={(e) => setSelectedMonth(e.target.value)}
//     className="p-2 border rounded-md w-40"
//   >
//     <option value="">Semua Bulan</option>
//     {[...Array(12)].map((_, i) => (
//       <option key={i} value={i + 1}>
//         {new Date(0, i).toLocaleString("id-ID", { month: "long" })}
//       </option>
//     ))}
//   </select>

//   <button
//     onClick={downloadCSV}
//     className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 min-w-[120px]"
//   >
//     Download CSV
//   </button>
// </div>

//       {/* TABEL SEMUA ORDER */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 overflow-auto">
//         <div className="col-span-full bg-white p-6 rounded-2xl shadow-md overflow-x-auto border border-grey-300">
//           <h3 className="text-xl font-semibold mb-4">Semua Pesanan</h3>
//           {filteredOrders.length > 0 ? (
//             <div className="overflow-x-auto">
//               <table className="w-full text-xs text-left border border-grey-500">
//                 <thead className="bg-gray-100">
//                   <tr>
//                     <th className="px-4 py-2">ID Pesanan</th>
//                     <th className="px-4 py-2">Nama</th>
//                     <th className="px-4 py-2">Email</th>
//                     <th className="px-4 py-2 max-w-[200px] break-words">
//                       Alamat
//                     </th>
//                     <th className="px-4 py-2">Jumlah Produk</th>
//                     <th className="px-4 py-2">Status</th>
//                     <th className="px-4 py-2">Tanggal Order</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {filteredOrders.map((order) => (
//                     <tr
//                       key={order.orderId}
//                       className="border-t hover:bg-gray-50"
//                     >
//                       <td className="px-4 py-2">{order.orderId}</td>
//                       <td className="px-4 py-2">{order.name}</td>
//                       <td className="px-4 py-2">{order.email}</td>
//                       <td
//                         className="px-4 py-2 max-w-[200px] truncate"
//                         title={getAddressString(order.address)}
//                       >
//                         {getAddressString(order.address)}
//                       </td>

//                       <td className="px-4 py-2 text-center">
//                         {order.totalQuantity}
//                       </td>
//                       <td className="px-4 py-2">
//                         <span
//                           className={`px-2 py-1 rounded-full text-white text-xs font-medium ${getStatusBadge(
//                             order.status
//                           )}`}
//                         >
//                           {order.status}
//                         </span>
//                       </td>
//                       <td className="px-4 py-2">
//                         {new Date(order.orderDate).toLocaleDateString("id-ID", {
//                           day: "2-digit",
//                           month: "short",
//                           year: "numeric",
//                         })}
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           ) : (
//             <p className="text-gray-400">Belum ada data pesanan.</p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminDashboard;

// import React, { useEffect, useState } from "react";
// import StatCard from "../components/StatCard";
// import { Users, Package, ShoppingCart, ClipboardList } from "lucide-react";
// import axios from "../utils/Axios";
// import AxiosToastError from "../utils/AxiosToastError";
// import { saveAs } from "file-saver";
// import { Link } from "react-router-dom";

// const AdminDashboard = () => {
//   const [analytics, setAnalytics] = useState(null);
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [searchName, setSearchName] = useState("");
//   const [selectedMonth, setSelectedMonth] = useState("");

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const [analyticsRes, ordersRes] = await Promise.all([
//           axios.get("/api/analytics"),
//           axios.get("/api/order/all-orders"),
//         ]);
//         setAnalytics(analyticsRes.data);
//         setOrders(ordersRes.data.data);
//       } catch (err) {
//         setError("Gagal memuat data dashboard.");
//         AxiosToastError(err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   const getStatusBadge = (status) => {
//     switch (status) {
//       case "Diajukan":
//         return "bg-yellow-400";
//       case "Diproses":
//         return "bg-blue-500";
//       case "Dikirim":
//         return "bg-green-500";
//       case "Selesai":
//         return "bg-green-700";
//       case "Dibatalkan":
//         return "bg-red-500";
//       default:
//         return "bg-gray-400";
//     }
//   };

//   const filteredOrders = analytics?.allOrders
//     ? analytics.allOrders.filter((order) => {
//         const matchName = order.name
//           ?.toLowerCase()
//           .includes(searchName.toLowerCase());
//         const matchMonth = selectedMonth
//           ? new Date(order.orderDate).getMonth() + 1 === parseInt(selectedMonth)
//           : true;
//         return matchName && matchMonth;
//       })
//     : [];

//   const downloadCSV = () => {
//     if (!filteredOrders || filteredOrders.length === 0) return;

//     const headers = [
//       "ID Pesanan",
//       "Nama",
//       "Email",
//       "Alamat",
//       "Jumlah Produk",
//       "ID Pengguna",
//       "Status",
//       "Tanggal Order",
//     ];

//     const rows = filteredOrders.map((order) => [
//       order.orderId,
//       order.name,
//       order.email,
//       `"${order.address?.addressLine || ""}"`,
//       order.totalQuantity,
//       order.userId,
//       order.status,
//       new Date(order.orderDate).toLocaleDateString("id-ID"),
//     ]);

//     const csvContent = [headers, ...rows]
//       .map((row) => row.join(","))
//       .join("\n");

//     const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
//     saveAs(blob, "data_pesanan.csv");
//   };

//   if (loading) return <div className="p-6 text-gray-500">Memuat data...</div>;
//   if (error) return <div className="p-6 text-red-500">{error}</div>;
//   if (!analytics) return <div className="p-6">Data tidak tersedia.</div>;

//   const getAddressString = (address) => {
//     if (typeof address === "string") return address;
//     return address?.addressLine || "Alamat tidak tersedia";
//   };

//   return (
//     <div className="p-6 overflow-auto">
//       <h2 className="text-2xl font-bold mb-4">Admin Analytics Dashboard</h2>

//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-6 overflow-auto mb-6">
//         <Link to="/dashboard/all">
//           <StatCard
//             title="Total Pengguna"
//             value={analytics.totalUsers}
//             icon={<Users />}
//             bgColor="bg-blue-100"
//             textColor="text-blue-800"
//             className="p-4 rounded-lg shadow-md flex items-center justify-between cursor-pointer hover:bg-blue-200 transition"
//           />
//         </Link>

//         <Link to="/dashboard/product">
//           <StatCard
//             title="Total Produk"
//             value={analytics.totalProducts}
//             icon={<Package />}
//             bgColor="bg-green-100"
//             textColor="text-green-800"
//             className="p-4 rounded-lg shadow-md flex items-center justify-between cursor-pointer hover:bg-green-200 transition"
//           />
//         </Link>

//         <Link to="/dashboard/adminorder">
//           <StatCard
//             title="Total Pesanan"
//             value={analytics.totalOrders}
//             icon={<ShoppingCart />}
//             bgColor="bg-yellow-100"
//             textColor="text-yellow-800"
//             className="p-4 rounded-lg shadow-md flex items-center justify-between cursor-pointer hover:bg-yellow-200 transition"
//           />
//         </Link>

//         <StatCard
//           title="Total Permintaan"
//           value={analytics.totalRequests}
//           icon={<ClipboardList />}
//           bgColor="bg-purple-100"
//           textColor="text-purple-800"
//           className="p-4 rounded-lg shadow-md flex items-center justify-between cursor-pointer hover:bg-purple-200 transition"
//         />
//       </div>

//       {/* Grafik Tren Pesanan per Bulan
//       <div className="bg-white p-6 rounded-lg shadow-md mb-6">
//         <h3 className="text-xl font-semibold mb-4">Tren Pesanan per Bulan</h3>
//         <Line data={getChartData()} />
//       </div> */}

//       {/* SEARCH, FILTER & BUTTON DOWNLOAD CSV */}
//       <div className="flex flex-wrap items-center gap-4 mb-6">
//         <input
//           type="text"
//           placeholder="Cari nama pengguna..."
//           className="p-2 border rounded-md flex-grow min-w-[200px] max-w-[400px]"
//           value={searchName}
//           onChange={(e) => setSearchName(e.target.value)}
//         />

//         <select
//           value={selectedMonth}
//           onChange={(e) => setSelectedMonth(e.target.value)}
//           className="p-2 border rounded-md w-40"
//         >
//           <option value="">Semua Bulan</option>
//           {[...Array(12)].map((_, i) => (
//             <option key={i} value={i + 1}>
//               {new Date(0, i).toLocaleString("id-ID", { month: "long" })}
//             </option>
//           ))}
//         </select>

//         <button
//           onClick={downloadCSV}
//           className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 min-w-[120px]"
//         >
//           Download CSV
//         </button>
//       </div>

//       {/* TABEL SEMUA ORDER */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 overflow-auto">
//         <div className="col-span-full bg-white p-6 rounded-2xl shadow-md overflow-x-auto border border-grey-300">
//           <h3 className="text-xl font-semibold mb-4">Semua Pesanan</h3>
//           {filteredOrders.length > 0 ? (
//             <div className="overflow-x-auto">
//               <table className="w-full text-xs text-left border border-grey-500">
//                 <thead className="bg-gray-100">
//                   <tr>
//                     <th className="px-4 py-2">ID Pesanan</th>
//                     <th className="px-4 py-2">Nama</th>
//                     <th className="px-4 py-2">Email</th>
//                     <th className="px-4 py-2 max-w-[200px] break-words">
//                       Alamat
//                     </th>
//                     <th className="px-4 py-2">Jumlah Produk</th>
//                     <th className="px-4 py-2">Status</th>
//                     <th className="px-4 py-2">Tanggal Order</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {filteredOrders.map((order) => (
//                     <tr
//                       key={order._id}
//                       className="hover:bg-gray-50 border-b border-gray-200"
//                     >
//                       <td className="px-4 py-2">{order.orderId}</td>
//                       <td className="px-4 py-2">{order.name}</td>
//                       <td className="px-4 py-2">{order.email}</td>
//                       <td className="px-4 py-2 max-w-[200px] break-words">
//                         {getAddressString(order.address)}
//                       </td>
//                       <td className="px-4 py-2 text-center">
//                         {order.totalQuantity}
//                       </td>
//                       <td className="px-4 py-2">
//                         <span
//                           className={`px-2 py-1 rounded text-white text-xs ${getStatusBadge(
//                             order.status
//                           )}`}
//                         >
//                           {order.status}
//                         </span>
//                       </td>
//                       <td className="px-4 py-2">
//                         {new Date(order.orderDate).toLocaleDateString("id-ID")}
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           ) : (
//             <p>Tidak ada data pesanan sesuai filter.</p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminDashboard;

// import React, { useEffect, useState } from "react";
// import StatCard from "../components/StatCard";
// import { Users, Package, ShoppingCart, ClipboardList } from "lucide-react";
// import axios from "../utils/Axios";
// import AxiosToastError from "../utils/AxiosToastError";
// import { saveAs } from "file-saver";
// import * as XLSX from "xlsx";
// import { Link } from "react-router-dom";

// const AdminDashboard = () => {
//   const [analytics, setAnalytics] = useState(null);
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [searchName, setSearchName] = useState("");
//   const [selectedMonth, setSelectedMonth] = useState("");

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const [analyticsRes, ordersRes] = await Promise.all([
//           axios.get("/api/analytics"),
//           axios.get("/api/order/all-orders"),
//         ]);
//         setAnalytics(analyticsRes.data);
//         setOrders(ordersRes.data.data);
//       } catch (err) {
//         setError("Gagal memuat data dashboard.");
//         AxiosToastError(err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   const getStatusBadge = (status) => {
//     switch (status) {
//       case "Diajukan":
//         return "bg-yellow-400";
//       case "Diproses":
//         return "bg-blue-500";
//       case "Dikirim":
//         return "bg-green-500";
//       case "Selesai":
//         return "bg-green-700";
//       case "Dibatalkan":
//         return "bg-red-500";
//       default:
//         return "bg-gray-400";
//     }
//   };

//   const filteredOrders = analytics?.allOrders
//     ? analytics.allOrders.filter((order) => {
//         const matchName = order.name
//           ?.toLowerCase()
//           .includes(searchName.toLowerCase());
//         const matchMonth = selectedMonth
//           ? new Date(order.orderDate).getMonth() + 1 === parseInt(selectedMonth)
//           : true;
//         return matchName && matchMonth;
//       })
//     : [];

//   const downloadExcel = () => {
//     if (!filteredOrders || filteredOrders.length === 0) return;

//     const data = filteredOrders.map((order) => ({
//       "ID Pesanan": order.orderId,
//       "Nama": order.name,
//       "Email": order.email,
//       "Alamat": order.address?.addressLine || "Alamat tidak tersedia",
//       "Jumlah Produk": order.totalQuantity,
//       "ID Pengguna": order.userId,
//       "Status": order.status,
//       "Tanggal Order": new Date(order.orderDate).toLocaleDateString("id-ID"),
//     }));

//     const worksheet = XLSX.utils.json_to_sheet(data);
//     const workbook = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(workbook, worksheet, "Data Pesanan");

//     const excelBuffer = XLSX.write(workbook, {
//       bookType: "xlsx",
//       type: "array",
//     });

//     const blob = new Blob([excelBuffer], {
//       type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
//     });

//     saveAs(blob, "data_pesanan.xlsx");
//   };

//   if (loading) return <div className="p-6 text-gray-500">Memuat data...</div>;
//   if (error) return <div className="p-6 text-red-500">{error}</div>;
//   if (!analytics) return <div className="p-6">Data tidak tersedia.</div>;

//   const getAddressString = (address) => {
//     if (typeof address === "string") return address;
//     return address?.addressLine || "Alamat tidak tersedia";
//   };

//   return (
//     <div className="p-6 overflow-auto">
//       <h2 className="text-2xl font-bold mb-4">Admin Analytics Dashboard</h2>

//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-6 overflow-auto mb-6">
//         <Link to="/dashboard/all">
//           <StatCard
//             title="Total Pengguna"
//             value={analytics.totalUsers}
//             icon={<Users />}
//             bgColor="bg-blue-100"
//             textColor="text-blue-800"
//             className="p-4 rounded-lg shadow-md flex items-center justify-between cursor-pointer hover:bg-blue-200 transition"
//           />
//         </Link>

//         <Link to="/dashboard/product">
//           <StatCard
//             title="Total Produk"
//             value={analytics.totalProducts}
//             icon={<Package />}
//             bgColor="bg-green-100"
//             textColor="text-green-800"
//             className="p-4 rounded-lg shadow-md flex items-center justify-between cursor-pointer hover:bg-green-200 transition"
//           />
//         </Link>

//         <Link to="/dashboard/adminorder">
//           <StatCard
//             title="Total Pesanan"
//             value={analytics.totalOrders}
//             icon={<ShoppingCart />}
//             bgColor="bg-yellow-100"
//             textColor="text-yellow-800"
//             className="p-4 rounded-lg shadow-md flex items-center justify-between cursor-pointer hover:bg-yellow-200 transition"
//           />
//         </Link>

//         <StatCard
//           title="Total Permintaan"
//           value={analytics.totalRequests}
//           icon={<ClipboardList />}
//           bgColor="bg-purple-100"
//           textColor="text-purple-800"
//           className="p-4 rounded-lg shadow-md flex items-center justify-between cursor-pointer hover:bg-purple-200 transition"
//         />
//       </div>

//       {/* SEARCH, FILTER & BUTTON DOWNLOAD EXCEL */}
//       <div className="flex flex-wrap items-center gap-4 mb-6">
//         <input
//           type="text"
//           placeholder="Cari nama pengguna..."
//           className="p-2 border rounded-md flex-grow min-w-[200px] max-w-[400px]"
//           value={searchName}
//           onChange={(e) => setSearchName(e.target.value)}
//         />

//         <select
//           value={selectedMonth}
//           onChange={(e) => setSelectedMonth(e.target.value)}
//           className="p-2 border rounded-md w-40"
//         >
//           <option value="">Semua Bulan</option>
//           {[...Array(12)].map((_, i) => (
//             <option key={i} value={i + 1}>
//               {new Date(0, i).toLocaleString("id-ID", { month: "long" })}
//             </option>
//           ))}
//         </select>

//         <button
//           onClick={downloadExcel}
//           className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 min-w-[150px]"
//         >
//           Download Excel
//         </button>
//       </div>

//       {/* TABEL SEMUA ORDER */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 overflow-auto">
//         <div className="col-span-full bg-white p-6 rounded-2xl shadow-md overflow-x-auto border border-grey-300">
//           <h3 className="text-xl font-semibold mb-4">Semua Pesanan</h3>
//           {filteredOrders.length > 0 ? (
//             <div className="overflow-x-auto">
//               <table className="w-full text-xs text-left border border-grey-500">
//                 <thead className="bg-gray-100">
//                   <tr>
//                     <th className="px-4 py-2">ID Pesanan</th>
//                     <th className="px-4 py-2">Nama</th>
//                     <th className="px-4 py-2">Email</th>
//                     <th className="px-4 py-2 max-w-[200px] break-words">Alamat</th>
//                     <th className="px-4 py-2">Jumlah Produk</th>
//                     <th className="px-4 py-2">Status</th>
//                     <th className="px-4 py-2">Tanggal Order</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {filteredOrders.map((order) => (
//                     <tr key={order._id} className="hover:bg-gray-50 border-b border-gray-200">
//                       <td className="px-4 py-2">{order.orderId}</td>
//                       <td className="px-4 py-2">{order.name}</td>
//                       <td className="px-4 py-2">{order.email}</td>
//                       <td className="px-4 py-2 max-w-[200px] break-words">
//                         {getAddressString(order.address)}
//                       </td>
//                       <td className="px-4 py-2 text-center">{order.totalQuantity}</td>
//                       <td className="px-4 py-2">
//                         <span className={`px-2 py-1 rounded text-white text-xs ${getStatusBadge(order.status)}`}>
//                           {order.status}
//                         </span>
//                       </td>
//                       <td className="px-4 py-2">
//                         {new Date(order.orderDate).toLocaleDateString("id-ID")}
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           ) : (
//             <p>Tidak ada data pesanan sesuai filter.</p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminDashboard;

// import React, { useEffect, useState } from "react";
// import StatCard from "../components/StatCard";
// import {
//   Users,
//   Package,
//   ShoppingCart,
//   ClipboardList,
//   ChevronDown,
//   ChevronUp,
// } from "lucide-react";
// import axios from "../utils/Axios";
// import AxiosToastError from "../utils/AxiosToastError";
// import { saveAs } from "file-saver";
// import * as XLSX from "xlsx";
// import { Link } from "react-router-dom";

// const AdminDashboard = () => {
//   const [analytics, setAnalytics] = useState(null);
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [searchName, setSearchName] = useState("");
//   const [selectedMonth, setSelectedMonth] = useState("");
//   const [expandedOrderId, setExpandedOrderId] = useState(null); // untuk toggle detail produk

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const [analyticsRes, ordersRes] = await Promise.all([
//           axios.get("/api/analytics"),
//           axios.get("/api/order/all-orders"),
//         ]);
//         setAnalytics(analyticsRes.data);
//         setOrders(ordersRes.data.data);
//       } catch (err) {
//         setError("Gagal memuat data dashboard.");
//         AxiosToastError(err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   const getStatusBadge = (status) => {
//     switch (status) {
//       case "Diajukan":
//         return "bg-yellow-400";
//       case "Diproses":
//         return "bg-blue-500";
//       case "Dikirim":
//         return "bg-green-500";
//       case "Selesai":
//         return "bg-green-700";
//       case "Dibatalkan":
//         return "bg-red-500";
//       default:
//         return "bg-gray-400";
//     }
//   };

//   const filteredOrders = analytics?.allOrders
//     ? analytics.allOrders.filter((order) => {
//         const matchName = order.name
//           ?.toLowerCase()
//           .includes(searchName.toLowerCase());
//         const matchMonth = selectedMonth
//           ? new Date(order.orderDate).getMonth() + 1 === parseInt(selectedMonth)
//           : true;
//         return matchName && matchMonth;
//       })
//     : [];

//   const downloadExcel = () => {
//     if (!filteredOrders || filteredOrders.length === 0) return;

//     const data = filteredOrders.map((order) => ({
//       "ID Pesanan": order.orderId,
//       Nama: order.name,
//       Email: order.email,
//       Alamat: order.address?.addressLine || "Alamat tidak tersedia",
//       "Jumlah Produk": order.totalQuantity,
//       "ID Pengguna": order.userId,
//       Status: order.status,
//       "Tanggal Order": new Date(order.orderDate).toLocaleDateString("id-ID"),
//     }));

//     const worksheet = XLSX.utils.json_to_sheet(data);
//     const workbook = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(workbook, worksheet, "Data Pesanan");

//     const excelBuffer = XLSX.write(workbook, {
//       bookType: "xlsx",
//       type: "array",
//     });

//     const blob = new Blob([excelBuffer], {
//       type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
//     });

//     saveAs(blob, "data_pesanan.xlsx");
//   };

//   if (loading) return <div className="p-6 text-gray-500">Memuat data...</div>;
//   if (error) return <div className="p-6 text-red-500">{error}</div>;
//   if (!analytics) return <div className="p-6">Data tidak tersedia.</div>;

//   const getAddressString = (address) => {
//     if (typeof address === "string") return address;
//     return address?.addressLine || "Alamat tidak tersedia";
//   };

//   return (
//     <div className="p-6 overflow-auto">
//       <h2 className="text-2xl font-bold mb-4">Admin Analytics Dashboard</h2>

//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-6 overflow-auto mb-6">
//         <Link to="/dashboard/all">
//           <StatCard
//             title="Total Pengguna"
//             value={analytics.totalUsers}
//             icon={<Users />}
//             bgColor="bg-blue-100"
//             textColor="text-blue-800"
//             className="p-4 rounded-lg shadow-md flex items-center justify-between cursor-pointer hover:bg-blue-200 transition"
//           />
//         </Link>

//         <Link to="/dashboard/product">
//           <StatCard
//             title="Total Produk"
//             value={analytics.totalProducts}
//             icon={<Package />}
//             bgColor="bg-green-100"
//             textColor="text-green-800"
//             className="p-4 rounded-lg shadow-md flex items-center justify-between cursor-pointer hover:bg-green-200 transition"
//           />
//         </Link>

//         <Link to="/dashboard/adminorder">
//           <StatCard
//             title="Total Pesanan"
//             value={analytics.totalOrders}
//             icon={<ShoppingCart />}
//             bgColor="bg-yellow-100"
//             textColor="text-yellow-800"
//             className="p-4 rounded-lg shadow-md flex items-center justify-between cursor-pointer hover:bg-yellow-200 transition"
//           />
//         </Link>

//         <StatCard
//           title="Total Permintaan"
//           value={analytics.totalRequests}
//           icon={<ClipboardList />}
//           bgColor="bg-purple-100"
//           textColor="text-purple-800"
//           className="p-4 rounded-lg shadow-md flex items-center justify-between cursor-pointer hover:bg-purple-200 transition"
//         />
//       </div>

//       {/* SEARCH, FILTER & BUTTON DOWNLOAD EXCEL */}
//       <div className="flex flex-wrap items-center gap-4 mb-6">
//         <input
//           type="text"
//           placeholder="Cari nama pengguna..."
//           className="p-2 border rounded-md flex-grow min-w-[200px] max-w-[400px]"
//           value={searchName}
//           onChange={(e) => setSearchName(e.target.value)}
//         />

//         <select
//           value={selectedMonth}
//           onChange={(e) => setSelectedMonth(e.target.value)}
//           className="p-2 border rounded-md w-40"
//         >
//           <option value="">Semua Bulan</option>
//           {[...Array(12)].map((_, i) => (
//             <option key={i} value={i + 1}>
//               {new Date(0, i).toLocaleString("id-ID", { month: "long" })}
//             </option>
//           ))}
//         </select>

//         <button
//           onClick={downloadExcel}
//           className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 min-w-[150px]"
//         >
//           Download Excel
//         </button>
//       </div>

//       {/* TABEL SEMUA ORDER */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 overflow-auto">
//         <div className="col-span-full bg-white p-6 rounded-2xl shadow-md overflow-x-auto border border-grey-300">
//           <h3 className="text-xl font-semibold mb-4">Semua Pesanan</h3>
//           {filteredOrders.length > 0 ? (
//             <div className="overflow-x-auto">
//               <table className="w-full text-xs text-left border border-grey-500">
//                 <thead className="bg-gray-100">
//                   <tr>
//                     <th className="px-4 py-2">ID Pesanan</th>
//                     <th className="px-4 py-2">Nama</th>
//                     <th className="px-4 py-2">Email</th>
//                     <th className="px-4 py-2 max-w-[200px] break-words">
//                       Alamat
//                     </th>
//                     <th className="px-4 py-2">Produk</th>
//                     <th className="px-4 py-2">Status</th>
//                     <th className="px-4 py-2">Tanggal Order</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {filteredOrders.map((order) => (
//                     <tr
//                       key={order._id}
//                       className="hover:bg-gray-50 border-b border-gray-200"
//                     >
//                       <td className="px-4 py-2">{order.orderId}</td>
//                       <td className="px-4 py-2">{order.name}</td>
//                       <td className="px-4 py-2">{order.email}</td>
//                       <td className="px-4 py-2 max-w-[200px] break-words">
//                         {getAddressString(order.address)}
//                       </td>
//                       <td className="px-4 py-2 text-center">
//                         <button
//                           onClick={() =>
//                             setExpandedOrderId(
//                               expandedOrderId === order._id ? null : order._id
//                             )
//                           }
//                           className="text-blue-600 underline hover:text-blue-800"
//                         >
//                           Detail{" "}
//                           {expandedOrderId === order._id ? (
//                             <ChevronUp className="inline w-4 h-4" />
//                           ) : (
//                             <ChevronDown className="inline w-4 h-4" />
//                           )}
//                         </button>

//                         {expandedOrderId === order._id && (
//                           <div className="mt-3 space-y-2 text-left bg-gray-50 p-3 rounded shadow-sm border max-w-[300px]">
//                             {order.items?.length > 0 ? (
//                               order.items.map((item, idx) => (
//                                 <div
//                                   key={idx}
//                                   className="flex items-center gap-3"
//                                 >
//                                   <img
//                                     src={
//                                       item?.product_details?.image?.[0] ||
//                                       "/no-image.png"
//                                     }
//                                     alt={
//                                       item?.product_details?.name || "Produk"
//                                     }
//                                     className="w-12 h-12 object-cover border rounded"
//                                   />
//                                   <div>
//                                     <p className="font-medium text-sm">
//                                       {item?.product_details?.name ||
//                                         "Nama produk tidak ada"}
//                                     </p>
//                                     <p className="text-xs text-gray-600">
//                                       Qty: {item.quantity}
//                                     </p>
//                                   </div>
//                                 </div>
//                               ))
//                             ) : (
//                               <p className="text-gray-500 text-xs">
//                                 Tidak ada produk.
//                               </p>
//                             )}
//                           </div>
//                         )}
//                       </td>
//                       <td className="px-4 py-2">
//                         <span
//                           className={`px-2 py-1 rounded-lg text-white text-xs font-semibold ${getStatusBadge(
//                             order.status
//                           )}`}
//                         >
//                           {order.status}
//                         </span>
//                       </td>
//                       <td className="px-4 py-2">
//                         {new Date(order.orderDate).toLocaleDateString("id-ID")}
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           ) : (
//             <p className="text-center text-gray-500">
//               Data pesanan tidak ditemukan.
//             </p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminDashboard;

import React, { useEffect, useState } from "react";
import StatCard from "../components/StatCard";
import { Users, Package, ShoppingCart, ClipboardList } from "lucide-react";
import axios from "../utils/Axios";
import AxiosToastError from "../utils/AxiosToastError";
import { saveAs } from "file-saver";
import * as XLSX from "xlsx";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  const [analytics, setAnalytics] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchName, setSearchName] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [expandedRows, setExpandedRows] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [analyticsRes, ordersRes] = await Promise.all([
          axios.get("/api/analytics"),
          axios.get("/api/order/all-orders"),
        ]);
        setAnalytics(analyticsRes.data);
        setOrders(ordersRes.data.data);
      } catch (err) {
        setError("Gagal memuat data dashboard.");
        AxiosToastError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Toggle ekspansi baris detail produk
  const toggleRow = (orderId) => {
    setExpandedRows((prev) =>
      prev.includes(orderId)
        ? prev.filter((id) => id !== orderId)
        : [...prev, orderId]
    );
  };

  // Badge status warna
  const getStatusBadge = (status) => {
    switch (status) {
      case "Diajukan":
        return "bg-yellow-400";
      case "Diproses":
        return "bg-blue-500";
      case "Dikirim":
        return "bg-green-500";
      case "Selesai":
        return "bg-green-700";
      case "Dibatalkan":
        return "bg-red-500";
      default:
        return "bg-gray-400";
    }
  };

  // Filter orders berdasarkan nama, bulan, dan status
  const filteredOrders = orders.filter((order) => {
    const matchName = order.userId?.name
      ?.toLowerCase()
      .includes(searchName.toLowerCase());
    const matchMonth = selectedMonth
      ? new Date(order.createdAt).getMonth() + 1 === parseInt(selectedMonth)
      : true;
    const matchStatus = filterStatus ? order.status === filterStatus : true;
    return matchName && matchMonth && matchStatus;
  });

  // Fungsi download Excel
  const downloadExcel = () => {
    const excelData = [];

    filteredOrders.forEach((order) => {
      order.items?.forEach((item) => {
        excelData.push({
          "Order ID": order.orderId,
          "Tanggal Pesanan": new Date(order.createdAt).toLocaleDateString(),
          "Nama Pengguna": order.userId?.name || "Unknown",
          "Email Pengguna": order.userId?.email || "No Email",
          Status: order.status,
          "Nama Produk": item?.product_details?.name || "Nama produk tidak ada",
          "Jumlah Dipesan": item.quantity,
          "Jumlah Disetujui": item.approvedQuantity || 0,
        });
      });
    });

    const worksheet = XLSX.utils.json_to_sheet(excelData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Pesanan");

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    const blob = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });

    saveAs(blob, "daftar_pesanan.xlsx");
  };

  if (loading) return <div className="p-6 text-gray-500">Memuat data...</div>;
  if (error) return <div className="p-6 text-red-500">{error}</div>;
  if (!analytics) return <div className="p-6">Data tidak tersedia.</div>;

  return (
    <div className="p-6 overflow-auto">
      <h2 className="text-2xl font-bold mb-4">Admin Analytics Dashboard</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-6 overflow-auto mb-6">
        <Link to="/dashboard/all">
          <StatCard
            title="Total Pengguna"
            value={analytics.totalUsers}
            icon={<Users />}
            bgColor="bg-blue-100"
            textColor="text-blue-800"
            className="p-4 rounded-lg shadow-md flex items-center justify-between cursor-pointer hover:bg-blue-200 transition"
          />
        </Link>

        <Link to="/dashboard/product">
          <StatCard
            title="Total Produk"
            value={analytics.totalProducts}
            icon={<Package />}
            bgColor="bg-green-100"
            textColor="text-green-800"
            className="p-4 rounded-lg shadow-md flex items-center justify-between cursor-pointer hover:bg-green-200 transition"
          />
        </Link>

        <Link to="/dashboard/adminorder">
          <StatCard
            title="Total Pesanan"
            value={analytics.totalOrders}
            icon={<ShoppingCart />}
            bgColor="bg-yellow-100"
            textColor="text-yellow-800"
            className="p-4 rounded-lg shadow-md flex items-center justify-between cursor-pointer hover:bg-yellow-200 transition"
          />
        </Link>

        <StatCard
          title="Total Permintaan"
          value={analytics.totalRequests}
          icon={<ClipboardList />}
          bgColor="bg-purple-100"
          textColor="text-purple-800"
          className="p-4 rounded-lg shadow-md flex items-center justify-between cursor-pointer hover:bg-purple-200 transition"
        />
      </div>

      {/* Filter dan Search */}
      <div className="flex flex-wrap items-center gap-4 mb-6">
        <input
          type="text"
          placeholder="Cari nama pengguna..."
          className="p-2 border rounded-md flex-grow min-w-[200px] max-w-[400px]"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
        />

        <select
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
          className="p-2 border rounded-md w-40"
        >
          <option value="">Semua Bulan</option>
          {[...Array(12)].map((_, i) => (
            <option key={i} value={i + 1}>
              {new Date(0, i).toLocaleString("id-ID", { month: "long" })}
            </option>
          ))}
        </select>

        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="p-2 border rounded-md w-40"
        >
          <option value="">Semua Status</option>
          <option value="Diajukan">Diajukan</option>
          <option value="Diproses">Diproses</option>
          <option value="Dikirim">Dikirim</option>
          <option value="Selesai">Selesai</option>
          <option value="Dibatalkan">Dibatalkan</option>
        </select>

        <button
          onClick={downloadExcel}
          className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 min-w-[150px]"
        >
          Download Excel
        </button>
      </div>

{/* Tabel Pesanan */}
<div className="grid grid-cols-1 gap-4 overflow-auto">
  <div className="col-span-full bg-white p-6 rounded-2xl shadow-md overflow-x-auto border border-gray-300">
    <h3 className="text-xl font-semibold mb-4">Semua Pesanan</h3>

    {filteredOrders.length === 0 ? (
      <p className="text-center text-gray-500">Tidak ada order ditemukan untuk filter tersebut.</p>
    ) : (
      <table className="min-w-full border-collapse border border-gray-300 text-sm">
        <thead>
          <tr className="bg-gray-200">
            <th className="border px-4 py-2 text-left">Order ID</th>
            <th className="border px-4 py-2 text-left">Tanggal</th>
            <th className="border px-4 py-2 text-left">Pengguna</th>
            <th className="border px-4 py-2 text-center">Status</th>
            <th className="border px-4 py-2 text-center">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {filteredOrders.map((order) => (
            <React.Fragment key={order.orderId}>
              <tr className="hover:bg-gray-50">
                <td className="border px-4 py-2">{order.orderId}</td>
                <td className="border px-4 py-2">{new Date(order.createdAt).toLocaleDateString()}</td>
                <td className="border px-4 py-2">
                  {order.userId?.name || "Unknown"} <br />
                  <span className="text-xs text-gray-500">{order.userId?.email || "No Email"}</span>
                </td>
                <td className="border px-4 py-2 text-center">
                  <span
                    className={`inline-block px-2 py-1 rounded-lg text-white text-xs font-semibold ${getStatusBadge(
                      order.status
                    )}`}
                  >
                    {order.status}
                  </span>
                </td>
                <td className="border px-4 py-2 text-center">
                  <button
                    onClick={() => toggleRow(order.orderId)}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm transition"
                  >
                    {expandedRows.includes(order.orderId) ? "Sembunyikan Detail" : "Lihat Detail"}
                  </button>
                </td>
              </tr>

              {expandedRows.includes(order.orderId) && (
                <tr>
                  <td colSpan={5} className="border px-4 py-2 bg-gray-50">
                    <table className="min-w-full border-collapse border border-gray-300 mt-2 text-sm">
                      <thead>
                        <tr className="bg-gray-100">
                          <th className="border px-4 py-2 text-left">Nama Produk</th>
                          <th className="border px-4 py-2 text-center">Jumlah Dipesan</th>
                          <th className="border px-4 py-2 text-center">Jumlah Disetujui</th>
                        </tr>
                      </thead>
                      <tbody>
                        {order.items?.map((item, idx) => (
                          <tr key={idx} className="odd:bg-white even:bg-gray-50">
                            <td className="border px-4 py-2">{item?.product_details?.name || "Nama produk tidak ada"}</td>
                            <td className="border px-4 py-2 text-center">{item.quantity}</td>
                            <td className="border px-4 py-2 text-center">{item.approvedQuantity || 0}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    )}
  </div>


      
      </div>
    </div>
  );
};

export default AdminDashboard;
