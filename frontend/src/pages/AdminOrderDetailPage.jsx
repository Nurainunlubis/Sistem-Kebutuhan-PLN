// import React, { useEffect, useState } from "react";
// import axios from "../utils/Axios";
// import AxiosToastError from "../utils/AxiosToastError";
// import { useParams, useNavigate } from "react-router-dom";

// const AdminOrderDetailPage = () => {
//   const { orderId } = useParams(); // ambil orderId dari URL
//   const navigate = useNavigate();
//   const [order, setOrder] = useState(null);
//   const [loading, setLoading] = useState(true);

//   // Ambil detail order berdasarkan orderId
//   const fetchOrderDetail = async () => {
//     try {
//       const res = await axios.get(`/api/order/${orderId}`); // Gunakan orderId dinamis
//       setOrder(res.data.data);
//     } catch (error) {
//       AxiosToastError(error);
//       console.error("Gagal mengambil detail order:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchOrderDetail();
//   }, [orderId]);

//   if (loading) return <div className="p-6">Loading detail order...</div>;
//   if (!order) return <div className="p-6">Order tidak ditemukan.</div>;

//   return (
//     <div className="p-6">
//       <button
//         onClick={() => navigate(-1)}
//         className="mb-4 text-blue-600 hover:underline"
//       >
//         &larr; Kembali
//       </button>

//       <h1 className="text-2xl font-bold mb-2">Detail Order</h1>
//       <p className="mb-1"><strong>Order ID:</strong> {order.orderId}</p>
//       <p className="mb-1">
//         <strong>User:</strong> {order.userId?.name || "-"} ({order.userId?.email || "-"})
//       </p>
//       <p className="mb-4"><strong>Status:</strong> {order.status}</p>

//       <h2 className="text-lg font-semibold mt-4 mb-2">Items:</h2>
//       <div className="space-y-4">
//         {order.items?.map((item, idx) => (
//           <div key={idx} className="flex items-center gap-4 border rounded p-3">
//             <img
//               src={item.product_details?.image?.[0] || "/no-image.png"}
//               alt={item.product_details?.name || "Produk"}
//               className="w-16 h-16 object-cover rounded border"
//             />
//             <div>
//               <p className="font-medium">{item.product_details?.name || "Nama produk tidak tersedia"}</p>
//               <p>Quantity: {item.quantity}</p>
//               <p>Price: Rp {item.product_details?.price?.toLocaleString() || 0}</p>
//             </div>
//           </div>
//         ))}
//       </div>

//       <div className="mt-6">
//         <p><strong>Alamat Pengiriman:</strong> {order.delivery_address || "-"}</p>
//       </div>
//     </div>
//   );
// };

// export default AdminOrderDetailPage;


// import React, { useEffect, useState } from "react";
// import axios from "../utils/Axios";
// import AxiosToastError from "../utils/AxiosToastError";
// import { useParams, useNavigate } from "react-router-dom";

// const AdminOrderDetailPage = () => {
//   const { orderId } = useParams();
//   const navigate = useNavigate();

//   const [order, setOrder] = useState(null);
//   const [loading, setLoading] = useState(true);
//   // State untuk menyimpan qty approved per item
//   const [approvalData, setApprovalData] = useState([]);

//   // Fetch detail order
//   const fetchOrderDetail = async () => {
//     setLoading(true);
//     try {
//       const res = await axios.get(`/api/order/${orderId}`);
//       const orderData = res.data.data;

//       setOrder(orderData);

//       // Inisialisasi approvalData dari order.items
//       const initialApproval = orderData.items.map((item) => ({
//         productId: item.product_details._id,
//         productName: item.product_details.name,
//         qtyOrdered: item.quantity,
//         qtyApproved: item.qtyApproved ?? 0, // kalau belum ada set 0
//       }));

//       setApprovalData(initialApproval);
//     } catch (error) {
//       AxiosToastError(error);
//       console.error("Gagal mengambil detail order:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchOrderDetail();
//   }, [orderId]);

//   if (loading) return <div className="p-6">Loading detail order...</div>;
//   if (!order) return <div className="p-6">Order tidak ditemukan.</div>;

//   // Handle perubahan input qty approved
//   const handleQtyApprovedChange = (productId, value) => {
//     const qty = Math.max(0, Math.min(parseInt(value) || 0, approvalData.find(a => a.productId === productId).qtyOrdered));
//     setApprovalData((prev) =>
//       prev.map((item) =>
//         item.productId === productId ? { ...item, qtyApproved: qty } : item
//       )
//     );
//   };

//   // Submit approval ke backend
//   const handleSubmitApproval = async () => {
//     try {
//       const payload = {
//         products: approvalData.map(({ productId, qtyApproved }) => ({
//           productId,
//           qtyApproved,
//         })),
//       };

//       await axios.post(`/api/order/${orderId}/approve`, payload);

//       alert("Approval berhasil disimpan");
//       // Refresh data order setelah approval
//       fetchOrderDetail();
//     } catch (error) {
//       AxiosToastError(error);
//       console.error("Gagal menyimpan approval:", error);
//     }
//   };

//   // Produk yang sudah diapprove (qtyApproved > 0)
//   const approvedProducts = approvalData.filter((item) => item.qtyApproved > 0);

//   return (
//     <div className="p-6 max-w-4xl mx-auto">
//       <button
//         onClick={() => navigate(-1)}
//         className="mb-4 text-blue-600 hover:underline"
//       >
//         &larr; Kembali
//       </button>

//       <h1 className="text-2xl font-bold mb-2">Detail Order</h1>
//       <p className="mb-1"><strong>Order ID:</strong> {order.orderId}</p>
//       <p className="mb-1">
//         <strong>User:</strong> {order.userId?.name || "-"} ({order.userId?.email || "-"})
//       </p>
//       <p className="mb-4"><strong>Status:</strong> {order.status}</p>

//       <h2 className="text-lg font-semibold mt-4 mb-2">Items:</h2>
//       <div className="space-y-4">
//         {order.items?.map((item, idx) => {
//           const approvalItem = approvalData.find(a => a.productId === item.product_details._id);
//           return (
//             <div key={idx} className="flex items-center gap-4 border rounded p-3">
//               <img
//                 src={item.product_details?.image?.[0] || "/no-image.png"}
//                 alt={item.product_details?.name || "Produk"}
//                 className="w-16 h-16 object-cover rounded border"
//               />
//               <div className="flex-1">
//                 <p className="font-medium">{item.product_details?.name || "Nama produk tidak tersedia"}</p>
//                 <p>Quantity diminta: {item.quantity}</p>
//                 <p>Price: Rp {item.product_details?.price?.toLocaleString() || 0}</p>
//               </div>
//               <div className="flex flex-col items-center">
//                 <label className="mb-1 font-semibold">Qty Disetujui</label>
//                 <input
//                   type="number"
//                   min="0"
//                   max={item.quantity}
//                   value={approvalItem?.qtyApproved || 0}
//                   onChange={(e) => handleQtyApprovedChange(item.product_details._id, e.target.value)}
//                   className="w-20 border rounded px-2 py-1 text-center"
//                 />
//               </div>
//             </div>
//           );
//         })}
//       </div>

//       <button
//         onClick={handleSubmitApproval}
//         className="mt-6 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//       >
//         Simpan Approval
//       </button>

//       {/* Surat Jalan */}
//       {approvedProducts.length > 0 && (
//         <div className="mt-10 p-4 border border-gray-400 rounded shadow">
//           <h2 className="text-xl font-bold mb-3">Surat Jalan</h2>
//           <p className="mb-1"><strong>Order ID:</strong> {order.orderId}</p>
//           <p className="mb-4"><strong>Alamat Pengiriman:</strong> {order.delivery_address || "-"}</p>
//           <table className="w-full border-collapse border border-gray-400">
//             <thead>
//               <tr className="bg-gray-100">
//                 <th className="border border-gray-400 px-4 py-2 text-left">Nama Produk</th>
//                 <th className="border border-gray-400 px-4 py-2 text-right">Jumlah Disetujui</th>
//               </tr>
//             </thead>
//             <tbody>
//               {approvedProducts.map((item) => (
//                 <tr key={item.productId}>
//                   <td className="border border-gray-400 px-4 py-2">{item.productName}</td>
//                   <td className="border border-gray-400 px-4 py-2 text-right">{item.qtyApproved}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//           <button
//             onClick={() => window.print()}
//             className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
//           >
//             Cetak Surat Jalan
//           </button>
//         </div>
//       )}

//       <div className="mt-6">
//         <p><strong>Alamat Pengiriman:</strong> {order.delivery_address || "-"}</p>
//       </div>
//     </div>
//   );
// };

// export default AdminOrderDetailPage;



// import React, { useEffect, useState } from "react";
// import axios from "../utils/Axios";
// import AxiosToastError from "../utils/AxiosToastError";
// import { useParams, useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";

// const AdminOrderDetailPage = () => {
//   const { orderId } = useParams();
//   const navigate = useNavigate();

//   const [order, setOrder] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [approvalData, setApprovalData] = useState([]);
//   const [isProcessing, setIsProcessing] = useState(false);
//   const [deliveryNote, setDeliveryNote] = useState(null);

//   // Fungsi untuk mengekstrak nama jalan dari alamat
//   const extractStreetName = (address) => {
//     if (!address) return "-";
//     // Hapus ID jika ada di awal alamat (format: "123|Jl. Contoh No. 1")
//     const cleanedAddress = address.replace(/^\d+\|/, '');
//     return cleanedAddress.split(',')[0] || cleanedAddress;
//   };

