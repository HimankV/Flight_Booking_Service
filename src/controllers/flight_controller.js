const { StatusCodes } = require("http-status-codes");
const { FlightService } = require("../services");
const { ErrorResponse, SuccessResponse } = require("../utils/common");

/* 
    POST : /flights
    req.body {
        flightNumber : 'UK 808',
        airplaneId : 'a380',
        departureAirportId: 12,
        arrivalAirportId: 11,
        arrivalTime: '11:10:00',
        price: ,
        boardingGate,
        totalSeats,
    }
*/
async function createFlight(req, res) {
  console.log(`Request body : `, req.body);
  try {
    const flight = await FlightService.createFlight({
      flightNumber: req.body.flightNumber,
      airplaneId: req.body.airplaneId,
      departureAirportId: req.body.departureAirportId,
      arrivalAirportId: req.body.arrivalAirportId,
      arrivalTime: req.body.arrivalTime,
      departureTime: req.body.departureTime,
      price: req.body.price,
      boardingGate: req.body.boardingGate,
      totalSeats: req.body.totalSeats,
    });
    console.log(`flight : `, flight);
    SuccessResponse.data = flight;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res
      .status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR)
      .json(ErrorResponse);
  }
}

module.exports = {
  createFlight,
};
