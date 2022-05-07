const router = require("express").Router();
module.exports = router;

router.use("/users", require("./users"));
router.use("/products", require("./products"));
router.use("/orders", require("./orders"));
router.use("/lineItems", require("./lineItems"));
router.use("/email", require("./email"));
router.use("/stripe", require("./stripe"))

router.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});
