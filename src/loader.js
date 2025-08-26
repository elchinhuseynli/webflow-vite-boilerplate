// Глобальные стили
import "./main.css";
import "./main.js";

/**
 * Динамически загружает JS и CSS модуль для текущей страницы.
 * Ищет файл скрипта на основе последнего сегмента URL (slug).
 * @example
 * // URL: /about-us -> будет искать /pages/about-us.js
 * // URL: /blog/my-first-post -> будет искать /single/my-first-post.js
 */
const loadPageScript = async () => {
  const pathname = window.location.pathname;
  // Очищаем путь от слешей и получаем последний сегмент
  const pageSlug =
    pathname
      .replace(/^\/|\/$/g, "")
      .split("/")
      .pop() || "home";

  console.log(`[Loader] Current page slug: ${pageSlug}`);

  try {
    // Пытаемся загрузить скрипт из папки /pages
    await import(`./pages/${pageSlug}.js`);
    console.log(`[Loader] Successfully loaded script for page: ${pageSlug}`);
  } catch (pageError) {
    try {
      // Если в /pages не нашли, ищем в /single
      await import(`./single/${pageSlug}.js`);
      console.log(
        `[Loader] Successfully loaded script for single: ${pageSlug}`
      );
    } catch (singleError) {
      console.log(`[Loader] No specific script found for "${pageSlug}".`);
    }
  }
};

// Запускаем все
document.addEventListener("DOMContentLoaded", () => {
  loadPageScript();
});
