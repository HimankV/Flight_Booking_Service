const { BookingService } = require("../services");
const { StatusCodes } = require("http-status-codes");
const { ErrorResponse, SuccessResponse } = require("../utils/common");

/* 
    POST : /flights/:flightId/seats
    req.body {
      flightId: req.params.flightId,
      seats: req.body.seats,
      dec: req.body.dec,
    }
*/
async function createBooking(req, res) {
  console.log(`Request body : `, req.body);
  try {
    const booking = await BookingService.createBooking({
      flightId: Number(req.body.flightId),
      userId: Number(req.body.userId),
      noOfSeats: Number(req.body.noOfSeats),
    });
    console.log(`booking : `, booking);
    SuccessResponse.data = booking;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    console.log(`inside controller catch block _______ `, error);
    ErrorResponse.error = error;
    console.log(`ErrorResponse _______ `, ErrorResponse);
    return res
      .status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR)
      .json(ErrorResponse);
  }
}

async function makePayment(req, res) {
  console.log(`Request body : `, req.body);
  try {
    const booking = await BookingService.makePayment({
      userId: Number(req.body.userId),
      bookingId: Number(req.body.bookingId),
      totalCost: Number(req.body.totalCost),
    });
    SuccessResponse.data = booking;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res
      .status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR)
      .json(ErrorResponse);
  }
}

// async function getAllFlights(req, res) {
//   try {
//     console.log(`req.query : `, req.query);
//     const flights = await FlightService.getAllFlights(req.query);
//     SuccessResponse.data = flights;
//     return res.status(StatusCodes.OK).json(SuccessResponse);
//   } catch (error) {
//     ErrorResponse.error = error;
//     return res
//       .status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR)
//       .json(ErrorResponse);
//   }
// }

// async function getFlight(req, res) {
//   try {
//     console.log(`req.params.flightId : `, req.params.flightId);
//     const flight = await FlightService.getFlight(req.params.flightId);
//     SuccessResponse.data = flight;
//     return res.status(StatusCodes.OK).json(SuccessResponse);
//   } catch (error) {
//     ErrorResponse.error = error;
//     return res
//       .status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR)
//       .json(ErrorResponse);
//   }
// }

// async function updateSeats(req, res) {
//   const flightId = req.params.flightId;
//   try {
//     const response = await FlightService.updateSeats({
//       flightId,
//       seats: req.body.seats,
//       dec: req.body.dec,
//     });
//     SuccessResponse.data = response;
//     return res.status(StatusCodes.OK).json(SuccessResponse);
//   } catch (err) {
//     ErrorResponse.error = error;
//     return res
//       .status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR)
//       .json(ErrorResponse);
//   }
// }

module.exports = { createBooking, makePayment };
