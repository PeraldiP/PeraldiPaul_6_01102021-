const multer = require ('multer');

const MIME_TYPES = {
    'images/jpg': 'jpg',
    'images/jpeg':'jpg',
    'images/png':'png'
};

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'images')
    },
    filename: (req, file , callback) => {
        const name = file.originalname.split(' ').join('_');
        const extension = MIME_TYPE[file.mimetype];
        callback(null, name + Date.now() + '.' + extention);
    }
});

module.exports = multer({ storage : storage }).single('image');