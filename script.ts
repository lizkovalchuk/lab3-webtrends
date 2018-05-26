// ==============================================================
//                       DECLARTIONS
// ===============================================================

var map : any;
var geocoder : any;
var mapMarkers : MapMarker[] = [];

// from previous project
var positions = [];
var addresscounter = 0;
var timer;

interface LatLng {
    lat: number;
    lng: number;
}

let Toronto:LatLng = {lat: 43.6532, lng: -79.3832};
let coolLocations : any[] = [];


class MapMarker{
    Address : string;
    Coordinates : LatLng;

    public constructor(address : string){
        this.Address = address;
    }
}

// ==============================================================
//                       FUNCTIONS
// ===============================================================


// the initMap() funtion is displaying a map of toronto.

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 14,
        center: Toronto
    });
}

// the ajax call below will connect with the locations.json file

function getLocationsJson(){
    $.ajax({
        // url: 'http://ghosteacher.com/webtrends/lab3/lab3json.php',
        url: './locations.json',
        dataType: 'json',
        success: function(data){

            //the data parameter is containing the json object
            //the for loop below is looping through the json object 
            //foreach object in data, create a new instance of the
            //MapMarker class and push it to the mapMarkerItem array.
            //if you don't push it into an array, the for loop will
            //just constantly overide your declared variable.

            for(let d of data){
                let mapMarkerItem : MapMarker = new MapMarker(d.address);
                mapMarkers.push(mapMarkerItem);
            }

            // the timer will call the makeMakers function every second 
            // while ajax is loading asynchronously.

            timer =  setInterval(function(){  
                 makeMarkers();
            }, 1000);
        }
    })
}

function makeMarkers(){

    var limit : number = addresscounter + 10;
    
    if(limit > mapMarkers.length){
        limit = mapMarkers.length;
    }

    for(let m of mapMarkers) {

        var gcoder = new google.maps.Geocoder();
        var address = MapMarker;
        gcoder.geocode(
            {'address': address},
            function (results, status){
                if(status == 'OK'){
                    // console.log(results[0].geometry.location);
                    var marker = new google.maps.Marker({
                        position: results[0].geometry.location,
                        map:map
                    });

//push the markers created in your loop and push the markers
//into the array defined outside the loop.

                }
                else{
                    // console.log(results);
                    console.log(address);
                }
                google.maps.event.addDomListener(window, 'load');
            });
    }
    addresscounter++;
    console.log(addresscounter);
}


// here I am calling my functions so they run.

getLocationsJson();