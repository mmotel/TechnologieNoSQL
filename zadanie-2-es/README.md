#Zadanie 2 - Elasticsearch

##Dane

[GetGlue and Timestamped Event Data](http://getglue-data.s3.amazonaws.com/getglue_sample.tar.gz) (ok. `11 GB`, `19 831 300` json-ów, próbka 100 jsonów [getglue101](https://github.com/nosql/aggregations-2/blob/master/data/wbzyl/getglue101.json)). Są to dane z [IMDB](http://www.imdb.com/) z lat 2007–2012, tylko filmy i przedstawienia TV. 

Przykładowy dokument `json`:

```json
{
  "_id": ObjectId("5276918832cf3c2b84540440"),
  "comment": "",
  "modelName": "movies",
  "displayName": "",
  "title": "The Dark Knight",
  "timestamp": "2008-10-28T16:47:31Z",
  "image": "http://ia.media-imdb.com/images/...@@._V1._SX94_SY140_.jpg",
  "userId": "sippey",
  "private": "false",
  "director": "Christopher Nolan",
  "source": "http://www.imdb.com/title/tt0468569/",
  "version": "1",
  "link": "http://www.imdb.com/title/tt0468569/",
  "lastModified": "2011-12-16T19:39:33Z",
  "action": "Liked",
  "lctitle": "the dark knight",
  "objectKey": "movies/dark_knight/christopher_nolan"
}
```

##Import

Do masowego importu danych do Elasticsearch'a użyjemy [`Bulk API`](http://www.elasticsearch.org/guide/en/elasticsearch/reference/current/docs-bulk.html).  

###Przygotowanie danych

Bulk API wymaga "przeplatanych" JSON'ów o następującej strukturze:

```js
{ "index": { "_type": "type name" } } //nazwa typu, do którego chcemy dodać dokument
{ "field": "content" ... } //dokument
```

Do wygenerowania "przeplatanych" JSON'ów użyjemy programu [`jq`](http://stedolan.github.io/jq/).

```sh
cat getglue_examples.json | jq --compact-output '{ "index": { "_type": "imdb" } }, .' > getglue.bulk
```

##Aggregacje

Do wykonania aggregacji w Elasticsearch użyjemy [`wyszukiwania fasetowego`](http://en.wikipedia.org/wiki/Faceted_search) - [`facets search w ES`](http://www.elasticsearch.org/guide/en/elasticsearch/reference/current/search-facets.html).

Do wykonywania zapytań użyjemy programu [`curl`](http://pl.wikipedia.org/wiki/CURL):

```sh
curl -X POST "http://localhost:9200/data/_search?pretty=true" -d '{ "query": { } }'
```

###Aggregacja 1

***Dziesięciu najaktywniejszych użytkowików***

Aggregacja ma policzyć ile akcji wykonał każdy z użytkowników i zwrócić dziesięciu najaktywniejszych.

####Kod aggregacji

```json
{
    "query" : {
        "match_all" : {  }
    },
    "facets" : {
        "userId" : {
            "terms" : {
                "field" : "userId",
                "size" : 10
            }
        }
    }
}
```

###Aggregacja 2

***Aktywność użytkowników według miesięcy***

Aggregacja ma policzyć ile akcji wykonali użytkownicy w ciągu kolejnych miesięcy.

####Kod aggregacji

```json
{
    "query" : {
        "match_all" : {}
    },
    "facets" : {
        "histo1" : {
            "date_histogram" : {
                "field" : "timestamp",
                "interval" : "month"
            }
        }
    }
}
```
