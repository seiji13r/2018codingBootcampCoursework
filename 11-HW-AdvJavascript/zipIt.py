#!/usr/bin/env python3
# zip constructorword.zip ConstructorWordGuess/keys.js
# call(["ls", "-l"])

import os
from subprocess import call

zipFileName = "constructorword.zip"

if os.path.exists(zipFileName):
  os.remove(zipFileName)

myFolder = "ConstructorWordGuess"

files = ["Letter.js", "Word.js", "index.js", "package.json", "randomwords.js"]

print("Compressing Files and Adding them to ", zipFileName)
for myFile in files:
    myCall = ["zip", zipFileName, myFolder + "/" + myFile]
    # print(myCall)
    call(myCall)