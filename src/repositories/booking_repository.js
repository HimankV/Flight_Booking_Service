// const { StatusCodes } = require("http-status-codes");
const { Booking } = require("../models");
const CrudRepository = require("./crud_repository");

class BookingRepository extends CrudRepository {
  constructor() {
    super(Booking);
  }

  async createBooking(data, transaction) {
    const response = await Booking.create(data, { transaction });
    return response;
  }

  async get(data, transaction) {
    const response = await Booking.findByPk(data, { transaction: transaction });
    if (!response) {
      throw new AppError(`Not able to find resource`, StatusCodes.NOT_FOUND);
    }
    console.log(`Response - `, response);
    return response;
  }

  async update(id, data, transaction) {
    try {
      const response = await Booking.update(
        data,
        {
          where: {
            id: id,
          },
        },
        { transaction: transaction },
      );
      return response;
    } catch (err) {
      Logger.error(`Something went wrong`, err);
      throw err;
    }
  }
}

module.exports = BookingRepository;
