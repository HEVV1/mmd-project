$(function(){
    $('#temporarily_button').on('click', function(){
        $('.block-popup-global').addClass('active');
        disableOverflow();
    })
    $('.wrapper-popup-global .cancel', '.block-popup-global').on('click', function(){
        $('.block-popup-global').removeClass('active');
        removeOverflow();
    })
})

function disableOverflow(){
    $('html').scrollTop(0);
    $('html').addClass('overflow-disable');
}
function removeOverflow(){
    $('html').removeClass('overflow-disable');
}