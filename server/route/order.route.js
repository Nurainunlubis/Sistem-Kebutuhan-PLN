
// import express from "express";
// import {
//   OrderBarang,
//   getOrderDetailsController,
//   updateStatusOrderController,
//   getAllOrdersController,
//   deleteOrderController,
//   updateApprovedItemsController
// } from "../controllers/order.controller.js";

// import auth from '../middleware/auth.js'// middleware auth untuk user login
// import { admin } from '../middleware/Admin.js' // middleware untuk verifikasi admin

// const orderRouter = express.Router();

// //  Buat pesanan (hanya user login)
// orderRouter.post("/create", auth, OrderBarang);

// //  Ambil semua pesanan milik user login
// orderRouter.get("/my-orders", auth, getOrderDetailsController);

// //  Admin: Ambil semua pesanan (dari seluruh user)
// orderRouter.get("/all-orders", auth, admin, getAllOrdersController);

// // Route untuk admin memperbarui jumlah approved item dan upload surat jalan
// router.put("/order/approve-items/:orderId", auth, admin, updateApprovedItemsController);

// //  Admin: Update status pesanan
// orderRouter.put("/update-status", auth, admin, updateStatusOrderController);


// //  Admin: Hapus pesanan berdasarkan orderId
// orderRouter.delete("/delete/:orderId", auth, admin, deleteOrderController);





// export default orderRouter;


// import express from "express";
// import {
//   OrderBarang,
//   getOrderDetailsController,
//   // updateStatusOrderController,
//   // updateApprovedItemsController,
//   getAllOrdersController,
//   deleteOrderController
// } from "../controllers/order.controller.js";

// import auth from '../middleware/auth.js'// middleware auth untuk user login
// import { admin } from '../middleware/Admin.js' // middleware untuk verifikasi admin

// const router = express.Router();

// // Route untuk user membuat order baru
// // Middleware auth memastikan user sudah login
// router.post("/create", auth, OrderBarang);

// // Route untuk user mendapatkan daftar order miliknya
// router.get("/my-orders", auth, getOrderDetailsController);

// // Route untuk admin mendapatkan semua order dari seluruh user
// router.get("/all-orders", admin, getAllOrdersController);

// // Route untuk admin memperbarui status order (Diajukan, Diproses, Dikirim, Selesai, Dibatalkan)
// router.put("/order/status", admin, updateStatusOrderController);

// // Route untuk admin memperbarui jumlah approved item dan upload surat jalan
// router.put("/order/approve-items/:orderId", admin, updateApprovedItemsController);

// // Route untuk admin menghapus order berdasarkan orderId
// router.delete("/order/:orderId", admin, deleteOrderController);

// export default router;



// import express from "express";
// import {
//   OrderBarang,
//   getOrderDetailsController,
//   updateStatusOrderController,
//   getAllOrdersController,
//   deleteOrderController,
//  approveItemsController
// } from "../controllers/order.controller.js";

// import auth from '../middleware/auth.js'// middleware auth untuk user login
// import { admin } from '../middleware/Admin.js' // middleware untuk verifikasi admin

// const orderRouter = express.Router();

// //  Buat pesanan (hanya user login)
// orderRouter.post("/create", auth, OrderBarang);

// //  Admin: Ambil semua pesanan (dari seluruh user)
// orderRouter.get("/all-orders", auth, admin, getAllOrdersController);

// //  Ambil semua pesanan milik user login
// orderRouter.get("/my-orders", auth, getOrderDetailsController);

// // Route untuk admin memperbarui jumlah approved item dan upload surat jalan
// orderRouter.put("/order/approve-items/:orderId", auth, admin, approveItemsController);

// //  Admin: Update status pesanan
// orderRouter.put("/update-status", auth, admin, updateStatusOrderController);

// //  Admin: Hapus pesanan berdasarkan orderId
// orderRouter.delete("/delete/:orderId", auth, admin, deleteOrderController);



//  export default orderRouter;



import express from "express";
import {
  OrderBarang,
  getOrderDetailsController,
  updateStatusOrderController,
  getAllOrdersController,
  deleteOrderController,
  getRequestAnalyticsFromOrder,
  approveItemsController,
  updateInvoiceAndSuratJalan,
  getOrderByIdController,
  updateApprovedQuantities
} from "../controllers/order.controller.js";  // Sesuaikan path file controller

import auth from '../middleware/auth.js'// middleware auth untuk user login
import { admin } from '../middleware/Admin.js' // middleware untuk verifikasi admin

const orderRouter= express.Router();


// Route user membuat order
orderRouter.post("/create", auth, OrderBarang);

// Route user melihat order miliknya
orderRouter.get("/my-orders", auth, getOrderDetailsController);

// Admin update status order
orderRouter.put("/update-status", auth, admin, updateStatusOrderController);

// Admin lihat semua order
orderRouter.get("/all-orders", auth, admin, getAllOrdersController);

// Admin hapus order berdasarkan orderId
orderRouter.delete("/delete/:orderId", auth, admin, deleteOrderController);

// Admin dapatkan analytics dari order
orderRouter.get("/order/analytics", auth, admin, getRequestAnalyticsFromOrder);

// Admin approve items dalam order
orderRouter.put("/order/approve-items", auth, admin, approveItemsController);

// Admin update invoice dan surat jalan
orderRouter.put("/:orderId/invoice-suratjalan", auth, admin, updateInvoiceAndSuratJalan);

orderRouter.get("/:orderId", auth, admin, getOrderByIdController);

orderRouter.put("/:orderId/update-approved-qty", auth, admin, updateApprovedQuantities);



export default orderRouter;
