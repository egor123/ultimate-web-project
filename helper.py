import os
import re
import json

regex = re.compile('.*\\.(html|css|js)$')
dict = {"components": {}, "views": {}}

jsDefComp = ["/**",
             "* @param {HTMLElement} element ",
             "**/",
             "export default function(element) {",
             "    //TODO AUTO GENERATED CODE",
             "}"]
jsDefView = ["/**",
             "* @param {HTMLElement} element ",
             "**/",
             "export function load(element) {",
             "    //TODO AUTO GENERATED CODE",
             "}",
             "/**",
             "* @param {HTMLElement} element ",
             "**/",
             "export function unload(element) {",
             "    //TODO AUTO GENERATED CODE",
             "}"]
htmlDef = ["<template>",
           "   <!-- TODO AUTO GENERATED CODE -->",
           "</template>"]
cssDef = ["u-{} {{",
          "   display: block;",
          "   /*TODO AUTO GENERATED CODE */",
          "}"]


def tryCreateFile(full_path, lines):
    print(full_path)
    with open(full_path, "a+", encoding="utf-8") as f:
        f.seek(0)
        if (f.read() == ""):
            print(f"creating file {full_path}")
            f.writelines('\n'.join(lines))


def updateFolder(force_create, folder_path, js, key1, cssFormater, postfixConvetr, ke2convertr, valueConvetr):
    for (path, _, names) in os.walk(folder_path):
        if (force_create or [f for f in names if regex.match(f)] != []):
            name = names[0].split(".")[0]
            css = [*cssDef]
            css[0] = css[0].format(cssFormater(name))
            path = path[1:].replace("\\", "/")
            tryCreateFile(f".{path}/{postfixConvetr(name)}.js", js)
            tryCreateFile(f".{path}/{postfixConvetr(name)}.css", css)
            tryCreateFile(f".{path}/{postfixConvetr(name)}.html", htmlDef)
            dict[key1][ke2convertr(name)] = valueConvetr(path, name)


def main():
    if not os.path.exists("./src/app"):
        os.mkdir("./src/app")

    updateFolder(True, "./src/app", jsDefComp, "components",
                 lambda n: "app",
                 lambda n: "app",
                 lambda n: "u-app",
                 lambda p, n: f"{p}/app")

    updateFolder(False, "./src/components", jsDefComp, "components",
                 lambda n: n,
                 lambda n: f"{n}.component",
                 lambda n: f"u-{n}",
                 lambda p, n: p+f"/{n}.component")

    updateFolder(False, "./src/views", jsDefView, "views",
                 lambda n: n,
                 lambda n: f"{n}.view",
                 lambda n: n.title(),
                 lambda p, n: [f"/#/{'' if n=='main' else n}", p+f"/{n}.view"])

    for (path, _, names) in os.walk("./src/locales"):
        dict["locales"] = {}
        for name in names:
            dict["locales"][name.split('.')[0]] = f"{path}/{name}"


    # TODO fancy json comarison
    with open("./src/settings.json", "w+") as f:
        f.write(json.dumps(dict, indent=4))


if __name__ == "__main__":
    main()
