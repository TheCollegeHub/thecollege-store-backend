db.products.updateMany(
    { stock: { $exists: false } }, 
    {
      $set: { stock: 10 } 
    }
  );