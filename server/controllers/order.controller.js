// import CartProductModel from "../models/M_cart.js";
// import OrderModel from "../models/M_order.js";
// import UserModel from "../models/M_user.js";
// import mongoose from "mongoose";

// //  Buat pesanan 
// export async function OrderBarang(request, response) {
//     try {
//       const userId = request.userId;
//       const { list_items, totalAmt, addressId } = request.body;
  
//       // Format item untuk dimasukkan ke field `items`
//       const formattedItems = list_items.map(el => ({
//         productId: el.productId._id,
//         quantity: el.quantity,
//         product_details: {
//           name: el.productId.name,
//           image: el.productId.image,
//           kategori: el.productId.kategori,
//         }
//       }));
  
//       // Buat satu order berisi semua item
//       const newOrder = await OrderModel.create({
//         userId: userId,
//         orderId: `ORD-${new mongoose.Types.ObjectId()}`,
//         items: formattedItems,
//         delivery_address: addressId,
//         subTotalAmt: request.body.subTotalAmt,
//         totalAmt: totalAmt,
//       });
  
//       // Kosongkan cart setelah order
//       await CartProductModel.deleteMany({ userId: userId });
//       await UserModel.updateOne({ _id: userId }, { shopping_cart: [] });
  
//       return response.json({
//         message: "Order berhasil dibuat",
//         error: false,
//         success: true,
//         data: newOrder,
//       });
  
//     } catch (error) {
//       return response.status(500).json({
//         message: error.message || error,
//         error: true,
//         success: false,
//       });
//     }
//   }
  

// // Ambil semua order milik user yang sedang login
// export async function getOrderDetailsController(request, response) {
//   try {
//     const userId = request.userId;

//     const orderlist = await OrderModel.find({ userId: userId })
//     .sort({ createdAt: -1 })
//     .populate({
//       path: "delivery_address", // Populasi address
//       select: "address_line" // Pilih hanya field yang dibutuhkan
//     });

//     return response.json({
//       message: "Daftar pesanan ditemukan",
//       data: orderlist,
//       error: false,
//       success: true
//     });

//   } catch (error) {
//     return response.status(500).json({
//       message: error.message || error,
//       error: true,
//       success: false
//     });
//   }
// }

// //  Admin: Perbarui status pesanan (Diajukan, Diproses, Selesai, Dibatalkan)
// export async function updateStatusOrderController(req, res) {
//   try {
//     const { orderId, newStatus } = req.body;

//     const allowedStatus = ["Diajukan","Diproses","Dikirim", "Selesai", "Dibatalkan"];
//     if (!allowedStatus.includes(newStatus)) {
//       return res.status(400).json({
//         message: "Status tidak valid. Hanya: Diproses, Selesai, atau Dibatalkan.",
//         success: false,
//         error: true
//       });
//     }

//     const updatedOrder = await OrderModel.findOneAndUpdate(
//       { orderId },
//       { status: newStatus },
//       { new: true }
//     );

//     if (!updatedOrder) {
//       return res.status(404).json({
//         message: "Pesanan tidak ditemukan.",
//         success: false,
//         error: true
//       });
//     }

//     return res.json({
//       message: "Status pesanan berhasil diperbarui.",
//       success: true,
//       error: false,
//       data: updatedOrder
//     });

//   } catch (error) {
//     return res.status(500).json({
//       message: error.message || error,
//       success: false,
//       error: true
//     });
//   }
// }

// // Admin: Ambil semua pesanan dari seluruh user
// export async function getAllOrdersController(req, res) {
//   try {
//     const allOrders = await OrderModel.find()
//       .sort({ createdAt: -1 })
//       .populate({
//         path: "userId", // Populasi user untuk nama dan email
//         select: "name email"
//       })
//       .populate({
//         path: "delivery_address", // Populasi delivery_address
//         select: "address_line city state pincode country" // Pilih field address yang dibutuhkan
//       });

