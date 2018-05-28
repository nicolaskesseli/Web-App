// Controller fuer Events

$(document).ready(function () {
    //Ereignis: Jazz Lokal suchen
    $('#toJazzLokalButton').click(searchLokal);
    //Ereignis: Jazz Event suchen
    $('#toJazzEventButton').click(searchEvent);
    //Ereignis: Standort anzeigen
    $('#showLocationMapButton').click(showMap);
    //Ereignis: Karte anzeigen
    $('#showEventMapButton').click(showMap2);

    console.log("DOM ready");
});

function searchLokal() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(nearestJazzLokal);
    } else {
        alert("Geolocation wird vom Browser nicht unterstuetzt");
    }
}

/* Standort Funktionen */

// Globale Var für Standort

var currentLng;
var currentLat;

// Funktion für Standortbestimmung ohne speichern, die direkt mittels showMap3 angezeigt wird
function showMapCurrentPosition(){

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showMap3);
    } else {
        alert("Geolocation wird vom Browser nicht unterstuetzt");
    }

}

// Karte anzeigen mit aktueller Position

function showMap3(position){

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

    var image = 'img/pin2.png';
    markerCurrent = new google.maps.Marker({
        position: currentPosition,
        map: map,
        icon: image,

        title: "Aktuelle Position"
    });

    for (var i=0; i<myLocations.length; i++){

        var posAlleLokale = myLocations[i];

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


        markerAlleLok = new google.maps.Marker(markerAlleLokale);
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

    //Annahme: Maximale Anzahl Locations
    for (var i = 0; i < myLocations.length ; i++) {

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
    localStorage.setItem('eventID', eventID);

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
    $("#eventStart").text(myEvent.start);

    $("#eventEnde").text(myEvent.ende);
    $("#eventLokal").text(myEvent.lokal);

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
        //NAVIGATION
    directionsDisplay = new google.maps.DirectionsRenderer();
    directionsDisplay.setMap(map);
    directionsDisplay.setPanel(document.getElementById('route'));
    
     var request = {
      origin: currentPosition,
      destination: locationPosition,
      travelMode: google.maps.DirectionsTravelMode.DRIVING
    };
    directionsService = new google.maps.DirectionsService();
    directionsService.route(request, function(result, status) {
      if (status === google.maps.DirectionsStatus.OK) {
        directionsDisplay.setDirections(result);
      }
    });
  }


    //----------------------------------------------------------------
    // TODO: 5c3.1 ICON FUER EIGENE POSITION DEFINIEREN
    //----------------------------------------------------------------

    var image = 'img/Empty.png'
    markerCurrent = new google.maps.Marker({
        position: currentPosition,
        map: map,
        icon: image,
        title: "Aktuelle Position"
    });

    //----------------------------------------------------------------
    // TODO: 5c3.2 ICON FUER ATTRAKTION DEFINIEREN
    //----------------------------------------------------------------

    var image = 'img/Empty.png'
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
    




function showMap2() {

    //Werte fuer eventID und aktueller Position aus localStorage laden
    eventID = localStorage.getItem('eventID');
    var myLocation = myLocations[eventID];
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
    
    //NAVIGATION
    directionsDisplay = new google.maps.DirectionsRenderer();
    directionsDisplay.setMap(map);
    directionsDisplay.setPanel(document.getElementById('route'));
    
     var request = {
      origin: currentPosition,
      destination: locationPosition,
      travelMode: google.maps.DirectionsTravelMode.DRIVING
    };
    directionsService = new google.maps.DirectionsService();
    directionsService.route(request, function(result, status) {
      if (status === google.maps.DirectionsStatus.OK) {
        directionsDisplay.setDirections(result);
      }
    });
    
    //----------------------------------------------------------------
    // TODO: 5c3.1 ICON FUER EIGENE POSITION DEFINIEREN
    //----------------------------------------------------------------

    var image = 'img/Empty.png'
    markerCurrent = new google.maps.Marker({
        position: currentPosition,
        map: map,
        icon: image,
        title: "Aktuelle Position"
    });

    //----------------------------------------------------------------
    // TODO: 5c3.2 ICON FUER ATTRAKTION DEFINIEREN
    //----------------------------------------------------------------

    var image = 'img/Empty.png'
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




