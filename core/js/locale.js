import { Router } from "./router.js";

var locale = undefined;
var locales = undefined;
var localeMap = undefined;

export class Locales {
    constructor(l) {
        locales = l;
        window.addEventListener("hashchange", (e) => this.injectLocale(e));
        this.init();
    }
    async init() {
        await this.injectLocale({ newURL: window.location.href });
        class Locale extends HTMLElement {
            constructor() {
                super();
                this.update();
                this.addEventListener("localechange", (e) => this.update());
            }
            update() {
                this.innerHTML = Locales.get(this.getAttribute("path"));
            }
        }
        customElements.define("u-l", Locale);
    }
    async injectLocale(e) {
        const oldLocale = locale;
        var urlLocale = e?.newURL.match(/(?<=\/#\/)(.*?)(?=\/)/)?.[0];
        var navLocale = navigator.language.split("-")[0];
        if (Object.keys(locales).includes(urlLocale))
            locale = urlLocale;
        if (!locale && Object.keys(locales).includes(navLocale))
            locale = navLocale;
        locale = locale ?? "en";
        if (locale !== oldLocale)
            Locales.setLocale(locale);
    }
    static async setLocale(newLocale) {
        Router.setUrlBase(`./#/${locale ?? ''}/`, `./#/${newLocale}/`);
        localeMap = await fetch(locales[newLocale]).then(t => t.text()).then(JSON.parse);
        [...document.getElementsByTagName("u-l"), document].forEach(el => {
            el.dispatchEvent(new CustomEvent("localechange", {
                detail: { newLocale: newLocale },
            }));
        });
        locale = newLocale;
    }
    static get(path) {
        var map = localeMap;
        path?.split("/").forEach(p => { map = map[p] });
        return map;
    }
    static get locale() { return locale; }
    static get locales() { return Object.keys(locales); }
}