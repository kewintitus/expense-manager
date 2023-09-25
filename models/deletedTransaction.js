import { Schema, model, models } from 'mongoose';

const DeletedTransactionSchema = new Schema({
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
  bankAccountName: {
    type: String,
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
  deletedOn: {
    type: Date,
    required: [true, 'Transactions deleted must have a deleted date'],
  },
});

const DeletedTransaction =
  models.DeletedTransactions ||
  model('DeletedTransactions', DeletedTransactionSchema);

export default DeletedTransaction;
