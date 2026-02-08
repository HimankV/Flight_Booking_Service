const axios = require("axios");
const { BookingRepository } = require("../repositories");
const db = require("../models");
const AppError = require("../utils/errors/app_error");
const { StatusCodes } = require("http-status-codes");
const { FLIGHT_SERVICE } = require("../config").ServerConfig;
const bookingRepository = new BookingRepository();

async function createBooking(data) {
  const transaction = await db.sequelize.transaction();

  try {
    const flight = await axios.get(
      `${FLIGHT_SERVICE}/api/v1/flights/${data.flightId}/`,
    );
    console.log(`Flight --- `, flight.data.data, typeof flight.data.data);

    console.log(`data.noOfSeats --- `, data.noOfSeats, typeof data.noOfSeats);
    console.log(
      `flight.data.data.totalSeats `,
      flight.data.data.totalSeats,
      typeof flight.data.data.totalSeats,
    );
    if (data.noOfSeats > flight.data.data.totalSeats) {
      console.log(`___---___Here---___---`);
      throw new AppError(
        `Not enough seats available `,
        StatusCodes.BAD_REQUEST,
      );
    }
    console.log(`flight.data.data.price - - `, flight.data.data.price);
    const totalBillingAmount = data.noOfSeats * flight.data.data.price;
    console.log(`totalBillingAmount `, totalBillingAmount);

    const bookingPayload = { ...data, totalCost: totalBillingAmount };
    console.log(`bookingPayload --- `, bookingPayload);
    const booking = await bookingRepository.createBooking(bookingPayload);
    
    const response = await axios.patch(
      `${FLIGHT_SERVICE}/api/v1/flights/${data.flightId}/seats`,
      {
        seats: data.noOfSeats,
      },
    );
    console.log(`response----____---- `, response);
    await transaction.commit();
    return booking;
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
}

module.exports = { createBooking };
