const {
  Schema,
  default: mongoose,
  SchemaType,
  models,
  model,
} = require('mongoose');

const userMetricsSchema = new Schema({
  spending: {
    type: Number,
  },
  income: {
    type: Number,
  },
  balance: {
    type: Number,
  },
  user: {
    email: {
      type: String,
      required: [true, 'Email is required when new user is created'],
    },
    username: {
      type: String,
      required: [true, 'username is required when new user is created'],
    },
  },
  //   user: [{ type: Schema.Types.ObjectId, ref: 'User' }],
});

const userMetrics =
  models.UserMetrics || model('UserMetrics', userMetricsSchema);

export default userMetrics;
