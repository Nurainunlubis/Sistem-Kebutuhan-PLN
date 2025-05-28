// import mongoose from "mongoose";

// const orderSchema = new mongoose.Schema({
//   userId: {
//     type: mongoose.Schema.ObjectId,
//     ref: "User",
//   },
//   orderId: {
//     type: String,
//     required: [true, "Provide orderId"],
//     unique: true,
//   },
//   items: [
//     {
//       productId: {
//         type: mongoose.Schema.ObjectId,
//         ref: "product",
//       },
//       quantity: {
//         type: Number,
//         default: 1,
//       },
//       product_details: {
//         name: String,
//         image: [String],
//       },
//     },
//   ],
//   delivery_address: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "address"
//   },
//   status: {
//     type: String,
//     enum: ["Diajukan","Diproses", "Selesai", "Dibatalkan"],
//     default: "Diajukan",
//   },
//   invoice_receipt: {
//     type: String,
//     default: "",
//   },
// }, {
//   timestamps: true,
// });

// const OrderModel = mongoose.model('order',orderSchema)

// export default OrderModel
// import mongoose from "mongoose";

// // Skema untuk data pemesanan (order)
// const orderSchema = new mongoose.Schema(
//   {
//     // ID user yang melakukan pemesanan
//     userId: {
//       type: mongoose.Schema.ObjectId,
//       ref: "User",
//       required: true,
//     },

//     // ID unik untuk setiap order
//     orderId: {
//       type: String,
//       required: [true, "Provide orderId"],
//       unique: true,
//     },

//     // Daftar item yang diajukan oleh user
//     items: [
//       {
//         productId: {
//           type: mongoose.Schema.ObjectId,
//           ref: "product",
//           required: true,
//         },
//         quantity: {
//           type: Number,
//           default: 1,
//           required: true,
//         },
//         approvedQuantity: {
//           type: Number,
//           default: 0, // default 0 sampai admin acc
//         },
//         product_details: {
//           name: { type: String },
//           image: [String],
//           kategori: { type: String },
//         },
//       },
//     ],

//     // Referensi alamat pengiriman
//     delivery_address: {
//       type: mongoose.Schema.ObjectId,
//       ref: "address",
//       required: true,
//     },

//     // Status pesanan
//     status: {
//       type: String,
//       enum: ["Diajukan", "Diproses", "Dikirim", "Selesai", "Dibatalkan"],
//       default: "Diajukan",
//     },

//     // Bukti pembayaran jika ada
//     invoice_receipt: {
//       type: String,
//       default: "",
//     },

//     // Path atau URL file Surat Jalan (jika sudah dibuat)
//     suratJalanUrl: {
//       type: String,
//       default: "",
//     },
//     invoiceNumber: {
//       type: String,
//       default: "",
//     },
//     suratJalanNumber: {
//       type: String,
//       default: "",
//     },
//     receiver: {
//       type: String,
//       default: "",
//     },
//     driver: {
//       type: String,
//       default: "",
//     },
//     approver: {
//       type: String,
//       default: "",
//     },
//     vehicle: {
//       type: String,
//       default: "",
//     },
//   },

//   {
//     timestamps: true, // createdAt & updatedAt
//   }
// );

// // Buat dan ekspor model order
// const OrderModel = mongoose.model("order", orderSchema);
// export default OrderModel;

// import mongoose from "mongoose";

// // Skema untuk data pemesanan (order)
// const orderSchema = new mongoose.Schema(
//   {
//     userId: {
//       type: mongoose.Schema.ObjectId,
//       ref: "User",
//       required: true,
//     },

//     orderId: {
//       type: String,
//       required: [true, "Provide orderId"],
//       unique: true,
//     },

//     items: [
//       {
//         productId: {
//           type: mongoose.Schema.ObjectId,
//           ref: "product",
//           required: true,
//         },
//         quantity: {
//           type: Number,
//           default: 1,
//           required: true,
//         },
//         approvedQuantity: {
//           type: Number,
//           default: 0,
//         },
//         product_details: {
//           name: { type: String },
//           image: [String],
//           kategori: { type: String },
//         },
//         notes: {
//           type: String,
//           default: "", // keterangan barang (opsional)
//         },
//       },
//     ],

//     delivery_address: {
//       type: mongoose.Schema.ObjectId,
//       ref: "address",
//       required: true,
//     },

//     status: {
//       type: String,
//       enum: ["Diajukan", "Diproses", "Dikirim", "Selesai", "Dibatalkan"],
//       default: "Diajukan",
//     },

//     invoice_receipt: {
//       type: String,
//       default: "",
//     },

//     // Informasi terkait surat jalan
//     suratJalanUrl: {
//       type: String,
//       default: "",
//     },
//     suratJalanNumber: {
//       type: String,
//       default: "",
//     },
//     deliveryPurpose: {
//       type: String,
//       default: "", // untuk keperluan
//     },
//     deliveryDestination: {
//       type: String,
//       default: "", // tujuan
//     },
//     vehicle: {
//       type: String,
//       default: "",
//     },
//     driver: {
//       type: String,
//       default: "",
//     },
//     receiver: {
//       type: String,
//       default: "",
//     },
//     approver: {
//       type: String,
//       default: "",
//     },
//     invoiceNumber: {
//       type: String,
//       default: "",
//     },
//   },
//   {
//     timestamps: true,
//   }
// );

// const OrderModel = mongoose.model("order", orderSchema);
// export default OrderModel;

import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
    orderId: {
      type: String,
      required: true,
      unique: true,
    },

    items: [
      {
        productId: {
          type: mongoose.Schema.ObjectId,
          ref: "product",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          default: 1,
        },
        approvedQuantity: {
          type: Number,
          default: 0,
        },
        product_details: {
          name: String,
          image: [String],
          category: String,
        },
        notes: {
          type: String,
          default: "",
        },
      },
    ],

    status: {
      type: String,
      enum: ["Diajukan", "Diproses", "Dikirim", "Selesai", "Dibatalkan"],
      default: "Diajukan",
    },

    suratJalan: {
      number: { type: String, default: "" }, // No Surat
      purpose: { type: String, default: "" }, // Untuk Keperluan
      destination: { type: String, default: "" }, // Tujuan
      accordingToRequest: { type: String, default: "" }, // Menurut Permintaan
      vehicle: { type: String, default: "" }, // Kendaraan
      driver: { type: String, default: "" }, // Pengemudi
      receiver: { type: String, default: "" }, // Yang menerima
      approver: { type: String, default: "" }, // Yang mengijinkan
      url: { type: String, default: "" }, // File PDF (jika ada)
      date: { type: Date }, // Tanggal Surat Jalan
    },

    delivery_address: {
      type: mongoose.Schema.ObjectId,
      ref: "address",
      required: true,
    },

    notes: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

const OrderModel = mongoose.model("Order", orderSchema);
export default OrderModel;
