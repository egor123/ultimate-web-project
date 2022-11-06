import { ElementsUtils } from './elements.js';

var urlBase = "/#/";

export class Router {
    constructor(routes) {
        class Router extends HTMLElement {
            constructor() {
                super();
                onhashchange = (e) => this.route(e);
                this.route({ newURL: window.location.href })
            }
            route(e) {
                window.scrollTo(0, 0);
                if (this.view !== undefined)
                    this.unload(this.view);
                if (e.newURL.includes(urlBase))
                    this.view = this.routes[`/#/${e.newURL.split(urlBase)[1] ?? ''}`];
                else {
                    this.view = this.routes[e.newURL.match(/\/#\/(.*)$/)?.[0]];
                    window.history.replaceState(null, null, `${urlBase}${e.newURL.split("/#/")[1]}`)
                }
                if (this.view === undefined) {
                    window.history.pushState(null, null, urlBase);
                    this.view = this.routes["/#/"];
                    window.dispatchEvent(new HashChangeEvent("hashchange", { newURL: window.location.origin + urlBase }));
                }
                else
                    this.load(this.view);
            }
            load(route) {
                this.innerHTML = route.html;
                route.module?.load?.(this);
                ElementsUtils.setCss(route.path);
            }
            unload(route) {
                route.module?.unload?.(this);
                ElementsUtils.removeCss(route.path);
            }
        }
        Promise.resolve(this.getRoutes(routes)).then(r => {
            Router.prototype.routes = r;
            customElements.define("u-router", Router);
        });
    }
    async getRoutes(routes) {
        return Object.assign({}, ... await Promise.all(Object.entries(routes).map(async ([name, [url, path]]) => {
            const html = await ElementsUtils.getHtml(path);
            const module = await ElementsUtils.getJs(path);
            return { [url]: { name, path, html, module } };
        })));
    }
    static setUrlBase(oldBase, newBase) {
        window.history.replaceState(null, null, `${newBase}${window.location.href?.split(oldBase)[1] ?? ''}`);
        urlBase = newBase;
    }
}