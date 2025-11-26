db.orders.updateMany(
  {},
  { 
    $unset: { 
      status: "",
      updatedDate: ""
    }
  }
)