import mongoose from "mongoose";
const { Schema } = mongoose;

const bookingSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    bus: {
      type: Schema.Types.ObjectId,
      ref: "Bus",
      required: true,
    },
    seats: [
      {
        seatNumber: String,
        price: Number,
      },
    ],
    totalPrice: Number,
    status: {
      type: String,
      enum: ["pending", "confirmed", "cancelled"],
      default: "pending",
    },
    payment: {
      type: Schema.Types.ObjectId,
      ref: "Payment",
    },
  },
  { timestamps: true }
);

// Indexes for optimized queries
bookingSchema.index({ userId: 1 });
bookingSchema.index({ busId: 1 });

const Booking = mongoose.model("Booking", bookingSchema);
export default Booking;
