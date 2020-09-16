import express from 'express';
import multer from 'multer';
/*import { isAuth } from '../util';
import multerS3 from 'multer-s3';
import aws from 'aws-sdk';
import config from '../config';*/

const router = express.Router()

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/')
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`)
    },
    fileFilter: (req, file, cb) => {
        const ext = path.extname(file.originalname)
        if (ext !== '.jpg' || ext !== '.png') {
            return cb(res.status(400).end('only jpg, png are allowed'), false);
        }
        cb(null, true)
    }
})

const upload = multer({ storage })

router.post('', upload.single('image'), (req, res) => {
    res.send(`/${req.file.path}`);
});

/*aws.config.update({
    accessKeyId: config.accessKeyId,
    secretAccessKey: config.secretAccessKey,
})

const s3 = new aws.S3()

const storageS3 = multerS3({
    s3,
    bucket: 'amazona-bucket',
    acl: 'public-read',
    contentType: multerS3.AUTO_CONTENT_TYPE,
    key(req, file, cb) {
        cb(null, file.originalname)
    },
})

const uploadS3 = multer({ storage: storageS3 })
router.post('/s3', uploadS3.single('image'), (req, res) => {
    res.send(req.file.location);
})*/
////////////////////////////////////////
//
//          Upload
//
////////////////////////////////////////

/*const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/')
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`)
    },
    fileFilter: (req, file, cb) => {
        const ext = path.extname(file.originalname)
        if (ext !== '.jpg' || ext !== '.png') {
            return cb(res.status(400).end('only jpg, png are allowed'), false);
        }
        cb(null, true)
    }
})

var upload = multer({ storage: storage }).single("file")

router.post("", isAuth, (req, res) => {

    upload(req, res, err => {
        if (err) {
            return res.json({ success: false, err })
        }
        return res.json({ success: true, image: res.req.file.path, fileName: res.req.file.filename })
    })

});*/

export default router;