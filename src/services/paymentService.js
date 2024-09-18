import * as config from '../config';
import Stripe from 'stripe';
import Clothing from '../models/Clothing';
import clothingDoesNotExistError from '../errors/clothingDoesNotExistError';
import Invoice from '../models/Invoice';

const stripe = Stripe(config.getStripeSecretKey());

const calculateOrderAmount = async (checkoutItems) => {
  let orderAmount = 0;

  for (const checkoutItem of checkoutItems) {
    const clothing = await Clothing.findById(checkoutItem.clothingId);

    if (!clothing) {
      throw clothingDoesNotExistError(checkoutItem.clothingId);
    }

    orderAmount =
      clothing.priceInDollarCents * checkoutItem.quantity + orderAmount;
  }

  return orderAmount;
};

export const createPaymentIntent = async (
  paymentMethodId,
  checkoutItems,
  formData,
  returnUrl
) => {
  const amount = await calculateOrderAmount(checkoutItems);
  await stripe.paymentIntents.create({
    amount,
    currency: 'usd',
    payment_method: paymentMethodId,
    confirm: true,
    return_url: returnUrl,
  });
  await Invoice.create({
    email: formData.email,
    name: formData.name,
    address: formData.address,
    city: formData.city,
    country: formData.country,
    paymentMethodId,
  });
};
