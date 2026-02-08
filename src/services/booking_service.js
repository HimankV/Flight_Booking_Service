const axios = require("axios");
const { BookingRepository } = require("../repositories");
const db = require("../models");
const AppError = require("../utils/errors/app_error");
const { StatusCodes } = require("http-status-codes");
const { FLIGHT_SERVICE } = require("../config").ServerConfig;
const { BOOKING_STATUS } = require("../utils/common/enums");
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

async function makePayment(data) {
  const transaction = await db.sequelize.transaction();
  try {
    const bookingDetails = await bookingRepository.get(
      data.bookingId,
      transaction,
    );
    console.log(`bookingDetails : `, bookingDetails);
    const bookingTime = new Date(bookingDetails.createdAt);
    const currentTime = new Date();
    if (currentTime - bookingTime > 300000) {
      await cancelBooking(data);
      throw new AppError(
        `The booking has been expired`,
        StatusCodes.BAD_REQUEST,
      );
    }
    if (bookingDetails.totalCost !== data.totalCost) {
      throw new AppError(
        `The amount of the payment doesn't match`,
        StatusCodes.BAD_REQUEST,
      );
    }
    if (bookingDetails.userId !== data.userId) {
      throw new AppError(
        `The user corresponding to the booking doesn't match`,
        StatusCodes.BAD_REQUEST,
      );
    }
    const response = await bookingRepository.update(
      data.bookingId,
      { status: BOOKING_STATUS.BOOKED },
      transaction,
    );
    await transaction.commit();
    return response;
  } catch (error) {
    await transaction.rollback();
    console.log(error);
    throw error;
  }
}

async function cancelBooking(data) {
  const transaction = await db.sequelize.transaction();
  try {
    const bookingDetails = await bookingRepository.get(
      data.bookingId,
      transaction,
    );
    if (bookingDetails.status === BOOKING_STATUS.CANCELLED) {
      await transaction.commit();
      return true;
    }
    console.log(`data.flightId : `, bookingDetails.flightId);
    const response = await axios.patch(
      `${FLIGHT_SERVICE}/api/v1/flights/${bookingDetails.flightId}/seats`,
      {
        seats: bookingDetails.noOfSeats,
        dec: "",
      },
    );
    await bookingRepository.update(
      data.bookingId,
      { status: BOOKING_STATUS.CANCELLED },
      transaction,
    );
    await transaction.commit();
    return response;
  } catch (error) {
    await transaction.rollback();

    console.log(error);
  }
}

module.exports = { createBooking, makePayment, cancelBooking };
