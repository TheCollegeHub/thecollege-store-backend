db.collection('categories').insertMany([
  {
    "_id": ObjectId("66c112a01679da194f73670b"),
    "name": "Electronics",
    "image": "/api/v1/images?type=categories&name=electronics",
    "parentId": "",
    "isFeatured": true
  },
  {
    "_id": ObjectId("66c112a01679da194f73670c"),
    "name": "Furniture",
    "image": "/api/v1/images?type=categories&name=furniture",
    "parentId": "",
    "isFeatured": false
  },
  {
    "_id": ObjectId("66c112a01679da194f73670d"),
    "name": "Sports",
    "image": "/api/v1/images?type=categories&name=sports",
    "parentId": "",
    "isFeatured": true
  },
  {
    "_id": ObjectId("66c112a01679da194f73670e"),
    "name": "Clothes",
    "image": "/api/v1/images?type=categories&name=clothes",
    "parentId": "",
    "isFeatured": true
  },
  {
    "_id": ObjectId("66c112a01679da194f73670f"),
    "name": "Shoes",
    "image": "/api/v1/images?type=categories&name=shoes",
    "parentId": "",
    "isFeatured": false
  },
  {
    "_id": ObjectId("66c12058133f145677b3a808"),
    "name": "Smartphones",
    "image": "/api/v1/images?type=categories&name=electronics",
    "parentId": "66c112a01679da194f73670b",
    "isFeatured": true
  },
  {
    "_id": ObjectId("66c120d0133f145677b3a80b"),
    "name": "Sport Shoes",
    "image": "/api/v1/images?type=categories&name=shoes",
    "parentId": "66c112a01679da194f73670d",
    "isFeatured": true
  },
  {
    "_id": ObjectId("66c121aa133f145677b3a813"),
    "name": "T-Shirts",
    "image": "/api/v1/images?type=categories&name=clothes",
    "parentId": "66c112a01679da194f73670e",
    "isFeatured": true
  }
]);