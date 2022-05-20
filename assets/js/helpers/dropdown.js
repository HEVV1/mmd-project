$(function(){
    $('.wrapper-dropdown').on('click', function(){
        plusActive($(this));
        colorChange($(this));
        $($(this).next('.hidden-content')).animate({
            height: 'toggle'
        })
    })
})

function plusActive(object){
    $('.plus', object).toggleClass('active');
}

function colorChange(object){
    $(object).toggleClass('active');
}