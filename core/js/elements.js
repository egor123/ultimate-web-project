export class ElementsUtils {
    constructor(components) {
        for (const [name, path] of Object.entries(components))
            this.create(name, path);
    }
    async create(name, path) {
        const html = await ElementsUtils.getHtml(path);
        const module = await ElementsUtils.getJs(path);
        ElementsUtils.setCss(path);
        customElements.define(name, class Custom extends HTMLElement {
            constructor() {
                super();
                const inner = document.createElement("div");
                inner.innerHTML = html;
                const content = inner.querySelector("u-content");
                if (content) content.innerHTML = this.innerHTML;
                this.innerHTML = inner.innerHTML;
                module?.default?.(this);
            }
        });
    }
    static async getHtml(path) {
        return await fetch(path + ".html")
            .then(t => t.text())
            .then(t => t.replaceAll(/<.*template>/g, ''));
    }
    static setCss(path) {
        var link = document.createElement("link");
        link.type = "text/css";
        link.rel = "stylesheet";
        link.href = path + ".css";
        document.head.appendChild(link);
    }
    static removeCss(path) {
        [...document.head.getElementsByTagName("link")].forEach(el => {
            if (el.getAttribute("href") === path + ".css") {
                document.head.removeChild(el);
                return;
            }
        });
    }
    static async getJs(path) {
        return import(window.location.origin + window.location.pathname + path + ".js");
    }
}