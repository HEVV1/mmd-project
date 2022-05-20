$(function(){
    $('.wrapper-link').on('click', function(){
        $($(this).next('.hidden-container')).animate({
            height: 'toggle'
        })
        $('span', $(this)).toggleClass('active');        
    })   
})