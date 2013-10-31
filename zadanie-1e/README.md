#Zadanie 1e

##Treść

Zadanie 1e. Wyszukać w sieci dane zawierające obiekty [`GeoJSON`](http://geojson.org/geojson-spec.html#examples). Zapisać dane w bazie `MongoDB`.

Dla zapisanych danych przygotować 6–9 różnych [`Geospatial Queries`](http://docs.mongodb.org/manual/applications/geospatial-indexes/) (co najmniej po jednym dla obiektów `Point`, `LineString` i `Polygon`). W przykładach należy użyć każdego z tych operatorów: `$geoWithin`, `$geoIntersect`, `$near`.

##Dane

Do rozwiązania zadania użyłem danych ze strony [`U.S. Geological Survey`](http://www.usgs.gov/) z działu [`United States Board on Geographic Names`](http://geonames.usgs.gov/) pt. [`Domestic and Antarctic Names`](http://geonames.usgs.gov/domestic/download_data.htm) dla stanu `Nowy Jork`.

Źródło danych: [link](http://geonames.usgs.gov/docs/stategaz/NY_Features_20131020.zip)


##EDA

###Przygotowanie danych

####Poprawka pliku

```sh
cat NY_Features_20131020.txt | tr "|" "," > NY_Prepared.txt
```

####Import 

```sh
time mongoimport -d geony -c ny --type csv --headerline --file NY_Prepared.txt
```

####Wynik

```sh
connected to: 127.0.0.1
Wed Oct 30 18:11:43.003 		Progress: 5484351/10467976	52%
Wed Oct 30 18:11:43.003 			40900	13633/second
Wed Oct 30 18:11:44.412 check 9 77132
Wed Oct 30 18:11:44.538 imported 77131 objects
```

####Czasy

```sh
real	0m4.324s
user	0m1.392s
sys	0m0.144s
```

###Robimy geoJSONy

Do przygotowania obiektów `geoJSON` użyjemy prostego skryptu powłoki `Mongo`, który z pól: `FEATURE_ID` ,`FEATURE_NAME` ,`PRIM_LONG_DEC` ,`PRIM_LAT_DEC` utworzy obiekty o takiej strukturze:

```json
{
	"id": FEATURE_ID,
	"name": FEATURE_NAME,
	"loc": { "type":"Point", "coordinates": [ PRIM_LONG_DEC , PRIM_LAT_DEC ] }
}
```

`**` Skrypt usuwa niepoprawne obiekty geoJSON z kolekcji `ny`. Jest ich `16`.

Uruchamiamy skrypt:

```sh
time mongo geony script.js > make-geo-points-results.txt 
```

####Czasy

```sh
real	0m7.311s
user	0m6.484s
sys	0m0.772s
```

####Dodajemy indeks:

```js
db.geony.ensureIndex({"loc" : "2dsphere"});
```

##Zapytania

###$near

Wybrany punkt:

```json
{ 
	"_id" : ObjectId("527173ea5ac806a1e7c896ca"), 
	"id" : 209943, 
	"name" : "Port Chester Harbor", 
	"loc" : { 
		"type" : "Point", 
		"coordinates" : [ -73.6605406,  40.9844661 ] 
	} 
}
```

Port Chester Harbor w Google Maps: [link](http://goo.gl/maps/V2i7z)

```js
var punkt = { 
	"type" : "Point", 
	"coordinates" : [ -73.6605406,  40.9844661 ] 
};

db.geony.find({ loc: {$near: {$geometry: punkt}, $maxDistance: 200} }).toArray()
```

####Wynik

```json
[
	{ // #1 na mapie poniżej
		"_id" : ObjectId("527173ea5ac806a1e7c896ca"),
		"id" : 209943,
		"name" : "Port Chester Harbor",
		"loc" : {
			"type" : "Point",
			"coordinates" : [ -73.6605406, 40.9844661 ]
		}
	},
	{ // #2 na mapie poniżej
		"_id" : ObjectId("527173ed5ac806a1e7c91ee6"),
		"id" : 977443,
		"name" : "Manursing Island Reef",
		"loc" : {
			"type" : "Point",
			"coordinates" : [ -73.6595721, 40.9845422 ]
		}
	},
	{ // #3 na mapie poniżej
		"_id" : ObjectId("527173ed5ac806a1e7c91eb4"),
		"id" : 977393,
		"name" : "Port Chester Harbor",
		"loc" : {
			"type" : "Point",
			"coordinates" : [ -73.6610683, 40.9834385 ]
		}
	}
]
```

####Wynik na Google Maps

![google-maps-1](1e-sampel1.png)

##Wyniki z MongoDB Management Service

![mms-results-1](1e-mms-1.png)