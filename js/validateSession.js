(function ($) {

    "use strict";

    //Validate Session
    $.ajax({
        url: './php/validateSession.php',
        type: "POST",
        dataType: 'json',
        success: function (data) {
            let res = JSON.parse(data);
            console.log(res);
            let success = res.success;
            if (!success)
            {
                location.href = './index.html';
            }
            else{
                document.getElementsByTagName('html')[0].style.display = "block";
            }
        }
    });

})(jQuery);