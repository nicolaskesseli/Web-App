// Modell besteht aus Array von Locations mit Attributen

var myLocations = 
[
	{
		"bezeichnung":"Jazzkantine Luzern",
        "beschreibung":"Die Jazzkantine mitten in der Luzerner Altstadt ist Restaurant, Café, Bar und Konzertlokal in einem. Sie bietet saisonale und auch vegetarische Gerichte an.",
    	"adresse":"Grabenstrasse 8, 6004 Luzern",
    	"telefon":"041 410 73 73",
       	"longitude":"8.305940",
    	"latitude":"47.053410",
    	"url":"https://www.jazzkantine.com",
    	"email":"post@jazzkantine.com",
        "images": {
            "0": "jazzkantine1.jpg",
            "1": "jazzkantine2.jpg"
        }
    },
    
    {
        "bezeichnung":"Mehrspur Zürich",
		"beschreibung":"Das Mehrspur ist die Bühne und das Zuhause der Jazzabteilung der Zürcher Hochschule der Künste. Musik wird hier hinter Türen produziert, geschrieben und gelebt. Studierende, Dozierende und Alumni der Studiengänge Jazz–und Pop bilden zusammen sozusagen das Ensemble, dass immer wieder in verschiedenen Formationen, Projekten und Beweggründen auf die Bühne finden kann. ",
    	"adresse":"Förrlibuckstrasse 109, 8001 Zürich",
    	"telefon":"043 446 50 76",
       	"longitude":"8.512537",
    	"latitude":"47.391612",
    	"url":"https://www.mehrspur.ch/",
    	"email":"info@mehrspur.ch",
        "images": {
            "0": "mehrspur1.jpg",
            "1": "mehrspur2.jpg"
        }
    },

    {
        "bezeichnung":"Moods",
        "beschreibung":"Das Moods ist ein Zürcher Konzertlokal, welches fast täglich Konzerte aus den Sparten Jazz, World, Funk, Soul, Pop und Elektro veranstaltet.",
        "adresse":"Schiffbaustrasse 6, 8001 Zürich",
        "telefon":"+044 276 80 00",
        "longitude":"8.518656",
        "latitude":"47.389032",
        "url":"https://www.moods.club/de/",
        "email":"info@moods.club",
        "images": {
            "0": "moods1.jpg",
            "1": "moods2.jpg"
        }
    },

    {
        "bezeichnung":"Louis Bar",
        "beschreibung":"Mit über 130 schottischen Classic Malts befindet sich hier die wertvollste Whisky Sammlung der Zentralschweiz – der perfekte Ort, um dem rauchig-torfigen Genuss zu frönen. Von Dienstag bis Samstag kommen Jazz-, Funk-& Soul-Fans bei Piano Livemusik und Konzerten voll auf ihre Kosten.",
        "adresse":"Adligenswilerstrasse 22, 6002 Luzern",
        "telefon":"041 419 00 00",
        "longitude":"8.319685",
        "latitude":"47.056436",
        "url":"https://www.hotel-montana.ch/louis-bar",
        "email":"info@hotel-montana.ch",
        "images": {
            "0": "LouisBar1.jpg",
            "1": "LouisBar2.jpg"
        }
    }
    
];



// Events
//
//
//




