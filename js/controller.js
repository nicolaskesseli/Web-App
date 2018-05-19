// Controller fuer Events

$(document).ready(function () {
    //Ereignis: Jazz Lokal suchen
    $('#toJazzLokalButton').click(searchLokal);
    //Ereignis: Jazz Event suchen
    $('#toJazzEventButton').click(searchEvent);
     //Ereignis: Jazz Lokal 2 suchen
    $('#toJazzLokal2Button').click(searchLokal2);
    //Ereignis: Standort anzeigen
    $('#showLocationMapButton').click(showMap);
    //Ereignis: Karte anzeigen
    $('#showEventMapButton').click(showMap2);

    console.log("DOM ready");
});


function searchLokal2(){

}


/* Standort Funktionen */

// Globale Var für Standort

var currentLng;
var currentLat;

// Funktion für Standortbestimmung ohne speichern, die direkt mittels showMap angezeigt wird
function showMapCurrentPosition(){

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showMap);
    } else {
        alert("Geolocation wird vom Browser nicht unterstuetzt");
    }

}

// Karte anzeigen mit aktueller Position

function showMap(position){

    currentLng = position.coords.longitude;
    sessionStorage.setItem("aktueller Längengrad", currentLng);
    currentLat = position.coords.latitude;
    sessionStorage.setItem("aktueller Breitengrad", currentLat);

    var currentPosition = {
        lat: currentLat,
        lng: currentLng
    };

    //Optionen
    var optionen = {
        zoom: 13,
        center: new google.maps.LatLng(currentLat, currentLng)
    };

    map = new google.maps.Map(document.getElementById('karteAusgabe'), optionen);

    /*
    var marker = new google.maps.Marker({
        position: myLatLng,
        map: map,
    });*/

    var image = 'https://cdn2.iconfinder.com/data/icons/IconsLandVistaMapMarkersIconsDemo/48/MapMarker_Marker_Outside_Chartreuse.png';
    markerCurrent = new google.maps.Marker({
        position: currentPosition,
        map: map,
        icon: image,

        title: "Aktuelle Position"
    });

    for (var i=0; i<lokalLocations.length; i++){

        var posAlleLokale = lokalLocations[i];

        var locationLng = parseFloat(posAlleLokale.longitude);
        var locationLat = parseFloat(posAlleLokale.latitude);

        var positionAlleLokale = {
            lat:locationLat,
            lng:locationLng
        }
        //alert(locationLng+" "+locationLat);

        var markerAlleLokale={
            position: positionAlleLokale,
            map: map,
            title: posAlleLokale.bezeichnung
        }


        markerAlleLokale = new google.maps.Marker(markerAlleLokale);
    }
}



//Funktion damit der Text bei der Namenssuche in den LocalStorage geschrieben wird
function readName() {
    var input = document.getElementById("nameLokal").value;

    localStorage.setItem("textInput", input);
}


//Funktion damit bei den Select-Optionen des Umkreises der Wert ausgelesen und in den LocalStorage geschrieben wird
function readUmkreis() {
    var input = document.getElementById("umkreisLokal").value;

    localStorage.setItem("umkreisInput", input);
}



//Funktion für die Resultatausgabe der Namenssuche
function resultViewName() {

    var resultListName = [];


    var input = localStorage.getItem("textInput");

    var titel;



    for (i=0;i<4;i++){

        var myLokal = lokalLocations[i];

        var results = document.getElementById("resultateName");

        resultListName[i] = myLokal;

        //Berechnung der Entfernung in Kilometer anhand der Längen- und Breitengrade
        var dx = 71.5 * (sessionStorage.getItem("aktueller Längengrad") - myLokal.longitude);
        var dy = 111.3 * (sessionStorage.getItem("aktueller Breitengrad") - myLokal.latitude);
        var distance = Math.sqrt(dx*dx + dy*dy);



        if(myLokal.bezeichnung.toLowerCase().indexOf(input.toLowerCase())>=0) {


            titel = document.createElement("a");
            titel.setAttribute('href', 'http://localhost:63342/___FS2018_JazzApp/index.html?_ijt=71sfs612qctur523k3jb2bn7ki#page-lokal');


            var adresse = document.createElement("div");
            var leerschlag = document.createElement("br");
            var linie = document.createElement("hr");
            var distanz = document.createElement("div");


            titel.className = "resultatTitel";
            titel.innerText = resultListName[i].bezeichnung;
            results.appendChild(titel);
            adresse.className="resultatAdresse";
            adresse.innerText = resultListName[i].adresse;
            results.appendChild(adresse);
            results.appendChild(leerschlag);

            distanz.className = "resultatEntfernung";
            distanz.innerText = "Entfernung: " +(Math.round(distance * 100) / 100) + " Kilometer";
            results.appendChild(distanz);

            results.appendChild(leerschlag);
            results.appendChild(linie);

        }


    }
    
    //LocalStorage leeren damit bei erneutem Betätigen des Suchbuttons nicht nochmals alles ausgegeben wird
    localStorage.clear();

}




