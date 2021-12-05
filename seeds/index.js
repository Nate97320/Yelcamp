const mongoose = require('mongoose');
const cities = require('./cities');
const descriptors = require('./seedHelpers');
const places = require('./seedHelpers');
const Campground = require('../models/campground');


mongoose.connect('mongodb://localhost:27017/Yelcamp', {
  useNewUrlParser: true,
  // useCreateIndex: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, 'connection error:'));
db.once('open', ()=> {
  console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i=0; i<50; i++) {
      const random1000 = Math.floor(Math.random() * 1000);
      const price = Math.floor(Math.random() * 50 ) + 10;
      const camp = new Campground({
          author:'61a4c10b2b8691bde5517902',
          location: `${cities[random1000].city}, ${cities[random1000].state}`,
          title: `${sample(descriptors)} ${sample(places)}`,
          image: 'https://source.unsplash.com/collection/483251/1600x900',
          description: 'Camping is a fun recreational activity that allows you to enjoy the outdoors',
          price

        })
         await camp.save();
    }
  // const c = new Campground({ title: 'purple field'});
  // await c.save();
}

seedDB().then(() => {
  mongoose.connection.close();
})
