/* eslint-disable @typescript-eslint/no-explicit-any */
import AppError from "../../errorHelpers/AppError";
import { BOOKING_STATUS } from "../booking/booking.interface";
import { Booking } from "../booking/booking.model";
import { ISSLCommerz } from "../sslCommerz/sslCommerz.interface";
import { SSLService } from "../sslCommerz/sslCommerz.service";
import { Payment } from "./payment.model";
import httpStatus from 'http-status-codes';

const initPayment = async (bookingId: string) => {

  const payment = await Payment.findOne({booking: bookingId})

  if(!payment){
    throw new AppError(httpStatus.NOT_FOUND,"Payment not found")
  }

  const booking = await Booking.findById(payment.booking);
   const userName = (booking?.user as any).name;
      const userEmail = (booking?.user as any).email;
      const userPhone = (booking?.user as any).phone;
      const userAddress = (booking?.user as any).address;
  
      const sslPayload: ISSLCommerz = {
          name: userName,
          email: userEmail,
          phoneNumber: userPhone,
          address: userAddress,
          amount: payment.amount,
          transactionId: payment.transactionId,
      }
  
      const sslPayment = await SSLService.sslPaymentInit(sslPayload);

      return{
        paymentUrl: sslPayment.GatewayPageURL
      }
  
};
const successPayment = async (query: Record<string, string>) => {
  const session = await Booking.startSession();
  session.startTransaction();

  try {

    const updatedPayment = await Payment.findOneAndUpdate(
      { transactionId: query.transactionId },
      {
        status: BOOKING_STATUS.PAID,
      },
      { new: true, runValidators: true, session: session }
    );

    await Booking.findByIdAndUpdate(
      updatedPayment?.booking,
      { status: BOOKING_STATUS.COMPLETE },
      { runValidators: true, session }
    )

    await session.commitTransaction();
    session.endSession();

    return {
      success: true,
      message: "Payment completed successfully",
    };
  } catch (error: any) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};
const failPayment = async (query: Record<string, string>) => {
    const session = await Booking.startSession();
  session.startTransaction();

  try {

    const updatedPayment = await Payment.findOneAndUpdate(
      { transactionId: query.transactionId },
      {
        status: BOOKING_STATUS.FAILED,
      },
      { new: true, runValidators: true, session: session }
    );

    await Booking.findByIdAndUpdate(
      updatedPayment?.booking,
      { status: BOOKING_STATUS.FAILED },
      { runValidators: true, session }
    )

    await session.commitTransaction();
    session.endSession();

    return {
      success: false,
      message: "Payment Failed",
    };
  } catch (error: any) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};
const cancelPayment = async (query: Record<string, string>) => {
    const session = await Booking.startSession();
  session.startTransaction();

  try {

    const updatedPayment = await Payment.findOneAndUpdate(
      { transactionId: query.transactionId },
      {
        status: BOOKING_STATUS.CANCEL,
      },
      { new: true, runValidators: true, session: session }
    );

    await Booking.findByIdAndUpdate(
      updatedPayment?.booking,
      { status: BOOKING_STATUS.CANCEL },
      { new: true, runValidators: true, session }
    )

    await session.commitTransaction();
    session.endSession();

    return {
      success: false,
      message: "Payment canceled",
    };
  } catch (error: any) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};

export const paymentService = {
  initPayment,
  successPayment,
  failPayment,
  cancelPayment,
};
