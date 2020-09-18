import express from "express";
import Category from "../modals/categoryModel";
import { isAuth, isAdmin } from '../util';

const router = express.Router();

router.get("", async (req, res) => {
    const category = await Category.find({});
    res.send(category);
});


router.post("", isAuth, isAdmin, async (req, res) => {
    const category = new Category(req.body);
    const newCategory = await category.save();
    if (newCategory) {
        // 201 is code of creating an item
        return res.status(201).send({ message: "New category created!", data: newCategory })
    }
    return res.status(500).send({
        message: "Error in creating category!"
    })
});

router.put("/:id", isAuth, isAdmin, async (req, res) => {
    const category = await Category.findOne({ _id: req.params.id });
    if (req.body.activation) {
        category.active = req.body.active;
    } else if (category) {
        category.created_by = req.body.created_by;
        category.image = req.body.image;
        category.name = req.body.name;
        category.headCategory = req.body.headCategory;
        category.isSubCategory = req.body.isSubCategory;
        category.brand = req.body.brand;
        category.description = req.body.description;
    };
    // after entering the values of the above, wait until it is loaded
    const categoryUpdated = await category.save();
    // check if product created succefully
    if (categoryUpdated) {
        // 201 is code of creating an item
        return res.status(200).send({ message: "Category has been updated!", data: categoryUpdated })
    }
    return res.status(500).send({
        message: "Error in updating category!"
    })
});

router.delete("/:id", isAuth, isAdmin, async (req, res) => {
    const categoryDeleted = await Category.findByIdAndRemove(req.params.id);
    if (categoryDeleted) {
        return res.status(200).send({ message: "Category has been deleted!", data: categoryDeleted });
    }
    return res.status(500).send({
        message: "Error in deleting category!"
    })
});


export default router;