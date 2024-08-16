db.collection('categories').insertMany([
    {
      name: 'Electronics',
      image: 'https://example.com/electronics.jpg',
      parentId: '',
      isFeatured: true
    },
    {
      name: 'Laptops',
      image: 'https://example.com/laptops.jpg',
      parentId: '1',
      isFeatured: true
    },
    {
      name: 'Smartphones',
      image: 'https://example.com/smartphones.jpg',
      parentId: '1',
      isFeatured: false
    },
    {
      name: 'Furniture',
      image: 'https://example.com/furniture.jpg',
      parentId: '',
      isFeatured: true
    },
    {
      name: 'Chairs',
      image: 'https://example.com/chairs.jpg',
      parentId: '4',
      isFeatured: false
    },
    {
      name: 'Tables',
      image: 'https://example.com/tables.jpg',
      parentId: '4',
      isFeatured: true
    }
  ]);
  