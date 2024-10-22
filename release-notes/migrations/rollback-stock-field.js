db.products.updateMany(
    { stock: { $exists: true } },
    {
      $unset: { stock: "" }
    }
  );