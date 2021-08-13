import mongoose from 'mongoose';
const Schema = mongoose.Schema;

//=================================
//         newCoach Model
// Author: Aiden Kim, Donghyun(Dean) Kim
//=================================
const newCoachSchema = new mongoose.Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    firstName: {
      type: String,
      maxlength: 50,
    },
    lastName: {
      type: String,
      maxlength: 50,
    },
    fileUrl: {
      type: String,
    },
    email: {
      type: String,
      trim: true,
      minglength: 5,
    },
    linkedIn: {
      type: String,
    },
    introOfCoach: {
      type: String,
    },
    coachStyle: {
      type: String,
    },
    certification: {
      type: String,
    },
    paidOpt: {
      type: Boolean,
    },
    wage: {
      type: Number,
    },
    numOfPeople: {
      type: Number,
    },
    hoursPerWeek: {
      type: Number,
    },
    expertiseArea: {
      type: Array,
      default: [],
    },
    provideChecked: {
      type: Array,
      default: [],
    },
    token: {
      type: String,
    },
    events: {
      type: Array,
      default: [],
    },
    isApproved: {
      type: Boolean,
      default: false,
    },
    reviews: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Review',
      },
    ],
  },
  { timestamps: true }
);

//=================================
//   User New Coach Schema Function
//   Author: Donghyun(Dean) Kim
//=================================

// Search a token to get a application (This token was stored when user send a application to be a coach)

newCoachSchema.statics.findByToken = function (token, cb) {
  let newCoach = this;

  newCoach.findOne({ token: token }, function (err, user) {
    if (err) return cb(err);
    cb(null, user);
  });
};

const NewCoach = mongoose.model('NewCoach', newCoachSchema);

export default NewCoach;
