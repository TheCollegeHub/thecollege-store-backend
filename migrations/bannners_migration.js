db.banners.insertMany([{
    imageUrl: "/api/v1/images?type=banners&name=banner_1",
    targetScreen: "HomeScreen",
    active: true
  },
  {
    imageUrl: "/api/v1/images?type=banners&name=banner_2",
    targetScreen: "CheckoutScreen",
    active: true
  },
  {
    imageUrl: "/api/v1/images?type=banners&name=banner_3",
    targetScreen: "FavouriteScreen",
    active: true
  }]);