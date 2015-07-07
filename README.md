jQuery-Form-Toolltip
====================
This JS allows you to add Tooltip calllout (with fadeIn fadeOut animation) to your form input controls.

Include the jquery.formtooltip.js after the jquery.js file.

Construct the input fields configuration in JSON format:
  - You are able to specify the individual tooltip CSS
  - You are able to specify the fadeIn and fadeOut direction. Currently supporting Top, Bottom, Right and Left

e.g.

    var fields = {
	    title: {
			tooltip : "This field is actually for bla bla bla...</br>and bla bla bla",
			position: 'bottom'
		},
		name : {
			tooltip: "This is for fun!!!!",
			position: 'right',
			backgroundColor: "#FF0000",
			color: '#FFFF00'
			},
		color : {
			tooltip: "This is for your cover color~~~ <a href='#'>here</a>"
			},
		text : {
			tooltip: "Please provide your comment here."
			}
		};


		var defaultCSS = { backgroundColor : "#000000", color : "#FFFFFF", borderRadius : 10 };

run $("SELECT YOUR FORM").formtooltip(fields , defaultCSS) function to your form using the constructed JSON.

And that is it. See Demo here: http://wp.ahcheng.com/wp-content/uploads/jQuery%20Form%20Toolltip/demo/default.html