//Funktion für die Resultatausgabe der Umnkreissuche
function resultViewUmkreis() {

    var resultListUmkreis = [];


    var input = localStorage.getItem("umkreisInput");

    var titel;



    for (i=0;i<4;i++){

        var myLokal = lokalLocations[i];

        var results = document.getElementById("resultateUmkreis");

        resultListUmkreis[i] = myLokal;

        //Berechnung der Entfernung in Kilometer anhand der Längen- und Breitengrade
        var dx = 71.5 * (sessionStorage.getItem("aktueller Längengrad") - myLokal.longitude);
        var dy = 111.3 * (sessionStorage.getItem("aktueller Breitengrad") - myLokal.latitude);
        var distance = Math.sqrt(dx*dx + dy*dy);

        console.log(distance);

        if(distance <= input){


            titel = document.createElement("a");
            titel.setAttribute('href', 'http://localhost:63342/___FS2018_JazzApp/index.html?_ijt=71sfs612qctur523k3jb2bn7ki#page-lokal');
            var adresse = document.createElement("div");
            var leerschlag = document.createElement("br");
            var linie = document.createElement("hr");
            var distanz = document.createElement("div");

            titel.className = "resultatTitel";
            titel.innerText = resultListUmkreis[i].bezeichnung;
            results.appendChild(titel);
            adresse.className="resultatAdresse";
            adresse.innerText = resultListUmkreis[i].adresse;
            results.appendChild(adresse);
            results.appendChild(leerschlag);

            distanz.className = "resultatEntfernung";
            distanz.innerText = "Entfernung: " +(Math.round(distance * 100) / 100) + " Kilometer";
            results.appendChild(distanz);


            results.appendChild(leerschlag);
            results.appendChild(linie);

        }


    }

    //LocalStorage leeren damit bei erneutem Betätigen des Suchbuttons nicht nochmals alles ausgegeben wird
    localStorage.clear();
}


//Funktionen damit bei betätigen des Zurück-Buttons und erneuter Suche, die vorherigen Resultate nicht mehr erscheinen
function cleanName(){
    document.getElementById("resultateName").innerHTML = "";

}

function cleanUmkreis() {
    document.getElementById("resultateUmkreis").innerHTML = "";

}







function searchLokal() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(nearestJazzLokal);
    } else {
        alert("Geolocation wird vom Browser nicht unterstuetzt");
    }
}

function searchEvent() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(nearestJazzEvent);
    } else {
        alert("Geolocation wird vom Browser nicht unterstuetzt");
    }
}

function nearestJazzLokal(position) {

    var myLocation;
    var currentLng = position.coords.longitude;
    var currentLat = position.coords.latitude;
    var locationLng;
    var locationLat;
    var dx;
    var dy;

    var distance;
    var nearestJazzLokal = 15000; // ein extrem weit entfernter Ort (unrealistisch)

    var locationID = 0;

    //Annahme: Maximal vier Locations
    for (var i = 0; i < myLocations.length; i++) {

        myLocation = myLocations[i];

        locationLng = myLocation.longitude;
        locationLat = myLocation.latitude;

        dx = 71.5 * (currentLng - locationLng);
        dy = 111.3 * (currentLat - locationLat);

        distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < nearestJazzLokal) {
            nearestJazzLokal = distance;
            locationID = i;
        }

        console.log('Distance ' + i + ': ' + distance);
    }

    //Fuer Uebung 5c: Speichern der aktuellen Position und naechsten Attraktion im localStorage
    localStorage.setItem('currentLocationLat', currentLat);
    localStorage.setItem('currentLocationLng', currentLng);
    localStorage.setItem('locationID', locationID);

    showJazzLokal(locationID, nearestJazzLokal);
}

