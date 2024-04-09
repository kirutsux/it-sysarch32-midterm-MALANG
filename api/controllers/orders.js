import Order from "../models/order.js";
import mongoose from "mongoose";
import Product from "../models/product.js";

export const getAllOrders = (req, res, next) => {
  Order.find()
    .select("product quantity _id")
    .populate("product", "name")
    .exec()
    .then((docs) => {
      res.status(200).json({
        count: docs.length,
        orders: docs.map((doc) => {
          return {
            _id: doc._id,
            product: doc.product,
            quantity: doc.quantity,
            request: {
              type: "GET",
              url: "http://localhost:3000/orders/" + doc._id,
            },
          };
        }),
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
};

export const createOrder = (req, res, next) => {
  Product.findById(req.body.productId)
    .then((product) => {
      if (!product) {
        return res.status(404).json({
          message: "Product Not Found",
        });
      }
      const order = new Order({
        _id: new mongoose.Types.ObjectId(),
        quantity: req.body.quantity,
        product: req.body.productId,
      });
      return order.save();
    })
    .then((result) => {
      console.log(result);
      res.status(201).json({
        message: "Created Order Successfully",
        createdOrder: {
          quantity: result.quantity,
          product: result.product,
          _id: result._id,
        },
        request: {
          type: "GET",
          url: "http://localhost:3000/orders/" + result._id,
        },
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
};

export const getOrder = (req, res, next) => {
  Order.findById(req.params.orderId)
    .populate("product", "name")
    .exec()
    .then((order) => {
      if (!order) {
        return res.status(404).json({
          message: "Order Not Found",
        });
      }
      res.status(200).json({
        order: {
          _id: order._id,
          quantity: order.quantity,
          product: order.product,
        },
        request: {
          type: "GET",
          url: "http://localhost:3000/orders/",
        },
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
};

export const deleteOrder = (req, res, next) => {
  Order.deleteOne({ _id: req.params.orderId })
    .exec()
    .then((result) => {
      res.status(200).json({
        message: "Order Deleted",
        request: {
          type: "POST",
          url: "http://localhost:3000/orders/",
          body: { productId: "ID", quantity: "Number" },
        },
      });
    })
    .catch();
};
