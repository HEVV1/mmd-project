'use strict';

$(function () {
    $('form[js-validate]').each(function(){
        let form = $(this);

        form.on('submit', function(e){
            $('button', form).addClass('loading');
            removeFormAllFieldInvalidStates(form);
            removeFormAllFieldErrors(form);

            if (!validateForm(form)) {
                e.preventDefault();
                $('button', form).removeClass('loading');
            }
        });
    });
});

function validateForm(form) {
    let form_is_valid = true;

    let inputs = form.find('[js-frontend-validation-type]:not([skip_form_validation]):not([disabled])');
    inputs.each(function(){
        if ( !validateInput(form, $(this)) ) {
            // if this is the first invalid input we see, scroll to it
            if ( form_is_valid ) {
                // scrollToElement($(this));
            }
            form_is_valid = false;
        }
    });
    return form_is_valid;
}