const mongoose = require('mongoose');
const Review = require('./reviews');
const Schema = mongoose.Schema;



const ImageSchema = new Schema({
     url: String,
     filename: String
});

ImageSchema.virtual('thumbnail').get(function() {
   return this.url.replace('/upload', '/upload/w_200');
});

const campgroundschema = new Schema({
    title: String,
    images: [ImageSchema],
    geometry: {
        type: {
            type: String,
            enum: ['Point'],
            require: true
        },
        coordinates: {
            type: [Number],
            require: true
        }
    },
    price: Number,
    description: String,
    location: String,
    author: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    reviews: [{
      type: Schema.Types.ObjectId,
      ref: 'Review'
    }]
});

campgroundschema.virtual('properties.popUpMarkup').get(function() {
   return `<a href ="/campgrounds/${this_id}"> ${this.title}</a>`
});

campgroundschema.post('findOneAndDelete', async function(doc) {
  if (doc) {
          await Review.deleteMany({
              _id: {
                  $in: doc.reviews
              }
          })
      }
  })

module.exports = mongoose.model('Campground', campgroundschema);
