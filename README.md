#technologie-nosql

Technologie noSQL - `laboratoria`

##Wersje baz danych
* MongoDB `2.4.7 / 2.5.2` `update 2.4.6 -> 2.4.7 -> 2.4.8`
* CouchDB `1.3.1 / 1.4.0`
* Elasticsearch `0.90.5`

##Instalacje
* [MongoDB na Ubuntu](http://docs.mongodb.org/manual/tutorial/install-mongodb-on-ubuntu/)

##Zadanie 2

1. Wyszukać w sieci dane zawierające co najmniej `1 000 000` rekordów/jsonów.

2. Dane zapisać w bazach `MongoDB` i `Elasticsearch`.

3. Wymyśleć i opisać cztery agregacje – po dwie dla każdej z baz.

4. Zaprogramować i wykonać wszystkie aggregacje.

5. Wyniki przedstawić w postaci graficznej (wykresów, itp.).

##Zadanie 1

Co to jest [Exploratory Data Analysis](http://en.wikipedia.org/wiki/Exploratory_Data_Analysis) (EDA)?

![data cleaning](http://wbzyl.inf.ug.edu.pl/nosql/images/data-cleaning.png "data-cleaning")

Na [Kaggle](https://www.kaggle.com/) znajdziemy dużo interesujących danych. W sierpniu 2013 Facebook ogłosił konkurs [Identify keywords and tags from millions of text questions](https://www.kaggle.com/c/facebook-recruiting-iii-keyword-extraction). Skorzystamy z danych udostępnionych na ten konkurs przez [Stack Exchange](http://stackexchange.com/):

 * [`Train.zip` o rozmiarze `2.19 GB`](https://www.kaggle.com/c/facebook-recruiting-iii-keyword-extraction/download/Train.zip)

Archiwum `Train.zip` zawiera plik `Train.csv` (`6.8 GB`). Każdy rekord zawiera cztery pola `"Id","Title","Body","Tags"`:

 * `Id` – Unique identifier for each question
 * `Title` – The question's title
 * `Body` – The body of the question
 * `Tags` – The tags associated with the question (all lowercase, should not contain tabs `'\t'` or ampersands `'&'`)

Przykładowy rekord `CSV` z pliku `Train.csv`:

	"2","How can I prevent firefox from closing when I press ctrl-w",
	"<p>In my favorite editor […]</p>
	
	<p>Rene</p>
	","firefox"

Do testowania swoich rozwiązań można skorzystać ze `101 JSON–ów` [fb101.json](https://github.com/nosql/aggregations-2/blob/master/data/wbzyl/fb101.json). Wybrałem je losowo po zapisaniu rekordów z `Train.csv` w bazie `MongoDB`.

###Rozwiązania

 * [Zadanie 1a i 1b](https://github.com/mmotel/technologie-nosql/tree/master/zadanie-1a-1b) 
 * [Zadanie 1c](https://github.com/mmotel/technologie-nosql/tree/master/zadanie-1c)
 * [Zadanie 1d](https://github.com/mmotel/technologie-nosql/tree/master/zadanie-1d)
 * [Zadanie 1e](https://github.com/mmotel/technologie-nosql/tree/master/zadanie-1e) 
