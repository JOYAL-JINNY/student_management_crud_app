const express = require('express');
const router = express.Router();
const studentcontrol  =require("../controller/studentcontrol");

router.get("/",studentcontrol.view);
router.get("/adduser",studentcontrol.adduser);
router.post("/adduser",studentcontrol.save);


router.get("/edituser/:id",studentcontrol.edituser);
router.post("/edituser/:id",studentcontrol.edit);

router.get("/deleteuser/:id",studentcontrol.delete);


module.exports=router;