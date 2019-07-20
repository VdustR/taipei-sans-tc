#!/bin/bash
docker run --rm -it -v $(pwd):/fonts vdustr/font-splitter src/TaipeiSansTCBeta-Regular.ttf -o dist/Regular -n "Taipei Sans TC"
docker run --rm -it -v $(pwd):/fonts vdustr/font-splitter src/TaipeiSansTCBeta-Light.ttf -o dist/Light -n "Taipei Sans TC" -w 300
docker run --rm -it -v $(pwd):/fonts vdustr/font-splitter src/TaipeiSansTCBeta-Bold.ttf -o dist/Bold -n "Taipei Sans TC" -w 700
