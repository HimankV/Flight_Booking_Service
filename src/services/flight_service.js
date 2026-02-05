const { StatusCodes } = require("http-status-codes");
const {  FlightRepository } = require("../repositories/");
const AppError = require("../utils/errors/app_error");

const flightRepository = new FlightRepository();

async function createFlight(data) {
  try {
    const flight = await flightRepository.create(data);
    return flight;
  } catch (error) {
    if (error.name === "SequelizeValidationError") {
      let explanation = [];
      error.errors.forEach((err) => {
        explanation.push(err.message);
      });
      console.log(explanation);
      throw new AppError(explanation, StatusCodes.BAD_REQUEST);
    }
    throw new AppError(explanation, StatusCodes.BAD_REQUEST);
  }
}

module.exports = {
  createFlight,
};