//   // Fetch detail order
//   const fetchOrderDetail = async () => {
//     setLoading(true);
//     try {
//       const res = await axios.get(`/api/order/${orderId}`);
//       const orderData = res.data.data;

//       setOrder(orderData);

//       // Inisialisasi approvalData dari order.items
//       const initialApproval = orderData.items.map((item) => ({
//         productId: item.product_details._id,
//         productName: item.product_details.name,
//         qtyOrdered: item.quantity,
//         qtyApproved: item.qtyApproved || 0,
//       }));

//       setApprovalData(initialApproval);

//       // Cek apakah sudah ada surat jalan
//       if (orderData.deliveryNote) {
//         setDeliveryNote(orderData.deliveryNote);
//       }
//     } catch (error) {
//       AxiosToastError(error);
//       console.error("Gagal mengambil detail order:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchOrderDetail();
//   }, [orderId]);

//   // Handle perubahan input qty approved
//   const handleQtyApprovedChange = (productId, value) => {
//     const approvalItem = approvalData.find(a => a.productId === productId);
//     const qty = Math.max(0, Math.min(parseInt(value) || 0, approvalItem.qtyOrdered));
    
//     setApprovalData((prev) =>
//       prev.map((item) =>
//         item.productId === productId ? { ...item, qtyApproved: qty } : item
//       )
//     );
//   };

//   // Submit approval ke backend
//   const handleSubmitApproval = async () => {
//     setIsProcessing(true);
//     try {
//       const payload = {
//         products: approvalData.map(({ productId, qtyApproved }) => ({
//           productId,
//           qtyApproved,
//         })),
//       };

//       const res = await axios.post(`/api/order/${orderId}/approve`, payload);
      
//       toast.success("Persetujuan berhasil disimpan");
//       // Update data order setelah approval
//       setOrder(res.data.data);
      
//       // Jika ada surat jalan dalam response, simpan
//       if (res.data.data.deliveryNote) {
//         setDeliveryNote(res.data.data.deliveryNote);
//       }
//     } catch (error) {
//       AxiosToastError(error);
//       console.error("Gagal menyimpan approval:", error);
//     } finally {
//       setIsProcessing(false);
//     }
//   };

//   // Mark order as completed
//   const handleCompleteOrder = async () => {
//     if (!window.confirm("Apakah Anda yakin ingin menyelesaikan pesanan ini?")) return;
    
//     setIsProcessing(true);
//     try {
//       const res = await axios.post(`/api/order/${orderId}/complete`);
      
//       toast.success("Pesanan telah diselesaikan");
//       setOrder(res.data.data);
//     } catch (error) {
//       AxiosToastError(error);
//       console.error("Gagal menyelesaikan pesanan:", error);
//     } finally {
//       setIsProcessing(false);
//     }
//   };

//   // Produk yang sudah diapprove (qtyApproved > 0)
//   const approvedProducts = approvalData.filter((item) => item.qtyApproved > 0);

//   if (loading) return <div className="p-6">Memuat detail pesanan...</div>;
//   if (!order) return <div className="p-6">Pesanan tidak ditemukan.</div>;

//   return (
//     <div className="p-6 max-w-6xl mx-auto">
//       <button
//         onClick={() => navigate(-1)}
//         className="mb-4 text-blue-600 hover:underline flex items-center"
//       >
//         <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
//           <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
//         </svg>
//         Kembali ke Daftar Pesanan
//       </button>

//       <div className="bg-white rounded-lg shadow-md p-6 mb-6">
//         <div className="flex justify-between items-start mb-4">
//           <div>
//             <h1 className="text-2xl font-bold text-gray-800">Detail Pesanan #{order.orderId}</h1>
//             <div className="flex items-center mt-2">
//               <span className={`px-3 py-1 rounded-full text-sm font-medium ${
//                 order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
//                 order.status === 'processed' ? 'bg-blue-100 text-blue-800' :
//                 order.status === 'completed' ? 'bg-green-100 text-green-800' :
//                 'bg-gray-100 text-gray-800'
//               }`}>
//                 {order.status === 'pending' ? 'Menunggu' : 
//                  order.status === 'processed' ? 'Diproses' : 
//                  order.status === 'completed' ? 'Selesai' : order.status}
//               </span>
//               <span className="ml-2 text-gray-500">Dibuat: {new Date(order.createdAt).toLocaleString()}</span>
//             </div>
//           </div>
          
//           {order.status === 'processed' && (
//             <button
//               onClick={handleCompleteOrder}
//               disabled={isProcessing}
//               className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md flex items-center"
//             >
//               {isProcessing ? (
//                 <>
//                   <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                     <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                     <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                   </svg>
//                   Memproses...
//                 </>
//               ) : 'Tandai Selesai'}
//             </button>
//           )}
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
//           <div>
//             <h2 className="text-lg font-semibold mb-2">Informasi Pelanggan</h2>
//             <div className="bg-gray-50 p-4 rounded-md">
//               <p className="mb-1"><span className="font-medium">Nama:</span> {order.userId?.name || "-"}</p>
//               <p className="mb-1"><span className="font-medium">Email:</span> {order.userId?.email || "-"}</p>
//               <p className="mb-1"><span className="font-medium">Telepon:</span> {order.userId?.phone || "-"}</p>
//             </div>
//           </div>
          
//           <div>
//             <h2 className="text-lg font-semibold mb-2">Alamat Pengiriman</h2>
//             <div className="bg-gray-50 p-4 rounded-md">
//               <p className="whitespace-pre-line">{extractStreetName(order.delivery_address)}</p>
//             </div>
//           </div>
//         </div>

//         <h2 className="text-lg font-semibold mb-3">Persetujuan Pesanan</h2>
//         <div className="overflow-x-auto">
//           <table className="min-w-full divide-y divide-gray-200">
//             <thead className="bg-gray-50">
//               <tr>
//                 <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Produk</th>
//                 <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Qty Diminta</th>
//                 <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Qty Disetujui</th>
//               </tr>
//             </thead>
//             <tbody className="bg-white divide-y divide-gray-200">
//               {order.items?.map((item, idx) => {
//                 const approvalItem = approvalData.find(a => a.productId === item.product_details._id);
//                 const approvedQty = approvalItem?.qtyApproved || 0;
                
//                 return (
//                   <tr key={idx}>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <div className="flex items-center">
//                         <div className="flex-shrink-0 h-10 w-10">
//                           <img 
//                             className="h-10 w-10 rounded-md object-cover" 
//                             src={item.product_details?.image?.[0] || "/no-image.png"} 
//                             alt={item.product_details?.name} 
//                           />
//                         </div>
//                         <div className="ml-4">
//                           <div className="text-sm font-medium text-gray-900">{item.product_details?.name}</div>
//                           <div className="text-sm text-gray-500">{item.product_details?.category || '-'}</div>
//                         </div>
//                       </div>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                       {item.quantity}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <input
//                         type="number"
//                         min="0"
//                         max={item.quantity}
//                         value={approvedQty}
//                         onChange={(e) => handleQtyApprovedChange(item.product_details._id, e.target.value)}
//                         className="w-20 border rounded px-2 py-1 text-center focus:ring-blue-500 focus:border-blue-500"
//                         disabled={order.status !== 'pending'}
//                       />
//                     </td>
//                   </tr>
//                 );
//               })}
//             </tbody>
//           </table>
//         </div>

//         {order.status === 'pending' && (
//           <div className="mt-6 flex justify-end">
//             <button
//               onClick={handleSubmitApproval}
//               disabled={isProcessing || approvedProducts.length === 0}
//               className={`px-6 py-2 rounded-md text-white font-medium ${
//                 isProcessing || approvedProducts.length === 0 
//                   ? 'bg-gray-400 cursor-not-allowed' 
//                   : 'bg-blue-600 hover:bg-blue-700'
//               }`}
//             >
//               {isProcessing ? (
//                 <>
//                   <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                     <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                     <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                   </svg>
//                   Memproses...
//                 </>
//               ) : 'Simpan Persetujuan'}
//             </button>
//           </div>
//         )}
//       </div>

//       {/* Surat Jalan */}
//       {(approvedProducts.length > 0 || deliveryNote) && (
//         <div className="bg-white rounded-lg shadow-md p-6">
//           <div className="flex justify-between items-center mb-4">
//             <h2 className="text-xl font-bold text-gray-800">Surat Jalan</h2>
//             <button
//               onClick={() => window.print()}
//               className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md flex items-center"
//             >
//               <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
//                 <path fillRule="evenodd" d="M5 4v3H4a2 2 0 00-2 2v3a2 2 0 002 2h1v2a2 2 0 002 2h6a2 2 0 002-2v-2h1a2 2 0 002-2V9a2 2 0 00-2-2h-1V4a2 2 0 00-2-2H7a2 2 0 00-2 2zm8 0H7v3h6V4zm0 8H7v4h6v-4z" clipRule="evenodd" />
//               </svg>
//               Cetak Surat Jalan
//             </button>
//           </div>

//           <div className="border border-gray-200 rounded-md p-4">
//             <div className="flex justify-between mb-6">
//               <div>
//                 <h3 className="text-lg font-semibold">PT. Contoh Perusahaan</h3>
//                 <p className="text-gray-600">Jl. Contoh No. 123, Jakarta</p>
//                 <p className="text-gray-600">Telp: (021) 12345678</p>
//               </div>
//               <div className="text-right">
//                 <p className="font-medium">No. Surat Jalan: {deliveryNote?.noteNumber || `SJ-${order.orderId}`}</p>
//                 <p className="text-gray-600">Tanggal: {deliveryNote?.createdAt ? new Date(deliveryNote.createdAt).toLocaleDateString() : new Date().toLocaleDateString()}</p>
//               </div>
//             </div>

