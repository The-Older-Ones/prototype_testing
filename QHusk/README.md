# QHusk
---
## Benötigte Technologien
- Node V19.2.0 oder höher
---
## Installation
- npm install
---
## Starten des Programmes
- npm start
---
## Beschreibung 
QHusk erlaubt Ihnen Trivia Fragen von verschiedenen API´s abzufragen, in ein JSON Format zu bringen und diese anschließend in den jeweiligen Ordner unter dem Überverzeichniss "Q" abzuspeichern.

---
## Tools
- npm run themis

**Themis** ist ein Script, um doppelte Quizfragen innerhalb eines oder mehrerer JSON datein anhand ihrer id auszusortieren und in ein oder mehrere neue JSON datein abzuspeichern. Es werden je Max 50 Fragen in einer JSON abgelegt.

Um diese Tool zu nutzen, koopieren Sie bitte alle unsortieren JSON Datein in den Ordner **"./Themis/input"** und starten per **npm run themis** das Skript. Die neu sortieren JSON Datein befinden sich dann im Ordner **"./Themis/output"**.

*Wichtig : Datein werden nicht gelöscht und müssen auch handisch aus den input und output Ordner entfernt werden.*


