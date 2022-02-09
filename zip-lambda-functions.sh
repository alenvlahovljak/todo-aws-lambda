#!/bin/bash

cd ./lambda/create && zip -r ../../zip/create.zip . && cd .. && cd ..
cd ./lambda/delete && zip -r ../../zip/delete.zip . && cd .. && cd ..
cd ./lambda/read && zip -r ../../zip/read.zip . && cd .. && cd ..