//             <div className="grid grid-cols-2 gap-4 mb-6">
//               <div>
//                 <p className="font-medium">Kepada:</p>
//                 <p className="text-gray-800">{order.userId?.name || "-"}</p>
//                 <p className="text-gray-600">{extractStreetName(order.delivery_address)}</p>
//               </div>
//               <div>
//                 <p className="font-medium">No. Pesanan:</p>
//                 <p className="text-gray-800">{order.orderId}</p>
//               </div>
//             </div>

//             <table className="min-w-full divide-y divide-gray-200">
//               <thead className="bg-gray-50">
//                 <tr>
//                   <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">No</th>
//                   <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nama Barang</th>
//                   <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Jumlah</th>
//                   <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Keterangan</th>
//                 </tr>
//               </thead>
//               <tbody className="bg-white divide-y divide-gray-200">
//                 {(deliveryNote?.items || approvedProducts).map((item, idx) => (
//                   <tr key={idx}>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{idx + 1}</td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.productName}</td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.qtyApproved || item.quantity}</td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">-</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>

//             <div className="mt-8 flex justify-between">
//               <div className="text-center">
//                 <p className="mb-12">Penerima,</p>
//                 <p className="border-t border-gray-400 pt-2 w-40 mx-auto">(___________________)</p>
//               </div>
//               <div className="text-center">
//                 <p className="mb-12">Hormat Kami,</p>
//                 <p className="border-t border-gray-400 pt-2 w-40 mx-auto">(___________________)</p>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AdminOrderDetailPage;

// import React, { useEffect, useState, useMemo } from "react";
// import axios from "../utils/Axios";
// import AxiosToastError from "../utils/AxiosToastError";
// import { useParams, useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";

// const AdminOrderDetailPage = () => {
//   const { orderId } = useParams();
//   const navigate = useNavigate();

//   const [order, setOrder] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [approvalData, setApprovalData] = useState([]);
//   const [isProcessing, setIsProcessing] = useState(false);
//   const [deliveryNote, setDeliveryNote] = useState(null);

//   const extractStreetName = (address) => {
//     if (!address) return "-";
//     const cleanedAddress = address.replace(/^\d+\|/, "");
//     return cleanedAddress.split(",")[0] || cleanedAddress;
//   };

//   const fetchOrderDetail = async () => {
//     setLoading(true);
//     try {
//       const res = await axios.get(`/api/order/${orderId}`);
//       const orderData = res.data.data;
//       setOrder(orderData);

//       const initialApproval = orderData.items.map((item) => ({
//         productId: item.product_details._id,
//         productName: item.product_details.name,
//         qtyOrdered: item.quantity,
//         qtyApproved: item.qtyApproved || 0,
//       }));

//       setApprovalData(initialApproval);

//       if (orderData.deliveryNote) {
//         setDeliveryNote(orderData.deliveryNote);
//       }
//     } catch (error) {
//       AxiosToastError(error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchOrderDetail();
//   }, [orderId]);

//   const handleQtyApprovedChange = (productId, value) => {
//     setApprovalData((prev) =>
//       prev.map((item) =>
//         item.productId === productId
//           ? {
//               ...item,
//               qtyApproved: Math.max(
//                 0,
//                 Math.min(parseInt(value) || 0, item.qtyOrdered)
//               ),
//             }
//           : item
//       )
//     );
//   };

//   const handleSubmitApproval = async () => {
//     setIsProcessing(true);
//     try {
//       const payload = {
//         products: approvalData.map(({ productId, qtyApproved }) => ({
//           productId,
//           qtyApproved,
//         })),
//       };

//       const res = await axios.post(`/api/order/${orderId}/approve`, payload);
//       toast.success("Persetujuan berhasil disimpan");
//       setOrder(res.data.data);
//       if (res.data.data.deliveryNote) {
//         setDeliveryNote(res.data.data.deliveryNote);
//       }
//     } catch (error) {
//       AxiosToastError(error);
//     } finally {
//       setIsProcessing(false);
//     }
//   };

//   const handleCompleteOrder = async () => {
//     if (!window.confirm("Apakah Anda yakin ingin menyelesaikan pesanan ini?")) return;
//     setIsProcessing(true);
//     try {
//       const res = await axios.post(`/api/order/${orderId}/complete`);
//       toast.success("Pesanan telah diselesaikan");
//       setOrder(res.data.data);
//     } catch (error) {
//       AxiosToastError(error);
//     } finally {
//       setIsProcessing(false);
//     }
//   };

//   const approvedProducts = approvalData.filter((item) => item.qtyApproved > 0);

//   const approvalMap = useMemo(() => {
//     const map = {};
//     approvalData.forEach((item) => {
//       map[item.productId] = item.qtyApproved;
//     });
//     return map;
//   }, [approvalData]);

//   if (loading) return <div className="p-6">Memuat detail pesanan...</div>;
//   if (!order) return <div className="p-6">Pesanan tidak ditemukan.</div>;

//   return (
//     <div className="p-6 max-w-6xl mx-auto">
//       {/* Tombol kembali */}
//       <button onClick={() => navigate(-1)} className="mb-4 text-blue-600 hover:underline flex items-center">
//         ← Kembali ke Daftar Pesanan
//       </button>

//       {/* Informasi utama pesanan */}
//       <div className="bg-white rounded-lg shadow-md p-6 mb-6">
//         <div className="flex justify-between items-start mb-4">
//           <div>
//             <h1 className="text-2xl font-bold text-gray-800">Detail Pesanan #{order.orderId}</h1>
//             <div className="flex items-center mt-2">
//               <span className={`px-3 py-1 rounded-full text-sm font-medium ${
//                 order.status === 'Diajukan' ? 'bg-yellow-100 text-yellow-800' :
//                 order.status === 'Diproses' ? 'bg-blue-100 text-blue-800' :
//                 order.status === 'Selesai' ? 'bg-green-100 text-green-800' :
//                 'bg-gray-100 text-gray-800'
//               }`}>
//                 {order.status === 'Diajukan' ? 'Menunggu' : 
//                  order.status === 'Diproses' ? 'Diproses' : 
//                  order.status === 'Selesai' ? 'Selesai' : order.status}
//               </span>
//               <span className="ml-2 text-gray-500">Dibuat: {new Date(order.createdAt).toLocaleString()}</span>
//             </div>
//           </div>

//           {order.status === 'Diproses' && (
//             <button
//               onClick={handleCompleteOrder}
//               disabled={isProcessing}
//               className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md"
//             >
//               {isProcessing ? "Memproses..." : "Tandai Selesai"}
//             </button>
//           )}
//         </div>

//         {/* Info pelanggan dan alamat */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
//           <div>
//             <h2 className="text-lg font-semibold mb-2">Informasi Pelanggan</h2>
//             <div className="bg-gray-50 p-4 rounded-md">
//               <p><strong>Nama:</strong> {order.userId?.name || "-"}</p>
//               <p><strong>Email:</strong> {order.userId?.email || "-"}</p>
//               <p><strong>Telepon:</strong> {order.userId?.phone || "-"}</p>
//             </div>
//           </div>
//           <div>
//             <h2 className="text-lg font-semibold mb-2">Alamat Pengiriman</h2>
//             <div className="bg-gray-50 p-4 rounded-md">
//               {extractStreetName(order.delivery_address)}
//             </div>
//           </div>
//         </div>

//         {/* Tabel produk */}
//         <h2 className="text-lg font-semibold mb-3">Persetujuan Pesanan</h2>
//         <div className="overflow-x-auto">
//           <table className="min-w-full divide-y divide-gray-200">
//             <thead className="bg-gray-50">
//               <tr>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Produk</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Qty Diminta</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Qty Disetujui</th>
//               </tr>
//             </thead>
//             <tbody className="bg-white divide-y divide-gray-200">
//               {order.items.map((item) => (
//                 <tr key={item.product_details._id}>
//                   <td className="px-6 py-4">
//                     <div className="flex items-center">
//                       <img src={item.product_details.image?.[0] || "/no-image.png"} alt="" className="w-10 h-10 rounded object-cover mr-4" />
//                       <div>
//                         <div className="text-sm font-medium">{item.product_details.name}</div>
//                         <div className="text-sm text-gray-500">{item.product_details.category}</div>
//                       </div>
//                     </div>
//                   </td>
//                   <td className="px-6 py-4 text-sm text-gray-500">{item.quantity}</td>
//                   <td className="px-6 py-4">
//                     <input
//                       type="number"
//                       className="w-20 border rounded px-2 py-1 text-center"
//                       value={approvalMap[item.product_details._id] || 0}
//                       disabled={order.status !== "Diajukan"}
//                       min="0"
//                       max={item.quantity}
//                       onChange={(e) =>
//                         handleQtyApprovedChange(item.product_details._id, e.target.value)
//                       }
//                     />
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>

//         {/* Tombol submit approval */}
//         {order.status === "Diajukan" && (
//           <div className="mt-6 flex justify-end">
//             <button
//               onClick={handleSubmitApproval}
//               disabled={isProcessing || approvedProducts.length === 0}
//               className={`px-6 py-2 rounded-md text-white font-medium ${
//                 isProcessing || approvedProducts.length === 0
//                   ? "bg-gray-400 cursor-not-allowed"
//                   : "bg-blue-600 hover:bg-blue-700"
//               }`}
//             >
//               {isProcessing ? "Memproses..." : "Simpan Persetujuan"}
//             </button>
//           </div>
//         )}
//       </div>

