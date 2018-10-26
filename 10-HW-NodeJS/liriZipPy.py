#!/usr/bin/env python3

# zip liri-node-app.zip liri-node-app/keys.js
from subprocess import call
# call(["ls", "-l"])
myFolder = "liri-node-app/"

files = ["keys.js", "liri.js", "package.json", "random.txt"]

print("Compressing Files and Adding them to iri-node-app.zip")
for myFile in files:
    myCall = ["zip", "liri-node-app.zip", "liri-node-app/" + myFile]
    # print(myCall)
    call(myCall)