import mongoose from 'mongoose';

var imageSchema = new mongoose.Schema({
    name: { type: String, required: true },
    desc: { type: String, required: false },
    img: { data: Buffer, contentType: String }
});

//Image is a model which has a schema imageSchema 

const Image = mongoose.model('Image', imageSchema);
export default Image;