function nearestJazzEvent(position) {

    var myEvent;
    var currentLng = position.coords.longitude;
    var currentLat = position.coords.latitude;
    var locationLng;
    var locationLat;
    var dx;
    var dy;

    var distance;
    var nearestJazzEvent = 15000; // ein extrem weit entfernter Ort (unrealistisch)

    var eventID = 0;

    //Annahme: Maximal drei Attraktionen
    for (var i = 0; i < myEvents.length; i++) {

        myEvent = myEvents[i];


        locationLng = myEvent.longitude;
        locationLat = myEvent.latitude;

        dx = 71.5 * (currentLng - locationLng);
        dy = 111.3 * (currentLat - locationLat);

        distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < nearestJazzEvent) {
            nearestJazzEvent = distance;
            eventID = i;
        }

        console.log('Distance ' + i + ': ' + distance);
    }

    //Fuer Uebung 5c: Speichern der aktuellen Position und naechsten Attraktion im localStorage
    localStorage.setItem('currentEventLat', currentLat);
    localStorage.setItem('currentEventLng', currentLng);
    localStorage.setItem('eventID', locationID);

    showJazzEvent(eventID, nearestJazzEvent);
}

//Location anzeigen ohne Karte
function showJazzLokal(locationID, nearestJazzLokal) {

    var myLocation = myLocations[locationID];

    $("#beschrLocationContentTop").text(myLocation.bezeichnung);
    $("#beschrLocationContent").text(myLocation.beschreibung);
    $("#adrLocation").text(myLocation.adresse);

    $("#telLocation").text(myLocation.telefon); // +' <a href="tel:' + myLocation.telefon + '">link</a>'
    $("#telLocationLink").attr("href", "tel:" + myLocation.telefon);

    $("#mailLocation").text(myLocation.email);
    $("#mailLocationLink").attr("href", "mailto:" + myLocation.email);

    // ANZEIGEN: Alle (Mini-)Bilder zum aktuellen Location anzeigen
    $("#imgLocation ul").empty();

    var i = 0;

    for (i = 0; i < 2; i++) {
        $("#imgLocation ul").append("<li><img src='./img/" + myLocation.images[i] + "' width='200'></li>");

    }


    var km = (Math.round(nearestJazzLokal * 100) / 100);

    $('#beschrLocationContent').append("<p>Entfernung: " + km + " km</p>");

    // Jazz Lokal page oeffnen
    $(':mobile-pagecontainer').pagecontainer('change', '#page-JazzLokal');

}


function showJazzEvent(eventID, nearestJazzEvent) {

    var myEvent = myEvents[eventID];

    $("#beschrEventContentTop").text(myEvent.bezeichnung);
    $("#beschrEventContent").text(myEvent.beschreibung);
    $("#adrEventLocation").text(myEvent.adresse);

    $("#eventDatum").text(myEvent.datum); // +' <a href="tel:' + myLocation.telefon + '">link</a>'
    $("#eventStart").attr(myEvent.start);

    $("#eventEnde").text(myEvent.ende);
    $("#eventLokal").attr(myEvent.lokal);

    $("#eventPreis").text(myEvent.ticketpreis);


    // ANZEIGEN: Alle (Mini-)Bilder zum aktuellen Location anzeigen
    $("#imgEventLocation ul").empty();

    var i = 0;

    for (i = 0; i < 2; i++) {
        $("#imgEventLocation ul").append("<li><img src='./img/" + myEvent.images[i] + "' width='200'></li>");

    }


    var km = (Math.round(nearestJazzEvent * 100) / 100);

    $('#beschrEventLocationContent').append("<p>Entfernung: " + km + " km</p>");

    // Event page oeffnen
    $(':mobile-pagecontainer').pagecontainer('change', '#page-JazzEvent');

}


var map;

