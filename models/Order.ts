import mongoose, { Document, Schema } from 'mongoose';

interface Order {
  company: string;
  address: string;
  name: string;
  email: string;
  link: string;
  size: string;
  active: boolean;
}

interface orderDocument extends Order, Document {}

const orderSchema = new Schema<orderDocument>({
  company: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  link: {
    type: String,
    required: true
  },
  size: {
    type: String,
    required: true
  },
  active: {
    type: Boolean,
    required: true
  }
});

const OrderModel = mongoose.model<orderDocument>('Order', orderSchema);

export default OrderModel;
