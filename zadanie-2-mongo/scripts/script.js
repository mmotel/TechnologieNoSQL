// run: mongo imdb script.js
// set or comment limit to set number of elements

var coll = db.imdb;

var result = coll.aggregate(
  // { $limit: 1000000 },
  { $match: { "modelName": "movies" || "tv_shows"  } },
  { $group: {_id: "$title", count: {$sum: 1} } },
  { $sort: {count: -1} },
  { $limit: 10}
);

printjson(result);

// var totalCount = 0;

// for(var i = 0; i < result.result.length; i++){
//  print(result.result[i]["_id"] + ": " + result.result[i].count);
// }

// var wordsCount = coll.count();

// print(" słów: " + i);
// print("ilość: " + totalCount);
// print("część: " + (totalCount / wordsCount) * 100 + "%");

// "_id": 0, "comment": 0, "modelName": 0, "displayName": 0, "title": 1, "timestamp": 0, "image": 0, "userId": 0, "private": 0, "director": 0, "source": 0, "version": 0, "link": 0, "lastModified": 0, "action": 0, "lctitle": 0, "objectKey": 0 