//     return res.json({
//       message: "Semua pesanan berhasil diambil",
//       success: true,
//       error: false,
//       data: allOrders,
//     });
//   } catch (error) {
//     return res.status(500).json({
//       message: error.message || "Terjadi kesalahan saat mengambil pesanan",
//       success: false,
//       error: true,
//     });
//   }
// }


// //  Admin: Hapus pesanan berdasarkan orderId
// export async function deleteOrderController(req, res) {
//   try {
//     const { orderId } = req.params;

//     const deletedOrder = await OrderModel.findOneAndDelete({ orderId });

//     if (!deletedOrder) {
//       return res.status(404).json({
//         message: "Pesanan tidak ditemukan",
//         success: false,
//         error: true,
//       });
//     }

//     return res.json({
//       message: "Pesanan berhasil dihapus",
//       success: true,
//       error: false,
//       data: deletedOrder,
//     });
//   } catch (error) {
//     return res.status(500).json({
//       message: error.message || "Terjadi kesalahan saat menghapus pesanan",
//       success: false,
//       error: true,
//     });
//   }
// }


// export const getRequestAnalyticsFromOrder = async (req, res) => {
//   try {
//     // Total semua permintaan (order)
//     const totalRequests = await OrderModel.countDocuments();

//     // Jumlah permintaan berdasarkan status
//     const statusCounts = await OrderModel.aggregate([
//       {
//         $group: {
//           _id: "$status", // contoh: 'diajukan', 'disetujui', 'ditolak'
//           count: { $sum: 1 }
//         }
//       }
//     ]);

//     // Kategori yang paling sering diminta
//     const categoryCounts = await Order.aggregate([
//       { $unwind: "$items" }, // supaya bisa akses tiap item di dalam order
//       {
//         $group: {
//           _id: "$items.product_details.kategori",
//           count: { $sum: 1 }
//         }
//       },
//       { $sort: { count: -1 } }
//     ]);

//     // Tren permintaan per bulan
// const currentYear = new Date().getFullYear();

// const monthlyTrend = await Order.aggregate([
//   {
//     $match: {
//       createdAt: {
//         $gte: new Date(`${currentYear}-01-01`),
//         $lte: new Date(`${currentYear}-12-31`)
//       }
//     }
//   },
//   {
//     $group: {
//       _id: { month: { $month: "$createdAt" } },
//       count: { $sum: 1 }
//     }
//   },
//   { $sort: { "_id.month": 1 } },
//   {
//     $project: {
//       month: "$_id.month",
//       count: 1,
//       _id: 0
//     }
//   }
// ]);


//     res.status(200).json({
//       totalRequests,
//       statusCounts,
//       categoryCounts,
//       monthlyTrend
//     });
//   } catch (error) {
//     console.error("Error in getRequestAnalyticsFromOrder:", error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };


// export async function approveItemsController(req, res) {
//   try {
//     const { orderId, approvedItems } = req.body;
//     // approvedItems contoh: [{ productId, approvedQuantity }]

//     // Cari order berdasarkan orderId
//     const order = await OrderModel.findOne({ orderId });

//     if (!order) {
//       return res.status(404).json({ message: "Order tidak ditemukan", success: false, error: true });
//     }

//     // Update items.approved dan approvedItems sesuai data input
//     approvedItems.forEach(({ productId, approvedQuantity }) => {
//       // Update approvedItems array
//       const idx = order.approvedItems.findIndex(ai => ai.productId.toString() === productId);
//       if (idx > -1) {
//         order.approvedItems[idx].approvedQuantity = approvedQuantity;
//       } else {
//         // Jika belum ada di approvedItems, push baru
//         const item = order.items.find(i => i.productId.toString() === productId);
//         if (item) {
//           order.approvedItems.push({
//             productId: item.productId,
//             approvedQuantity,
//             product_details: item.product_details,
//           });
//         }
//       }
//       // Update approved di items
//       const itemIndex = order.items.findIndex(i => i.productId.toString() === productId);
//       if (itemIndex > -1) {
//         order.items[itemIndex].approved = approvedQuantity > 0;
//       }
//     });

//     await order.save();

