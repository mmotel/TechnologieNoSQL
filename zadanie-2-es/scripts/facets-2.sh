#ES facets search
#run : ./facets-1.sh

#aggregation 1

#top 10 users by activity

curl -X POST "http://localhost:9200/data/_search?pretty=true" -d '
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
' | jq . > facets-result-2.js