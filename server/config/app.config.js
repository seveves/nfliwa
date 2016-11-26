module.exports = {
  "secret": process.env.SESSION_SECRET || 'secret-cat-fish',
  "cloudinary": {
    "name": process.env.CLOUDINARY_NAME,
    "key": process.env.CLOUDINARY_KEY,
    "secret": process.env.CLOUDINARY_SECRET
  },
  "mongodb": process.env.MONGODB_URI || 'mongodb://localhost/naturfreunde'
};