db.collection('banners').insertMany([{
    imageUrl: "/api/v1/images?type=banners&name=banner_1",
    targetScreen: "/cart",
    active: true
  },
  {
    imageUrl: "/api/v1/images?type=banners&name=banner_2",
    targetScreen: "/checkout",
    active: true
  },
  {
    imageUrl: "/api/v1/images?type=banners&name=banner_3",
    targetScreen: "/favourites",
    active: true
  }]);