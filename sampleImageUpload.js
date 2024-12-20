const Profile = require('./models/profile');
const multer = require('multer');

// Use multer for handling file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage });

// Express route to handle profile creation with image upload
app.post('/profiles', upload.single('img'), (req, res) => {
  const profileData = req.body;
  const imgPath = req.file.path;

  const newProfile = new Profile({
    ...profileData,
    imgPath: imgPath
  });

  newProfile.save()
    .then(savedProfile => res.status(201).json(savedProfile))
    .catch(err => res.status(400).json(err));
});
