const { User } = require("../../models");
const getCountryIso3 = require("country-iso-2-to-3");

const getGeography = async (_, res) => {
  try {
    const users = await User.find();

    const mappedLocations = users.reduce((acc, { country }) => {
      const countryISO3 = getCountryIso3(country);

      if (!acc[countryISO3]) {
        acc[countryISO3] = 0;
      }

      acc[countryISO3]++;
      return acc;
    }, {});

    const formattedLocation = Object.entries(mappedLocations).map(
      ([country, count]) => {
        return { id: country, value: count };
      }
    );

    res.status(200).json({
      message: "success",
      code: 200,
      formattedLocation,
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

module.exports = getGeography;
