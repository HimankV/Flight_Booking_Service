const express = require("express");
const { FlightController } = require("../../controllers");
const { validateCreateRequest } =
  require("../../middlewares").FlightMiddlewares;
const router = express.Router();

/* 
    POST    /api/v1/flights
*/
router.post("/", validateCreateRequest, FlightController.createFlight);

// router.get("/", FlightController.getFlights);
// router.get("/:flightId", FlightController.getFlight);
// router.delete("/:flightId", FlightController.deleteFlight);
// router.patch("/:flightId", FlightController.updateFlight);

module.exports = router;
