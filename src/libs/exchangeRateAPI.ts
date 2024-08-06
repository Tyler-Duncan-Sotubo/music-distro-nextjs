import { env } from "@/env";

interface ExchangeRateResponse {
  result: number; // or whatever the exact shape of the response is
  // Include other fields if necessary
}

const exchangeRateAPI = () => {
  const getExchangeRate = async (): Promise<number> => {
    // set endpoint and your API key
    const endpoint = "convert";
    const access_key = env.NEXT_PUBLIC_EXCHANGE_RATE_API_KEY;
    // define from currency, to currency, and amount
    const from = "NGN";
    const to = "USD";
    const amount = "1";
    // execute the conversion
    const response = await fetch(
      `https://api.exchangeratesapi.io/v1/${endpoint}?access_key=${access_key}&from=${from}&to=${to}&amount=${amount}`,
    );

    if (!response.ok) {
      throw new Error("Failed to fetch exchange rate");
    }

    const data = (await response.json()) as ExchangeRateResponse;
    const nairaToDollarsRateToday = data.result;
    return nairaToDollarsRateToday;
  };

  return { getExchangeRate };
};

export default exchangeRateAPI;
