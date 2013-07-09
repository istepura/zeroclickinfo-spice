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

    Spice.render({
        data             : { rows : jsondata},
        header1          :  $(xmlresp.find("TrackInfo")).attr("ID"), 
        source_url       : "usps.com",
        source_name      : 'USPS',
        template_normal  : 'usps',
        force_big_header : false 
    });
}

