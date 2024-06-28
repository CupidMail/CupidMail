const languageList = [
    "pt-BR",
    "en-US",
    "de-DE",
    "es-ES",
]
let currentLanguage = null;

function getUserLanguage() {
    /**
     * Gets the user language from the browser
     * 
     * Should not be confused with getCurrentLanguage()
     * for getCurrentLanguage gets the language that is being currently displayed on the screen.
     */
    return (navigator.language || null);
}

function getCurrentLanguage() {
    /**
     * Gets the language that is being currently displayed on the screen
     * 
     * Should not be confused with getUserLanguage()
     * for getUserLanguage gets the user language from the browser
     */
    const currentMain = document.querySelector('main[style*="block"]');
    return currentMain ? currentMain.id : null;
}

function changeLanguage(language) {
    /**
     * Changes the language of the site
     * 
     * @param language The language to be changed to
     */
    const selectedMain = document.querySelector(`#${language}`);

    if (language === currentLanguage) {
        console.warn(`Language "${language}" is already selected.`);
        return 1;
    }

    // Checks if the input language is not inside Language list
    if (!languageList.some(lang => lang === language)) {
        console.error(
            `language "${language}" Supported languages are: ${languageList.join(", ")}`
        );
        return 1;
    }

    // Changing each instance of the element main's display to none
    document.querySelectorAll("main").forEach(function(main) {
        main.style.display = "none";
    });
    if (!selectedMain) {
        console.error(`Language "${language}" not found.`);
        return 1;
    }
    selectedMain.style.display = "block";

    console.log("Changed language to", language);
    return 0
}

function init() {
    const userLanguage = getUserLanguage();

    try {
        if (userLanguage) changeLanguage(userLanguage);
    } catch (error) {
        console.error(`Error in init(): ${error}`);
    }

    console.groupCollapsed('Primary checks', 'completed.');
    console.log(`User language detected as "${userLanguage ?? 'null'}".`);
    console.log(`Current language is "${getCurrentLanguage() ?? 'null'}".`);
    console.groupEnd();
}
window.addEventListener('load', init);

