function ddg_spice_pack_track_render(title, data, source, url){

    if (!data) return;

    
    Spice.render({
        data             : { rows : data},
        header1          :  title,
        source_url       :  url,
        source_name      :  source, 
        template_normal  : 'pack_track',
        force_big_header : false 
    });
    $('#spice_pack_track tr').css({'border-bottom' : '1px solid #efefef',});
    $('#spice_pack_track table').css( { 'width' :'100%', 'margin': '5px',});
    $('#spice_pack_track th').css({ 'vertical-align':'bottom',
                                    'text-align' : 'left',
                                    'font-size' : '83.3%',
                                    'font-style' : 'italic',
                                    'padding-left' : '3px', });
    $('#spice_pack_track td').css({'padding' : '2px', 
                                   'max-width' : '250px', });
}
