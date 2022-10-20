// import imp from './import.js'
// import(imp("test", "/components/test/test.component")).then(test => test.default())
// import("../../src/components/test/test.component.html").then(test => console.log(test));
// import t from '../../src/components/test/test.component.js'
// console.log('Hello world!')
// t()

import('../../src/app/app.js').then((test) => test.default())
fetch('../../src/app/app.html')
    .then((t) => t.text())
    .then((t) => t.replace(/<.*template>/, ''))
    .then((t) => document.getElementById("app").innerHTML = t)
    // .then((t) => {
    //     [...document.getElementsByTagName('test')].forEach((el) => {
    //         el.innerHTML = t;
    //     });
    // });