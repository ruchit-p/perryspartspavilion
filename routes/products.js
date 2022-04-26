var express = require("express");
var router = express.Router();

/* Products Route CRUD */

// ==================================================
// Route to list all records. Display view to list all records
// ==================================================
router.get("/", function (req, res, next) {
  let query =
    "SELECT product_id, productname, supplier_id, category_id, prodprice, status, quantity FROM product";
  // execute query
  db.query(query, (err, result) => {
    if (err) {
      console.log(err);
      res.render("error");
    }
    res.render("product/allrecords", { allrecs: result });
    console.log(result);
  });
});

// ==================================================
// Route to view one specific record. Notice the view is one record
// ==================================================
router.get("/:recordid/show", function (req, res, next) {
  console.log("here")
  let query =
    "SELECT product_id, productname, prodimage, description, supplier_id, category_id, wattage, cell_efficiency, weight, dimensions, prodprice, status, quantity FROM product WHERE product_id = " +
    req.params.recordid;
  // execute query
  db.query(query, (err, result) => {
    if (err) {
      console.log(err);
      res.render("error");
    } else {
      console.log('rendering')
      res.render("product/onerec", { onerec: result[0] });
    }
  });
});

// ==================================================
// Route to show empty form to obtain input form end-user.
// ==================================================
router.get("/addrecord", function (req, res, next) {
  res.render("product/addrec");
});

// ==================================================
// Route to obtain user input and save in database.
// ==================================================
router.post("/", function (req, res, next) {
  let insertquery =
    "INSERT INTO product (productname, prodimage, description, category_id, supplier_id, dimensions, wattage, cell_efficiency, weight, power_tolerance, prodprice, status, quantity) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
  db.query(
    insertquery,
    [
      req.body.productname,
      req.body.prodimage,
      req.body.description,
      req.body.category_id,
      req.body.supplier_id,
      req.body.dimensions,
      req.body.wattage,
      req.body.cell_efficiency,
      req.body.weight,
      req.body.power_tolerance,
      req.body.prodprice,
      req.body.status,
      req.body.quantity,
    ],
    (err, result) => {
      if (err) {
        console.log(err);
        res.render("error");
      } else {
        res.redirect("/product");
      }
    }
  );
});

// ==================================================
// Route to edit one specific record.
// ==================================================
router.get("/:recordid/edit", function (req, res, next) {
  let query =
    "SELECT productname, prodimage, description, category_id, supplier_id, dimensions, wattage, cell_efficiency, weight, power_tolerance, prodprice, status, quantity FROM product WHERE product_id = " +
    req.params.recordid;
  // execute query
  db.query(query, (err, result) => {
    if (err) {
      console.log(err);
      res.render("error");
    } else {
      res.render("product/editrec", { onerec: result[0] });
    }
  });
});

// ==================================================
// Route to save edited data in database.
// ==================================================
router.post("/save", function (req, res, next) {
  console.log("logging this ----",req.body.productname,
      req.body.prodimage,
      req.body.description,
      req.body.category_id,
      req.body.supplier_id,
      req.body.dimensions,
      req.body.wattage,
      req.body.cell_efficiency,
      req.body.weight,
      req.body.power_tolerance,
      req.body.prodprice,
      req.body.status,
      req.body.quantity)
  let updatequery =
    'UPDATE product SET productname = ?, prodimage = ?, description = ?, category_id = ?, supplier_id = ?, dimensions = ?, wattage = ?, cell_efficiency = ?, weight = ?, power_tolerance = ?,  prodprice = ?, status = ?, quantity = ? WHERE product_id = ' + req.body.product_id;
  db.query(
    updatequery,
    [
      req.body.productname,
      req.body.prodimage,
      req.body.description,
      req.body.category_id,
      req.body.supplier_id,
      req.body.dimensions,
      req.body.wattage,
      req.body.cell_efficiency,
      req.body.weight,
      req.body.power_tolerance,
      req.body.prodprice,
      req.body.status,
      req.body.quantity,
    ],
    (err, result) => {
      if (err) {
        console.log(err);
        res.render("error");
      } else {
        res.redirect("/product");
      }
    }
  );
});

// ==================================================
// Route to delete one specific record.
// ==================================================
router.get("/:recordid/delete", function (req, res, next) {
  let query = "DELETE FROM product WHERE product_id = " + req.params.recordid;
  // execute query
  db.query(query, (err, result) => {
    if (err) {
      console.log(err);
      res.render("error");
    } else {
      res.redirect("/product");
    }
  });
});

module.exports = router;
