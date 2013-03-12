function ddg_spice_pack_track_usps(xml) {
    var resp;
    if (typeof window.DOMParser != "undefined"){
        var parser = new DOMParser();
        resp = parser.parseFromString(xml, "application/xml");
    }else {
        resp = new ActiveXObject("Microsoft.XMLDOM");
        resp.async = "false";
        resp.loadXML(xml);
    }

    if (resp.getElementsByTagName("TrackResponse")){

        var doc = "";
        var trackinfos = resp.getElementsByTagName('TrackInfo');

        for (var i = 0; i < trackinfos.length; i++) {
            var tds = trackinfos[i].getElementsByTagName("TrackDetail");
            if (tds.length > 0){
                doc += trackinfos[i].getAttribute('ID');
                doc += '<table border="1">';
                doc += buildrow(trackinfos[i].getElementsByTagName("TrackSummary")[0]);
                for (var j = 0; j < tds.length; j++){
                     doc += buildrow(tds[j]);
                }
                doc += "</table>";
            }
        }
        var div = d.createElement('div');
        div.innerHTML = doc;
        items = new Array();
        items[0] = new Array();
        items[0]['a'] = div;
        items[0]['s'] = 'USPS';
        items[0]['u'] = 'http://www.usps.com';
        items[0]['force_no_fold'] = 1;

        nra(items);

    }
}
function buildrow(rd){
    var doc  = "";
    doc += "<tr><td>";
    doc += rd.getElementsByTagName("EventDate")[0].childNodes[0].nodeValue;
    doc += ", ";
    doc += rd.getElementsByTagName("EventTime")[0].childNodes[0].nodeValue; 
    doc += "</td><td>";
    doc += rd.getElementsByTagName("Event")[0].childNodes[0].nodeValue; 
    doc += "</td><td>";
    doc += rd.getElementsByTagName("EventZIPCode")[0].childNodes[0].nodeValue;
    doc += ", ";
    doc +=rd.getElementsByTagName("EventCity")[0].childNodes[0].nodeValue;
    doc += ", ";
    doc += rd.getElementsByTagName("EventState")[0].childNodes[0].nodeValue; 
    doc += "</td></tr>";
    return doc;
}
