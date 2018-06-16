// server.js

// BASE SETUP
// ==============================

var yml = require('read-yaml');
var express = require('express');
var app = express();
var router = express.Router();
var bodyParser = require('body-parser');
var request = require('request');
var sqlite = require('sqlite3').verbose();
var config = yml.sync('config.yml');
var port = process.env.PORT || config["server"]["port"];
var db; 
let find_json = [];
var config = yml.sync('config.yml');
function init() {
  db = new sqlite.Database('./.db/dictionary.db', (err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log('Connected to the SQlite db.');
  });
  db.getAsync = function (sql) {
    var that = this;
    return new Promise(function (resolve, reject) {
        that.get(sql, function (err, row) {
            if (err)
                reject(err);
            else
                resolve(row);
        });
    });
  };
  
  db.allAsync = function (sql) {
    var that = this;
    return new Promise(function (resolve, reject) {
        that.all(sql, function (err, rows) {
            if (err)
                reject(err);
            else
                resolve(rows);
        });
    });
  };
  
  db.runAsync = function (sql) {
    var that = this;
    return new Promise(function (resolve, reject) {
        that.run(sql, function(err) {
            if (err)
                reject(err);
            else
                resolve();
        });
    })
  };
}

function createTable(tablename) {
  db.run("CREATE TABLE " + tablename + " (german TEXT PRIMARY KEY, english TEXT)", (err) => {
    if (err) {
      console.log("Table already exists.");
    } else {
      console.log("Table created");
    }
  });
}

function insert(tablename, german, english) {
  var stmt = db.prepare("INSERT INTO " + tablename + " VALUES (?, ?)");
  stmt.run([german, english], (err) => {
    if (err) {
      console.log("Word already exists.");
    } else {
      console.log("Word created");
    }
  });
  stmt.finalize();
}

function dbClose() {
  db.close((err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log('Close the database connection.');
  });
}

async function dbSelectAll() {
  var query = "SELECT * FROM translate";
  var rows = await db.allAsync(query);

  return new Promise(resolve => {
    setTimeout(() => {
      resolve(rows);
    }, 100);
  })
}

async function dbSelectWord(lang, word) {
  var query = "SELECT german, english FROM translate WHERE ??LANG?? like '??WORD??%'".replace("??WORD??", word).replace("??LANG??", lang);
  var row = await db.getAsync(query);

  if (!row) {
    row = {status: "nothing found"};
  }

  return new Promise(resolve => {
    setTimeout(() => {
      resolve(row);
    }, 100);
  })
}


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/sites', express.static(__dirname + "/sites"));

// ROUTES
// ==============================

/*
router.get('/', function (req, res) {
  res.sendfile("sites/index.html");
});

router.get('/add', function (req, res) {
  res.sendfile("sites/add.html");
});

router.get('/remove', function (req, res) {
  res.sendfile("sites/remove.html");
});
*/

// ROUTES WITH PARAMETER

router.post('/new', async function (req, res) {
  var german = req.body.german;
  var english = req.body.english;

  init();
  insert("translate", german, english);
  find_json = await dbSelectWord("german", german);
  dbClose();
  if (find_json["status"] != "nothing found") {
    res.send({status: "ok"});
  } else {
    res.send(find_json);
  }
});

router.get("/find/:word", async function (req, res) {
  var word = req.params.word;
  init();
  find_json = await dbSelectWord("german", word);
  dbClose();
  console.log(find_json);
  res.send(find_json);
});

router.get('/findall', async function (req, res) {
  var word = req.params.word;
  init();
  find_json = await dbSelectAll();
  dbClose();
  console.log(find_json);
  res.send(find_json);
});

// START THE SERVER
// ==============================

app.use('/', router);

app.listen(port, config["server"]["ip"]);
console.log("Making le voodoo on port " + port + "! Go and check it out!");
