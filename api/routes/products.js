import express from "express";
import {
  getAllProducts,
  createProduct,
  getProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/products.js";
import multer from "multer";
import checkAuth from "../middleware/check-auth.js";
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  //Reject a File
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 10,
  },
  fileFilter: fileFilter,
});
const router = express.Router();

router.get("/", getAllProducts);

router.post("/", checkAuth, upload.single("productImage"), createProduct);

router.get("/:productId", getProduct);

router.patch("/:productId", checkAuth, updateProduct);

router.delete("/:productId", checkAuth, deleteProduct);

export default router;
