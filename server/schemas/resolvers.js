const { AuthenticationError } = require("apollo-server-express");
const { User, Order, Product, Category } = require("../models");
const { signToken } = require("../utils/auth");
const stripeInit = require("stripe");
const stripe = stripeInit(
  "sk_test_51Mld1gIJwF9KWzHoA6sWR98dmAwGz4u2sDPQ1qax4eUyugjxcoKhO9aLb4QrhRuF5bLVoBhtf8PmtjGulzyaoxH700BFthL5EH"
);

const resolvers = {
  Query: {
    userByEmail: async (parent, { email }, context) => {
      console.log("HELLO USER QUERY?")
     
        const user = await User.findOne({ email }).populate({
          path: "orders.products",
          populate: "category",
        });

        console.log("user", user);

        user.orders.sort((a, b) => b.purchaseDate - a.purchaseDate);

        return user;
    },
    user: async (parent, args, context) => {
      console.log("HELLO USER QUERY?")
      if (context.user) {
        const user = await User.findById(context.user._id).populate({
          path: "orders.products",
          populate: "category",
        });

        console.log("user", user);
        user.orders.sort((a, b) => b.purchaseDate - a.purchaseDate);

        return user;
      }

      throw new AuthenticationError("Not logged in");
    },

    categories: async () => {
      return await Category.find();
    },

    products: async (parent, { category, name }) => {
      const params = {};

      if (category) {
        params.category = category;
      }

      if (name) {
        params.name = {
          $regex: name,
        };
      }

      return await Product.find(params).populate("category");
    },
    product: async (parent, { _id }) => {
      return await Product.findById(_id).populate("category");
    },

    order: async (parent, { _id }, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id).populate({
          path: "orders.products",
          populate: "category",
        });

        return user.orders.id(_id);
      }

      throw new AuthenticationError("Not logged in");
    },
  },

  Mutation: {
    addUser: async (parent, { firstName, lastName, email, password }) => {
      console.log("ADD USER", firstName)
      const user = await User.create({ firstName, lastName, email, password });
      const token = signToken(user);
      return { token, user };
    },

    updateUser: async (parent, args, context) => {
      if (context.user) {
        return await User.findByIdAndUpdate(context.user._id, args, {
          new: true,
        });
      }

      throw new AuthenticationError("Not logged in");
    },

    updateProduct: async (parent, { _id, quantity }) => {
      const decrement = Math.abs(quantity) * -1;

      return await Product.findByIdAndUpdate(
        _id,
        { $inc: { quantity: decrement } },
        { new: true }
      );
    },

    addOrder: async (parent, { products }, context) => {
      console.log(context);
      if (context.user) {
        const order = new Order({ products });

        await User.findByIdAndUpdate(context.user._id, {
          $push: { orders: order },
        });

        return order;
      }

      throw new AuthenticationError("Not logged in");
    },

    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError("No user found with this email address");
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const token = signToken(user);

      return { token, user };
    },
  },
};

module.exports = resolvers;