var myEvents = 
[
	{
		"bezeichnung":"Workshopkonzerte Jazz",
        "beschreibung":"Developing Your Personal Language in a Band,            Chiara Schönfeld (voc), Xavier Almeida (p), Lukas Briner (dr),John Voirol, Leitung ",
        "datum": "24.05.2018",
        "start": "20:30",
        "ende": "24:00",
        "lokal": "Jazzkantine Luzern",
        "ticketpreis": "Eintritt frei: Kollekte",
    	"adresse":"Grabenstrasse 8, 6004 Luzern",
       	"longitude":"8.305940",
    	"latitude":"47.053410",
        "images": {
            "0": "jazzkantine1.jpg",
            "1": "jazzkantine2.jpg"
        }
    },
    
    {
		"bezeichnung":"Sheila Jordan und Big Band der Hochschule Luzern",
        "beschreibung":"Die «First Lady des Bebop» trifft auf den Schweizer Jazz-Nachwuchs: Im Frühling dieses Jahres ist die Big Band der Hochschule Luzern mit Sheila Jordan unterwegs. Die inzwischen 90-jährige Jazzsängerin ist bekannt für ihren Scat-Gesang, spontane Textimprovisationen und gefühlvolle Songinterpretationen, die sie mit einer fesselnden Ausstrahlung präsentiert.",
        "datum": "16.05.2018",
        "start": "20:30",
        "ende": "24:00",
        "lokal": "Jazzkantine Luzern",
        "ticketpreis": "Eintritt frei: Kollekte",
    	"adresse":"Grabenstrasse 8, 6004 Luzern",
       	"longitude":"8.305940",
    	"latitude":"47.053410",
        "images": {
            "0": "jazzkantine1.jpg",
            "1": "jazzkantine2.jpg"
        }
    },
    
    
    {
        "bezeichnung":"Meta Zero",
		"beschreibung":"Das stilistisch stark amerikanisch geprägte Quartett lässt sich mit seinen energetischen Eigenkompostionen in das breite Spekrum des Modern Jazz einordnen.",
    	"adresse":"Förrlibuckstrasse 109, 8001 Zürich",
        "datum": "18.05.2018",
        "start": "20:00",
        "ende": "23:00",
        "lokal": "Mehrspur Zürich",
        "ticketpreis": "10 CHF",
       	"longitude":"8.512537",
    	"latitude":"47.391612",
        "images": {
            "0": "mehrspur1.jpg",
            "1": "mehrspur2.jpg"
        }
    },
    
    {
        "bezeichnung":"Inuuk",
		"beschreibung":"Inuuk [ᐃᓅᒃ] bedeutet „zwei Menschen“ und stammt aus der Sprache der Inuit. Inuuk symbolisiert ein Gefühl der tiefen Verbundenheit, die letzte Bastion in der ewigen Finsternis, das einzig verbliebene Quäntchen Hoffnung auf etwas Licht am Horizont.",
    	"adresse":"Förrlibuckstrasse 109, 8001 Zürich",
        "datum": "23.05.2018",
        "start": "20:30",
        "ende": "01:00",
        "lokal": "Mehrspur Zürich",
        "ticketpreis": "Eintritt frei",
       	"longitude":"8.512537",
    	"latitude":"47.391612",
        "images": {
            "0": "mehrspur1.jpg",
            "1": "mehrspur2.jpg"
        }
    },

    {
        "bezeichnung":"Nu-Bass",
        "beschreibung":"Ethno-Jazz der Sonderklasse – das findet man auf dem 2018 veröffentlichten Album «Nu Bass» des 6tets rund um den Pianisten François Lindemann. Schon wegen der Besetzung eine der ungewöhnlichsten Formationen in der langen Karriere des Westschweizers: Neben Klavier und Schlagzeug sind da Tabla, Oud (Amine Mraihi) und zwei Kontrabässe;",
        "adresse":"Schiffbaustrasse 6, 8001 Zürich",
        "datum": "03.06.2018",
        "start": "19:00",
        "ende": "01:00",
        "lokal": "Moods",
        "ticketpreis": "30 CHF",
        "longitude":"8.518656",
        "latitude":"47.389032",
        "images": {
            "0": "moods1.jpg",
            "1": "moods2.jpg"
        }
    },
    
    {
        "bezeichnung":"On the way",
        "beschreibung":"Bruno Spoerri gilt als Pionier, Querdenker und Bindeglied verschiedener Szenen. Mit «On The Way» wagt der 82-Jährige nun von neuem eine Zeitreise durch das Jazz-Universum, von der Cool-Ära der Fünfziger Jahre über den Hard Bop bis hin zur freien Improvisation, immerzu auf der Suche nach neuen gemeinsamen Nennern.",
        "adresse":"Schiffbaustrasse 6, 8001 Zürich",
        "datum": "13.06.2018",
        "start": "19:00",
        "ende": "24:00",
        "lokal": "Moods",
        "ticketpreis": "33 CHF",
        "longitude":"8.518656",
        "latitude":"47.389032",
        "images": {
            "0": "moods1.jpg",
            "1": "moods2.jpg"
        }
    },
    

    {
        "bezeichnung":"Jazz Jam Session",
        "beschreibung":"Erleben Sie begnadete Musiker und werden Sie jeden Donnerstag Teil der beliebten Jam Session.",
        "adresse":"Adligenswilerstrasse 22, 6002 Luzern",
        "datum": "jeden Donnerstag",
        "start": "17:00",
        "ende": "00:30",
        "lokal": "Louis Bar",
        "ticketpreis": "Eintritt frei",
        "longitude":"8.319685",
        "latitude":"47.056436",
        "images": {
            "0": "LouisBar1.jpg",
            "1": "LouisBar2.jpg"
        }
    }
    
];



/*
 "longitude":"8.546794652938843",
 "latitude":"47.37633445120742",
 */

