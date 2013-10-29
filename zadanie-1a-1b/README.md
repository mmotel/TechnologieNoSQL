#Zadania 1a i 1b

###Treść

Zadanie 1a polega na zaimportowaniu, do systemów baz danych uruchomionych na swoim komputerze, danych z pliku `Train.csv`, bazy:

 * `MongoDB`
 * `PostgreSQL` – opcjonalnie dla znających fanów `SQL`

Zadanie 1b. Zliczyć liczbę zaimportowanych rekordów (Odpowiedź: `imported 6_034_195 objects`).

##Poprawienie pliku `.csv`

Plik `Train.csv` zawiera znaki nowej linii (`\n`) w polach . Należy to naprawić wykonując następujacą transformację:

```sh
cat Train.csv | tr "\n" " " | tr "\r" "\n" > Train_prepared.csv
```

Plik powinien zawierać `6 034 196` linii. Jak można sprawdzić wykonująć:

```sh
wc -l Train_prepared.csv
6034197 Train_prepared.csv
```

plik ma o jedną linię za dużo. Co w niej jest?

```sh
tail -n 1 Train_prepared.csv
```

Pusta linia, ostał się jeden znak nowej linii za dużo, należy go usunąć. Można to zrobić na wiele sposobów, na przykład tak:
	
```sh
head -n 6034196 Train_prepared.csv > Train.csv
```

Ponownie sprawdzamy ile linii ma plik `Train.csv`:

```sh
wc -l Train.csv
6043196 Train.csv
```

Jest ok. Gdy mamy już poprawny plik `.csv` robimy import do bazy.

##Import

Podczas importu mierzymy czas za pomocą polecenia `time` poprzedzając im właściwe polecenie `mongoimport` ze wszystkimi parametrami.

```sh
time mongoimport -d train -c train --type csv --headerline --file Train.csv
```

###Wynik

```
connected to: 127.0.0.1
Mon Oct 28 18:29:37.015 		Progress: 41930908/7253917399	0%
...
Mon Oct 28 18:38:44.773 		Progress: 7252389096/7253917399	99%
Mon Oct 28 18:38:44.773 			6032900	10968/second
Mon Oct 28 18:38:45.110 check 9 6034196
Mon Oct 28 18:38:45.338 imported 6034195 objects
```

###Czasy

```
real	9m11.278s
user	2m53.240s
sys 	0m13.764s
```

W ciągu `9m11.278s` do bazy zaimportowało się `6 034 195` obiektów. Co średnio daje `~16 264` insertów do bazy na sekundę.

###Sprawdzenie

```js
mongo
MongoDB shell version: 2.4.6
connecting to: test
> use train
switched to db train
> db.train.count()
6034195
```

###Wyniki z MongoDB Management Service

![mms-results](1a-import-mms.png)

Dziękuję. Dobranoc.

