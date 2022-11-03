import os
import shutil
import json


def main():
    if os.path.exists("./dist"):
        shutil.rmtree("./dist")
    os.mkdir("./dist")
    shutil.copy("./core/compiler.html", "./dist/index.html")

    with open("./src/settings.json") as f:
        settings = json.load(f)

    with open("./dist/index.html", "r+") as f:
        txt = f.read()
        f.truncate(f.seek(0))
        names = []
        htmls = []
        funcs = []
        styles = []
        with open("./core/css/index.css") as st:
            styles.append(st.read())
        for key in settings["components"]:
            names.append(key)
            with open(f".{settings['components'][key]}.html") as h:
                htmls.append(h.read()[10:-11].replace('\n', '').replace('    ', ''))
            with open(f".{settings['components'][key]}.css") as s:
                styles.append(s.read())
        txt = txt.replace("n = []", "n = [{}]".format(','.join(f"'{n}'" for n in names)))
        txt = txt.replace("h = []", "h = [{}]".format(','.join(f"'{h}'" for h in htmls)))
        txt = txt.replace("/* INJECT_STYLES */", '\n'.join(styles).replace(" ", "").replace("\n", ""))
        # txt = txt.replace("  ", "").replace("\n", "")
        # txt = txt.replace("const h = []", "const n = ["+','.join('\"'+h+'\"' for h in htmls)+""]")
        f.write(txt)


if __name__ == "__main__":
    main()
