$(function() {

    $("input,textarea").jqBootstrapValidation({
        preventSubmit: true,
        submitError: function($form, event, errors) {
            // additional error messages or events
        },
        submitSuccess: function($form, event) {
            event.preventDefault(); // prevent default submit behaviour
            // get values from FORM
            var email = $("input#mce-EMAIL").val();
			var first_name = $("input#mce-FNAME").val();
			var last_name = $("input#mce-LNAME").val();
			
            $.ajax({
                url: "http://puppycide.us7.list-manage.com/subscribe/post-json?u=32141e81f3ff567efe9649058&id=eacecc9039&c=?",
                type: "POST",
                data: {
                    FNAME: first_name,
                    LNAME: last_name,
                    EMAIL: email
                },
                dataType: 'jsonp',
                cache: false,
                success: function(data) {
	                var message = data.msg;
	                console.log(data);
	                if(data.result != "success" || data.result == "error") {
			            // Fail message
	                    $('#success').html("<div class='alert alert-danger'>");
	                    $('#success > .alert-danger').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
	                        .append("</button>");
	                    $('#success > .alert-danger').append('<strong><i class="fa fa-times"></i> </strong>' + message);
	                    $('#success > .alert-danger').append('</div>');
	                    //clear all fields
	                    $('#contactForm').trigger("reset");
	                } else {
		             	// Success message
	                    $('#success').html("<div class='alert alert-warning'>");
	                    $('#success > .alert-warning').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
	                        .append("</button>");
	                    $('#success > .alert-warning')
	                        .append('<strong><i class="fa fa-exclamation"></i> </strong>' + message);
	                    $('#success > .alert-warning')
	                        .append('</div>');   
	                }

                    //clear all fields
                    $('#contactForm').trigger("reset");
                },
                error: function(err) {
                    // Fail message
                    $('#success').html("<div class='alert alert-danger'>");
                    $('#success > .alert-danger').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                        .append("</button>");
                    $('#success > .alert-danger').append('<strong><i class="fa fa-times"></i> </strong> Sorry, it seems that the server is not responding. Please try again later!');
                    $('#success > .alert-danger').append('</div>');
                    //clear all fields
                    $('#contactForm').trigger("reset");
                },
            })
        },
        filter: function() {
            return $(this).is(":visible");
        },
    });

    $("a[data-toggle=\"tab\"]").click(function(e) {
        e.preventDefault();
        $(this).tab("show");
    });
});


/*When clicking on Full hide fail/success boxes */
$('#name').focus(function() {
    $('#success').html('');
});
