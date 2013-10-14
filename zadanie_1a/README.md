#Zadanie 1a

##Poprawienie pliku `.csv`

Plik `Train.csv` zawiera znaki nowej linii (`\n`) w polach (pomiędzy `" "`). Należy to naprawić wykonując następujacą transformację:

	cat Train.csv | tr "\n" " " | tr "\r" "\n" > Train_prepared.csv`

Plik powinien zawierać `6034196` linii. Jak można sprawdzić wykonująć:

	wc -l Train_prepared.csv
	6034197 Train_prepared.csv

plik ma o jedną linię za dużo. Co w niej jest?

	tail -n 1 Train_prepared.csv

Pusta linia, ostał się jeden znak nowej linii za dużo, należy go usunąć. Można to zrobić na wiele sposobów, na przykład tak:
	
`head -n 6034196 Train_prepared.csv > Train.csv`

Ponownie sprawdzamy ile linii ma plik (`Train.csv`):

	wc -l Train.csv
	6043196 Train.csv

Jest ok. Gdy mamy już poprawny plik `.csv` robimy import do bazy.

##Import

Moja ścieżka do pliku: `...`

`mongoimport -d test -c train --type csv --headerline --file ...`

###Wynik

`imported ...`

###Sprawdzamy

	db.train.count()
	...


