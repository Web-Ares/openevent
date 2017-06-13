$(function(){

    'use strict';

    $(function(){

        $.each( $( '.schedule' ), function() {
            new Schedule ( $( this ) )
        } );

    });

    var Schedule = function( obj ) {

        var _obj = obj,
            _item = _obj.find( '.schedule__frame-li' ),
            _venue = _obj.find( '.schedule__venue' ),
            _frame = _obj.find( '.schedule__frame' ),
            _frameItem = _obj.find( '.schedule__venue-frame' ),
            _marking = _obj.find( '.schedule__marking' ),
            _markingItem = _marking.find( 'li' ),
            _markingTimeStart = _markingItem.first().find( 'span' ).html().split(':'),
            _timeStart = _markingTimeStart[0] * 3600000 + _markingTimeStart[1] * 60000,
            _markingTimeEnd = _markingItem.last().find( 'span' ).html().split(':'),
            _lastHour = ( _markingTimeEnd[0] - _markingTimeStart[0] ) * 3600000,
            _lastMinutes = ( _markingTimeEnd[1] - _markingTimeStart[1] ) * 60000,
            _timeEnd = _lastHour + _lastMinutes,
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
                        _setHeight();
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
                    curElemEnd = curElemDataEnd[0] * 3600000 + curElemDataEnd[1] * 60000,
                    _frameItemHeight = _frameItem.height();

                curElem.css( {
                    top: ( curElemStart - _timeStart ) * _frameItemHeight / _timeEnd,
                    bottom: _frameItemHeight - ( ( curElemEnd - _timeStart ) * _frameItemHeight / _timeEnd )
                } )

            },
            _setHeight = function () {

                var markingItemNum = _markingItem.length - 1,
                    markingItemHeight = _markingItem.height() + 1;

                if ( _window.width() >= 1200 ) {

                    _frame.height( markingItemNum * markingItemHeight + 100 );
                    _frameItem.height( markingItemNum * markingItemHeight );

                } else {

                    _frame.height( 'auto' );
                    _frameItem.height( 'auto' );

                }

            },
            _construct = function() {

                _setHeight();
                _onEvents();

            };

        _construct();

    };

} );