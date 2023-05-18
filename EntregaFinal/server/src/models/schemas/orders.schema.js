const { Schema, default: mongoose } = require('mongoose');

const OrderSchema = new Schema({
  user: 
    {
  email: { type: String, required: true, default: {} },
  address: {type: String, required: true},
    },
  items: [
    {
      productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
      quantity: { type: Number, required: true },
    }
  ],
  orderNumber: { type: Number, default: 1 },
  totalCost: { type: Number, required: true, default: 0 },
  date: { type: Date, default: Date.now },
  status: { type: String, enum: ['pending', 'completed', 'cancelled'], default: 'pending' }
});

OrderSchema.pre('save', async function (next) {
  const Order = mongoose.model('Order', OrderSchema);
  const orderCount = await Order.countDocuments().exec();
  this.orderNumber = orderCount + 1;
  next();
});

  
module.exports = OrderSchema