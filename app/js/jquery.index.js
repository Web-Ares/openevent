$(function(){

    'use strict';

    $(function(){

        $.each( $( '.site' ), function() {
            new Page ( $( this ) )
        } );

        $.each( $( '.menu' ), function() {
            new Menu ( $( this ) );
        } );

        $.each( $( '.form-validation' ), function() {
            new FormValidation ( $( this ) )
        } );

        $.each( $( '.schedule' ), function(){
            new ScheduleGallery ( $( this ) )
        } );

        $.each( $( '.media' ), function(){
            new MediaGallery ( $( this ) )
        } );

        $.each( $( '.hero_slider' ), function(){
            new HeroGallery ( $( this ) )
        } );

        $.each($('.news-list'), function () {
            new News($(this));
        });

    });

    var Page = function( obj ) {

        var _self = this,
            _obj = obj,
            _increase = _obj.find( '.site__increase' ),
            _footer = _obj.find( '.site__footer' ),
            _header = $( '.site__header' ),
            _window = $( window );

        var _addEvents = function() {

                _window.on({

                    load: function(){

                        _calculateFooterHeight();
                        _fixedHeader();

                    },

                    resize: function(){
                        _calculateFooterHeight();
                    },

                    scroll: function() {

                        _fixedHeader();

                    }

                })

            },
            _calculateFooterHeight = function(){

                _increase.css({
                    height: _footer.innerHeight()
                });

            },
            _fixedHeader = function() {

                if( _window.scrollTop() > 0 ) {

                    _header.addClass( 'fixed' );

                } else {

                    _header.removeClass( 'fixed' );

                }

            },
            _init = function() {

                _calculateFooterHeight();
                _addEvents();
                _obj[ 0 ].obj = _self;

            };

        _init();

    };

    var Menu = function( obj ) {

        //private properties
        var _self = this,
            _menu = obj,
            _menuItems = _menu.find( '.menu__drop-down' ),
            _menuItemsLink = _menu.find( '.menu__link' ),
            _subMenu = _menu.find( '.menu__sub-menu' ),
            _menuClose = _menu.find( '.menu__close' ),
            _window = $( window ),
            _action = false,
            _lastPos,
            _header = $( '.site__header' ),
            _showBtn = $( '.menu-btn' );

        //private methods
        var _addEvents = function() {

                _showBtn.on( {
                    'click': function() {

                        _openMenu();

                    }
                } );
                _menuClose.on( {
                    'click': function() {

                        _closeMenu();

                    }
                } );
                _menuItems.on( {
                    'click': function(){

                        _slideSubMenu( $( this ) );

                    }
                } );
                _window.on( {
                    'resize': function () {

                        _resetStyle();

                    },
                    'scroll': function () {

                        _action = _window.scrollTop() >= _header.innerHeight();

                    },
                    'DOMMouseScroll': function ( e ) {

                        var delta = e.originalEvent.detail;

                        if ( delta ) {
                            var direction = ( delta > 0 ) ? 1 : -1;

                            _checkScroll( direction );

                        }

                    },
                    'mousewheel': function ( e ) {

                        var delta = e.originalEvent.wheelDelta;

                        if ( delta ) {
                            var direction = ( delta > 0 ) ? -1 : 1;

                            _checkScroll( direction );

                        }

                    },
                    'touchmove': function ( e ) {

                        var currentPos = e.originalEvent.touches[0].clientY;

                        if ( currentPos > _lastPos ) {

                            _checkScroll( -1 );


                        } else if ( currentPos < _lastPos ) {

                            _checkScroll( 1 );

                        }

                        _lastPos = currentPos;

                    }

                });

            },
            _checkScroll = function( direction ){

                if( direction > 0 && !_header.hasClass( 'site__header_hidden' ) && !_showBtn.hasClass( 'opened' ) && _action ){

                    _header.addClass( 'site__header_hidden' );

                }

                if( direction < 0 && _header.hasClass( 'site__header_hidden' ) && !_showBtn.hasClass( 'opened' )  && _action ){

                    _header.removeClass('site__header_hidden');

                }

            },
            _openMenu = function()  {
                _menu.addClass( 'opened' );
            },
            _closeMenu = function()  {
                _menu.removeClass( 'opened' );
            },
            _slideSubMenu = function( elem ) {

                var curElem = elem,
                    subMenu = curElem.next( '.menu__sub-menu' );

                if( _window.width() < 992 && subMenu.length ) {

                    if( curElem.parent().hasClass( 'opened' ) ){

                        curElem.parent().removeClass( 'opened' );
                        subMenu.slideUp( 300 );

                    } else {

                        _subMenu.slideUp( 300 );
                        _menuItems.removeClass( 'opened' );

                        curElem.parent().addClass( 'opened' );
                        subMenu.slideDown( 300 );

                    }

                    return false;

                }

            },
            _resetStyle = function() {

                _showBtn.removeClass( 'opened' );
                _menuItemsLink.parent().removeClass( 'opened' );
                _menu.removeAttr( 'style' );
                _subMenu.removeAttr( 'style' );

            },
            _init = function() {
                _menu[ 0 ].obj = _self;
                _addEvents();
            };

        _init();
    };

    var FormValidation = function( obj ) {

        var _self = this,
            _obj = obj,
            _path = _obj.attr( 'action' ),
            _inputs = _obj.find( '[required]' ),
            _sentMessageMark = _obj.find( '.site__form-sent' ),
            _request = new XMLHttpRequest();

        var _addEvents = function() {

                _obj.on({

                    'submit': function(){

                        $.each( _inputs, function(){

                            var curItem = $(this),
                                curAttr = curItem.attr( 'type' );

                            if ( curItem.val() == '' ) {
                                curItem.addClass( 'form-validation__error' );
                            }

                            if ( curAttr == 'email' ){
                                var pattern = /^([a-z0-9_\.-])+@[a-z0-9-]+\.([a-z]{2,4}\.)?[a-z]{2,4}$/i;
                                if ( pattern.test( curItem.val() ) == false ){
                                    curItem.addClass( 'form-validation__error' );
                                }
                            }

                        } );

                        if ( _obj.find( '.form-validation__error' ).length ){
                            return false;
                        } else {
                            _ajaxRequest();
                        }

                        return false;

                    }

                });

                _inputs.on({

                    'focus': function(){

                        var curItem = $( this );

                        if( curItem.hasClass( 'form-validation__error' )){
                            curItem.removeClass( 'form-validation__error' );
                        }

                    }

                });

            },
            _ajaxRequest = function() {

                _request.abort();
                _request = $.ajax({
                    url: _path,
                    data: _obj.serialize(),
                    dataType: 'html',
                    timeout: 20000,
                    type: "GET",
                    success: function () {

                        _obj.trigger( 'reset' );

                        if ( _sentMessageMark.length ){
                            _sentMessageMark.removeClass( 'site__form-sent_hidden' );
                        }

                    },
                    error: function ( XMLHttpRequest ) {
                        if( XMLHttpRequest.statusText != "abort" ) {
                            alert( 'Error!' );
                        }
                    }
                });

            },
            _init = function () {
                _addEvents();
                _obj[ 0 ].obj = _self;
            };

        _init();

    };

    var MediaGallery = function ( obj ) {

        var _obj = obj,
            _mediaSlider1 = _obj.find( '.media__slider_1' ),
            _mediaSlider1NextSlider = _obj.find( '.media__slider_1-button-next'),
            _mediaSlider1PrevSlider = _obj.find( '.media__slider_1-button-prev'),
            _mediaSlider2 = _obj.find( '.media__slider_2' ),
            _mediaSlider2NextSlider = _obj.find( '.media__slider_2-button-next'),
            _mediaSlider2PrevSlider = _obj.find( '.media__slider_2-button-prev'),
            _media1,
            _media2;

        var _initEvent = function() {

                _obj.on( 'click', '.media__item', function(){

                    SwiperPopup( $( this ).parents( '.media__slider' ), $( this ).index() );

                    return false;

                } );

            },
            _initSlider = function() {

                _media1 = new Swiper ( _mediaSlider1, {
                    autoplay: 5000,
                    speed: 500,
                    effect: 'slide',
                    loop: true,
                    autoplayDisableOnInteraction: false,
                    nextButton: _mediaSlider1NextSlider,
                    prevButton: _mediaSlider1PrevSlider,
                    slidesPerView: 3,
                    spaceBetween: 26,
                    breakpoints: {
                        768: {
                            slidesPerView: 1,
                            spaceBetween: 47
                        },
                        1190: {
                            slidesPerView: 2,
                            spaceBetween: 47
                        }
                    }
                } );

                _media2 = new Swiper ( _mediaSlider2, {
                    autoplay: 5000,
                    speed: 500,
                    effect: 'slide',
                    loop: true,
                    autoplayDisableOnInteraction: false,
                    nextButton: _mediaSlider2NextSlider,
                    prevButton: _mediaSlider2PrevSlider,
                    slidesPerView: 3,
                    spaceBetween: 26,
                    breakpoints: {
                        768: {
                            slidesPerView: 1,
                            spaceBetween: 47
                        },
                        1190: {
                            slidesPerView: 2,
                            spaceBetween: 47
                        }
                    }
                } );

            },
            _init = function () {
                _initSlider();
                _initEvent();
            };

        _init();

    };

    var HeroGallery = function ( obj ) {

        var _obj = obj,
            _heroSlider = _obj.find( '.hero__slider' ),
            _heroNextSlider = _obj.find( '.hero__button-next'),
            _heroPrevSlider = _obj.find( '.hero__button-prev'),
            _hero;

        var _initEvent = function() {
            },
            _initSlider = function() {

                _hero = new Swiper ( _heroSlider, {
                    autoplay: false,
                    speed: 500,
                    effect: 'slide',
                    loop: true,
                    nextButton: _heroNextSlider,
                    prevButton: _heroPrevSlider,
                    slidesPerView: 1
                } );

            },
            _init = function () {
                _initSlider();
                _initEvent();
            };

        _init();

    };

    var ScheduleGallery = function ( obj ) {

        var _obj = obj,
            _scheduleSlider = _obj.find( '.swiper-container' ),
            _scheduleNextSlider = _obj.find( '.schedule__button-next'),
            _schedulePrevSlider = _obj.find( '.schedule__button-prev'),
            _view = _scheduleSlider.data('view'),
            _group = _scheduleSlider.data('group'),
            _schedule;

        var _initEvent = function() {

            },
            _initSlider = function() {

                _schedule = new Swiper ( _scheduleSlider, {
                    autoplay: false,
                    speed: 500,
                    effect: 'slide',
                    loop: false,
                    autoplayDisableOnInteraction: false,
                    nextButton: _scheduleNextSlider,
                    prevButton: _schedulePrevSlider,
                    slidesPerView: _view,
                    slidesPerGroup: _group,
                    breakpoints: {
                        1200: {
                            slidesPerView: 1
                        }
                    }
                } );

            },
            _init = function () {
                _initSlider();
                _initEvent();
            };

        _init();

    };

    var SwiperPopup = function ( obj, index ) {

        var _obj = obj,
            _body = $( 'body' ),
            _links = _obj.find( '.media__item' ),
            _html = $( 'html' ),
            _window = $( window ),
            _popup = null,
            _popupInner = null,
            _popupClose = null,
            _swiperWrapper = null,
            _swiperContainer = null,
            _swiperPagination = null,
            _swiperBtnNext = null,
            _swiperBtnPrev = null,
            _swiper = null;

        var _addEvents = function(){

                _window.on({

                    resize: function (){

                        _setPictureSizeWhenResize();

                    }

                });

                _popupInner.parent().on({

                    click: function(){

                        _closePopup();

                    }

                });

                _popupInner.on({

                    click: function( event ){

                        event.stopPropagation();

                    }

                });

                _popupClose.on({
                    click: function(){

                        _closePopup();
                        return false;

                    }
                })

            },
            _addingVariables = function(){

                _popup = $( '<div class="swiper-popup">\
                                    <div class="swiper-container">\
                                        <div class="swiper-wrapper"></div>\
                                        <div class="swiper-pagination"></div>\
                                        <div class="swiper-button-next"></div>\
                                        <div class="swiper-button-prev"></div>\
                                    </div>\
                                </div>' );
                _swiperWrapper = _popup.find( '.swiper-wrapper' );
                _swiperContainer = _popup.find( '.swiper-container' );
                _swiperPagination = _popup.find( '.swiper-pagination' );
                _swiperBtnNext = _popup.find( '.swiper-button-next' );
                _swiperBtnPrev = _popup.find( '.swiper-button-prev' );

            },
            _addVideo = function () {

                var activeSlide = _popup.find( '.swiper-slide-active' ),
                    src = activeSlide.find( '[data-src]' ).data( 'src' ),
                    innerContent = $( '<iframe src="' + src + '"> frameborder="0" allowfullscreen></iframe>' );

                $( '.swiper-slide-active' ).find( '.swiper-popup__video' ).prepend( innerContent );

            },
            _buildPopup = function(){

                _addingVariables();
                _contentFilling();
                _initSwiper();
                _swiper.slideTo( index, 0 );
                _popup.addClass( 'active' );
                _setStyles();
                _swiper.onResize();
            },
            _closePopup = function(){

                _popup.removeClass( 'active' );
                setTimeout( function(){
                    _html.css({overflow: '', paddingRight: ''});
                    _popup.remove();
                }, 300 );

            },
            _contentFilling = function(){

                $.each( _links, function(){

                    var innerContent = null,
                        dataSRC = null,
                        preloader = null;

                    console.log('ddd');

                    if ( $( this ).hasClass( 'media-gallery__item_video' ) ){

                        preloader = '<i class="fa fa-spinner fa-spin"></i>';
                        innerContent = '<div class="swiper-popup__video"/>';
                        dataSRC = 'data-src="' + $(this).attr( "href" ) + '"';

                    } else {

                        preloader = '';
                        innerContent = '<img src="' + $( this ).attr( 'href' ) + '">';
                        dataSRC = '';

                    }

                    var newItem = $( '<div class="swiper-slide">\
                                        <div class="swiper-popup__inner" ' + dataSRC + '>\
                                            <a href="#" class="swiper-popup__close"></a>\
                                            ' + preloader + '\
                                            ' + innerContent + '\
                                            <span class="swiper-slide__title">' + $( this ).attr( 'title' ) + '</span>\
                                        </div>\
                                    </div>' );

                    _swiperWrapper.append( newItem );

                    newItem.find( 'img' ).on({
                        load: function(){
                            $( this ).attr( 'data-width', this.width );
                            $( this ).attr( 'data-height', this.height );
                            /*_setPictureSize( this.width, this.height, $( this ) );*/
                        }
                    });

                } );

                _body.append( _popup );

                _popupInner = _popup.find( '.swiper-popup__inner' );
                _popupClose = _popup.find( '.swiper-popup__close' );

            },
            _getScrollWidth = function (){
                var scrollDiv = document.createElement( 'div' ),
                    scrollbarWidth = null;
                document.body.appendChild( scrollDiv );
                scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
                document.body.removeChild( scrollDiv );
                return scrollbarWidth;
            },
            _initSwiper = function(){

                _swiper = new Swiper( _swiperContainer, {
                    pagination: _swiperPagination,
                    nextButton: _swiperBtnNext,
                    prevButton: _swiperBtnPrev,
                    slidesPerView: 1,
                    paginationClickable: true,
                    onSlideChangeEnd: function(){
                        _removeVideo();
                        if ( $( '.swiper-slide-active' ).find( '[data-src]' ).length ){
                            _addVideo();
                        }
                    }
                });

            },
            _init = function () {
                _buildPopup();
                _addEvents();
            },
            _removeVideo = function(){

                var items = _popup.find( '.swiper-slide' ),
                    videoFrame = items.find( '.swiper-popup__video iframe' );
                videoFrame.remove();

            },
            _setPictureSize = function( picWidth, picHeight, pic ){

                var k = 0;

                if ( ( _popup.width()/picWidth ) > ( _popup.height()/picHeight ) ) {
                    k = _popup.height()/picHeight ;
                } else {
                    k = _popup.width()/picWidth;
                }

                if ( k >= 1 ){

                    pic.css({
                        "width": picWidth*0.85,
                        "height": picHeight*0.85
                    });

                } else {

                    pic.css({
                        "width": k*picWidth*0.85,
                        "height": k*picHeight*0.85
                    });

                }

            },
            _setPictureSizeWhenResize = function(){

                $.each( _swiperWrapper.find( 'img' ), function () {

                    _setPictureSize( $( this ).data( 'width' ), $( this ).data( 'height' ), $( this ) );

                } );

            },
            _setStyles = function(){

                _html.css({
                    overflow: 'hidden',
                    paddingRight: _getScrollWidth()
                });

            };

        _init();

    };

    var News = function (obj) {

        //private properties
        var _self = this,
            _obj = obj,
            _btnMore = _obj.find( '.news-list__more' ),
            _btnAction = _btnMore.data( 'action' ),
            _wrapper = _obj.find( '.news-list__wrap '),
            _request = new XMLHttpRequest();

        //private methods
        var _addEvents = function () {

                _btnMore.on({
                    click: function () {
                        _ajaxRequest();
                        return false;
                    }

                });

            },
            _addNewsContent = function (msg) {

                var hasItems = msg.has_items;

                $.each(msg.items, function () {

                    var newBlock = $('<article class="news-list__item hidden" data-id="' + this.id + '">' +
                        '<a href="'+this.href+'" class="news-list__article">' +
                        '<img src="'+ this.picture + '" alt="'+ this.title +'"/>' +
                        '<h2 class="news-list__topic">' + this.title + '</h2></a></article>');

                    _wrapper.append(newBlock);

                });

                var newItems = _wrapper.find('.hidden');

                setTimeout(function () {
                    _heightAnimation(hasItems, newItems);
                }, 50);

            },
            _heightAnimation = function (hasItems, newItems) {

                newItems.each(function (i) {
                    _showNewItems($(this), i);
                });

                if (hasItems == 0) {
                    _removeBtnMore();
                }

            },
            _showNewItems = function (item, index) {

                setTimeout(function () {
                    item.removeClass('hidden');
                }, index * 30);

            },
            _ajaxRequest = function () {

                var items = _obj.find( '.news-list__item' );

                _request.abort();

                _request = $.ajax({
                    url: _btnAction,
                    data: {
                        loadedCount: items.length
                    },
                    dataType: 'json',
                    timeout: 20000,
                    type: 'GET',
                    success: function (msg) {

                        _addNewsContent(msg);

                    },
                    error: function (XMLHttpRequest) {
                        if (XMLHttpRequest.statusText != 'abort') {
                            alert('Error!');
                        }
                    }
                });

            },
            _removeBtnMore = function () {

                _btnMore.css('opacity', 0);

                setTimeout(function () {

                    _btnMore.css('padding', 0);

                    _btnMore.animate({
                        height: 0
                    }, {
                        duration: 500,
                        complete: function () {
                            _btnMore.remove();
                        }
                    });

                }, 300);

            },
            _init = function () {

                _addEvents();
                _obj[0].obj = _self;

            };

        _init();
    };

} );