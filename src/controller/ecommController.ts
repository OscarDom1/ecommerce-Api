import { Request, Response } from "express";
import { v2 as cloudinaryV2 } from "cloudinary";
import { createItemSchema, option, updateItemSchema,  } from "../utilis/utilis";
import Ecommerce from "../model/ecomModel";

export const createItem = async (req: Request | any, res: Response) => {
  try {
    const verify = req.user;

    //validate todo form inputs
    const validateUser = createItemSchema.validate(req.body, option);

    if (validateUser.error) {
      res.status(400).json({ Error: validateUser.error.details[0].message });
    }

    let links = [];
    if (Array.isArray(req.files) && req.files.length > 0) {
      // Upload images to Cloudinary and retrieve their URLs
      links = await Promise.all(req.files.map(async (item: Record<string, any>) => {
        const result = await cloudinaryV2.uploader.upload(item.path);
        return result.secure_url;
      }));
    }


    const newItem = await Ecommerce.create({
      ...validateUser.value,
      user: verify._id,
      pictures: links,
    });

    return res
      .status(200)
      .json({ message: "Item created successfully", newItem });
  } catch (error) {
    console.log(error);
  }
};

export const updateItem = async (req: Request, res: Response) => {
  try {
    const { pictures, ...rest } = req.body;
    const { id } = req.params;
    //validate todo form inputs
    const validateUser = updateItemSchema.validate(req.body, option);

    if (validateUser.error) {
      res.status(400).json({ Error: validateUser.error.details[0].message });
    }

    const item = await Ecommerce.findById({ _id: id });

    if (!item) {
      return res.status(400).json({
        error: "Item not found",
      });
    }
    const updateRecord = await Ecommerce.findByIdAndUpdate(id,
      {
        ...rest,
        pictures,
    
      },

      {
        new: true,
        runValidators: true,
        context: "query",
      }
    );

    if (!updateRecord) {
      return res.status(404).json({
        msg: "Item not updated",
      });
    }

    return res.status(200).json({
      message: "Item updates successfully",
      updateRecord,
    });
  } catch (error) {
    console.log(error);
  }
};

export const singleItem = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const getsingleItem = await Ecommerce.findById(id);

    if (!getsingleItem) {
      return res.status(400).json({
        error: "Item not found",
      });
    }
    res.status(200).json({
      msg: "Item successfully fetched",
      getsingleItem
    });
  } catch (error) {
    console.log(error);
  }
};

export const getUserItems = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const getAllUserItems = await Ecommerce.find({ user: userId });

    res.status(200).json({
      msg: "Item successfully fetched",
      getAllUserItems,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getAllItems = async (req: Request, res: Response) => {
  try {
    const allItems = await Ecommerce.find().populate('user', 'email');
    res.status(200).json({
      msg: "All Items successfully fetched",
      allItems });
  
  } catch (error) {
    console.log(error);
  }
};

export const deleteItem = async (req: Request, res: Response) => {

  try{
    const postId = req.params.id;

        // Find the post by ID and delete it
        const deletedItem = await Ecommerce.findByIdAndDelete(postId);

        if (!deletedItem) {
          return res.status(404).json({ message: 'Item not found' });
        }
        res.status(200).json({ message: 'Item deleted successfully', deletedItem });

  } catch (error) {
    console.log(error);
  }
}




