export default async function getData(url) {
  console.log("U" + url);
  return fetch(url, {
    method: "GET",
    headers: {
      "x-rapidapi-host": "currency-exchange.p.rapidapi.com",
      "x-rapidapi-key": "348711b21cmsh1e66f581d69d8afp19c923jsn3def0382e5a9"
    }
  });
}
