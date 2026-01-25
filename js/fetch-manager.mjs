const langFile = "/data/languages.json";

async function getLanguageData(lang) {
  try {
    const response = await fetch(lang);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const result = await response.json();
    return result;

    return result;
  } catch (error) {
    console.error(error.message);
  }
}

const languages = await getLanguageData(langFile);
export { languages };
