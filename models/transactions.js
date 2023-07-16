import { Schema, model, models } from 'mongoose';

const TransactionSchema = new Schema({
  transactionType: {
    type: String,
    required: [true, 'Transaction type is required'],
  },
  transactionDate: {
    type: Date,
    required: [true, 'Transactions must have a date'],
  },
  transactionCategory: {
    type: String,
    required: [true, 'Transactions must be of a category'],
  },
  transactionMode: {
    type: String,
    required: [true, 'Transaction must have a transaction mode'],
  },
  transactionAmount: {
    type: Number,
    required: [true, 'Transaction must have an amount'],
  },
  transactionNote: {
    type: String,
  },
  transactionTags: {
    type: String,
  },
  user: {
    type: String,
    required: [true, 'Must be logged in to save transaction'],
  },
});

const Transaction =
  models.Transactions || model('Transactions', TransactionSchema);

export default Transaction;