//       {/* Surat Jalan */}
//       {(approvedProducts.length > 0 || deliveryNote) && (
//         <div className="bg-white rounded-lg shadow-md p-6">
//           <div className="flex justify-between items-center mb-4">
//             <h2 className="text-xl font-bold text-gray-800">Surat Jalan</h2>
//             <button onClick={() => window.print()} className="bg-green-600 text-white px-4 py-2 rounded-md">Cetak</button>
//           </div>

//           <div className="border p-4 rounded">
//             {/* Info pengirim dan penerima */}
//             <div className="flex justify-between mb-6">
//               <div>
//                 <p className="font-medium">PT. Contoh Perusahaan</p>
//                 <p className="text-sm text-gray-600">Jl. Contoh No. 123, Jakarta</p>
//               </div>
//               <div className="text-right">
//                 <p>No: {deliveryNote?.noteNumber || `SJ-${order.orderId}`}</p>
//                 <p>Tanggal: {new Date().toLocaleDateString()}</p>
//               </div>
//             </div>

//             {/* Tabel surat jalan */}
//             <table className="min-w-full divide-y divide-gray-200 mb-6">
//               <thead className="bg-gray-50">
//                 <tr>
//                   <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">No</th>
//                   <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Barang</th>
//                   <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Jumlah</th>
//                   <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Keterangan</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {(deliveryNote?.items || approvedProducts).map((item, idx) => (
//                   <tr key={idx}>
//                     <td className="px-4 py-2 text-sm text-gray-500">{idx + 1}</td>
//                     <td className="px-4 py-2 text-sm">{item.productName}</td>
//                     <td className="px-4 py-2 text-sm">{item.qtyApproved || item.quantity}</td>
//                     <td className="px-4 py-2 text-sm">-</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>

//             <div className="flex justify-between mt-8">
//               <div className="text-center">
//                 <p className="mb-12">Penerima</p>
//                 <p className="border-t border-gray-400 w-40 mx-auto pt-2">(_________________)</p>
//               </div>
//               <div className="text-center">
//                 <p className="mb-12">Hormat Kami</p>
//                 <p className="border-t border-gray-400 w-40 mx-auto pt-2">(_________________)</p>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AdminOrderDetailPage;


// import React, { useEffect, useState } from "react";
// import axios from "../utils/Axios";
// import AxiosToastError from "../utils/AxiosToastError";
// import { useParams, useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";

// const AdminOrderDetailPage = () => {
//   const { orderId } = useParams();
//   const navigate = useNavigate();

//   const [order, setOrder] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [approvalData, setApprovalData] = useState([]);
//   const [isProcessing, setIsProcessing] = useState(false);
//   const [deliveryNote, setDeliveryNote] = useState(null);

//   const extractStreetName = (address) => {
//     if (!address) return "-";
//     const cleanedAddress = address.replace(/^\d+\|/, "");
//     return cleanedAddress.split(",")[0] || cleanedAddress;
//   };

//   const fetchOrderDetail = async () => {
//     setLoading(true);
//     try {
//       const res = await axios.get(`/api/order/${orderId}`);
//       const orderData = res.data.data;
//       setOrder(orderData);

//       const initialApproval = orderData.items.map((item) => ({
//         productId: item.product_details._id,
//         productName: item.product_details.name,
//         qtyOrdered: item.quantity,
//         qtyApproved: item.qtyApproved || 0,
//       }));

//       setApprovalData(initialApproval);

//       if (orderData.deliveryNote) {
//         setDeliveryNote(orderData.deliveryNote);
//       }
//     } catch (error) {
//       AxiosToastError(error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchOrderDetail();
//   }, [orderId]);

//   const handleQtyApprovedChange = (productId, value) => {
//     const parsedValue = Math.max(
//       0,
//       Math.min(
//         parseInt(value) || 0,
//         approvalData.find((i) => i.productId === productId)?.qtyOrdered || 0
//       )
//     );
//     setApprovalData((prev) =>
//       prev.map((item) =>
//         item.productId === productId
//           ? {
//               ...item,
//               qtyApproved: parsedValue,
//             }
//           : item
//       )
//     );
//   };

//   const handleSubmitApproval = async () => {
//     setIsProcessing(true);
//     try {
//       const payload = {
//         products: approvalData.map(({ productId, qtyApproved }) => ({
//           productId,
//           qtyApproved,
//         })),
//       };

//       const res = await axios.post(`/api/order/${orderId}/approve`, payload);
//       toast.success("Persetujuan berhasil disimpan");
//       setOrder(res.data.data);
//       if (res.data.data.deliveryNote) {
//         setDeliveryNote(res.data.data.deliveryNote);
//       }
//     } catch (error) {
//       AxiosToastError(error);
//     } finally {
//       setIsProcessing(false);
//     }
//   };

//   const handleCompleteOrder = async () => {
//     if (!window.confirm("Apakah Anda yakin ingin menyelesaikan pesanan ini?")) return;
//     setIsProcessing(true);
//     try {
//       const res = await axios.post(`/api/order/${orderId}/complete`);
//       toast.success("Pesanan telah diselesaikan");
//       setOrder(res.data.data);
//     } catch (error) {
//       AxiosToastError(error);
//     } finally {
//       setIsProcessing(false);
//     }
//   };

//   const approvedProducts = approvalData.filter((item) => item.qtyApproved > 0);

//   if (loading) return <div className="p-6">Memuat detail pesanan...</div>;
//   if (!order) return <div className="p-6">Pesanan tidak ditemukan.</div>;

//   return (
//     <div className="p-6 max-w-6xl mx-auto">
//       {/* Tombol kembali */}
//       <button
//         onClick={() => navigate(-1)}
//         className="mb-4 text-blue-600 hover:underline flex items-center"
//       >
//         ← Kembali ke Daftar Pesanan
//       </button>

//       {/* Informasi utama pesanan */}
//       <div className="bg-white rounded-lg shadow-md p-6 mb-6">
//         <div className="flex justify-between items-start mb-4">
//           <div>
//             <h1 className="text-2xl font-bold text-gray-800">
//               Detail Pesanan #{order.orderId}
//             </h1>
//             <div className="flex items-center mt-2">
//               <span
//                 className={`px-3 py-1 rounded-full text-sm font-medium ${
//                   order.status === "Diajukan"
//                     ? "bg-yellow-100 text-yellow-800"
//                     : order.status === "processed"
//                     ? "bg-blue-100 text-blue-800"
//                     : order.status === "completed"
//                     ? "bg-green-100 text-green-800"
//                     : "bg-gray-100 text-gray-800"
//                 }`}
//               >
//                 {order.status === "Diajukan"
//                   ? "Menunggu"
//                   : order.status === "processed"
//                   ? "Diproses"
//                   : order.status === "completed"
//                   ? "Selesai"
//                   : order.status}
//               </span>
//               <span className="ml-2 text-gray-500">
//                 Dibuat: {new Date(order.createdAt).toLocaleString()}
//               </span>
//             </div>
//           </div>

//           {order.status === "processed" && (
//             <button
//               onClick={handleCompleteOrder}
//               disabled={isProcessing}
//               className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md"
//             >
//               {isProcessing ? "Memproses..." : "Tandai Selesai"}
//             </button>
//           )}
//         </div>

//         {/* Info pelanggan dan alamat */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
//           <div>
//             <h2 className="text-lg font-semibold mb-2">Informasi Pelanggan</h2>
//             <div className="bg-gray-50 p-4 rounded-md">
//               <p>
//                 <strong>Nama:</strong> {order.userId?.name || "-"}
//               </p>
//               <p>
//                 <strong>Email:</strong> {order.userId?.email || "-"}
//               </p>
//               <p>
//                 <strong>Telepon:</strong> {order.userId?.phone || "-"}
//               </p>
//             </div>
//           </div>
//           <div>
//             <h2 className="text-lg font-semibold mb-2">Alamat Pengiriman</h2>
//             <div className="bg-gray-50 p-4 rounded-md">
//               {extractStreetName(order.delivery_address)}
//             </div>
//           </div>
//         </div>

//         {/* Tabel produk */}
//         <h2 className="text-lg font-semibold mb-3">Persetujuan Pesanan</h2>
//         <div className="overflow-x-auto">
//           <table className="min-w-full divide-y divide-gray-200">
//             <thead className="bg-gray-50">
//               <tr>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">
//                   Produk
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">
//                   Qty Diminta
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">
//                   Qty Disetujui
//                 </th>
//               </tr>
//             </thead>
//             <tbody className="bg-white divide-y divide-gray-200">
//               {order.items.map((item) => {
//                 const approvalItem =
//                   approvalData.find(
//                     (ad) => ad.productId === item.product_details._id
//                   ) || {};
//                 return (
//                   <tr key={item.product_details._id}>
//                     <td className="px-6 py-4">
//                       <div className="flex items-center">
//                         <img
//                           src={
//                             item.product_details.image?.[0] || "/no-image.png"
//                           }
//                           alt=""
//                           className="w-10 h-10 rounded object-cover mr-4"
//                         />
//                         <div>
//                           <div className="text-sm font-medium">
//                             {item.product_details.name}
//                           </div>
//                           <div className="text-sm text-gray-500">
//                             {item.product_details.category}
//                           </div>
//                         </div>
//                       </div>
//                     </td>
//                     <td className="px-6 py-4 text-sm text-gray-500">
//                       {item.quantity}
//                     </td>
//                     <td className="px-6 py-4">
//                       <input
//                         type="number"
//                         className="w-20 border rounded px-2 py-1 text-center"
//                         value={approvalItem.qtyApproved || 0}
//                         disabled={order.status !== "Diajukan"}
//                         min="0"
//                         max={item.quantity}
//                         onChange={(e) =>
//                           handleQtyApprovedChange(
//                             item.product_details._id,
//                             e.target.value
//                           )
//                         }
//                       />
//                     </td>
//                   </tr>
//                 );
//               })}
//             </tbody>
//           </table>
//         </div>

