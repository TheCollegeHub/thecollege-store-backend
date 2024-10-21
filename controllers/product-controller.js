
import { Product , ProductV2} from "../models/product"
import multer, { diskStorage } from "multer";
import { extname } from "path";


// endpoint for getting all products data
export async function getAllproducts(req, res) {
// app.get("/allproducts", async (req, res) => {
    let products = await Product.find({});
    console.log("All Products");
    res.send(products);
  };
  
  
  // endpoint for getting latest products data
  export async function getNewcollections(req, res) {
//   app.get("/newcollections", async (req, res) => {
    let products = await Product.find({});
    let arr = products.slice(0).slice(-8);
    console.log("New Collections");
    res.send(arr);
  };
  
  
  // endpoint for getting women products data
  export async function getPopularinwomen(req, res) {
//   app.get("/popularinwomen", async (req, res) => {
    let products = await Product.find({ category: "women" });
    let arr = products.splice(0, 4);
    console.log("Popular In Women");
    res.send(arr);
  };
  
  // endpoint for getting women products data
  
export async function getRelatedProducts(req, res) {
//   app.post("/relatedproducts", async (req, res) => {
  console.log("Related Products");
  const {category} = req.body;
  const products = await Product.find({ category });
  const arr = products.slice(0, 4);
  res.send(arr);
};

export async function getProductsByIds(req, res){
  const { ids } = req.body;

  if (!Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({ message: 'Invalid input, please provide an array of ids.' });
  }

  try {
      const products = await Product.find({ id: { $in: ids } });
      return res.status(200).json(products);
  } catch (error) {
      console.error('Error fetching products:', error);
      return res.status(500).json({ message: 'Internal server error' });
  }
};

  
  
// Create an endpoint for adding products using admin panel
export async function addProduct(req, res) {
// app.post("/addproduct", async (req, res) => {
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
      name: req.body.name,
      description: req.body.description,
      image: req.body.image,
      category: req.body.category,
      new_price: req.body.new_price,
      old_price: req.body.old_price,
    });
    await product.save();
    console.log("Saved");
    res.json({ success: true, name: req.body.name })
  };
  
  
  // Create an endpoint for removing products using admin panel
  export async function removeProduct(req, res) {
//   app.post("/removeproduct", async (req, res) => {
    await Product.findOneAndDelete({ id: req.body.id });
    console.log("Removed");
    res.json({ success: true, name: req.body.name })
  };

  
  export async function getProductsV2(req, res) {
// app.get('/api/v2/products', async (req, res) => {
    try {
      // Consulta os produtos com o filtro aplicado
      const products = await ProductV2.find();
  
      // Retorna a lista de produtos encontrados
      res.json(products);
    } catch (error) {
      // Retorna uma mensagem de erro se algo der errado
      res.status(500).json({ message: 'Error retrieving products', error });
    }
  };
  
  export async function getFavouriteProducts(req, res) {
//   app.post('/api/v2/products/favourites', async (req, res) => {
    const productIds = req.body.productIds; 
  
    try {
      const products = await ProductV2.find({ _id: { $in: productIds } });
      res.status(200).json(products);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
  
  export async function getProductsByCategory(req, res) {
//   app.get('/api/v2/products/category', async (req, res) => {
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
//   app.get('/api/v1/products/search', async (req, res) => {
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
// app.post("/upload", upload.single('product'), (req, res) => {
  res.json({
    success: 1,
    image_url: `/images/${req.file.filename}`
  })
}