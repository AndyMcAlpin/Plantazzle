const router = require("express").Router();

const userRoutes = require("./user-routes");
const plantBasicRoutes = require("./plantBasic-routes");
const myPlantRoutes = require("./myPlant-routes");
const commentRoutes = require('./comment-routes');

router.use("/users", userRoutes);
router.use("/plants", plantBasicRoutes);
router.use("/myPlant", myPlantRoutes);
router.use('/comment', commentRoutes);

module.exports = router;
