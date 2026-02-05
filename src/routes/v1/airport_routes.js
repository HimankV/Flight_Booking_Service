const express = require("express");
const { AirportController } = require("../../controllers");
const { validateCreateRequest } =
  require("../../middlewares").AirportMiddlewares;
const router = express.Router();
// console.log(validateCreateRequest);
router.post("/", validateCreateRequest, AirportController.createAirport);
router.get("/", AirportController.getAirports);
router.get("/:airportId", AirportController.getAirport);
router.delete("/:airportId", AirportController.deleteAirport);
router.patch("/:airportId", AirportController.updateAirport);

module.exports = router;
