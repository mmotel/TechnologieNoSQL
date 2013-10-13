#Zadanie 1a

##Poprawienie pliku csv

Wykonujemy dwa replace-y:

1. `\n -> spacja`
2. `\"spacja\" -> \"\n\"`

Po naprawieniu pliku csv robimy import.

##Import

Moja ścieżka do pliku: `H:\nosql\Train.csv`

`mongoimport -d test -c train --type csv --headerline --file H:\nosql\Train.csv`

###Wynik

`imported ...`

###Sprawdzamy

	db.train.count()
	...


