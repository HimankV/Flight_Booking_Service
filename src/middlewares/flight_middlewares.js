const { StatusCodes } = require("http-status-codes");
const { ErrorResponse } = require("../utils/common");
const AppError = require("../utils/errors/app_error");
function validateCreateRequest(req, res, next) {
  if (!req.body.flightNumber) {
    ErrorResponse.message = `Something went wrong while creating flight`;
    ErrorResponse.error = {
      explanation: new AppError(
        [`flightNumber not found in the incoming request`],
        StatusCodes.BAD_REQUEST,
      ),
    };
    res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }
  if (!req.body.airplaneId) {
    ErrorResponse.message = `Something went wrong while creating flight`;
    ErrorResponse.error = {
      explanation: new AppError(
        [`airplaneId not found in the incoming request`],
        StatusCodes.BAD_REQUEST,
      ),
    };
    res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }
  if (!req.body.departureAirportId) {
    ErrorResponse.message = `Something went wrong while creating flight`;
    ErrorResponse.error = {
      explanation: new AppError(
        [`departureAirportId not found in the incoming request`],
        StatusCodes.BAD_REQUEST,
      ),
    };
    res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }
  if (!req.body.arrivalTime) {
    ErrorResponse.message = `Something went wrong while creating flight`;
    ErrorResponse.error = {
      explanation: new AppError(
        [`name not found in the incoming request`],
        StatusCodes.BAD_REQUEST,
      ),
    };
    res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }
  if (!req.body.departureTime) {
    ErrorResponse.message = `Something went wrong while creating flight`;
    ErrorResponse.error = {
      explanation: new AppError(
        [`arrivalTime not found in the incoming request`],
        StatusCodes.BAD_REQUEST,
      ),
    };
    res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }
  if (!req.body.price) {
    ErrorResponse.message = `Something went wrong while creating flight`;
    ErrorResponse.error = {
      explanation: new AppError(
        [`price not found in the incoming request`],
        StatusCodes.BAD_REQUEST,
      ),
    };
    res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }
  if (!req.body.totalSeats) {
    ErrorResponse.message = `Something went wrong while creating flight`;
    ErrorResponse.error = {
      explanation: new AppError(
        [`totalSeats not found in the incoming request`],
        StatusCodes.BAD_REQUEST,
      ),
    };
    res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }
  next();
}

module.exports = {
  validateCreateRequest,
};
