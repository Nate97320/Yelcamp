const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const Formidable = require('formidable');
// const express = require('express');
const multer = require('multer');



cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'Yelcamp',
        allowedFormats: ['jpeg', 'png', 'jpg']
    }
});


module.exports = { cloudinary, storage };
