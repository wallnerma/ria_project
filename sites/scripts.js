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
    var out = "";
    var i;
    for (i = 0; i < arr.length; i++) {
        out += '<a href="/find/' + arr[i].name + '">' + arr[i].name + '<br>';
    }
    document.getElementById("configs").innerHTML = out;
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