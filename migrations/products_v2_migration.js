db.productsv2.insertMany([
    {
      title: 'Green Nike sports shoe',
      stock: 15,
      price: 135,
      sku: 'TN001',
      salePrice: 30,
      thumbnail: '/api/v1/images?type=products&name=nike-shoes',
      categoryId: '<categoryId>',
      description: 'Green Nike sports shoe',
      productType: 'Electronics',
      images: [
        '/api/v1/images?type=products&name=nike-shoes',
        '/api/v1/images?type=products&name=NikeWildhorse',
        '/api/v1/images?type=products&name=NikeAirJordonwhiteMagenta',
      ]
    },
    {
      title: 'Blue T-shirt for all ages',
      stock: 15,
      sku: 'GML123',
      price: 35,
      salePrice: 30,
      thumbnail: '/api/v1/images?type=products&name=tshirt_blue_without_collar_front',
      categoryId: '<categoryId>',
      description:
          'This is a Product description for Blue Nike Sleeve less vest. There are more things that can be added but i am just practicing and nothing else.',
      productType: 'Electronics',
      images: [
        '/api/v1/images?type=products&name=tshirt_blue_without_collar_back',
        '/api/v1/images?type=products&name=tshirt_blue_without_collar_front',
        '/api/v1/images?type=products&name=product-shirt'
      ]
    },
    {
      title: 'SAMSUNG Galaxy S9 (Pink, 64 GB)  (4 GB RAM)',
      stock: 15,
      sku: 'SMP001',
      price: 750,
      salePrice: 650,
      thumbnail: '/api/v1/images?type=products&name=samsung_s9_mobile',
      categoryId: '<categoryId>',
      description: 'SAMSUNG Galaxy S9 (Pink, 64 GB)  (4 GB RAM), Long Battery timing',
      productType: 'Electronics',
      images: [
        '/api/v1/images?type=products&name=samsung_s9_mobile',
        '/api/v1/images?type=products&name=samsung_s9_mobile_withback',
        '/api/v1/images?type=products&name=samsung_s9_mobile_back'
      ],
    },
    {
      title: 'APPLE iPhone 8 (Black, 64 GB)',
      stock: 15,
      sku: 'SMP002',
      price: 480,
      salePrice: 380,
      thumbnail: '/api/v1/images?type=products&name=iphone8_mobile',
      categoryId: '<categoryId>',
      description:
          'This is a Product description for iphone 8. There are more things that can be added but i am just practicing and nothing else.',
      productType: 'Electronics',
      images: [
        '/api/v1/images?type=products&name=iphone8_mobile_back',
        '/api/v1/images?type=products&name=iphone8_mobile_dual_side',
        '/api/v1/images?type=products&name=iphone8_mobile_front'
      ],
    }
  ]);