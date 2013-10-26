#Zadania 1d

###Treść

Zadanie 1d. Ściągnąć plik `text8.zip` ze strony [Matt Mahoney](http://mattmahoney.net/dc/textdata.html) (po rozpakowaniu 100MB):

	wget http://mattmahoney.net/dc/text8.zip -O text8.gz

Zapisać wszystkie słowa w bazie MongoDB. Następnie zliczyć liczbę słów oraz liczbę różnych słów w tym pliku. Ile procent całego pliku stanowi:

 * najczęściej występujące słowo w tym pliku
 * 10, 100, 1000 najczęściej występujących słów w tym pliku

Wskazówka: Zaczynamy od prostego `EDA`. Sprawdzamy, czy plik `text8` zawiera wyłącznie znaki alfanumeryczne i białe:

	tr --delete '[:alnum:][:blank:]' < text8 > deleted.txt
	ls -l deleted.txt
	  -rw-rw-r--. 1 wbzyl wbzyl 0 10-16 12:58 deleted.txt # rozmiar 0 -> OK
	rm deleted.txt

Dopiero teraz wykonujemy te polecenia:

	wc text8
	  0         17005207 100000000 text8
	tr --squeeze-repeats '[:blank:]' '\n' < text8 > text8.txt
	wc text8.txt
	  17005207  17005207 100000000 text8.txt  # powtórzone 17005207 -> OK


##Rozwiązanie

Do rozwiązania zadania użyłem skryptu `JavaScript` uruchamianego na serwerze [`Node.JS`](http://nodejs.org/) w wersji `0.10.21`, który korzysta ze sterownika [`The Node.JS MongoDB Driver`](http://mongodb.github.io/node-mongodb-native/) w wersji `1.3.19`.