//         {/* Tombol submit approval */}
//         {order.status === "Diajukan" && (
//           <div className="mt-6 flex justify-end">
//             <button
//               onClick={handleSubmitApproval}
//               disabled={isProcessing || approvedProducts.length === 0}
//               className={`px-6 py-2 rounded-md text-white font-medium ${
//                 isProcessing || approvedProducts.length === 0
//                   ? "bg-gray-400 cursor-not-allowed"
//                   : "bg-blue-600 hover:bg-blue-700"
//               }`}
//             >
//               {isProcessing ? "Memproses..." : "Simpan Persetujuan"}
//             </button>
//           </div>
//         )}
//       </div>

//       {/* Surat Jalan */}
//       {(approvedProducts.length > 0 || deliveryNote) && (
//         <div className="bg-white rounded-lg shadow-md p-6">
//           <div className="flex justify-between items-center mb-4">
//             <h2 className="text-xl font-bold text-gray-800">Surat Jalan</h2>
//             <button
//               onClick={() => window.print()}
//               className="bg-green-600 text-white px-4 py-2 rounded-md"
//             >
//               Cetak
//             </button>
//           </div>

//           <div className="border p-4 rounded">
//             {/* Info pengirim dan penerima */}
//             <div className="flex justify-between mb-6">
//               <div>
//                 <p className="font-medium">PT. Contoh Perusahaan</p>
//                 <p className="text-sm text-gray-600">
//                   Jl. Contoh No. 123, Jakarta
//                 </p>
//               </div>
//               <div className="text-right">
//                 <p>No: {deliveryNote?.noteNumber || `SJ-${order.orderId}`}</p>
//                 <p>Tanggal: {new Date().toLocaleDateString()}</p>
//               </div>
//             </div>

//             {/* Tabel surat jalan */}
//             <table className="min-w-full divide-y divide-gray-200 mb-6">
//               <thead className="bg-gray-50">
//                 <tr>
//                   <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">
//                     No
//                   </th>
//                   <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">
//                     Barang
//                   </th>
//                   <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">
//                     Jumlah
//                   </th>
//                   <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">
//                     Keterangan
//                   </th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {(deliveryNote?.items || approvedProducts).map((item, idx) => (
//                   <tr key={idx}>
//                     <td className="px-4 py-2 text-sm text-gray-500">{idx + 1}</td>
//                     <td className="px-4 py-2 text-sm">{item.productName}</td>
//                     <td className="px-4 py-2 text-sm">
//                       {item.qtyApproved || item.quantity}
//                     </td>
//                     <td className="px-4 py-2 text-sm">-</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>

//             <div className="flex justify-between mt-8">
//               <div className="text-center">
//                 <p className="mb-12">Penerima</p>
//                 <p className="border-t border-gray-400 w-40 mx-auto pt-2">
//                   (_________________)
//                 </p>
//               </div>
//               <div className="text-center">
//                 <p className="mb-12">Hormat Kami</p>
//                 <p className="border-t border-gray-400 w-40 mx-auto pt-2">
//                   (_________________)
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AdminOrderDetailPage;


// import React, { useEffect, useState } from "react";
// import axios from "../utils/Axios";
// import AxiosToastError from "../utils/AxiosToastError";
// import { useParams, useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";

// const AdminOrderDetailPage = () => {
//   const { orderId } = useParams();
//   const navigate = useNavigate();

//   const [order, setOrder] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [approvalData, setApprovalData] = useState([]);
//   const [isProcessing, setIsProcessing] = useState(false);
//   const [deliveryNote, setDeliveryNote] = useState(null);

//   // Mengambil nama jalan dari alamat, hilangkan angka awal dan ambil sebelum koma pertama
//   const extractStreetName = (address) => {
//     if (!address) return "-";
//     const cleanedAddress = address.replace(/^\d+\|/, "");
//     return cleanedAddress.split(",")[0] || cleanedAddress;
//   };

//   // Fetch detail order dari API
//   const fetchOrderDetail = async () => {
//     setLoading(true);
//     try {
//       const res = await axios.get(`/api/order/${orderId}`);
//       const orderData = res.data.data;
//       setOrder(orderData);

//       // Inisialisasi approval data berdasar item order
//       const initialApproval = orderData.items.map((item) => ({
//         productId: item.product_details._id,
//         productName: item.product_details.name,
//         qtyOrdered: item.quantity,
//         qtyApproved: item.qtyApproved || 0,
//       }));
//       setApprovalData(initialApproval);

//       if (orderData.deliveryNote) {
//         setDeliveryNote(orderData.deliveryNote);
//       }
//     } catch (error) {
//       AxiosToastError(error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchOrderDetail();
//   }, [orderId]);

//   // Update jumlah qty yang disetujui, batasi antara 0 sampai qty yang dipesan
//   const handleQtyApprovedChange = (productId, value) => {
//     let parsed = parseInt(value);
//     if (isNaN(parsed)) parsed = 0;

//     const maxQty =
//       approvalData.find((i) => i.productId === productId)?.qtyOrdered || 0;
//     const safeQty = Math.min(Math.max(0, parsed), maxQty);

//     setApprovalData((prev) =>
//       prev.map((item) =>
//         item.productId === productId ? { ...item, qtyApproved: safeQty } : item
//       )
//     );
//   };

//   // Kirim data persetujuan ke backend
//   const handleSubmitApproval = async () => {
//     setIsProcessing(true);
//     try {
//       const payload = {
//         products: approvalData.map(({ productId, qtyApproved }) => ({
//           productId,
//           qtyApproved,
//         })),
//       };

//       const res = await axios.post(`/api/order/${orderId}/approve`, payload);
//       toast.success("Persetujuan berhasil disimpan");
//       setOrder(res.data.data);
//       if (res.data.data.deliveryNote) {
//         setDeliveryNote(res.data.data.deliveryNote);
//       }
//     } catch (error) {
//       AxiosToastError(error);
//     } finally {
//       setIsProcessing(false);
//     }
//   };

//   // Tandai pesanan selesai
//   const handleCompleteOrder = async () => {
//     if (!window.confirm("Apakah Anda yakin ingin menyelesaikan pesanan ini?"))
//       return;

//     setIsProcessing(true);
//     try {
//       const res = await axios.post(`/api/order/${orderId}/complete`);
//       toast.success("Pesanan telah diselesaikan");
//       setOrder(res.data.data);
//     } catch (error) {
//       AxiosToastError(error);
//     } finally {
//       setIsProcessing(false);
//     }
//   };

//   const approvedProducts = approvalData.filter((item) => item.qtyApproved > 0);

//   if (loading) return <div className="p-6">Memuat detail pesanan...</div>;
//   if (!order) return <div className="p-6">Pesanan tidak ditemukan.</div>;

//   return (
//     <div className="p-6 max-w-6xl mx-auto">
//       {/* Tombol kembali */}
//       <button
//         onClick={() => navigate(-1)}
//         className="mb-4 text-blue-600 hover:underline flex items-center"
//       >
//         ← Kembali ke Daftar Pesanan
//       </button>

//       {/* Informasi utama pesanan */}
//       <div className="bg-white rounded-lg shadow-md p-6 mb-6">
//         <div className="flex justify-between items-start mb-4">
//           <div>
//             <h1 className="text-2xl font-bold text-gray-800">
//               Detail Pesanan #{order.orderId}
//             </h1>
//             <div className="flex items-center mt-2">
//               <span
//                 className={`px-3 py-1 rounded-full text-sm font-medium ${
//                   order.status === "Diajukan"
//                     ? "bg-yellow-100 text-yellow-800"
//                     : order.status === "processed"
//                     ? "bg-blue-100 text-blue-800"
//                     : order.status === "completed"
//                     ? "bg-green-100 text-green-800"
//                     : "bg-gray-100 text-gray-800"
//                 }`}
//               >
//                 {order.status === "Diajukan"
//                   ? "Menunggu"
//                   : order.status === "processed"
//                   ? "Diproses"
//                   : order.status === "completed"
//                   ? "Selesai"
//                   : order.status}
//               </span>
//               <span className="ml-2 text-gray-500">
//                 Dibuat: {new Date(order.createdAt).toLocaleString()}
//               </span>
//             </div>
//           </div>

//           {order.status === "processed" && (
//             <button
//               onClick={handleCompleteOrder}
//               disabled={isProcessing}
//               className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md"
//             >
//               {isProcessing ? "Memproses..." : "Tandai Selesai"}
//             </button>
//           )}
//         </div>

//         {/* Info pelanggan dan alamat */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
//           <div>
//             <h2 className="text-lg font-semibold mb-2">Informasi Pelanggan</h2>
//             <div className="bg-gray-50 p-4 rounded-md">
//               <p>
//                 <strong>Nama:</strong> {order.userId?.name || "-"}
//               </p>
//               <p>
//                 <strong>Email:</strong> {order.userId?.email || "-"}
//               </p>
//               <p>
//                 <strong>Telepon:</strong> {order.userId?.phone || "-"}
//               </p>
//             </div>
//           </div>
//           <div>
//             <h2 className="text-lg font-semibold mb-2">Alamat Pengiriman</h2>
//             <div className="bg-gray-50 p-4 rounded-md">
//               {extractStreetName(order.delivery_address)}
//             </div>
//           </div>
//         </div>

