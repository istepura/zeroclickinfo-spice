function ddg_spice_pack_track_usps(api_result){

    if (!api_result) return;

    var xmlresp = $( $.parseXML(api_result) );
    var err= xmlresp.find('Error') ;
    if (err.length > 0) return;


    var response = xmlresp.find('TrackResponse');
    if (!response) return;

    var jsondata = []
    xmlresp.find('TrackInfo').each(function( ) {
        $(this).find( "TrackSummary" ).each( buildrow);

        }
    );
    Spice.render({
        data             : { rows : jsondata},
        header1          : ' (Today in History)',
        source_url       : "usps.com",
        source_name      : 'USPS',
        template_normal  : 'usps',
        force_big_header : false 
    });
    function buildrow(){
        jsondata.push({status : $(this).find('Event').text(),
                   zip : $(this).find('EventZIPCode').text()});
    }
        
}


