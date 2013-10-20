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

	else{
		...
		db.collection('train', function (err, coll) {
			if(err){
				db.close();
				console.log(err); 
			}
			else{
				//operacje na kolekcji
			}
		});
	}

###Iteracja po kolekcji

Iterujemy używając `kursora` oraz jego metody `each()`:

	else{
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
	}

###Zamiana ciągu napisów na tablicę napisów

Sprawdzamy jakiego typu jest pole `Tags` każdego elemenu:

	else{
		if(item.Tags.constructor === String){ 
			...
		}
	}

Następnie używamy metodę `split()` aby rozdzielić ciag napisów do tablicy:

	if(item.Tags.constructor === String){
		var tagsSplited = item.Tags.split(" ");
	}

Na koniec dokonujemy aktualizacji obiektu w bazie:

	if(item.Tags.constructor === String){
		...
		coll.update({Id: item.Id}, {$set: {Tags: tagsSplited}}, function(err){
			if(err) { console.log(err); }
			else{
				//aktualizacja się powiodła
			}
		});
	}

Aby wszystkie akualizacje wykonały się poprawnie musimy poczekać na ich zakończenie. Policzymy ilość aktualizacji oraz ilość już wykonanych akutalizacji. Kiedy kolekcja będzie już pusta będziemy je porównywać aż będą takie same. W tym celu użyjemy dwóch zmiennych:

	else{
		var cursor = coll.find();
		...
		var updatesCount = 0;
		var updatedCount = 0;
		...
	} 

Zmienną `updatesCount` będziemy zwiększać kiedy warunek `item.Tags.constructor === String` będzie spełniony. Natomiast zmienną `updatedCount` gdy aktualizacja się powiedzie. Kod, który implementuje oczekiwanie na zakończenie akutalizacji:

	else if(item === null){
		var interval = setInterval( function(){
			if(updatesCount !== updatedCount){
				console.log("Czekam na wszystkie update-y...");
			}
			else{
				clearInterval(interval);
				db.close();
				console.log("Update-y zakończone.");
				console.log('MongoDB Rozłączone!');
			}
		}, 500);
	}

###Zliczanie

Podczas wykonywania zamiany zliczamy: ilość elementów, ilość tagów, ilość różnych tagów, ilość aktualizacji (już zaimplementowane).

Zmienne których użyjemy:

	else{
		var cursor = coll.find();
		var tagsCount = 0;
		var itemsCount = 0;
		var updatesCount = 0;
		...
		var tags = {};
		var diffTags = 0;
		...
	}

Ilość elementów zwiększamy przy każdej iteracji metody `each()`:

	cursor.each(function(err, item) {
		...
		else{
			itemsCount++;
			...
		}

Ilość tagów po podziale ciągu napisów:

	if(item.Tags.constructor === String){
		...
		var tagsSplited = item.Tags.split(" "); 
		tagsCount += tagsSplited.length;
		...
	}

Do zliczania ilości różnych tagów użyjemy `sztuczki` z polami obiektów w `JavaScript`:

	if(item.Tags.constructor === String){
		...
		for(var i=0; i < tagsSplited.length; i++){
			if(tags[tagsSplited[i]] === undefined){
				tags[tagsSplited[i]] = true; //cokolwiek byle pole było defined
				diffTags++;
			}
		}
		...
	}

Pozostało nam wypisać wyniki. Zrobimy to zaraz po zakończeniu wszystkich aktualizacji:

	else if(item === null){
			var interval = setInterval( function(){
				if(updatesCount !== updatedCount){
					console.log("Czekam na wszystkie update-y...");
				}
				else{
					clearInterval(interval);
					db.close();
					console.log("Update-y zakończone.");
					console.log('MongoDB Rozłączone!');
					console.log("ilość obiektów: " + itemsCount);
					console.log("ilość updateów: " + updatesCount);
					console.log("   ilość tagów: " + tagsCount);
					console.log(" różnych tagów: " + diffTags);
				}
			}, 500);
	}


###Wynik

Dla danych testowych (101 obiektów):

	MongoDB Połączono!
	Update-y zakończone.
	MongoDB Rozłączone!
	ilość obiektów: 101
	ilość updateów: 101
	   ilość tagów: 291
	 różnych tagów: 223

Dziękuję. Dobranoc.