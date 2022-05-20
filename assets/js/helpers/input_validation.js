'use strict';

const VALIDATION_TYPE_NON_EMPTY_STRING = 'non_empty_string';
const VALIDATION_TYPE_PHONE = 'phone';
const VALIDATION_TYPE_EMAIL = 'email';

const INPUT_DEFAULT_WRAPPER_CLASS = '.form-group';
const INPUT_SELECT_WRAPPER_CLASS = '.block-input-select';
const INPUT_CHECKBOX_WRAPPER_CLASS = '.form-check';
const INPUT_RADIO_WRAPPER_CLASS = '.form-check';
const BLOCK_CHECKABLE_TEXT_CLASSNAME = 'block-checkable-text';
const INVALID_STATE_CLASSNAME = 'invalid';

function validateInput(form, input) {
    let input_valid = true;
    switch(input.attr('type')) {
    case 'checkbox':
        if ( $('#' + input.attr('id') + ':checked').length > 0 ) {
            setFieldStateNormal(input);
        } else {
            setFieldStateInvalid(input);
            input_valid = false;
        }
        break;
    case 'radio':
        var atLeastOneRadioFromGroupIsChecked = false;

        $('[name=\'' + input.attr('name') + '\']').each(function(){
            if ($(this).is(':checked')) {
                atLeastOneRadioFromGroupIsChecked = true;
            }
        });

        if (atLeastOneRadioFromGroupIsChecked) {
            setFieldStateNormal(input);
        } else {
            setFieldStateInvalid(input);
            input_valid = false;
        }
        break;
    default:
        // determine the type of validation for the input
        switch(input.attr('js-frontend-validation-type')) {
        case VALIDATION_TYPE_NON_EMPTY_STRING:
        case VALIDATION_TYPE_PHONE:
            if (input.val() != null && input.val().replace(/\s+/g, '').length > 0 ) {
                setFieldStateNormal(input);
                removeFormFieldErrors(form, input.attr('name'));
            } else {
                setFieldStateInvalid(input);
                addFormFieldErrors(form, input.attr('name'), window['globalFormErrorList'][VALIDATION_TYPE_NON_EMPTY_STRING]);
                input_valid = false;
            }
            break;
        case VALIDATION_TYPE_EMAIL:
            /*eslint-disable */
            let emailRegex = /^([_!#$%&*+=?^`{|}\/~a-z0-9])(([_!#$%&*+=?^`{|}\/~a-z0-9._-])*([_!#$%&*+=?^`{|}\/~a-z0-9]))*\@([a-z0-9])(([_!#$%&*+=?^`{|}\/~a-z0-9._-])*([_!#$%&*+=?^`{|}\/~a-z0-9]))+(\.([a-z0-9])([a-z0-9_-])?([a-z0-9])+)+$/i;
            /*eslint-enable */
            
            if(emailRegex.test(input.val())) {
                setFieldStateNormal(input);
                removeFormFieldErrors(form, input.attr('name'));
            } else {
                setFieldStateInvalid(input);
                addFormFieldErrors(form, input.attr('name'), window['globalFormErrorList'][VALIDATION_TYPE_EMAIL]);
                input_valid = false;
            }
            break;
            default:            
        }
        break;
    }
    return input_valid;
}

function setFieldStateNormal(input) {
    switch(input.attr('type')) {
    case 'checkbox':
        input.parents(INPUT_CHECKBOX_WRAPPER_CLASS).removeClass(INVALID_STATE_CLASSNAME);
        break;
    case 'radio':
        // check if radio input is simple, or resides in 'block-checkable-text' component
        // if so, remove invalid class from the component itself
        if (input.parents(INPUT_RADIO_WRAPPER_CLASS).parent().hasClass(BLOCK_CHECKABLE_TEXT_CLASSNAME)) {
            input.parents(INPUT_RADIO_WRAPPER_CLASS).parent().removeClass(INVALID_STATE_CLASSNAME);
        } else {
            input.parents(INPUT_RADIO_WRAPPER_CLASS).removeClass(INVALID_STATE_CLASSNAME);
        }

        break;
    default:
        input.parents(INPUT_DEFAULT_WRAPPER_CLASS).removeClass(INVALID_STATE_CLASSNAME);

        break;
    }
}

function setFieldStateInvalid(input) {
    switch(input.attr('type')) {
    case 'checkbox':
        input.parents(INPUT_CHECKBOX_WRAPPER_CLASS).addClass(INVALID_STATE_CLASSNAME);
        
        break;
    case 'radio':
        // check if radio input is simple, or resides in 'block-checkable-text' component
        // if so, put invalid class on the component itself
        if (input.parents(INPUT_RADIO_WRAPPER_CLASS).parent().hasClass(BLOCK_CHECKABLE_TEXT_CLASSNAME)) {
            input.parents(INPUT_RADIO_WRAPPER_CLASS).parent().addClass(INVALID_STATE_CLASSNAME);
        } else {
            input.parents(INPUT_RADIO_WRAPPER_CLASS).addClass(INVALID_STATE_CLASSNAME);
        }
        
        break;
    default:
        if (input.is('select')) {
            input.parents(INPUT_SELECT_WRAPPER_CLASS).addClass(INVALID_STATE_CLASSNAME);
        } else {
            input.parents(INPUT_DEFAULT_WRAPPER_CLASS).addClass(INVALID_STATE_CLASSNAME);
        }
        break;
    }
}

function addFormFieldErrors(form, field_name, field_error) {
    let error_html = '<div class=\'inputblock-message inputblock-message-error\'>';
    error_html += '<div>' + field_error + '</div>';
    error_html += '</div>';

    let targetElement = $('[name=\'' + field_name + '\']', form);

    if (targetElement.siblings().length > 0) {
        targetElement = targetElement.siblings(':last');
    }

    $(error_html).insertAfter(targetElement);
}

function removeFormFieldErrors(form, field_name) {
    $('[name=\'' + field_name + '\']', form).parent().find('.inputblock-message-error').remove();
}

function removeFormAllFieldInvalidStates(form) {
    $('.invalid', form).removeClass('invalid');
}

function removeFormAllFieldErrors(form) {
    $('.inputblock-message', form).remove();
}