function showMap() {

    //Werte fuer LocationID und aktueller Position aus localStorage laden
    locationID = localStorage.getItem('locationID');
    var myLocation = myLocations[locationID];
    var currentLat = parseFloat(localStorage.getItem('currentLocationLat'));
    var currentLng = parseFloat(localStorage.getItem('currentLocationLng'));

    var currentPosition = {
        lat: currentLat,
        lng: currentLng
    };

    var locationPosition = {
        lat: parseFloat(myLocation.latitude),
        lng: parseFloat(myLocation.longitude)
    };

    var geocoder = new google.maps.Geocoder();

    //----------------------------------------------------------------
    // TODO: 5c2. KARTE DARSTELLEN (im Div-Container mit der id=karteAusgabe)
    //----------------------------------------------------------------

    map = new google.maps.Map(document.getElementById('karteLocationAusgabe'));

    //----------------------------------------------------------------
    // TODO: 5c3.1 ICON FUER EIGENE POSITION DEFINIEREN
    //----------------------------------------------------------------

    var image = 'img/currentlogicon.png'
    markerCurrent = new google.maps.Marker({
        position: currentPosition,
        map: map,
        icon: image,
        title: "Aktuelle Position"
    });

    //----------------------------------------------------------------
    // TODO: 5c3.2 ICON FUER ATTRAKTION DEFINIEREN
    //----------------------------------------------------------------

    var image = 'img/eventicon.png'
    markerLocation = new google.maps.Marker({
        position: locationPosition,
        map: map,
        title: "Hier ist das Jazz Lokal",
        icon: image
    });

    // Kartenausschnitt eingrenzen
    var bounds = new google.maps.LatLngBounds();
    bounds.extend(markerCurrent.getPosition());
    bounds.extend(markerLocation.getPosition());
    map.fitBounds(bounds);

    // Postalische Adresse der aktuellen Pos. ermitteln und darstellen
    geocoder.geocode({
        'latLng': currentPosition
    }, function (results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            if (results[0]) {
                this.adresse = results[0].formatted_address;
                $("#adresseLocationAusgabe").text("Sie sind gerade hier: " + this.adresse);
            }
        }
    });

}

function showMap2() {

    //Werte fuer eventID und aktueller Position aus localStorage laden
    locationID = localStorage.getItem('eventID');
    var myLocation = myLocations[locationID];
    var currentLat = parseFloat(localStorage.getItem('currentEventLat'));
    var currentLng = parseFloat(localStorage.getItem('currentEventLng'));

    var currentPosition = {
        lat: currentLat,
        lng: currentLng
    };

    var locationPosition = {
        lat: parseFloat(myLocation.latitude),
        lng: parseFloat(myLocation.longitude)
    };

    var geocoder = new google.maps.Geocoder();

    //----------------------------------------------------------------
    // TODO: 5c2. KARTE DARSTELLEN (im Div-Container mit der id=karteAusgabe)
    //----------------------------------------------------------------

    map = new google.maps.Map(document.getElementById('karteEventAusgabe'));

    //----------------------------------------------------------------
    // TODO: 5c3.1 ICON FUER EIGENE POSITION DEFINIEREN
    //----------------------------------------------------------------

    var image = 'img/currentlogicon.png'
    markerCurrent = new google.maps.Marker({
        position: currentPosition,
        map: map,
        icon: image,
        title: "Aktuelle Position"
    });

    //----------------------------------------------------------------
    // TODO: 5c3.2 ICON FUER ATTRAKTION DEFINIEREN
    //----------------------------------------------------------------

    var image = 'img/eventicon.png'
    markerLocation = new google.maps.Marker({
        position: locationPosition,
        map: map,
        title: "Hier ist das Jazz Event",
        icon: image
    });

    // Kartenausschnitt eingrenzen
    var bounds = new google.maps.LatLngBounds();
    bounds.extend(markerCurrent.getPosition());
    bounds.extend(markerLocation.getPosition());
    map.fitBounds(bounds);

    // Postalische Adresse der aktuellen Pos. ermitteln und darstellen
    geocoder.geocode({
        'latLng': currentPosition
    }, function (results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            if (results[0]) {
                this.adresse = results[0].formatted_address;
                $("#adresseEventAusgabe").text("Sie sind gerade hier: " + this.adresse);
            }
        }
    });

}