//     return res.json({
//       message: "Items berhasil disetujui",
//       success: true,
//       error: false,
//       data: order,
//     });
//   } catch (error) {
//     return res.status(500).json({
//       message: error.message || "Terjadi kesalahan saat approve items",
//       success: false,
//       error: true,
//     });
//   }
// }

// export async function updateInvoiceAndSuratJalan(req, res) {
//   try {
//     const { orderId } = req.params;
//     const { invoice_receipt, suratJalanUrl } = req.body; 
//     // kalau pakai file upload, bisa ambil dari req.file atau req.files

//     const order = await OrderModel.findOne({ orderId });
//     if (!order) {
//       return res.status(404).json({ message: "Order tidak ditemukan", success: false, error: true });
//     }

//     if (invoice_receipt !== undefined) order.invoice_receipt = invoice_receipt;
//     if (suratJalanUrl !== undefined) order.suratJalanUrl = suratJalanUrl;

//     await order.save();

//     return res.json({
//       message: "Invoice dan Surat Jalan berhasil diperbarui",
//       success: true,
//       error: false,
//       data: order,
//     });
//   } catch (error) {
//     return res.status(500).json({
//       message: error.message || "Terjadi kesalahan saat update invoice dan surat jalan",
//       success: false,
//       error: true,
//     });
//   }
// }



import CartProductModel from "../models/M_cart.js";
import OrderModel from "../models/M_order.js";
import UserModel from "../models/M_user.js";
import ProductModel from "../models/M_product.js";
import mongoose from "mongoose";

// Buat pesanan
export async function OrderBarang(req, res) {
  try {
    const userId = req.userId;
    const { list_items, totalAmt, addressId, subTotalAmt } = req.body;

    if (!list_items || !Array.isArray(list_items) || list_items.length === 0) {
      return res.status(400).json({
        message: "List items tidak boleh kosong",
        error: true,
        success: false,
      });
    }

    // Format items untuk dimasukkan ke field `items`
    const formattedItems = list_items.map(el => ({
      productId: el.productId._id,
      quantity: el.quantity,
      product_details: {
        name: el.productId.name,
        image: el.productId.image,
        kategori: el.productId.kategori,
      }
    }));

    // Cek stok produk satu per satu
    for (const item of list_items) {
      const product = await ProductModel.findById(item.productId._id);
      if (!product) {
        return res.status(404).json({
          message: `Produk dengan ID ${item.productId._id} tidak ditemukan.`,
          error: true,
          success: false,
        });
      }
      if (product.stock < item.quantity) {
        return res.status(400).json({
          message: `Stok produk ${product.name} tidak cukup. Stok tersedia: ${product.stock}`,
          error: true,
          success: false,
        });
      }
    }

    // Update stok produk (kurangi sesuai quantity)
    for (const item of list_items) {
      await ProductModel.findByIdAndUpdate(item.productId._id, {
        $inc: { stock: -item.quantity }
      });
    }

    // Buat order baru
    const newOrder = await OrderModel.create({
      userId,
      orderId: `ORD-${new mongoose.Types.ObjectId()}`,
      items: formattedItems,
      delivery_address: addressId,
      subTotalAmt,
      totalAmt,
      status: "Diajukan",
    });

    // Kosongkan cart user
    await CartProductModel.deleteMany({ userId });
    await UserModel.updateOne({ _id: userId }, { shopping_cart: [] });

    return res.json({
      message: "Order berhasil dibuat",
      error: false,
      success: true,
      data: newOrder,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || "Terjadi kesalahan saat membuat order",
      error: true,
      success: false,
    });
  }
}

// Ambil semua order milik user
export async function getOrderDetailsController(req, res) {
  try {
    const userId = req.userId;

    const orderlist = await OrderModel.find({ userId })
      .sort({ createdAt: -1 })
      .populate({
        path: "delivery_address",
        select: "address_line city state pincode country"
      });

    return res.json({
      message: "Daftar pesanan ditemukan",
      data: orderlist,
      error: false,
      success: true
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || "Terjadi kesalahan saat mengambil data pesanan",
      error: true,
      success: false
    });
  }
}

