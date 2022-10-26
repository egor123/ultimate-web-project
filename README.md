# Recomended Extentions For VS Code

(also added to workspace recomendations)

- [Run on Save](https://marketplace.visualstudio.com/items?itemName=emeraldwalk.RunOnSave) Will execute helper.py only when <b>ANY FILE IS SAVED</b> (ctrl+s), not when file created / deleted!!!

- [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) It is better to use local server (not necessary to use this specific extentions), than just open index.html due to CORS.

# Project

- ## ./src/app

  Files in this directory will be automaticly builded in index.html.

- ## ./src/components

  Files in this directory will automaticly converted into custom HTML elements. Examle test.component.html can be used as <b>\<u-test></b> html tag in other files (<b>avoid recursion!!!</b>). In css file always specify from custom element tag. Subfolders are suported.

- ## ./src/views

  Files in this directory will automaticly injected into <b>\<u-router></b> tag accoarding to current url path. Examle test.view.html will be injected at <b>http://***/#/test</b>. In css file always specify from <b>\<u-router></b> tag. Subfolders are suported.

- ## settings.json

  Used for creating components and views, <b>EVRY COMPONENT AND VIEW</b> must be added to this file. Include file name without format postfix to use all html/css/js files.

  - ### App
    key: html tag, value: path.
    ````json
    "components": { "u-app": "/src/app/app" }
    ````
  - ### Test Component
    key: html tag, value: path.
    ````json
    "components": { "u-test": "/src/components/test/test.component" }
    ````
  - ### Test View
    key: page name, value: array of url and path.
    ````json
    "components": { "Test": [ "/#/test", "/src/views/test/test.view"] }
    ````

# Additional

- ### helper.py

  On execution creates missing html/css/js files and updates settings.json.

- ### ./core/\*

  Does all black magic behind the scenee. <b>DO NOT EDIT</b>.

- ### index.html
  Main html file. It is highly recomended not to edit this file, but using instead <b>./src/app</b>.
