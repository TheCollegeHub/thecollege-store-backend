db.orders.updateMany(
  { 
    $or: [
      { status: { $exists: false } },
      { updatedDate: { $exists: false } }
    ]
  },
  { 
    $set: { 
      status: "PENDING",
      updatedDate: new Date()
    }
  }
)