//         {/* Tabel produk dan persetujuan */}
//         <h2 className="text-lg font-semibold mb-3">Persetujuan Pesanan</h2>
//         <div className="overflow-x-auto">
//           <table className="min-w-full divide-y divide-gray-200">
//             <thead className="bg-gray-50">
//               <tr>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">
//                   Produk
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">
//                   Qty Diminta
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">
//                   Qty Disetujui
//                 </th>
//               </tr>
//             </thead>
//             <tbody className="bg-white divide-y divide-gray-200">
//               {order.items.map((item) => {
//                 const approvalItem =
//                   approvalData.find(
//                     (ad) => ad.productId === item.product_details._id
//                   ) || {};
//                 return (
//                   <tr key={item.product_details._id}>
//                     <td className="px-6 py-4">
//                       <div className="flex items-center">
//                         <img
//                           src={
//                             item.product_details.image?.[0] || "/no-image.png"
//                           }
//                           alt={item.product_details.name}
//                           className="w-10 h-10 rounded object-cover mr-4"
//                         />
//                         <div>
//                           <div className="text-sm font-medium">
//                             {item.product_details.name}
//                           </div>
//                           <div className="text-sm text-gray-500">
//                             {item.product_details.category}
//                           </div>
//                         </div>
//                       </div>
//                     </td>
//                     <td className="px-6 py-4 text-sm text-gray-500">
//                       {item.quantity}
//                     </td>
//                     <td className="px-6 py-4">
//                       <input
//                         type="number"
//                         className="w-20 border rounded px-2 py-1 text-center"
//                         value={approvalItem.qtyApproved ?? 0}
//                         disabled={order.status !== "Diajukan"}
//                         min="0"
//                         max={item.quantity}
//                         onChange={(e) =>
//                           handleQtyApprovedChange(
//                             item.product_details._id,
//                             e.target.value
//                           )
//                         }
//                       />
//                     </td>
//                   </tr>
//                 );
//               })}
//             </tbody>
//           </table>
//         </div>

//         {/* Tombol simpan persetujuan */}
//         {order.status === "Diajukan" && (
//           <div className="mt-6">
//             <button
//               onClick={handleSubmitApproval}
//               disabled={isProcessing}
//               className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md"
//             >
//               {isProcessing ? "Menyimpan..." : "Simpan Persetujuan"}
//             </button>
//           </div>
//         )}

//         {/* Catatan Pengiriman jika ada */}
//         {deliveryNote && (
//           <div className="mt-8 bg-gray-100 p-4 rounded-md">
//             <h3 className="font-semibold mb-2">Catatan Pengiriman</h3>
//             <p>{deliveryNote}</p>
//           </div>
//         )}

//         {/* Ringkasan produk yang disetujui (read-only) jika pesanan sudah diproses atau selesai */}
//         {(order.status === "processed" || order.status === "completed") && (
//           <div className="mt-8">
//             <h3 className="text-lg font-semibold mb-2">
//               Ringkasan Produk Disetujui
//             </h3>
//             {approvedProducts.length === 0 ? (
//               <p>Belum ada produk yang disetujui.</p>
//             ) : (
//               <ul className="list-disc list-inside">
//                 {approvedProducts.map((item) => (
//                   <li key={item.productId}>
//                     {item.productName}: {item.qtyApproved}
//                   </li>
//                 ))}
//               </ul>
//             )}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default AdminOrderDetailPage;


// import React, { useEffect, useState } from "react";
// import axios from "../utils/Axios";
// import AxiosToastError from "../utils/AxiosToastError";
// import { useParams, useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";

// const AdminOrderDetailPage = () => {
//   const { orderId } = useParams();
//   const navigate = useNavigate();

//   const [order, setOrder] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [approvalData, setApprovalData] = useState([]); 
//   const [isProcessing, setIsProcessing] = useState(false);
//   const [deliveryNote, setDeliveryNote] = useState(null);

//   // Ambil nama jalan dari alamat pengiriman untuk tampil ringkas
//   const extractStreetName = (address) => {
//     if (!address) return "-";
//     const cleanedAddress = address.replace(/^\d+\|/, "");
//     return cleanedAddress.split(",")[0] || cleanedAddress;
//   };

//   // Fungsi untuk fetch data order detail dari backend
//   const fetchOrderDetail = async () => {
//     setLoading(true);
//     try {
//       const res = await axios.get(`/api/order/${orderId}`);
//       const orderData = res.data.data;
//       setOrder(orderData);

//       // Siapkan approvalData dari item order, untuk kontrol qty disetujui
//       const initialApproval = orderData.items.map((item) => ({
//         productId: item.productId || item.product_details._id,
//         productName: item.product_details?.name || item.productName,
//         qtyOrdered: item.quantity,
//         approvedQuantity: item.approvedQuantity || 0,
//       }));
//       setApprovalData(initialApproval);

//       setDeliveryNote(orderData.deliveryNote || null);
//     } catch (error) {
//       AxiosToastError(error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Panggil fetch saat komponen mount atau orderId berubah
//   useEffect(() => {
//     if (orderId) fetchOrderDetail();
//   }, [orderId]);

//   // Handler perubahan input qty disetujui
//   const handleApprovedQuantityChange = (productId, value) => {
//     let parsed = parseInt(value);
//     if (isNaN(parsed)) parsed = 0;

//     // Batas qty disetujui harus antara 0 sampai qty yang diminta
//     const maxQty =
//       approvalData.find((item) => item.productId === productId)?.qtyOrdered || 0;
//     const safeQty = Math.min(Math.max(0, parsed), maxQty);

//     setApprovalData((prev) =>
//       prev.map((item) =>
//         item.productId === productId
//           ? { ...item, approvedQuantity: safeQty }
//           : item
//       )
//     );
//   };

//   // Submit approval ke backend
//   const handleSubmitApproval = async () => {
//     setIsProcessing(true);
//     try {
//       const payload = {
//         updates: approvalData.map(({ productId, approvedQuantity }) => ({
//           productId,
//           approvedQuantity,
//         })),
//       };

//       const res = await axios.put(`/api/order/${orderId}/update-approved-qty`, payload);
//       toast.success("Persetujuan berhasil disimpan");

//       // Update order dan approvalData state dari data backend terbaru
//       const updatedOrder = res.data.order || res.data.data || order;
//       setOrder(updatedOrder);

//       if (updatedOrder.items) {
//         const updatedApproval = updatedOrder.items.map((item) => ({
//           productId: item.productId || item.product_details?._id,
//           productName: item.product_details?.name || "",
//           qtyOrdered: item.quantity,
//           approvedQuantity: item.approvedQuantity || 0,
//         }));
//         setApprovalData(updatedApproval);
//       }

//       setDeliveryNote(updatedOrder.deliveryNote || null);
//     } catch (error) {
//       AxiosToastError(error);
//     } finally {
//       setIsProcessing(false);
//     }
//   };

//   // Tandai pesanan selesai (ubah status)
//   const handleCompleteOrder = async () => {
//     if (!window.confirm("Apakah Anda yakin ingin menyelesaikan pesanan ini?"))
//       return;

//     setIsProcessing(true);
//     try {
//       const res = await axios.post(`/api/order/${orderId}/complete`);
//       toast.success("Pesanan telah diselesaikan");

//       setOrder(res.data.data);
//     } catch (error) {
//       AxiosToastError(error);
//     } finally {
//       setIsProcessing(false);
//     }
//   };

//   // Filter produk yang sudah disetujui (> 0)
//   const approvedProducts = approvalData.filter((item) => item.approvedQuantity > 0);

//   if (loading) return <div className="p-6">Memuat detail pesanan...</div>;
//   if (!order) return <div className="p-6">Pesanan tidak ditemukan.</div>;

//   return (
//     <div className="p-6 max-w-6xl mx-auto">
//       <button
//         onClick={() => navigate(-1)}
//         className="mb-4 text-blue-600 hover:underline flex items-center"
//       >
//         ← Kembali ke Daftar Pesanan
//       </button>

//       <div className="bg-white rounded-lg shadow-md p-6 mb-6">
//         {/* Header dan status */}
//         <div className="flex justify-between items-start mb-4">
//           <div>
//             <h1 className="text-2xl font-bold text-gray-800">
//               Detail Pesanan #{order.orderId}
//             </h1>
//             <div className="flex items-center mt-2">
//               <span
//                 className={`px-3 py-1 rounded-full text-sm font-medium ${
//                   order.status === "Diajukan"
//                     ? "bg-yellow-100 text-yellow-800"
//                     : order.status === "Diproses"
//                     ? "bg-blue-100 text-blue-800"
//                     : order.status === "Selesai"
//                     ? "bg-green-100 text-green-800"
//                     : "bg-gray-100 text-gray-800"
//                 }`}
//               >
//                 {order.status === "Diajukan"
//                   ? "Menunggu"
//                   : order.status === "Diproses"
//                   ? "Diproses"
//                   : order.status === "Selesai"
//                   ? "Selesai"
//                   : order.status}
//               </span>
//               <span className="ml-2 text-gray-500">
//                 Dibuat: {new Date(order.createdAt).toLocaleString()}
//               </span>
//             </div>
//           </div>

