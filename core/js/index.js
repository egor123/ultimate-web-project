import { ElementsUtils } from './elements.js';
import { Router } from './router.js';
import { Locales } from './locale.js';

const settings = await fetch(window.location.origin + window.location.pathname + "./src/settings.json")
    .then(t => t.text())
    .then(t => JSON.parse(t))

new ElementsUtils(settings.components);
new Locales(settings.locales);
new Router(settings.views);