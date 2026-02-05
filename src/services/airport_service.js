const { StatusCodes } = require("http-status-codes");
const { AirportRepository } = require("../repositories/");
const AppError = require("../utils/errors/app_error");

const airportRepository = new AirportRepository();

async function createAirport(data) {
  try {
    const airport = await airportRepository.create(data);
    return airport;
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

async function getAirports() {
  try {
    const airports = await airportRepository.getAll();
    console.log(`airports: `, airports);
    return airports;
  } catch (error) {
    throw new AppError(
      `Couldn't fetch all airports`,
      StatusCodes.INTERNAL_SERVER_ERROR,
    );
  }
}

async function getAirport(airportId) {
  try {
    const airport = await airportRepository.get(airportId);
    console.log(`airport: `, airport);
    return airport;
  } catch (error) {
    if (error.statusCode === StatusCodes.NOT_FOUND) {
      throw new AppError(
        "The airplane you requested does not exist",
        error.statusCode,
      );
    }
    throw new AppError("Cannot fetch airplane");
  }
}

async function deleteAirport(airportId) {
  try {
    const airport = await airportRepository.destroy(airportId);
    console.log(`Airplane deleted (inside service): `, airport);
    return airport;
  } catch (error) {
    if (error.statusCode === StatusCodes.NOT_FOUND) {
      throw new AppError("The airplane doesn't exist ?", error.statusCode);
    }
    throw new AppError("Couldn't delete airplane");
  }
}

async function updateAirport(airportId, changes) {
  try {
    const airport = await airportRepository.update(airportId, changes);
    console.log(`Airplane updated : `, airport);
    return airport;
  } catch (error) {
    if (error.statusCode === StatusCodes.NOT_FOUND) {
      throw new AppError("The airplane doesn't exist ?", error.statusCode);
    }
    throw new AppError("Couldn't delete airplane");
  }
}

module.exports = {
  createAirport,
  getAirport,
  getAirports,
  deleteAirport,
  updateAirport,
};
