const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const campgroundschema = new Schema({
    title: String,
    price: Number,
    image: String,
    description: String,
    location: String,
    reviews: [{
      type: Schema.Types.ObjectId,
      ref: 'Review'
    }]
});

campgroundschema.post('findOneAndDelete', async function(doc) {
  console.log(doc);
})
module.exports = mongoose.model('Campground', campgroundschema);
