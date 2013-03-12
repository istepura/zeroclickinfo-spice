package DDG::Spice::PackTrack::USPS;
# ABSTRACT: Track USPS packages

use DDG::Spice;

spice to => 'http://production.shippingapis.com/ShippingAPITest.dll?API=TrackV2&XML=<TrackFieldRequest USERID="{{ENV{DDG_SPICE_USPS_USERID}}}"><TrackID ID="$1"></TrackID></TrackFieldRequest>';

triggers query_lc => qr/[a-z][a-z]([0-9]+)us/;
spice wrap_string_callback => 1;

handle query_lc => sub {
    my ($id) = @_;
    return $id if $id;
    return;
};

1;
