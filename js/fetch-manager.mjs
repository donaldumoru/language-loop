const langFile = '/data/languages.json';
const langURL = 'https://restcountries.com/v3.1/lang/';
const ccaURL = 'https://restcountries.com/v3.1/alpha/';

const fetchData = async function (path) {
  try {
    const response = await fetch(path);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error.message);
  }
};

export { fetchData, langFile, langURL, ccaURL };
