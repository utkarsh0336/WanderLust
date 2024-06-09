const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review.js");

const listingSchema = Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  image: {
    url: String,
    filename: String,
  },
  price: {
    type: Number,
    min: 0,
  },
  location: {
    type: String,
  },
  country: {
    type: String,
  },
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  geometry: {
    type: {
      type: String,
      enum: ["Point"],
      required: true,
    },
    coordinates: {
      type: [Number],
      required: true,
    },
  },
  category: {
    type: String,
    enum: [
      "trending",
      "beach",
      "arctic",
      "outside",
      "iconic-city",
      "castles",
      "pool",
      "camping",
      "cabin",
      "farms",
      "mountain",
      "domes",
      "boats",
      "tropical",
      "windmill",
      "ski",
      "chef",
      "disabled",
      "play",
    ],
  },
  typeOfPlace: {
    type: String,
    enum: ["entire-place", "room", "shared-room"],
  },
  bedrooms: {
    type: Number,
    max: 8,
  },
  beds: {
    type: Number,
    max: 8,
  },
  locked: {
    type: String,
    enum: ["yes", "no"],
  },
  other: {
    type: String,
    enum: ["no", "me", "family", "other-guests"],
  },
});

listingSchema.post("findOneAndDelete", async (listing) => {
  if (listing) {
    await Review.deleteMany({ _id: { $in: listing.reviews } });
  }
});

const Listing = mongoose.model("Listing", listingSchema);

module.exports = Listing;
