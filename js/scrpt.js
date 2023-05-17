var map;

window.onload = async function (){

    //
    let busta = await fetch("https://www.openstreetmap.org/search?format=json&city=Fossano");



    //DEFINISCO UNA MAPPA
    /*
    map = new ol.Map(
        {
            target:"map",/* dell' oggetto html*/
            /*DEfinisco il livello base (mappa globale completa)
            layers:[
                new ol.layer.Tile({source: new ol.source.OSM()})
            ],
            /*caratteristiche visive (zoom,centro,...) della mappa
            view: new ol.View({
                    zoom: 4
                })
        });*/

}