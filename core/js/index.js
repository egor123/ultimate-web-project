import { ElementsUtils } from './elements.js';
import { Router } from './router.js';

const settings = await fetch("/src/settings.json")
    .then(t => t.text())
    .then(t => JSON.parse(t))

new ElementsUtils(settings.components);
new Router(settings.views);