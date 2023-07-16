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
});

const Transaction =
  models.Transaction || model('Transactions', TransactionSchema);

export default Transaction;
