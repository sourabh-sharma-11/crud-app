const express = require("express")
const {create, getAll, getOne, update,deletUser}= require("../controllers/userController")

const router = express.Router();
router.post("/create", create);
router.get("/getAll",getAll)
router.get("/getOne/:id",getOne)
router.put("/update/:id", update)
router.delete("/delete/:id",deletUser)
module.exports = router;