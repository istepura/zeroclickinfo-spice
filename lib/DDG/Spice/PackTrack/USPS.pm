package DDG::Spice::PackTrack::USPS;
# ABSTRACT: Track USPS packages

use DDG::Spice;

spice to => 'http://production.shippingapis.com/ShippingAPI.dll?API=TrackV2&XML=<TrackFieldRequest USERID="{{ENV{DDG_SPICE_USPS_USERID}}}"><TrackID ID="$1"></TrackID></TrackFieldRequest>';

triggers query_nowhitespace => qr/(\b\d{30}\b)|(\b\d{20}\b)|^E\D{1}\d{9}\D{2}$|^9\d{15,21}|^[A-Za-z]{2}[0-9]+US$/;


spice wrap_string_callback => 1;

handle query_nowhitespace => sub {
    my ($id) = $_;

    return $id if $id;
    return;
};

1;
