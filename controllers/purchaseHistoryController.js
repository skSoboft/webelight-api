const PurchaseHistory = require("../models/purchaseHistory");

exports.getPurchaseHistory = async (req, res) => {
    try {
      let purchaseHistory = await PurchaseHistory.find().populate(
        "user products"
      );
  
      const selectedTimeFrame = req.query.timeFrame; 
  
      if (selectedTimeFrame) {
        const currentDate = new Date();
        purchaseHistory = purchaseHistory.filter((purchase) => {
          const purchaseDate = new Date(purchase.purchaseDate);
          const timeDifference = (currentDate - purchaseDate) / (1000 * 3600 * 24);
  
          if (selectedTimeFrame === "7days") {
            return timeDifference <= 7;
          } else if (selectedTimeFrame === "30days") {
            return timeDifference <= 30;
          }
  
          return true; 
        });
      }
  
      res.json(purchaseHistory);
    } catch (error) {
      console.error("Error fetching purchase history:", error.message);
      res
        .status(500)
        .json({ error: "An error occurred while fetching purchase history" });
    }
  };
  

exports.createPurchaseHistory = async (req, res) => {
  try {
    console.log("Req BOsy::", req.body);
    const { user, products, totalAmount } = req.body;
    console.log("LET SEEE::", userId, products, totalAmount);
    const newPurchase = new PurchaseHistory({
      user,
      products,
      totalAmount,
    });

    const savedPurchase = await newPurchase.save();
    res.status(201).json(savedPurchase);
  } catch (error) {
    console.error("Error creating purchase history:", error.message);
    res
      .status(500)
      .json({ error: "An error occurred while creating purchase history" });
  }
};
