const express = require("express");
const router = express.Router();
const moduleController = require("../controllers/moduleController");
const validateModule = require("../middlewares/validateModule");
const validateUpdateModule = require("../middlewares/validateUpdateModule");

router.post("/", validateModule, moduleController.createModule);
router.get("/", moduleController.getModules);
router.put("/:moduleId", validateUpdateModule, moduleController.updateModule);
router.get("/:moduleId", moduleController.getModuleById);
router.delete("/:moduleId", moduleController.deleteModule);

module.exports = router;
