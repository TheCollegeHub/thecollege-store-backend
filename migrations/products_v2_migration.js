db.collection('productsv2').insertMany([
  {
    "_id": new ObjectId("66bfde5dfc26b8674dfd6048"),
    "title": "Green Nike sports shoe",
    "stock": 15,
    "price": 135,
    "sku": "TN001",
    "salePrice": 30,
    "thumbnail": "/api/v1/images?type=products&name=nike-shoes",
    "categoryId": "66c120d0133f145677b3a80b",
    "description": "Green Nike sports shoe",
    "productType": "Clothes",
    "images": [
      "/api/v1/images?type=products&name=nike-shoes",
      "/api/v1/images?type=products&name=NikeWildhorse",
      "/api/v1/images?type=products&name=NikeAirJordonwhiteMagenta"
    ]
  },
  {
    "_id": new ObjectId("66bfde5dfc26b8674dfd6049"),
    "title": "Blue T-shirt for all ages",
    "stock": 15,
    "sku": "GML123",
    "price": 35,
    "salePrice": 30,
    "thumbnail": "/api/v1/images?type=products&name=tshirt_blue_without_collar_front",
    "categoryId": "66c121aa133f145677b3a813",
    "description": "This is a Product description for Blue Nike Sleeve less vest. There are more things that can be added but i am just practicing and nothing else.",
    "productType": "Clothes",
    "images": [
      "/api/v1/images?type=products&name=tshirt_blue_without_collar_back",
      "/api/v1/images?type=products&name=tshirt_blue_without_collar_front",
      "/api/v1/images?type=products&name=product-shirt"
    ]
  },
  {
    "_id": new ObjectId("66bfde5dfc26b8674dfd604a"),
    "title": "SAMSUNG Galaxy S9 (Pink, 64 GB)  (4 GB RAM)",
    "stock": 15,
    "sku": "SMP001",
    "price": 750,
    "salePrice": 650,
    "thumbnail": "/api/v1/images?type=products&name=samsung_s9_mobile",
    "categoryId": "66c12058133f145677b3a808",
    "description": "SAMSUNG Galaxy S9 (Pink, 64 GB)  (4 GB RAM), Long Battery timing",
    "productType": "Electronics",
    "images": [
      "/api/v1/images?type=products&name=samsung_s9_mobile",
      "/api/v1/images?type=products&name=samsung_s9_mobile_withback",
      "/api/v1/images?type=products&name=samsung_s9_mobile_back"
    ]
  },
  {
    "_id": new ObjectId("66bfde5dfc26b8674dfd604b"),
    "title": "APPLE iPhone 8 (Black, 64 GB)",
    "stock": 15,
    "sku": "SMP002",
    "price": 480,
    "salePrice": 380,
    "thumbnail": "/api/v1/images?type=products&name=iphone8_mobile",
    "categoryId": "66c12058133f145677b3a808",
    "description": "This is a Product description for iphone 8. There are more things that can be added but i am just practicing and nothing else.",
    "productType": "Electronics",
    "images": [
      "/api/v1/images?type=products&name=iphone8_mobile_back",
      "/api/v1/images?type=products&name=iphone8_mobile_dual_side",
      "/api/v1/images?type=products&name=iphone8_mobile_front"
    ]
  },
  {
    "_id": new ObjectId("66c668b9a3580d7fafd22a25"),
    "title": "Acer Laptop RAM 8gb to 16gb 512gb to 2tb",
    "stock": 15,
    "price": 950,
    "sku": "NOTB001",
    "salePrice": 800,
    "thumbnail": "/api/v1/images?type=products&name=acer_laptop_var_1",
    "categoryId": "66c66876a3580d7fafd22a23",
    "description": "This is a Product description for Acer Laptop. There are more things that can be added but i am just practicing and nothing else.",
    "productType": "Electronics",
    "images": [
      "/api/v1/images?type=products&name=acer_laptop_1",
      "/api/v1/images?type=products&name=acer_laptop_2",
      "/api/v1/images?type=products&name=acer_laptop_3"
    ]
  },
  {
    "_id": new ObjectId("66c6698ca3580d7fafd22a28"),
    "title": "Acer Laptop 6gb 1tb",
    "stock": 15,
    "price": 400,
    "sku": "NOTB002",
    "salePrice": 375,
    "thumbnail": "/api/v1/images?type=products&name=acer_laptop_2",
    "categoryId": "66c66876a3580d7fafd22a23",
    "description": "This is a Product description for Acer Laptop. There are more things that can be added but i am just practicing and nothing else.",
    "productType": "Electronics",
    "images": [
      "/api/v1/images?type=products&name=acer_laptop_1",
      "/api/v1/images?type=products&name=acer_laptop_var_2",
      "/api/v1/images?type=products&name=acer_laptop_var_3"
    ]
  },
  {
    "_id": new ObjectId("66c66a35a3580d7fafd22a29"),
    "title": "Office Chair Red",
    "stock": 15,
    "price": 150,
    "sku": "OFFI001",
    "salePrice": 100,
    "thumbnail": "/api/v1/images?type=products&name=office_chair_1",
    "categoryId": "66c6682ba3580d7fafd22a22",
    "description": "This is a Product description for Office Chair. There are more things that can be added but i am just practicing and nothing else.",
    "productType": "Furniture",
    "images": [
      "/api/v1/images?type=products&name=office_chair_2"
    ]
  },
  {
    "_id": new ObjectId("66c66adea3580d7fafd22a2e"),
    "title": "Office Desk Red",
    "stock": 15,
    "price": 360,
    "sku": "OFFI002",
    "salePrice": 340,
    "thumbnail": "/api/v1/images?type=products&name=office_desk_1",
    "categoryId": "66c6682ba3580d7fafd22a22",
    "description": "This is a Product description for Office Desk. There are more things that can be added but i am just practicing and nothing else.",
    "productType": "Furniture",
    "images": [
      "/api/v1/images?type=products&name=office_desk_2"
    ]
  }
]
);