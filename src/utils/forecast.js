const request = require("request");

const forecast = (latitude, longitude, callback) => {
  const url =
    "https://api.darksky.net/forecast/66399bba502f8d3ee5d4d5e3143ab7a6/" +
    encodeURI(latitude) +
    "," +
    encodeURI(longitude) +
    "?units=si&lang=pt";

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to site", undefined);
    } else if (body.error) {
      callback("unable to find location", undefined);
    } else {
      callback(
        undefined,
        body.daily.data[0].summary +
          " Atualmente estão " +
          body.currently.temperature +
          " graus. Existe " +
          body.currently.precipProbability +
          "% de probabilidade de precipitação para o dia de hoje. A temperatura maxima para hoje será " +
          body.daily.data[0].temperatureHigh +
          " e " +
          body.daily.data[0].temperatureLow +
          " de temperatura minima."
      );
    }
  });
};

module.exports = forecast;
