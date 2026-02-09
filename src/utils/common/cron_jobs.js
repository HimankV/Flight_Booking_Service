const cron = require("node-cron");

function scheduleCrons() {
  cron.schedule(`*/30 * * * *`, async () => {
    console.log(`running a task every 15 minutes`);

    // lazy import — breaks circular dependency
    const BookingService = require("../../services/booking_service");

    await BookingService.cancelOldBookings();
  });
}

module.exports = scheduleCrons;
