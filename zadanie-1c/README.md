#Zadania 1c

###Treść

Zadanie 1c. (Zamiana formatu danych.) Zamienić string zawierający tagi na tablicę napisów z tagami następnie zliczyć wszystkie tagi i wszystkie różne tagi. Napisać program, który to zrobi korzystając z jednego ze sterowników. Lista sterowników jest na stronie [MongoDB Ecosystem](http://docs.mongodb.org/ecosystem/).

##Rozwiązanie

Do rozwiązania zadania użyłem skryptu `JavaScript` uruchamianego na serwerze `Node.JS`, który korzysta ze sterownika [`The Node.JS MongoDB Driver`](http://mongodb.github.io/node-mongodb-native/).

###Szkielet rozwiązania

Ładujemy `sterownik` i otwieramy połączenie z bazą `train`: 

	var mongo = require('mongodb');

	var db = new mongo.Db('train', new mongo.Server('localhost', 27017), {safe: true});

	db.open(function (err) {
		if(err){ console.log(err); }
		else{
			console.log('MongoDB Połączono!');

			//operacje na bazie

			db.close();
			console.log('MongoDB Rozłączone!');
		}
	});

Otwieramy kolekcję `train`:

	db.collection('train', function (err, coll) {
		if(err){
			db.close();
			console.log(err); 
		}
		else{
			//operacje na kolekcji
		}
	});

###Iteracja po kolekcji

Iterujemy używając `kursora` oraz jego metody `each()`:

	var cursor = coll.find();

	cursor.each(function(err, item) {
		if(err){
			db.close();
			console.log(err); 
		}
		else if(item === null){
			//kolekcja jest już pusta
		}
		else{
			//operacje na elementach kolekcji
		}
	});

###Zamiana ciągu napisów na tablicę napisów

Sprawdzamy jakiego typu jest pole `Tags` każdego elemenu:

	if(item.Tags.constructor === String){ 
		...
	}

Następnie używamy metody `split()` aby rozdzielić ciag napisów do tablicy:

	var tagsSplited = item.Tags.split(" ");

Na koniec dokonujemy aktualizacji obiektu w bazie:

	coll.update({Id: item.Id}, {$set: {Tags: tagsSplited}}, function(err){
		if(err) { console.log(err); }
		else{
			//aktualizacja się powiodła
		}
	});