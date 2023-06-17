@ECHO OFF
ECHO Starting server...

START "" /B npm run dev

ECHO Waiting for the server to start...
timeout /T 3 > NUL

ECHO Opening the page...
START "" http://localhost:3000