const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const path = require("path");
const { authMiddleware } = require("./utils/auth");
const { typeDefs, resolvers } = require("./schemas");
const Orders = require("./models/Order");

const cors = require("cors");
const db = require("./config/connection");
const stripeInit = require("stripe");
const stripe = stripeInit(
  "sk_test_51Mld1gIJwF9KWzHoA6sWR98dmAwGz4u2sDPQ1qax4eUyugjxcoKhO9aLb4QrhRuF5bLVoBhtf8PmtjGulzyaoxH700BFthL5EH"
);

const PORT = process.env.PORT || 3001;
const app = express();
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware,
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));
}

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

//Stripe API
app.post("/payment/create", async (req, res) => {
  const total = req.query.total;
  console.log("Payment Request recieved for $", total);

  const payment = await stripe.paymentIntents.create({
    amount: total * 100,
    currency: "usd",
    payment_method_types: ["card"],
  });

  res.json({
    clientSecret: payment.client_secret,
  });
});

app.post("/orders/add", (req, res) => {
  const products = req.body.cart;
  const price = req.body.price;
  const email = req.body.email;
  const address = req.body.address;

  const orderDetail = {
    products: products,
    price: price,
    address: address,
    email: email,
  };

  Orders.create(orderDetail, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log("order added to database >> ", result);
    }
  });
});

app.post("/orders/get", (req, res) => {
  const email = req.query.email;

  Orders.find((err, result) => {
    if (err) {
      console.log(err);
    } else {
      const userOrders = result.filter((order) => order.email === email);
      res.send(userOrders);
    }
  });
});

// Create a new instance of an Apollo server with the GraphQL schema
const startApolloServer = async (typeDefs, resolvers) => {
  await server.start();
  server.applyMiddleware({ app });

  db.once("open", () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(
        `Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`
      );
    });
  });
};

// Call the async function to start the server
startApolloServer(typeDefs, resolvers);
