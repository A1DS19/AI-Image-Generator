import mongoose from 'mongoose';

export const connectDB = (url) => {
  mongoose.set('strictQuery', true);
  mongoose
    .connect(url, { useNewUrlParser: true })
    .then(() => {
      console.log('MongoDB connected');
    })
    .catch((err) => {
      console.log('MongoDB connection error: ', err);
    });
};
