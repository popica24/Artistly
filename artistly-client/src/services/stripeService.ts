import axios from "axios";

const apiurl = import.meta.env.VITE_API_LOCAL_URL + "checkout";

const createCheckoutSession = async (idToken: string) => {
  const response = await axios.post(apiurl + "/create-checkout-session", null, {
    headers: {
      Authorization: `Bearer ${idToken}`,
    },
    maxRedirects: 6,
  });
  return response;
};

const createPaymentIntent = async (idToken: string | undefined) => {
  const response = await axios.post(apiurl + "/create-payment-intent", {
    headers: {
      Authorization: `Bearer ${idToken}`,
    },
  });
  return response.data;
};

const getCheckoutSessionId = async (idToken: string | undefined) => {
  const response = await axios.get(apiurl + "/create-checkout-session", {
    headers: {
      Authorization: `Bearer ${idToken}`,
    },
  });
  return response.data;
};

const getSessionStatus = async (
  idToken: string | undefined,
  sessionId: string | null
) => {
  const response = await axios.get(
    apiurl + `/session-status?session_id=${sessionId}`,
    {
      headers: {
        Authorization: `Bearer ${idToken}`,
      },
    }
  );

  return response.data;
};

const getSubscriptionDetails = async (idToken: string | undefined) => {
  const response = await axios.get(apiurl + "/subscription-details", {
    headers: {
      Authorization: `Bearer ${idToken}`,
    },
  });
  return response.data;
};

const cancelSubscription = async (idToken: string | undefined) => {
  await axios.post(apiurl + "/cancel", null, {
    headers: {
      Authorization: `Bearer ${idToken}`,
    },
  });
};

const detachCard = async (idToken: string | undefined) => {
  await axios.post(apiurl + "/detatch-method", null, {
    headers: {
      Authorization: `Bearer ${idToken}`,
    },
  });
};
export {
  createCheckoutSession,
  getCheckoutSessionId,
  getSessionStatus,
  getSubscriptionDetails,
  cancelSubscription,
  detachCard,
  createPaymentIntent,
};
