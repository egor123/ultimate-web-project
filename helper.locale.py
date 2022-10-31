import sys
import os
import json
import collections


def getFullKeys(data, path=""):
    keys = set()
    for key in data:
        if isinstance(data[key], dict):
            keys |= getFullKeys(data[key], f"{path}/{key}")
        else:
            keys.add(f"{path}/{key}")
    return keys


def getVal(data, path, defoult):
    for p in path:
        data.setdefault(p, {})
        data = data[p]
    return data or defoult


def setVal(data, path, value):
    for (i, p) in enumerate(path):
        data.setdefault(p, {})
        if i + 1 < len(path):
            data = data[p]
        else:
            data[p] = value

def f(i):
    match i[0]:
        case "id":
            return "1"
        case "name":
            return "2"
    return i[0]

def sortDict(d):
    d = dict(sorted(d.items(), key=f))
    for i in d:
        if isinstance(d[i], dict):
            d[i] = sortDict(d[i])
    return d


def compareJson(path, required_keys):
    with open(path, "r+") as f:
        data = {}
        if os.path.getsize(path) > 0:
            data = json.load(f)
        newData = {}
        for key in required_keys:
            path = key.split("/")[1:]
            setVal(newData, path, getVal(data, path, "TODO!!!"))
        newData = sortDict(newData)
        f.truncate(f.seek(0))
        f.write(json.dumps(newData, indent=4, ensure_ascii=False, sort_keys=False))

        # f.write(json.dumps(newData, indent=4, ensure_ascii=False, sort_keys=True))


def main():
    file_path = sys.argv[1]
    dir_path = "\\".join(file_path.split('\\')[:-1])
    keys = {}

    if os.path.getsize(file_path) == 0:
        for name in os.listdir(dir_path):
            if os.path.getsize(f"{dir_path}\{name}") > 0:
                file_path = f"{dir_path}\{name}"
                break
        else:
            return

    with open(file_path, "r+") as f:
        keys = getFullKeys(json.load(f))

    for name in os.listdir(dir_path):
        compareJson(f"{dir_path}\{name}", keys)


if __name__ == "__main__":
    main()