// Update status pesanan oleh admin
export async function updateStatusOrderController(req, res) {
  try {
    const { orderId, newStatus } = req.body;

    const allowedStatus = ["Diajukan", "Diproses", "Dikirim", "Selesai", "Dibatalkan"];
    if (!allowedStatus.includes(newStatus)) {
      return res.status(400).json({
        message: "Status tidak valid. Pilihan: Diajukan, Diproses, Dikirim, Selesai, atau Dibatalkan.",
        success: false,
        error: true
      });
    }

    const updatedOrder = await OrderModel.findOneAndUpdate(
      { orderId },
      { status: newStatus },
      { new: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({
        message: "Pesanan tidak ditemukan.",
        success: false,
        error: true
      });
    }

    return res.json({
      message: "Status pesanan berhasil diperbarui.",
      success: true,
      error: false,
      data: updatedOrder
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || "Terjadi kesalahan saat memperbarui status",
      success: false,
      error: true
    });
  }
}

// Admin: Ambil semua pesanan
export async function getAllOrdersController(req, res) {
  try {
    const allOrders = await OrderModel.find()
      .sort({ createdAt: -1 })
      .populate({
        path: "userId",
        select: "name email"
      })
      .populate({
        path: "delivery_address",
        select: "address_line city state pincode country"
      });

    return res.json({
      message: "Semua pesanan berhasil diambil",
      success: true,
      error: false,
      data: allOrders,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || "Terjadi kesalahan saat mengambil pesanan",
      success: false,
      error: true,
    });
  }
}

// Admin: Hapus pesanan berdasarkan orderId
export async function deleteOrderController(req, res) {
  try {
    const { orderId } = req.params;

    const deletedOrder = await OrderModel.findOneAndDelete({ orderId });

    if (!deletedOrder) {
      return res.status(404).json({
        message: "Pesanan tidak ditemukan",
        success: false,
        error: true,
      });
    }

    return res.json({
      message: "Pesanan berhasil dihapus",
      success: true,
      error: false,
      data: deletedOrder,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || "Terjadi kesalahan saat menghapus pesanan",
      success: false,
      error: true,
    });
  }
}

// Analytics data berdasarkan order
export const getRequestAnalyticsFromOrder = async (req, res) => {
  try {
    const totalRequests = await OrderModel.countDocuments();

    const statusCounts = await OrderModel.aggregate([
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 }
        }
      }
    ]);

    const categoryCounts = await OrderModel.aggregate([
      { $unwind: "$items" },
      {
        $group: {
          _id: "$items.product_details.kategori",
          count: { $sum: 1 }
        }
      },
      { $sort: { count: -1 } }
    ]);

    const currentYear = new Date().getFullYear();

    const monthlyTrend = await OrderModel.aggregate([
      {
        $match: {
          createdAt: {
            $gte: new Date(`${currentYear}-01-01`),
            $lte: new Date(`${currentYear}-12-31`)
          }
        }
      },
      {
        $group: {
          _id: { month: { $month: "$createdAt" } },
          count: { $sum: 1 }
        }
      },
      { $sort: { "_id.month": 1 } },
      {
        $project: {
          month: "$_id.month",
          count: 1,
          _id: 0
        }
      }
    ]);

    return res.status(200).json({
      totalRequests,
      statusCounts,
      categoryCounts,
      monthlyTrend
    });
  } catch (error) {
    console.error("Error in getRequestAnalyticsFromOrder:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Admin: Approve items dalam order
export async function approveItemsController(req, res) {
  try {
    const { orderId, approvedItems } = req.body;

    if (!orderId || !Array.isArray(approvedItems)) {
      return res.status(400).json({
        message: "orderId dan approvedItems harus disediakan dan approvedItems harus array",
        success: false,
        error: true,
      });
    }

    const order = await OrderModel.findOne({ orderId });
    if (!order) {
      return res.status(404).json({ message: "Order tidak ditemukan", success: false, error: true });
    }

    for (const { productId, approvedQuantity } of approvedItems) {
      const idx = order.approvedItems.findIndex(ai => ai.productId.toString() === productId);
      if (idx > -1) {
        order.approvedItems[idx].approvedQuantity = approvedQuantity;
      } else {
        const item = order.items.find(i => i.productId.toString() === productId);
        if (item) {
          order.approvedItems.push({
            productId: item.productId,
            approvedQuantity,
            product_details: item.product_details,
          });
        }
      }
      const itemIndex = order.items.findIndex(i => i.productId.toString() === productId);
      if (itemIndex > -1) {
        order.items[itemIndex].approved = approvedQuantity > 0;
      }
    }

    await order.save();

    return res.json({
      message: "Items berhasil disetujui",
      success: true,
      error: false,
      data: order,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || "Terjadi kesalahan saat approve items",
      success: false,
      error: true,
    });
  }
};

// Update invoice dan surat jalan

export const updateInvoiceAndSuratJalan = async (req, res) => {
  try {
    const { orderId } = req.params;
    const {
      suratJalanNumber,
      purpose,
      destination,
      accordingToRequest,
      vehicle,
      driver,
      receiver,
      approver,
      date,
      url, // Jika ada upload file surat jalan (misalnya PDF)
    } = req.body;

    // Cari order berdasarkan orderId
    const order = await OrderModel.findOne({ orderId });
    if (!order) {
      return res.status(404).json({ message: "Order tidak ditemukan" });
    }

    // Update surat jalan jika field disediakan
    if (!order.suratJalan) {
      order.suratJalan = {}; // pastikan objek suratJalan ada
    }

    if (suratJalanNumber !== undefined) order.suratJalan.number = suratJalanNumber;
    if (purpose !== undefined) order.suratJalan.purpose = purpose;
    if (accordingToRequest !== undefined) order.suratJalan.accordingToRequest = accordingToRequest;
    if (destination !== undefined) order.suratJalan.destination = destination;
    if (vehicle !== undefined) order.suratJalan.vehicle = vehicle;
    if (driver !== undefined) order.suratJalan.driver = driver;
    if (receiver !== undefined) order.suratJalan.receiver = receiver;
    if (approver !== undefined) order.suratJalan.approver = approver;
    if (date !== undefined) order.suratJalan.date = new Date(date);
    if (url !== undefined) order.suratJalan.url = url;

    // Simpan perubahan
    await order.save();

    return res.status(200).json({
      message: "Surat Jalan berhasil diupdate",
      suratJalan: order.suratJalan,
    });
  } catch (error) {
    console.error("Gagal update Surat Jalan:", error);
    return res.status(500).json({ message: "Terjadi kesalahan pada server" });
  }
};

// export const updateInvoiceAndSuratJalan = async (req, res) => {
  // try {
  //   const { orderId } = req.params;
  //   const {
  //     purpose,
  //     destination,
  //     accordingToRequest,
  //     vehicle,
  //     driver,
  //     receiver,
  //     approver,
  //     date,
  //     url,
  //   } = req.body;

  //   const order = await OrderModel.findOne({ orderId });
  //   if (!order) {
  //     return res.status(404).json({ message: "Order tidak ditemukan" });
  //   }

  //   if (!order.suratJalan) {
  //     order.suratJalan = {};
  //   }

  //   // Auto-generate nomor surat jalan jika belum ada
  //   if (!order.suratJalan.number) {
  //     const now = new Date();
  //     const month = String(now.getMonth() + 1).padStart(2, "0");
  //     const year = now.getFullYear();

  //     const startOfMonth = new Date(year, parseInt(month) - 1, 1);
  //     const startOfNextMonth = new Date(year, parseInt(month), 1);

  //     const count = await OrderModel.countDocuments({
  //       "suratJalan.date": {
  //         $gte: startOfMonth,
  //         $lt: startOfNextMonth,
  //       },
  //     });

  //     const nextNumber = String(count + 1).padStart(3, "0");
  //     const generatedNumber = `${nextNumber}/${month}/MUM/UPT BOGOR/${year}`;

  //     order.suratJalan.number = generatedNumber;
  //   }

  //   // Update field lain
  //   if (purpose !== undefined) order.suratJalan.purpose = purpose;
  //   if (destination !== undefined) order.suratJalan.destination = destination;
  //   if (accordingToRequest !== undefined) order.suratJalan.accordingToRequest = accordingToRequest;
  //   if (vehicle !== undefined) order.suratJalan.vehicle = vehicle;
  //   if (driver !== undefined) order.suratJalan.driver = driver;
  //   if (receiver !== undefined) order.suratJalan.receiver = receiver;
  //   if (approver !== undefined) order.suratJalan.approver = approver;
  //   if (date !== undefined) order.suratJalan.date = new Date(date);
  //   if (url !== undefined) order.suratJalan.url = url;

  //   await order.save();

  //   return res.status(200).json({
  //     message: "Surat Jalan berhasil diupdate",
  //     suratJalan: order.suratJalan,
  //   });
  // } catch (error) {
  //   console.error("Gagal update Surat Jalan:", error);
  //   return res.status(500).json({ message: "Terjadi kesalahan pada server" });
  // }
// };

// export const updateInvoiceAndSuratJalan = async (req, res) => {
//   try {
//     const { orderId } = req.params;
//     const {
//       purpose,
//       destination,
//       accordingToRequest,
//       vehicle,
//       driver,
//       receiver,
//       approver,
//       date,
//       url,
//     } = req.body;

//     if (!orderId) {
//       return res.status(400).json({ message: "Order ID diperlukan" });
//     }

//     const order = await OrderModel.findOne({ orderId });
//     if (!order) {
//       return res.status(404).json({ message: "Order tidak ditemukan" });
//     }

//     if (!order.suratJalan) {
//       order.suratJalan = {};
//     }

//     // Generate nomor surat jalan jika belum ada
//     if (!order.suratJalan.number) {
//       const now = new Date();
//       const month = String(now.getMonth() + 1).padStart(2, "0");
//       const year = now.getFullYear();

//       const monthIndex = parseInt(month, 10) - 1;
//       const startOfMonth = new Date(year, monthIndex, 1);
//       const startOfNextMonth = new Date(year, monthIndex + 1, 1);

//       // Hitung jumlah surat jalan bulan ini
//       let counter = await OrderModel.countDocuments({
//         "suratJalan.date": { $gte: startOfMonth, $lt: startOfNextMonth },
//         "suratJalan.number": { $ne: "" }
//       });

//       let generatedNumber;
//       let isUnique = false;

//       while (!isUnique) {
//         counter++;
//         const nextNumber = String(counter).padStart(3, "0");
//         generatedNumber = `${nextNumber}/${month}/MUM/UPT BOGOR/${year}`;

//         const exists = await OrderModel.findOne({ "suratJalan.number": generatedNumber });
//         if (!exists) {
//           isUnique = true;
//         }
//       }

//       order.suratJalan.number = generatedNumber;
//     }

//     // Update field surat jalan lainnya
//     if (purpose !== undefined) order.suratJalan.purpose = purpose;
//     if (destination !== undefined) order.suratJalan.destination = destination;
//     if (accordingToRequest !== undefined) order.suratJalan.accordingToRequest = accordingToRequest;
//     if (vehicle !== undefined) order.suratJalan.vehicle = vehicle;
//     if (driver !== undefined) order.suratJalan.driver = driver;
//     if (receiver !== undefined) order.suratJalan.receiver = receiver;
//     if (approver !== undefined) order.suratJalan.approver = approver;
//     if (date !== undefined) {
//       const parsedDate = new Date(date);
//       if (!isNaN(parsedDate)) order.suratJalan.date = parsedDate;
//     }
//     if (url !== undefined) order.suratJalan.url = url;

//     await order.save();

//     return res.status(200).json({
//       message: "Surat Jalan berhasil diupdate",
//       suratJalan: order.suratJalan,
//     });
//   } catch (error) {
//     console.error("Gagal update Surat Jalan:", error);
//     return res.status(500).json({ message: "Terjadi kesalahan pada server" });
//   }
// };

// export const updateInvoiceAndSuratJalan = async (req, res) => {
//   try {
//     const { orderId } = req.params;
//     const {
//       purpose,
//       destination,
//       accordingToRequest,
//       vehicle,
//       driver,
//       receiver,
//       approver,
//       date,
//       url,
//     } = req.body;

//     const order = await OrderModel.findOne({ orderId });
//     if (!order) {
//       return res.status(404).json({ message: "Order tidak ditemukan" });
//     }

//     if (!order.suratJalan) {
//       order.suratJalan = {};
//     }

//     // Auto-generate nomor surat jalan jika belum ada
//     if (!order.suratJalan.number) {
//       const now = new Date();
//       const month = String(now.getMonth() + 1).padStart(2, "0");
//       const year = now.getFullYear();

//       const startOfMonth = new Date(year, parseInt(month) - 1, 1);
//       const startOfNextMonth = new Date(year, parseInt(month), 1);

//       const count = await OrderModel.countDocuments({
//         "suratJalan.date": {
//           $gte: startOfMonth,
//           $lt: startOfNextMonth,
//         },
//       });

//       const nextNumber = String(count + 1).padStart(3, "0");
//       const generatedNumber = `${nextNumber}/${month}/MUM/UPT BOGOR/${year}`;

//       order.suratJalan.number = generatedNumber;
//     }

//     // Update field lain
//     if (purpose !== undefined) order.suratJalan.purpose = purpose;
//     if (destination !== undefined) order.suratJalan.destination = destination;
//     if (accordingToRequest !== undefined) order.suratJalan.accordingToRequest = accordingToRequest;
//     if (vehicle !== undefined) order.suratJalan.vehicle = vehicle;
//     if (driver !== undefined) order.suratJalan.driver = driver;
//     if (receiver !== undefined) order.suratJalan.receiver = receiver;
//     if (approver !== undefined) order.suratJalan.approver = approver;
//     if (date !== undefined) order.suratJalan.date = new Date(date);
//     if (url !== undefined) order.suratJalan.url = url;

//     await order.save();

//     return res.status(200).json({
//       message: "Surat Jalan berhasil diupdate",
//       suratJalan: order.suratJalan,
//     });
//   } catch (error) {
//     console.error("Gagal update Surat Jalan:", error);
//     return res.status(500).json({ message: "Terjadi kesalahan pada server" });
//   }
// };





export const getOrderByIdController = async (req, res) => {
  try {
    const { orderId } = req.params;
    const order = await OrderModel.findOne({ orderId }).populate("userId"); 

    if (!order) {
      return res.status(404).json({ message: "Order tidak ditemukan" });
    }

    res.status(200).json({ data: order });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateApprovedQuantities = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { updates } = req.body; // [{productId, approvedQuantity}, ...]

    if (!updates || !Array.isArray(updates)) {
      return res.status(400).json({ message: "Field updates harus berupa array" });
    }

    // Cari order berdasar orderId
    const order = await OrderModel.findOne({ orderId });
    if (!order) {
      return res.status(404).json({ message: "Order tidak ditemukan" });
    }

    // Flag untuk cek ada update approvedQuantity
    let adaUpdate = false;

    // Loop dan update approvedQuantity tiap produk di order.items
    updates.forEach((upd) => {
      const item = order.items.find(i => i.productId.toString() === upd.productId);
      if (item) {
        // Batasi approvedQuantity tidak lebih dari quantity user
        const newApproved = Math.min(upd.approvedQuantity, item.quantity);

        // Update jika ada perubahan
        if (item.approvedQuantity !== newApproved) {
          item.approvedQuantity = newApproved;
          adaUpdate = true;
        }
      }
    });

    // Kalau ada update, ubah status jadi Diproses
    if (adaUpdate) {
      order.status = "Diproses";
    }

    // Simpan perubahan
    await order.save();

    return res.json({
      message: "approvedQuantity semua produk berhasil diupdate",
      order,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};
