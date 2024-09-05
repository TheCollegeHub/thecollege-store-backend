import { Category } from "../models/category";

export async function getAllCategoriesByParentId(req, res) {
// app.get('/api/v1/categories', async (req, res) => {
    const { parentId } = req.query;
    try {
      let categories;
      if (parentId) {
        categories = await Category.find({ parentId });
      } else {
        categories = await Category.find();
      }
      res.json(categories);
    } catch (error) {
      res.status(500).json({ message: 'Error to get categories', error });
    }
  };
  