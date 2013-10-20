var mongo = require('mongodb');

var db = new mongo.Db('train', new mongo.Server('localhost', 27017), {safe: true});

db.open(function (err) {
  if(err){ console.log(err); }
  else{
    console.log('MongoDB Connected!');

    db.collection('test3', function (err, coll) {
      if(err){
        db.close();
        console.log(err); 
      }
      else{
        var cursor = coll.find();
        var tagsCount = 0;
        var itemsCount = 0;
        var updatesCount = 0;
        var updatedCount = 0;
        var tags = {};
        var diffTags = 0;

        cursor.each(function(err, item) {
          if(err){
            db.close();
            console.log(err); 
          }
          else if(item === null){
            console.log("items count: " + itemsCount);
            console.log("updts count: " + updatesCount);
            console.log(" tags count: " + tagsCount);
            console.log("  diff tags: " + diffTags);
              //czekamy aż mongo zakończy updaty
              var interval = setInterval( function(){
                if(updatesCount !== updatedCount){
                  console.log("czekam na zakończenie update-ów...");
                }
                else{
                  clearInterval(interval);
                  console.log("zakończono update-y.");
                  db.close();
                  console.log('MongoDB Disconnected!');
                }
              }, 500);
          }
          else{
            itemsCount++;
            if(item.Tags.constructor === String){
              console.log("id: " + item.Id + " tags: " + item.Tags );
              //rozdzielamy string do tablicy
              var tagsSplited = item.Tags.split(" "); 
              tagsCount += tagsSplited.length;
              //zliczanie różnych tagów
              for(var i=0; i < tagsSplited.length; i++){
                if(tags[tagsSplited[i]] === undefined){
                  tags[tagsSplited[i]] = true; //cokolwiek byle pole było defined
                  diffTags++;
                }
              }
              //zamiana stringa na tablicę w bazie
              coll.update({Id: item.Id}, {$set: {Tags: tagsSplited}}, function(err){
                if(err) { console.log(err); }
                else{
                  updatedCount++; //liczymy wykonane update-y
                }
              });
              updatesCount++; //liczymy ilość update-ów do wykonania
            }
          }
        });
      }
    });
  }
});