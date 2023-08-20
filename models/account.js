import { Schema, model, models } from 'mongoose';

const AccountSchema = new Schema({
  accountName: {
    type: String,
    required: [true, 'Account Name is required'],
  },
  accountType: {
    type: String,
    required: [true, 'Account type is required'],
  },
  amount: {
    type: Number,
    required: [true, 'Amount is required when creating an account'],
  },
  user: {
    type: String,
    required: [true, 'Must be logged in to save account'],
  },
  createdOn: {
    type: Date,
  },
});

const Account = models.Accounts || model('Accounts', AccountSchema);

export default Account;
