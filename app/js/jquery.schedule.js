$(function(){

    'use strict';

    $(function(){

        $.each( $( '.schedule' ), function() {
            new Schedule ( $( this ) )
        } );

    });

    var Schedule = function( obj ) {

        var _obj = obj,
            _frameHeight = _obj.find( '.schedule__venue-frame' ).height(),
            _item = _obj.find( '.schedule__frame-li' ),
            _venue = _obj.find( '.schedule__venue' ),
            _window = $( window );

        var _onEvents = function() {

                _venue.each( function() {
                    _coffee( $( this ) );
                } );

                _item.each( function() {
                   _schedule( $( this ) );
                } );

                _window.on(
                    'resize', function() {
                        _onEvents();
                    }
                )

            },
            _coffee = function( o ) {

                var curElem = o,
                    prevElem = o.prev( '.schedule__venue' ),
                    curCoffee = o.find( '.schedule__frame-coffee'),
                    prevCoffee = prevElem.find( '.schedule__frame-coffee' );

                if ( curCoffee.data( 'start' ) == prevCoffee.data( 'start' ) && curCoffee.data( 'end' ) == prevCoffee.data( 'end' ) ){
                    curCoffee.addClass( 'hide' )
                }

            },
            _schedule = function( o ) {

                var curElem = o,
                    curElemDataStart = curElem.data( 'start' ).split(':'),
                    curElemStart = curElemDataStart[0] * 3600000 + curElemDataStart[1] * 60000,
                    curElemDataEnd = curElem.data( 'end' ).split(':'),
                    curElemEnd = curElemDataEnd[0] * 3600000 + curElemDataEnd[1] * 60000;

                curElem.css( {
                    top: ( curElemStart - 25200000 ) * _frameHeight / 54000000,
                    bottom: _frameHeight - ( ( curElemEnd - 25200000 ) * _frameHeight / 54000000 )
                } )

            },
            _construct = function() {

                _onEvents();

            };

        _construct();

    };

} );