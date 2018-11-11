#!/usr/bin/env python3
# zip bamazon.zip bamazon/bamazonCustomer.js bamazon/bamazonManager.js ...
# call(["ls", "-l"])

import os
from subprocess import call

zipFileName = "bamazon.zip"

if os.path.exists(zipFileName):
  os.remove(zipFileName)

myFolder = "bamazon"

files = ["bamazon.sql", "bamazonCustomer.js", "bamazonManager.js", "bamazonSupervisor.js", "product_sales_update.js", "README.md", ".env_sample", "img"]

print("Compressing Files and Adding them to ", zipFileName)
for myFile in files:
    myCall = ["zip", "-r", zipFileName, myFolder + "/" + myFile]
    # print(myCall)
    call(myCall)