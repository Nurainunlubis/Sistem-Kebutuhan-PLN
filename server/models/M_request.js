// models/requestModel.js
import mongoose from "mongoose";

const requestSchema = new mongoose.Schema({
  unitId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // diasumsikan setiap unit adalah user
    required: true,
  },
  items: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
    },
  ],
  category: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["Diajukan", "Disetujui", "Ditolak"],
    default: "Diajukan",
  },
  notes: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const RequestModel = mongoose.model("Request", requestSchema);
export default RequestModel;
