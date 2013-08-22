//nrj("/js/spice/pack_track/pack_track.js", true);

function ddg_spice_pack_track_usps(api_result){

    if (!api_result) return;

    var xmlresp = $( $.parseXML(api_result) );

    if (xmlresp.find('Error').length > 0) return;
    if (xmlresp.find('TrackResponse').length <= 0) return;

    var jsondata = []
    var buildrow = (function(output){
            return function (idx, elem){
                    var fn_ = (function (){ return $(this).text()});
                    output.push({
                       status : $(elem).find('Event').text(),
                       date : $(elem).find( 'EventDate, EventTime').map(fn_).get().join(", "),
                       place : $(elem).find('EventCity, EventState, EventZIPCode').map(fn_).get().join(", ")
                    });
                }
            })(jsondata);
    xmlresp.find( "TrackSummary, TrackDetail" ).each( buildrow );

    ddg_spice_pack_track_render(  $(xmlresp.find("TrackInfo")).attr("ID"), jsondata, 'USPS', 'http://www.usps.com');
}

