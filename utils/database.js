import mongoose from 'mongoose';

let isConnected = false;

export const connectToDb = async () => {
  mongoose.set('strictQuery', false);

  if (isConnected) {
    console.log('Already connected');
    return;
  }

  try {
    await mongoose.connect(
      `mongodb+srv://kewintitus:${process.env.MONGODB_USER_PASSWD}@expenseapp.a9ug9ai.mongodb.net/?retryWrites=true&w=majority`,
      {
        dbName: 'ExpenseApp',
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    isConnected = true;
    console.log('MongoDB Connected');
  } catch (error) {
    console.log('Error connecting to DB', error);
  }
};
