/* Language toggle script
   Adds a floating button to toggle between Portuguese and English modes.
   - Stores selection in localStorage ('site_lang')
   - Adds class 'lang-en' or 'lang-pt' to the <html> element
   - Author can mark content with classes 'lang-en' and 'lang-pt' to show/hide
*/
(function () {
  const STORAGE_KEY = "site_lang";
  const DEFAULT = "pt";

  function getLang() {
    return localStorage.getItem(STORAGE_KEY) || DEFAULT;
  }

  function setLang(lang) {
    localStorage.setItem(STORAGE_KEY, lang);
    document.documentElement.classList.remove("lang-en", "lang-pt");
    document.documentElement.classList.add(
      lang === "en" ? "lang-en" : "lang-pt",
    );
    updateButton(lang);
  }

  function createButton() {
    const btn = document.createElement("button");
    btn.id = "lang-toggle-btn";
    btn.type = "button";
    btn.setAttribute("aria-label", "Toggle language");
    btn.addEventListener("click", () => {
      const current = getLang();
      setLang(current === "en" ? "pt" : "en");
    });
    document.body.appendChild(btn);
    updateButton(getLang());
  }

  function updateButton(lang) {
    const btn = document.getElementById("lang-toggle-btn");
    if (!btn) return;
    btn.textContent = lang === "en" ? "EN" : "PT";
    btn.title = lang === "en" ? "Switch to Portuguese" : "Mudar para Inglês";
  }

  // Initialize on DOM ready
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => {
      createButton();
      setLang(getLang());
    });
  } else {
    createButton();
    setLang(getLang());
  }
})();
