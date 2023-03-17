const db = require("../config/connection");

const { User, Product, Category } = require("../models");

db.once("open", async () => {
  await Category.deleteMany();

  const categories = await Category.insertMany([
    { name: "Food" },
    { name: "Household Supplies" },
    { name: "Electronics" },
    { name: "Books" },
    { name: "Toys" },
  ]);

  console.log("categories seeded");

  await Product.deleteMany();

  const products = await Product.insertMany([
    {
      name: "PlayStation PS5 Console – God of War Ragnarök Bundle",
      description: "PlayStation PS5 Console – God of War Ragnarök Bundle",
      image:
        "https://m.media-amazon.com/images/I/61SUJDrCTLL._AC_UY436_FMwebp_QL65_.jpg",
      category: categories[2]._id,
      price: 599.99,
      rating: 5,
    },
    {
      name: "LEGO DC Batman Batmobile Tumbler",
      description: "LEGO DC Batman Batmobile Tumbler",
      image: "https://m.media-amazon.com/images/I/81reRlhfewL._AC_SX679_.jpg",
      category: categories[4]._id,
      price: 269.95,
      rating: 5,
    },
    {
      name: "SAMSUNG 49” Odyssey G9 Gaming Monitor",
      category: categories[2]._id,
      description:
        "Vestibulum risus metus, luctus non tortor quis, tincidunt consectetur ex. Nullam vitae lobortis ligula, ut sagittis massa. Curabitur consectetur, tellus at pulvinar venenatis, erat augue cursus erat, eu ullamcorper eros lectus ultrices ipsum. Integer rutrum, augue vitae auctor venenatis, turpis turpis elementum orci, at sagittis risus mi a leo.",
      image: "https://m.media-amazon.com/images/I/61SQz8S+fEL._AC_SX679_.jpg",
      price: 1284.24,
      rating: 5,
    },
    {
      name: "3Pcs Modern Bookshelf Decor Sitting Thinker Statue Abstract Sculpture",
      category: categories[1]._id,
      description:
        "Donec volutpat erat erat, sit amet gravida justo sodales in. Phasellus tempus euismod urna. Proin ultrices nisi ut ipsum congue, vitae porttitor libero suscipit. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Aliquam lacinia a nisi non congue.",
      image: "https://m.media-amazon.com/images/I/61gFFS16rjL._AC_SX679_.jpg",
      price: 29.89,
      rating: 4,
    },
    {
      name: "ZOTAC Gaming GeForce RTX 4080 16GB Trinity OC",
      category: categories[2]._id,
      description:
        "Praesent placerat, odio vel euismod venenatis, lectus arcu laoreet felis, et fringilla sapien turpis vestibulum nisl.",
      image:
        "https://m.media-amazon.com/images/I/819pla7Wo3L._AC_UY436_FMwebp_QL65_.jpg",
      price: 1199.59,
      rating: 3,
    },
    {
      name: "Amazon Fire TV 50” 4-Series 4K UHD smart TV",
      category: categories[2]._id,
      description:
        "Vivamus ut turpis in purus pretium mollis. Donec turpis odio, semper vel interdum ut, vulputate at ex. Duis dignissim nisi vel tortor imperdiet finibus. Aenean aliquam sagittis rutrum.",
      image:
        "https://m.media-amazon.com/images/I/61IZcaEIt4L._AC_UY436_FMwebp_QL65_.jpg",
      price: 289.99,
      rating: 4,
    },

    {
      name: `Lenovo 2022 Newest Ideapad 3 Laptop, 15.6" HD Touchscreen, 11th Gen Intel Core i3-1115G4 Processor, 8GB DDR4 RAM, 256GB PCIe NVMe SSD`,
      category: categories[2]._id,
      description:
        "In sodales, ipsum quis ultricies porttitor, tellus urna aliquam arcu, eget venenatis purus ligula ut nisi. Fusce ut felis dolor. Mauris justo ante, aliquet non tempus in, tempus ac lorem. Aliquam lacinia dolor eu sem eleifend ultrices. Etiam mattis metus metus. Sed ligula dui, placerat non turpis vitae, suscipit volutpat elit. Phasellus sagittis, diam elementum suscipit fringilla, libero mauris scelerisque ex, ac interdum diam erat non sapien.",
      image: "https://m.media-amazon.com/images/I/61QGMX0Qy6L._AC_SL1352_.jpg",
      price: 371.9,
      rating: 4,
    },
    {
      name: "STAR WARS The Black Series Darth Vader Force FX Elite Lightsaber",
      category: categories[4]._id,
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum ornare diam quis eleifend rutrum. Aliquam nulla est, volutpat non enim nec, pharetra gravida augue. Donec vitae dictum neque. Pellentesque arcu lorem, fringilla non ligula ac, tristique bibendum erat. Ut a semper nibh. Quisque a mi et mi tempor ultricies. Maecenas eu ipsum eu enim hendrerit accumsan at euismod urna.",
      image: "https://m.media-amazon.com/images/I/51LSXbsIo+L._AC_SL1500_.jpg",
      price: 249.99,
      rating: 5,
    },
    {
      name: "STAR WARS The Black Series Darth Vader Premium Electronic Helmet",
      category: categories[4]._id,
      description:
        "Ut vulputate hendrerit nibh, a placerat elit cursus interdum.",
      image: "https://m.media-amazon.com/images/I/71VJXN9CquL._AC_SL1500_.jpg",
      price: 129.95,
      rating: 5,
    },
    {
      name: "Michael Crichton Jurassic Park 2 Books Collection Pack Set (Jurassic Park, The Lost World)",
      category: categories[3]._id,
      description:
        "Sed a mauris condimentum, elementum enim in, rhoncus dui. Phasellus lobortis leo odio, sit amet pharetra turpis porta quis.",
      image:
        "https://m.media-amazon.com/images/I/51hozW6gzYL._SX449_BO1,204,203,200_.jpg",
      price: 21.69,
      rating: 5,
    },
    {
      name: "Harry Potter Complete Book Series Special Edition Boxed Set by J.K. Rowling",
      category: categories[3]._id,
      description:
        "Vestibulum et erat finibus erat suscipit vulputate sed vitae dui. Ut laoreet tellus sit amet justo bibendum ultrices. Donec vitae felis vestibulum, congue augue eu, finibus turpis.",
      image: "https://m.media-amazon.com/images/I/71CQXSQnnyL._AC_SL1000_.jpg",
      price: 74.39,
      rating: 5,
    },
    {
      name: "Mr. Clean Magic Eraser Variety Pack",
      category: categories[1]._id,
      description:
        "Morbi consectetur viverra urna, eu fringilla turpis faucibus sit amet. Suspendisse potenti. Donec at dui ac sapien eleifend hendrerit vel sit amet lectus.",
      image: "https://m.media-amazon.com/images/I/71dkLg1k0IL._AC_SL1500_.jpg",
      price: 17.68,
      rating: 4,
    },
  ]);

  console.log("products seeded");

  // await User.deleteMany();

  // await User.create({
  //   firstName: 'Pamela',
  //   lastName: 'Washington',
  //   email: 'pamela@testmail.com',
  //   password: 'password12345',
  //   orders: [
  //     {
  //       products: [products[0]._id, products[0]._id, products[1]._id]
  //     }
  //   ]
  // });

  // await User.create({
  //   firstName: 'Elijah',
  //   lastName: 'Holt',
  //   email: 'eholt@testmail.com',
  //   password: 'password12345'
  // });

  // console.log("users seeded");

  process.exit();
});
