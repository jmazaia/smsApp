import mongoose from 'mongoose';

const MessageSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },
    converted: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model('Message', MessageSchema);
