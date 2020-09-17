import express from 'express';
import Image from '../modals/imageModel'
import fs from 'fs';
import path from 'path';
import multer from 'multer';

const router = express.Router()

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now())
    }
});

var upload = multer({ storage: storage });

router.get('', (req, res) => {
    Image.find({}, (err, items) => {
        if (err) {
            console.log(err);
        }
        else {
            res.render('app', { items: items });
        }
    });
});

// Uploading the image 
router.post('', upload.single('image'), (req, res, next) => {

    var obj = {
        name: req.body.name,
        desc: req.body.desc,
        img: {
            data: fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename)),
            contentType: 'image/png'
        }
    }
    Image.create(obj, (err, item) => {
        if (err) {
            console.log(err);
        }
        else {
            // item.save(); 
            res.redirect('');
        }
    });
});

export default router;