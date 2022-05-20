var isItOpened = false;

$(function(){
    let button_menu = $('.block-menu-button');
    button_menu.on('click', function(){
        animateButton(button_menu);
        disableOverflow();
        showMenu();
        if (!isItOpened) {
            isItOpened = true;
        }
        else{
            setTimeout(() => {
                $('.hidden-container').css('display', 'none');
                $('.wrapper-link span', '.block-link-dropdown').removeClass('active');
            }, 300);           
        }
    })
})

//Animate menu button
function animateButton(object){
    $('.line', object).toggleClass('active');
}

function showMenu(){
    $('.layout-menu').toggleClass('active');
    $('.block-header-menu-background').toggleClass('active');
}

function disableOverflow(){
    $('html').scrollTop(0);    
    $('html').toggleClass('overflow-disable');
}

$(function(){
    let menu = $('.layout-menu');
    let button_menu = $('.block-menu-button');
    $(window).on('init resize change', function(){ 
        if($(window).width() > 768){
            menu.removeClass('active');
            $('.block-header-menu-background').removeClass('active');
            $('.line', button_menu).removeClass('active');
            $('html').removeClass('overflow-disable');
            $('.hidden-container').css('display', 'none');    
        }
    })
})