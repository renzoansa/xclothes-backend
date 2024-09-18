import * as paymentService from '../services/paymentService';

export const createPaymentIntent = async (request, response, next) => {
  try {
    const { paymentMethodId, checkoutItems, returnUrl, ...formData } =
      request.body;
    console.log(request.body);
    const data = await paymentService.createPaymentIntent(
      paymentMethodId,
      checkoutItems,
      formData,
      returnUrl
    );
    response.send(data);
  } catch (error) {
    next(error);
  }
};
