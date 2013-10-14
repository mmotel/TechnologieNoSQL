#Zadanie 1a

##Poprawienie pliku csv

`cat Train.csv | tr -s "\n" | tr -d "\n" | tr "\r" "\n" > Train_prepared.csv`

Po naprawieniu pliku csv robimy import.

##Import

Moja ścieżka do pliku: `H:\nosql\Train.csv`

`mongoimport -d test -c train --type csv --headerline --file H:\nosql\Train.csv`

###Wynik

`imported ...`

###Sprawdzamy

	db.train.count()
	...


