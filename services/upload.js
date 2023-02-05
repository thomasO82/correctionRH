const multer = require("multer")
const mimetype = [
    'image/png',
    'image/jpg',
    'image/jpeg',

]
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './assets/img/uploads')
    },
    filename: function (req, file, cb) {
        let extArray = file.mimetype.split("/");
        let extension = extArray[extArray.length - 1];
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix + "." + extension)
    }
})

const upload = multer({
    storage: storage,
    fileFilter: function (req, file, cb) {
        if (!mimetype.includes(file.mimetype) && file.filename == "") {
            req.multerError = 'Entrez un fichier image valide';
            return cb(null, false, new Error('I don\'t have a clue!'));
        }
        cb(null, true);
    }
})

module.exports = upload