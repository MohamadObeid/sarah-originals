import express from "express"
import Brand from "../modals/brandModel"
import { isAuth, isAdmin } from '../util'

const router = express.Router()

router.get("", async (req, res) => {
    const brand = await Brand.find({})
    res.send(brand)
});


router.post("", isAuth, isAdmin, async (req, res) => {
    const brand = new Brand(req.body)
    const newbrand = await brand.save()
    if (newbrand) {
        // 201 is code of creating an item
        return res.status(201).send({ message: "New brand created!", data: newbrand })
    }
    return res.status(500).send({
        message: "Error in creating brand!"
    })
});

router.put("/:id", isAuth, isAdmin, async (req, res) => {
    const brand = await Brand.findOne({ _id: req.params.id })
    if (brand) {
        if (brand.created_by)
            brand.created_by = req.body.created_by;
        brand.modified = req.body.modified;
        brand.name = req.body.name;
        brand.origin = req.body.origin;
        brand.supplier = req.body.supplier;
        brand.phone = req.body.phone;
        brand.description = req.body.description;
    };
    const brandUpdated = await brand.save()
    if (brandUpdated) {
        // 201 is code of creating an item
        return res.status(200).send({ message: "Brand has been updated!", data: brandUpdated })
    }
    return res.status(500).send({
        message: "Error in updating brand!"
    })
});

router.delete("/:id", isAuth, isAdmin, async (req, res) => {
    const brandDeleted = await Brand.findByIdAndRemove(req.params.id)
    if (brandDeleted) {
        return res.status(200).send({ message: "brand has been deleted!", data: brandDeleted })
    }
    return res.status(500).send({
        message: "Error in deleting brand!"
    })
});


export default router;