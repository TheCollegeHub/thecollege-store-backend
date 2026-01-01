
import { Product , ProductV2} from "../models/product"
import Favorite from "../models/favoriteModel";
import multer, { diskStorage } from "multer";
import { extname } from "path";


// endpoint for getting all products data
export async function getAllproducts(req, res) {
    let products = await Product.find({}).populate('category');
    console.log("All Products");
    res.send(products);
  };
  
  
  // endpoint for getting latest products data
  export async function getNewcollections(req, res) {
    let products = await Product.find({}).populate('category');
    let arr = products.slice(0).slice(-8);
    console.log("New Collections");
    res.send(arr);
  };
  
  
  // endpoint for getting women products data
  // Now filters by gender instead of category
  export async function getPopularinwomen(req, res) {
    let products = await Product.find({ gender: "women" }).populate('category');
    let arr = products.splice(0, 4);
    console.log("Popular In Women");
    res.send(arr);
  };
  
  // endpoint for getting related products by category ID
  export async function getRelatedProducts(req, res) {
    console.log("Related Products");
    const { category } = req.body; // Expects categoryId (ObjectId)
    
    if (!category) {
      return res.status(400).json({ error: 'Category ID is required' });
    }
    
    const products = await Product.find({ category }).populate('category');
    const arr = products.slice(0, 4);
    res.send(arr);
  };

  // endpoint for getting related products by product ID
  // Pass a product ID and get all products in the same category
  export async function getRelatedProductsByProductId(req, res) {
    console.log("Related Products By Product ID");
    const { productId } = req.params;
    const limit = req.query.limit || 4;
    
    if (!productId) {
      return res.status(400).json({ error: 'Product ID is required' });
    }
    
    try {
      // Find the product
      const product = await Product.findById(productId).populate('category');
      
      if (!product) {
        return res.status(404).json({ error: 'Product not found' });
      }
      
      // Get the category of this product
      const category = product.category;
      
      // Find other products in the same category (excluding this product)
      const relatedProducts = await Product.find({ 
        category: category._id,
        _id: { $ne: productId }
      })
      .populate('category')
      .limit(parseInt(limit));
      
      res.status(200).json({
        product: product,
        relatedProducts: relatedProducts,
        count: relatedProducts.length
      });
      
    } catch (error) {
      console.error('Error getting related products:', error);
      res.status(400).json({ error: error.message });
    }
  };

  
  
// Create an endpoint for adding products using admin panel
// Now requires category to be a valid Category ObjectId
export async function addProduct(req, res) {
    try {
      const { name, description, image, category, gender, new_price, old_price } = req.body;
      
      if (!name || !description || !image || !category) {
        return res.status(400).json({ success: false, error: 'Missing required fields' });
      }
      
      let products = await Product.find({});
      let id;
      if (products.length > 0) {
        let last_product_array = products.slice(-1);
        let last_product = last_product_array[0];
        id = last_product.id + 1;
      }
      else { id = 1; }
      
      const product = new Product({
        id: id,
        name: name,
        description: description,
        image: image,
        category: category, // ObjectId reference
        gender: gender || 'men', // Default to 'men' if not provided
        new_price: new_price,
        old_price: old_price,
      });
      
      await product.save();
      const populatedProduct = await product.populate('category');
      console.log("Saved");
      res.json({ success: true, name: name, product: populatedProduct })
    } catch (error) {
      console.error('Error adding product:', error);
      res.status(400).json({ success: false, error: error.message });
    }
  };
  
  
  // Create an endpoint for removing products using admin panel
  export async function removeProduct(req, res) {
    try {
      const product = await Product.findOneAndDelete({ id: req.body.id });
      if (!product) {
        return res.status(404).json({ success: false, error: 'Product not found' });
      }
      console.log("Removed");
      res.json({ success: true, name: req.body.name })
    } catch (error) {
      console.error('Error removing product:', error);
      res.status(400).json({ success: false, error: error.message });
    }
  };

  
  export async function getProductsV2(req, res) {
    try {
      const products = await ProductV2.find();
  
      res.json(products);
    } catch (error) {
      res.status(500).json({ message: 'Error retrieving products', error });
    }
  };
  
  export async function getFavouriteProducts(req, res) {
    const productIds = req.body.productIds; 
  
    try {
      const products = await ProductV2.find({ _id: { $in: productIds } });
      res.status(200).json(products);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
  
  export async function getProductsByCategory(req, res) {
    const { categoryId, limit } = req.query;
    const limitInt = parseInt(limit, 10) || 4;

    console.log(categoryId)
  
    try {
      const products = await ProductV2.find({ categoryId }).limit(limitInt);
      res.status(200).json(products);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
  
  export async function seachProduct(req, res) {
    try {
      const { query, categoryId, brandId, minPrice, maxPrice } = req.query;
  
      let filter = {};
  
      if (query) {
        filter.title = { $regex: query, $options: 'i' }; 
      }
  
      if (categoryId) {
        filter.categoryId = categoryId;
      }
  
      if (brandId) {
        filter.sku = brandId;
      }
  
      if (minPrice) {
        filter.price = { ...filter.price, $gte: parseFloat(minPrice) };
      }
  
      if (maxPrice) {
        filter.price = { ...filter.price, $lte: parseFloat(maxPrice) };
      }
  
      const products = await ProductV2.find(filter);
  
      res.status(200).json(products);
    } catch (err) {
      res.status(500).json({ error: 'Error to searcg product' });
    }
  };

  
//Image Storage Engine 
const storage = diskStorage({
  destination: './upload/images',
  filename: (req, file, cb) => {
    return cb(null, `${file.fieldname}_${Date.now()}${extname(file.originalname)}`)
  }
})

const upload = multer({ storage: storage })

export async function uploadProduct(req, res) {
  res.json({
    success: 1,
    image_url: `/images/${req.file.filename}`
  })
}

//endpoint to toggle favourite product
export const toggleFavouriteProduct = async (req, res) => {
  try {
    const { userId, productId } = req.body;

    if (!userId || !productId) {
      return res.status(400).json({ message: "userId e productId are required." });
    }

    const productExists = await Product.findById(productId);
    if (!productExists) {
      return res.status(404).json({ message: "Product not found." });
    }

    let favorite = await Favorite.findOne({ userId });

    if (!favorite) {
      favorite = new Favorite({ userId, products: [productId] });
      await favorite.save();
      return res.status(201).json({ message: "Product added to favorites.", favorites: favorite });
    }

    const isFavourite = favorite.products.some(id => id.toString()  === productId);

    if (isFavourite) {
      favorite.products = favorite.products.filter(id => id.toString()  !== productId);
    } else {
      favorite.products.push(productId);
    }

    await favorite.save();

    res.status(200).json({
      message: isFavourite ? "Produto removed from favorites." : "Product added to favorites.",
      favorites: favorite
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error to update favorites.", error: error.message });
  }
};

export const getUserFavorites = async (req, res) => {
  try {
    const { userId } = req.params;

    const favorite = await Favorite.findOne({ userId }).populate("products");

    if (!favorite) {
      return res.status(404).json({ message: "No favorite product found for the user" });
    }

    res.status(200).json(favorite);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error to get favorites.", error: error.message });
  }
};