//           {/* Tombol Tandai Selesai jika status Diproses */}
//           {order.status === "Diproses" && (
//             <button
//               onClick={handleCompleteOrder}
//               disabled={isProcessing}
//               className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md"
//             >
//               {isProcessing ? "Memproses..." : "Tandai Selesai"}
//             </button>
//           )}
//         </div>

//         {/* Informasi Pelanggan dan Alamat */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
//           <div>
//             <h2 className="text-lg font-semibold mb-2">Informasi Pelanggan</h2>
//             <div className="bg-gray-50 p-4 rounded-md">
//               <p><strong>Nama:</strong> {order.userId?.name || "-"}</p>
//               <p><strong>Email:</strong> {order.userId?.email || "-"}</p>
//               <p><strong>Telepon:</strong> {order.userId?.phone || "-"}</p>
//             </div>
//           </div>
//           <div>
//             <h2 className="text-lg font-semibold mb-2">Alamat Pengiriman</h2>
//             <div className="bg-gray-50 p-4 rounded-md">
//               {extractStreetName(order.delivery_address)}
//             </div>
//           </div>
//         </div>

//         {/* Table Persetujuan Pesanan */}
//         <h2 className="text-lg font-semibold mb-3">Persetujuan Pesanan</h2>
//         <div className="overflow-x-auto">
//           <table className="min-w-full divide-y divide-gray-200">
//             <thead className="bg-gray-50">
//               <tr>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Produk</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Qty Diminta</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Qty Disetujui</th>
//               </tr>
//             </thead>
//             <tbody className="bg-white divide-y divide-gray-200">
//               {order.items.map((item) => {
//                 const pid = item.productId || item.product_details._id;
//                 const approvalItem = approvalData.find((ad) => ad.productId === pid) || {};
//                 return (
//                   <tr key={pid}>
//                     <td className="px-6 py-4 flex items-center space-x-4">
//                       <img
//                         src={item.product_details.image?.[0] || "/no-image.png"}
//                         alt={item.product_details.name}
//                         className="w-10 h-10 rounded object-cover"
//                       />
//                       <div className="text-sm font-medium text-gray-900">
//                         {item.product_details?.name || item.productName}
//                       </div>
//                     </td>
//                     <td className="px-6 py-4">{item.quantity}</td>
//                     <td className="px-6 py-4">
//                       {order.status === "Diajukan" ? (
//                         <input
//                           type="number"
//                           min={0}
//                           max={item.quantity}
//                           value={approvalItem.approvedQuantity || 0}
//                           onChange={(e) =>
//                             handleApprovedQuantityChange(pid, e.target.value)
//                           }
//                           className="border border-gray-300 rounded px-2 py-1 w-20"
//                           disabled={isProcessing}
//                         />
//                       ) : (
//                         <span>{approvalItem.approvedQuantity || 0}</span>
//                       )}
//                     </td>
//                   </tr>
//                 );
//               })}
//             </tbody>
//           </table>
//         </div>

//         {/* Tombol Simpan Persetujuan */}
//         {order.status === "Diajukan" && (
//           <div className="mt-4">
//             <button
//               onClick={handleSubmitApproval}
//               disabled={isProcessing}
//               className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md"
//             >
//               {isProcessing ? "Menyimpan..." : "Simpan Persetujuan"}
//             </button>
//           </div>
//         )}

//         {/* Catatan Pengiriman jika ada */}
//         {deliveryNote && (
//           <div className="mt-6 bg-yellow-50 p-4 rounded border border-yellow-300">
//             <h3 className="font-semibold mb-2">Catatan Pengiriman</h3>
//             <p>{deliveryNote}</p>
//           </div>
//         )}

//         {/* Produk yang sudah disetujui (jika order status bukan 'Diajukan') */}
//         {order.status !== "Diajukan" && (
//           <div className="mt-6">
//             <h3 className="text-lg font-semibold mb-2">Produk Disetujui</h3>
//             {approvedProducts.length > 0 ? (
//               <ul className="list-disc list-inside">
//                 {approvedProducts.map((item) => (
//                   <li key={item.productId}>
//                     {item.productName} - {item.approvedQuantity}
//                   </li>
//                 ))}
//               </ul>
//             ) : (
//               <p>Belum ada produk yang disetujui.</p>
//             )}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default AdminOrderDetailPage;



// INI YANG BERHASIL CUMA NAMA DLL NYA BELOM
// import React, { useEffect, useState } from "react";
// import axios from "../utils/Axios";
// import AxiosToastError from "../utils/AxiosToastError";
// import { useParams, useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import { FileText } from "lucide-react"; // icon surat jalan

// const AdminOrderDetailPage = () => {
//   const { orderId } = useParams();
//   const navigate = useNavigate();

//   const [order, setOrder] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [approvalData, setApprovalData] = useState([]);
//   const [isProcessing, setIsProcessing] = useState(false);
//   const [deliveryNote, setDeliveryNote] = useState(null);

//   const extractStreetName = (address) => {
//     if (!address) return "-";
//     const cleanedAddress = address.replace(/^\d+\|/, "");
//     return cleanedAddress.split(",")[0] || cleanedAddress;
//   };

//   const fetchOrderDetail = async () => {
//     setLoading(true);
//     try {
//       const res = await axios.get(`/api/order/${orderId}`);
//       const orderData = res.data.data;
//       setOrder(orderData);

//       const initialApproval = orderData.items.map((item) => ({
//         productId: item.productId || item.product_details?._id,
//         productName: item.product_details?.name || item.productName || "-",
//         qtyOrdered: item.quantity,
//         approvedQuantity: item.approvedQuantity || 0,
//       }));
//       setApprovalData(initialApproval);
//       setDeliveryNote(orderData.deliveryNote || null);
//     } catch (error) {
//       AxiosToastError(error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (orderId) fetchOrderDetail();
//   }, [orderId]);

//   const handleApprovedQuantityChange = (productId, value) => {
//     let parsed = parseInt(value);
//     if (isNaN(parsed)) parsed = 0;
//     const maxQty =
//       approvalData.find((item) => item.productId === productId)?.qtyOrdered || 0;
//     const safeQty = Math.min(Math.max(0, parsed), maxQty);

//     setApprovalData((prev) =>
//       prev.map((item) =>
//         item.productId === productId
//           ? { ...item, approvedQuantity: safeQty }
//           : item
//       )
//     );
//   };

//   const handleSubmitApproval = async () => {
//     setIsProcessing(true);
//     try {
//       const payload = {
//         updates: approvalData.map(({ productId, approvedQuantity }) => ({
//           productId,
//           approvedQuantity,
//         })),
//       };

//       const res = await axios.put(`/api/order/${orderId}/update-approved-qty`, payload);
//       toast.success("Persetujuan berhasil disimpan");

//       const updatedOrder = res.data.order || res.data.data || order;
//       setOrder(updatedOrder);

//       const updatedApproval = updatedOrder.items.map((item) => ({
//         productId: item.productId || item.product_details?._id,
//         productName: item.product_details?.name || "-",
//         qtyOrdered: item.quantity,
//         approvedQuantity: item.approvedQuantity || 0,
//       }));
//       setApprovalData(updatedApproval);
//       setDeliveryNote(updatedOrder.deliveryNote || null);
//     } catch (error) {
//       AxiosToastError(error);
//     } finally {
//       setIsProcessing(false);
//     }
//   };

//   const handleCompleteOrder = async () => {
//     if (!window.confirm("Apakah Anda yakin ingin menyelesaikan pesanan ini?")) return;
//     setIsProcessing(true);
//     try {
//       const res = await axios.post(`/api/order/${orderId}/complete`);
//       toast.success("Pesanan telah diselesaikan");
//       setOrder(res.data.data);
//     } catch (error) {
//       AxiosToastError(error);
//     } finally {
//       setIsProcessing(false);
//     }
//   };

//   // **Tombol Surat Jalan diklik -> navigasi ke halaman surat jalan**
//   const handleSuratJalanClick = () => {
//     navigate(`/order/${orderId}/invoice-suratjalan`);
//   };

//   if (loading) return <div className="p-6">Memuat detail pesanan...</div>;
//   if (!order) return <div className="p-6">Pesanan tidak ditemukan.</div>;

//   return (
//     <div className="p-6 max-w-6xl mx-auto">
//       <button
//         onClick={() => navigate(-1)}
//         className="mb-4 text-blue-600 hover:underline flex items-center"
//       >
//         ← Kembali ke Daftar Pesanan
//       </button>

//       <div className="bg-white rounded-lg shadow-md p-6 mb-6">
//         {/* Header & Status */}
//         <div className="flex justify-between items-start mb-4">
//           <div>
//             <h1 className="text-2xl font-bold text-gray-800">
//               Detail Pesanan #{order.orderId}
//             </h1>
//             <div className="flex items-center mt-2 space-x-2">
//               <span
//                 className={`px-3 py-1 rounded-full text-sm font-medium ${
//                   order.status === "Diajukan"
//                     ? "bg-yellow-100 text-yellow-800"
//                     : order.status === "Diproses"
//                     ? "bg-blue-100 text-blue-800"
//                     : order.status === "Selesai"
//                     ? "bg-green-100 text-green-800"
//                     : "bg-gray-100 text-gray-800"
//                 }`}
//               >
//                 {order.status}
//               </span>
//               <span className="text-gray-500">
//                 Dibuat: {new Date(order.createdAt).toLocaleString()}
//               </span>
//             </div>
//           </div>

