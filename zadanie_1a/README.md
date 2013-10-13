#Zadanie 1a

##Poprawienie pliku csv

Wykonujemy dwa replace-y:
1. \n -> spacja
2. \"spacja\" -> \"\n\" 

Po naprawieniu pliku csv robimy import.

##Import

`mongoimport -d test -c train --type csv --headerline --file path_to_file`

###Wynik

`imported ...`

###Sprawdzamy

	db.train.count()
	...


