#Zadanie 1a

##Poprawienie pliku `.csv`

Plik `Train.csv` zawiera znaki nowej linii (`\n`) w polach (pomiędzy `" "`). Należy to naprawić wykonując następujacą transformację:

	cat Train.csv | tr "\n" " " | tr "\r" "\n" > Train_prepared.csv

Plik powinien zawierać `6034196` linii. Jak można sprawdzić wykonująć:

	wc -l Train_prepared.csv
	6034197 Train_prepared.csv

plik ma o jedną linię za dużo. Co w niej jest?

	tail -n 1 Train_prepared.csv

Pusta linia, ostał się jeden znak nowej linii za dużo, należy go usunąć. Można to zrobić na wiele sposobów, na przykład tak:
	
	head -n 6034196 Train_prepared.csv > Train.csv

Ponownie sprawdzamy ile linii ma plik `Train.csv`:

	wc -l Train.csv
	6043196 Train.csv

Jest ok. Gdy mamy już poprawny plik `.csv` robimy import do bazy.

##Import

W czasie importu mierzymy czas za pomocą polecenia `time` poprzedzając im właściwe polecenie `mongoimport` ze wszystkimi parametrami.

	time mongoimport -d train -c train --type csv --headerline --file Train.csv

###Wynik

	connected to: 127.0.0.1
	Mon Oct 14 23:29:37.015 		Progress: 41930908/7253917399	0%
	...
	Mon Oct 14 23:38:44.773 		Progress: 7252389096/7253917399	99%
	Mon Oct 14 23:38:44.773 			6032900	10968/second
	Mon Oct 14 23:38:45.110 check 9 6034196
	Mon Oct 14 23:38:45.338 imported 6034195 objects

###Czasy

	real	9m11.278s
	user	2m53.240s
	sys	0m13.764s

###Sprawdzamy

	mongo
	use train
	train.train.count()
	...


