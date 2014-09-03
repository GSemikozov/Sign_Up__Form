jQuery(function($){
    $('form').submit(function(event){
        var isError = false;

        // Validate presence of all input fields
        $('form input').each(function(){
            var input = $(this);
            if(input.val().match(/^\s*$/)) {
                input.addClass('error');
                isError = true;
            } else {
                input.removeClass('error');
            }
        })

        // Check password confirmation matches
        var password            = $('.input-pass');
        var passwordConfimation = $('.input-confpass');
        if(password.val() != passwordConfimation.val()) {
            password.addClass('error');
            passwordConfimation.addClass('error');
            isError = true;
        }

        return !isError;
    })
})