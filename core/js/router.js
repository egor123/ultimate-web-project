import { ElementsUtils } from './elements.js';

export class Router {
    constructor(routes) {
        class Router extends HTMLElement {
            constructor() {
                super();
                window.addEventListener('hashchange', (e) => this.route(e));
                this.route({ newURL: window.location.href })
            }
            route(e) {
                if(this.view != undefined)
                    this.unload(this.view);
                this.view = this.routes[e.newURL.match(/\/#(.*)$/)[0]];
                if(this.view === this.undefined){
                    window.history.pushState(null, null, "/#/");
                    this.view = this.routes["/#/"]
                }
                this.load(this.view);
            }
            load(route){
                this.innerHTML = route.html;
                route.module?.load?.(this);
                ElementsUtils.setCss(route.path);
            }
            unload(route){
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
}