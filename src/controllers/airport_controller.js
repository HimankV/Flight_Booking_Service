const { StatusCodes } = require("http-status-codes");
const { AirportService } = require("../services");
const { ErrorResponse, SuccessResponse } = require("../utils/common");

async function createAirport(req, res) {
  console.log(`Request body : `, req.body);
  try {
    const airport = await AirportService.createAirport({
      name: req.body.name,
      code: req.body.code,
      address: req.body.address,
      cityId: req.body.cityId,
    });
    console.log(`airport : `, airport);
    SuccessResponse.data = airport;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res
      .status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR)
      .json(ErrorResponse);
  }
}

async function getAirports(req, res) {
  try {
    const airports = await AirportService.getAirports();
    console.log(`airports : `, airports);
    SuccessResponse.data = airports;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res
      .status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR)
      .json(ErrorResponse);
  }
}

async function getAirport(req, res) {
  try {
    const airportId = req.params.airportId;
    console.log(airportId);
    const airport = await AirportService.getAirport(airportId);
    console.log(`Airport : `, airport);
    SuccessResponse.data = airport;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res
      .status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR)
      .json(ErrorResponse);
  }
}

async function deleteAirport(req, res) {
  try {
    const airportId = req.params.airportId;
    const airport = await AirportService.deleteAirport(airportId);
    console.log(`Airport deleted : `, airport);
    SuccessResponse.data = airport;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res
      .status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR)
      .json(ErrorResponse);
  }
}

async function updateAirport(req, res) {
  try {
    const airportId = req.params.airportId;
    const changes = req.body;
    console.log(`airportId, changes : `, airportId, " | ", changes);
    const airport = await AirportService.updateAirport(airportId, changes);
    console.log(`Airport deleted : `, airport);
    SuccessResponse.data = airport;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res
      .status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR)
      .json(ErrorResponse);
  }
}

module.exports = {
  createAirport,
  getAirports,
  getAirport,
  deleteAirport,
  updateAirport,
};
