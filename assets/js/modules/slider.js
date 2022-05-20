$(function () {
    let slider = $('.block-slider.slider-offers .slider-holder');    

    if ( slider.length > 0 ) {
        let dots_enabled = true;
        if ( $('.slider-item', slider).length < 2 ) {
            dots_enabled = false;
        }
        slider.slick({
            arrows: false,
            dots: dots_enabled,            
            vertical: false,
            verticalSwiping: false,
            slidesToShow: 1,
            slidesToScroll: 1,
            speed: 500,
            fade: false,
            cssEase: 'ease',
            adaptiveHeight: false,
            autoplay: true,
            autoplaySpeed: 3000,
            pauseOnHover: true     
        });
    }
});



$(function () { 
    let sliderNew = $('.block-slider.slider-new .slider-holder');    

    if ( sliderNew.length > 0 ) {
        let dots_enabled = true;
        if ( $('.slider-item', sliderNew).length < 2 ) {
            dots_enabled = false;
        }

        sliderNew.slick({
            arrows: false,
            dots: dots_enabled,
            vertical: false,
            verticalSwiping: false,
            slidesToShow: 1,
            slidesToScroll: 1,
            speed: 500,
            fade: false,
            cssEase: 'ease',
            adaptiveHeight: false,
            autoplay: true,
            autoplaySpeed: 3000,
            pauseOnHover: true
        });
    }
});