import mongoose from "mongoose";
const { Schema } = mongoose;

const routeSchema = new Schema(
  {
    origin: {
      type: String,
      required: true,
      index: true,
    },
    destination: {
      type: String,
      required: true,
      index: true,
    },
    distance: Number,
    duration: Number,
    stops: [String],
  },
  { timestamps: true }
);

const Route = mongoose.model("Route", routeSchema);
export default Route;
