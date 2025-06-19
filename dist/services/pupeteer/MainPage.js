import apiError from "../../exceptions/apiError.js";
export class MainPage {
    page;
    constructor(page) {
        this.page = page;
    }
    async findSearchField() {
        await this.page.evaluate(() => {
            const el = document.querySelector('input#a11y-search-input');
            if (el) {
                console.log(el.value);
            }
            else {
                throw apiError.BadRequest("pressLoginWithPassElement failed");
            }
        });
    }
    async fillAndSubmitSearch(text) {
        await this.page.evaluate((inputText) => {
            const inputEl = document.querySelector('input#a11y-search-input');
            if (!inputEl) {
                throw new Error("fillAndSubmitSearch failed: Input element not found");
            }
            inputEl.value = inputText;
            inputEl.dispatchEvent(new Event('input', { bubbles: true }));
            const btn = Array.from(document.querySelectorAll('button'))
                .find(btn => btn.textContent?.trim() === 'Найти');
            if (btn) {
                btn.click();
            }
            else {
                throw new Error("fillAndSubmitSearch failed: Search button not found");
            }
        }, text);
        await new Promise((resolve, reject) => setTimeout(resolve, 4000));
    }
    /**
     * Делает скриншот страницы.
     * @param path Путь для сохранения скриншота с обязательным расширением (.png, .jpeg, или .webp).
     */
    async takeScreenshot(path) {
        await this.page.screenshot({ path });
    }
    /**
     * Ожидает указанное количество миллисекунд.
     * @param ms Время ожидания в мс.
     */
    async waitFor(ms) {
        await new Promise((resolve) => setTimeout(resolve, ms));
    }
}
