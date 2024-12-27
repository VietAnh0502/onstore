@echo off
echo Starting Onstore services...

cd "./onstore-BE"
start npm run start

cd "../onstore"
start npm run dev

echo Onstore services started.
pause