#Zadania 1d

###Treść

Zadanie 1d. Ściągnąć plik text8.zip ze strony [Matt Mahoney](http://mattmahoney.net/dc/textdata.html) (po rozpakowaniu 100MB):

wget http://mattmahoney.net/dc/text8.zip -O text8.gz

Zapisać wszystkie słowa w bazie MongoDB. Następnie zliczyć liczbę słów oraz liczbę różnych słów w tym pliku. Ile procent całego pliku stanowi:

 * najczęściej występujące słowo w tym pliku
 * 10, 100, 1000 najczęściej występujących słów w tym pliku


##Rozwiązanie

Do rozwiązania zadania użyłem skryptu `JavaScript` uruchamianego na serwerze [`Node.JS`](http://nodejs.org/) w wersji `0.10.21`, który korzysta ze sterownika [`The Node.JS MongoDB Driver`](http://mongodb.github.io/node-mongodb-native/) w wersji `1.3.19`.
