var map, modal, testoModal;
var veta = [
    {nome:'Chicago', desc:"Oblock" },
    {nome:'Secondigliano', desc:"GEOLIER" },
    {nome:'Napoli', desc:"Clementino" },
    {nome:'Foggia', desc:" SCIPPO" },
    {nome:'Cogoleto', desc:" ORANGENOVA" },
    {nome:'Cinisello', desc:" $£" },
    {nome:'Atlanta', desc:" 21 do yìthe thing 21" },
    {nome:'Toronto', desc:" DRIZZY " },
    {nome:'Houston', desc:" ASTROWORLD" },
    {nome:'Roreto', desc:" capoluogo italiano " }
];
/*'<Secondigliano', 'Napoli','Foggia','Cogoleto','Cinisello','Atlanta','Toronto','Houston','Roreto'];*/
window.onload = async function (){

        modal = document.getElementById("sfondoModal");
        testoModal = document.querySelector("#myModal main");

        let busta = await fetch("https://nominatim.openstreetmap.org/search?format=json&city="+veta[9].nome);
        let vet = await busta.json();
        console.log(vet);

        let coord = [parseFloat(vet[0].lon),parseFloat(vet[0].lat)]; //Prendere longitudine e latitudine

        map = new ol.Map(
            {
                target:"map",/* dell' oggetto html*/
                /*DEfinisco il livello base (mappa globale completa)*/
                layers:[
                    new ol.layer.Tile({source: new ol.source.OSM()})
                ],
                /*caratteristiche visive (zoom,centro,...) della mappa*/
                view: new ol.View({
                    center: ol.proj.fromLonLat(coord), //vuole un array di float
                    zoom: 15
                })
            });



        /*
            feature => feature

            è come fare

            function (feature){
                return featuer
            }
         */

        let layer1 =aggiungi_layer(map,"../img/chief.png");
        aggiungi_marker(layer1,veta[9],coord[1],coord[0]);

        for(let i =0;i<9;i++){
            busta = await fetch("https://nominatim.openstreetmap.org/search?format=json&city="+veta[i].nome);
            vet = await busta.json();
            console.log(vet)

            coord = [parseFloat(vet[0].lon),parseFloat(vet[0].lat)]; //Prendere longitudine e latitudine
            aggiungi_marker(layer1,veta[i],coord[1],coord[0]);
        }

    map.on("click",function(evento){
        //evento ha una proprietà
        /*
            forEachFeatureAtPixel : da pixel -> marker


            forEachFeatureAtPixel : da pixel -> marker,
            funzione richiamata per ogni feature trovata
         */
        let marker = map.forEachFeatureAtPixel(evento.pixel,feature=>feature);
        //alert(marker.dati.nome +"\n"+marker.dati.desc);

        //console.log(document.getElementsByTagName("main")[0]);

        testoModal.innerHTML = marker.dati.nome + "<br>" + marker.dati.desc;
        modal.style.display = "flex";


    });






}
/*
Creazione di un nuovo layer
 */


function chiudiModal(){
    modal.style.display = "none";
}

function aggiungi_layer(map,pathImg) {
    let layer = new ol.layer.Vector({ //definisco nuovo layer
        /*il sorgente dello strato visivo che si vuole aggiungere (es: altra mappa)*/
        source: new ol.source.Vector(),
        /* permette di specificare caratteristiche grafiche del nostro layer */
        style: new ol.style.Style({
            image: new ol.style.Icon({
                anchor:[0.5,1], //metti il puntatore sopra le mie coordinate
                src: pathImg
            })
        })
    });

    map.addLayer(layer);
    return layer;
}

//** [poi invio]
// =
/**
 * aggiungo marker in un layer
 * @param  layer
 * @param dati
 * @param nomeLuogo  testo da visualizzare
 * @param lat  float Latitudine
 * @param lon  float longitudine
 */

function aggiungi_marker(layer,dati,lat,lon){
    let punto = new ol.geom.Point(ol.proj.fromLonLat([lon,lat]));
    let marker = new ol.Feature(punto);

    dati.lon = lon;
    dati.lat = lon;
    marker.dati = dati;

    /*Inserisce nel layer scelto il marker*/
    layer.getSource().addFeature(marker)
}




