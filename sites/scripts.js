function loadJson() {
    var xmlhttp = new XMLHttpRequest();
    var url = "/findall";

    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var myArr = JSON.parse(this.responseText);
            myFunction(myArr);
        }
    };
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}

function myFunction(arr) {
    var out = "<ul>";
    var i;
    for (i = 0; i < arr.length; i++) {
        out += '<li>' + arr[i].german + ' | ' + arr[i].english
            //+ '<form action="/delete" method="post" target="_self" class="form">' 
            //+ '<button class="button brown">delete</button>'
            //+ '</form>'
            + '</li>'
        //'<a href="/find/' + arr[i].german + '">' + arr[i].english + '<br>';
    }
    out += "</ul>";
    document.getElementById("all").innerHTML = out;
}

function loadWord() {
    var xmlhttp = new XMLHttpRequest();
    var word = document.getElementById("search").value;
    console.log(word);
    var url = "/find/" + word;

    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var myJson = JSON.parse(this.responseText);
            myJsonFunction(myJson);
        }
    };
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}

function myJsonFunction(myJson) {
    var out = "";
    out = 'German: ' + myJson.german + ' English: ' + myJson.english;
    document.getElementById("word").innerHTML = out;
}

function addWord() {
    var xmlhttp = new XMLHttpRequest();
    var german = document.getElementById("german").value;
    var english = document.getElementById("english").value;
    var params = {"german": german, "english": english}
    var url = "/new";

    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var myJson = JSON.parse(this.responseText);
            AddFunction(myJson);
        }
    };
    xmlhttp.open("POST", url, true);
    xmlhttp.setRequestHeader("Content-Type", "application/json");
    xmlhttp.send(JSON.stringify(params));
}

function AddFunction(myJson) {
    var out = "";
    if (myJson.status == "ok"){
        out = 'Added it';
    } else {
        out = 'There was a mistake';
    }
    document.getElementById("done").innerHTML = out;
}

function removeWord() {
    var xmlhttp = new XMLHttpRequest();
    var word = document.getElementById("name").value;
    var params = {"german": word};
    var url = "/delete";

    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var myJson = JSON.parse(this.responseText);
            RemoveFunction(myJson);
        }
    };
    xmlhttp.open("POST", url, true);
    xmlhttp.setRequestHeader("Content-Type", "application/json");
    xmlhttp.send(JSON.stringify(params));
    loadJson();
}

function RemoveFunction(myJson) {
    var out = "";
    if (myJson.status == "deleted"){
        out = 'Removed it';
    } else {
        out = 'There was a mistake';
    }
    document.getElementById("removed").innerHTML = out;
}

/*
function loadAdd() {
    var xmlhttp = new XMLHttpRequest();
    var url = "/add";
    var server = $('input[name="lb"]').val();

    console.log(server);
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var myArr = JSON.parse(this.responseText);
            document.getElementById("done").innerHTML = "it was created";
        }
    };
    xmlhttp.open("POST", url, true);
    xmlhttp.send();
}
*/

loadJson(); 