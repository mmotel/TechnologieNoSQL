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