//           <div className="flex space-x-2">
//             {order.status === "Diproses" && (
//               <button
//                 onClick={handleCompleteOrder}
//                 disabled={isProcessing}
//                 className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md"
//               >
//                 {isProcessing ? "Memproses..." : "Tandai Selesai"}
//               </button>
//             )}
//             {/* Tombol Surat Jalan */}
//             <button
//               onClick={handleSuratJalanClick}
//               className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md"
//               title="Buat Surat Jalan"
//             >
//               <FileText className="w-5 h-5" />
//               Surat Jalan
//             </button>
//           </div>
//         </div>

//         {/* Info Pelanggan dan Alamat */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
//           <div>
//             <h2 className="text-lg font-semibold mb-2">Informasi Pelanggan</h2>
//             <div className="bg-gray-50 p-4 rounded-md">
//               <p><strong>Nama:</strong> {order.userId?.name || "-"}</p>
//               <p><strong>Email:</strong> {order.userId?.email || "-"}</p>
//               <p><strong>Telepon:</strong> {order.userId?.phone || "-"}</p>
//             </div>
//           </div>
//           <div>
//             <h2 className="text-lg font-semibold mb-2">Alamat Pengiriman</h2>
//             <div className="bg-gray-50 p-4 rounded-md">
//               {extractStreetName(order.delivery_address)}
//             </div>
//           </div>
//         </div>

//         {/* Tabel Persetujuan */}
//         <h2 className="text-lg font-semibold mb-3">Persetujuan Pesanan</h2>
//         <div className="overflow-x-auto">
//           <table className="min-w-full divide-y divide-gray-200">
//             <thead className="bg-gray-50">
//               <tr>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Produk</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Qty Diminta</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Qty Disetujui</th>
//               </tr>
//             </thead>
//             <tbody className="bg-white divide-y divide-gray-200">
//               {order.items.map((item) => {
//                 const pid = item.productId || item.product_details?._id;
//                 const approvalItem = approvalData.find((ad) => ad.productId === pid) || {};
//                 return (
//                   <tr key={pid}>
//                     <td className="px-6 py-4 flex items-center space-x-4">
//                       <img
//                         src={item.product_details?.image?.[0] || "/no-image.png"}
//                         alt={item.product_details?.name || "Produk"}
//                         className="w-10 h-10 rounded object-cover"
//                       />
//                       <div className="text-sm font-medium text-gray-900">
//                         {item.product_details?.name || item.productName}
//                       </div>
//                     </td>
//                     <td className="px-6 py-4">{item.quantity}</td>
//                     <td className="px-6 py-4">
//                       <input
//                         type="number"
//                         min={0}
//                         max={item.quantity}
//                         value={approvalItem.approvedQuantity || 0}
//                         onChange={(e) =>
//                           handleApprovedQuantityChange(pid, e.target.value)
//                         }
//                         className="w-20 border rounded px-2 py-1"
//                       />
//                     </td>
//                   </tr>
//                 );
//               })}
//             </tbody>
//           </table>
//         </div>

//         <div className="mt-4 flex space-x-2">
//           <button
//             onClick={handleSubmitApproval}
//             disabled={isProcessing}
//             className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
//           >
//             {isProcessing ? "Menyimpan..." : "Simpan Persetujuan"}
//           </button>
//         </div>

//         {deliveryNote && (
//           <div className="mt-6 p-4 bg-yellow-50 border border-yellow-300 rounded-md">
//             <h3 className="font-semibold mb-1">Catatan Pengiriman</h3>
//             <p>{deliveryNote}</p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default AdminOrderDetailPage;





// INI YANG BERHASIL CUMA NAMA DLL NYA BELOM
import React, { useEffect, useState } from "react";
import axios from "../utils/Axios";
import AxiosToastError from "../utils/AxiosToastError";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FileText } from "lucide-react"; // icon surat jalan

const AdminOrderDetailPage = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [approvalData, setApprovalData] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [deliveryNote, setDeliveryNote] = useState(null);

  const extractStreetName = (address) => {
    if (!address) return "-";
    const cleanedAddress = address.replace(/^\d+\|/, "");
    return cleanedAddress.split(",")[0] || cleanedAddress;
  };
  

  const fetchOrderDetail = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`/api/order/${orderId}`);
      const orderData = res.data.data;
      setOrder(orderData);

      const initialApproval = orderData.items.map((item) => ({
        productId: item.productId || item.product_details?._id,
        productName: item.product_details?.name || item.productName,
        qtyOrdered: item.quantity,
        approvedQuantity: item.approvedQuantity || 0,
      }));
      setApprovalData(initialApproval);
      setDeliveryNote(orderData.deliveryNote || null);
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (orderId) fetchOrderDetail();
  }, [orderId]);

  const handleApprovedQuantityChange = (productId, value) => {
    let parsed = parseInt(value);
    if (isNaN(parsed)) parsed = 0;
    const maxQty =
      approvalData.find((item) => item.productId === productId)?.qtyOrdered || 0;
    const safeQty = Math.min(Math.max(0, parsed), maxQty);

    setApprovalData((prev) =>
      prev.map((item) =>
        item.productId === productId
          ? { ...item, approvedQuantity: safeQty }
          : item
      )
    );
  };

  const handleSubmitApproval = async () => {
    setIsProcessing(true);
    try {
      const payload = {
        updates: approvalData.map(({ productId, approvedQuantity }) => ({
          productId,
          approvedQuantity,
        })),
      };

      const res = await axios.put(`/api/order/${orderId}/update-approved-qty`, payload);
      toast.success("Persetujuan berhasil disimpan");

      const updatedOrder = res.data.order || res.data.data || order;
      setOrder(updatedOrder);

      const updatedApproval = updatedOrder.items.map((item) => ({
        productId: item.productId || item.product_details?._id,
        productName: item.product_details?.name || "-",
        qtyOrdered: item.quantity,
        approvedQuantity: item.approvedQuantity || 0,
      }));
      setApprovalData(updatedApproval);
      setDeliveryNote(updatedOrder.deliveryNote || null);
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setIsProcessing(false);
    }
  };


  // **Tombol Surat Jalan diklik -> navigasi ke halaman surat jalan**
  const handleSuratJalanClick = () => {
    navigate(`/order/${orderId}/invoice-suratjalan`);
  };

  if (loading) return <div className="p-6">Memuat detail pesanan...</div>;
  if (!order) return <div className="p-6">Pesanan tidak ditemukan.</div>;

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 text-blue-600 hover:underline flex items-center"
      >
        ← Kembali ke Daftar Pesanan
      </button>

      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        {/* Header & Status */}
        <div className="flex justify-between items-start mb-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              Detail Pesanan #{order.orderId}
            </h1>
            <div className="flex items-center mt-2 space-x-2">
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  order.status === "Diajukan"
                    ? "bg-yellow-100 text-yellow-800"
                    : order.status === "Diproses"
                    ? "bg-blue-100 text-blue-800"
                    : order.status === "Selesai"
                    ? "bg-green-100 text-green-800"
                    : "bg-gray-100 text-gray-800"
                }`}
              >
                {order.status}
              </span>
              <span className="text-gray-500">
                Dibuat: {new Date(order.createdAt).toLocaleString()}
              </span>
            </div>
          </div>

          <div className="flex space-x-2">
     
            {/* Tombol Surat Jalan */}
            <button
              onClick={handleSuratJalanClick}
              className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md"
              title="Buat Surat Jalan"
            >
              <FileText className="w-5 h-5" />
              Surat Jalan
            </button>
          </div>
        </div>

        {/* Info Pelanggan dan Alamat */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <h2 className="text-lg font-semibold mb-2">Informasi Pelanggan</h2>
            <div className="bg-gray-50 p-4 rounded-md">
              <p><strong>Nama:</strong> {order.userId?.name || "-"}</p>
              <p><strong>Email:</strong> {order.userId?.email || "-"}</p>
              <p><strong>Telepon:</strong> {order.userId?.mobile || "-"}</p>
            </div>
          </div>
          <div>
          </div>
        </div>

        {/* Tabel Persetujuan */}
        <h2 className="text-lg font-semibold mb-3">Persetujuan Pesanan</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Produk</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Qty Diminta</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Qty Disetujui</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {order.items.map((item) => {
                const pid = item.productId || item.product_details?._id;
                const approvalItem = approvalData.find((ad) => ad.productId === pid) || {};
                return (
                  <tr key={pid}>
                    <td className="px-6 py-4 flex items-center space-x-4">
                      <img
                        src={item.product_details?.image?.[0] || "/no-image.png"}
                        alt={item.product_details?.name || "Produk"}
                        className="w-10 h-10 rounded object-cover"
                      />
                      <div className="text-sm font-medium text-gray-900">
                        {item.product_details?.name || item.productName}
                      </div>
                    </td>
                    <td className="px-6 py-4">{item.quantity}</td>
                    <td className="px-6 py-4">
                      <input
                        type="number"
                        min={0}
                        max={item.quantity}
                        value={approvalItem.approvedQuantity || 0}
                        onChange={(e) =>
                          handleApprovedQuantityChange(pid, e.target.value)
                        }
                        className="w-20 border rounded px-2 py-1"
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="mt-4 flex space-x-2">
          <button
            onClick={handleSubmitApproval}
            disabled={isProcessing}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
          >
            {isProcessing ? "Menyimpan..." : "Simpan Persetujuan"}
          </button>
        </div>

        {deliveryNote && (
          <div className="mt-6 p-4 bg-yellow-50 border border-yellow-300 rounded-md">
            <h3 className="font-semibold mb-1">Catatan Pengiriman</h3>
            <p>{deliveryNote}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminOrderDetailPage;
