const multer = require("multer");
const crypto = require("crypto");

const storage = multer.diskStorage({
    destination: "uploads",
    filename: (req, file, cb) => {
        crypto.randomBytes(16, (err, result) => {
            const hash = result.toString('hex');
            const extension = file.mimetype.split("/")[1];
            const filename = hash + "." + extension;

            cb(null, filename);
        });
    }
});

const upload = multer({
    storage,
    fileFilter: (req, file, cb) => {
        const allowedMime = ['image/jpeg', 'image/png', 'image/gif'];

        if (allowedMime.includes(file.mimetype) == true)
            cb(null, true);
        else {
            const error = new multer.MulterError("", file);
            error.message = "Invalid file type";
            cb(error);
        }
    }
});

module.exports = { upload };