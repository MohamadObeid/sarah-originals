import express from 'express';
import mongoose from 'mongoose';
import Image from '../modals/imageModel';
import config from '../config';
import multer from 'multer';
import crypto from 'crypto';
import path from 'path';
import GridFsStorage from 'multer-gridfs-storage'

const router = express.Router()
const mongodbUrl = config.MONGODB_URL;

const connect = mongoose.createConnection(mongodbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
connect.once('open', () => {
    // initialize stream
    gfs = new mongoose.mongo.GridFSBucket(connect.db, {
        bucketName: "uploads",
    })
})

let gfs;

const storage = new GridFsStorage({
    url: mongodbUrl,
    file: (req, file) => {
        return new Promise((resolve, reject) => {
            crypto.randomBytes(16, (err, buf) => {
                if (err) {
                    return reject(err);
                }
                const filename = buf.toString('hex') + path.extname(file.originalname);
                const fileInfo = {
                    filename: filename,
                    bucketName: 'uploads'
                };
                resolve(fileInfo);
            });
        });
    },
    options: {
        useUnifiedTopology: true,
    }
})

const upload = multer({ storage })
/*
    POST: Upload a single image/file to Image collection
*/
router.post('', upload.single('file'), (req, res, next) => {
    if (!req.file) {
        console.log('File is empty')
        return
    }
    // check for existing images
    let newImage = new Image({
        filename: req.file.filename,
        fileId: req.file.id,
    });

    newImage.save()
        .then((image) => {
            res.status(200).json({
                success: true,
                image,
            });
        })
        .catch(err => res.status(500).json(err));
})
    .get((req, res, next) => {
        Image.find({})
            .then(images => {
                res.status(200).json({
                    success: true,
                    images,
                });
            })
            .catch(err => res.status(500).json(err));
    });

/*
    GET: Delete an image from the collection
*/
router.route('/delete/:id')
    .get((req, res, next) => {
        Image.findOne({ _id: req.params.id })
            .then((image) => {
                if (image) {
                    Image.deleteOne({ _id: req.params.id })
                        .then(() => {
                            return res.status(200).json({
                                success: true,
                                message: `File with ID: ${req.params.id} deleted`,
                            });
                        })
                        .catch(err => { return res.status(500).json(err) });
                } else {
                    res.status(200).json({
                        success: false,
                        message: `File with ID: ${req.params.id} not found`,
                    });
                }
            })
            .catch(err => res.status(500).json(err));
    });

/*
    GET: Fetch most recently added record
*/
router.route('/recent')
    .get((req, res, next) => {
        Image.findOne({}, {}, { sort: { '_id': -1 } })
            .then((image) => {
                res.status(200).json({
                    success: true,
                    image,
                });
            })
            .catch(err => res.status(500).json(err));
    });

/*
    POST: Upload multiple files upto 3
*/
router.route('/multiple')
    .post(upload.array('file', 3), (req, res, next) => {
        res.status(200).json({
            success: true,
            message: `${req.files.length} files uploaded successfully`,
        });
    });

/*
    GET: Fetches all the files in the uploads collection
*/
router.route('/files')
    .get((req, res, next) => {
        gfs.find().toArray((err, files) => {
            if (!files || files.length === 0) {
                return res.status(200).json({
                    success: false,
                    message: 'No files available'
                });
            }

            files.map(file => {
                if (file.contentType === 'image/jpeg' || file.contentType === 'image/png' || file.contentType === 'image/svg') {
                    file.isImage = true;
                } else {
                    file.isImage = false;
                }
            });

            res.status(200).json({
                success: true,
                files,
            });
        });
    });

/*
    GET: Fetches a particular file by filename
*/
router.route('/file/:filename')
    .get((req, res, next) => {
        gfs.find({ filename: req.params.filename }).toArray((err, files) => {
            if (!files[0] || files.length === 0) {
                return res.status(200).json({
                    success: false,
                    message: 'No files available',
                });
            }

            res.status(200).json({
                success: true,
                file: files[0],
            });
        });
    });

/* 
    GET: Fetches a particular image and render on browser
*/
router.route('/image/:filename')
    .get((req, res, next) => {
        gfs.find({ filename: req.params.filename }).toArray((err, files) => {
            if (!files[0] || files.length === 0) {
                return res.status(200).json({
                    success: false,
                    message: 'No files available',
                });
            }

            if (files[0].contentType === 'image/jpeg' || files[0].contentType === 'image/png' || files[0].contentType === 'image/svg+xml') {
                // render image to browser
                gfs.openDownloadStreamByName(req.params.filename).pipe(res);
            } else {
                res.status(404).json({
                    err: 'Not an image',
                });
            }
        });
    });

/*
    DELETE: Delete a particular file by an ID
*/
router.route('/file/del/:id')
    .post((req, res, next) => {
        console.log(req.params.id);
        gfs.delete(new mongoose.Types.ObjectId(req.params.id), (err, data) => {
            if (err) {
                return res.status(404).json({ err: err });
            }

            res.status(200).json({
                success: true,
                message: `File with ID ${req.params.id} is deleted`,
            });
        });
    });

export default router;