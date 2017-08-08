<!doctype html>

<html>
<head>
<title>Learn JavaScript</title>

<script>
function Emails (txt)
{
	var exp = /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gim;
	
	if(txt.match(exp).length > 0)
		{
			return txt.match(exp)[0]
		}
}

function Number (txt)
{
		var exp = /([0-9-]+[0-9-]+[0-9]+)/g;
		if(txt.match(exp).length > 0)
		{	
			return txt.match(exp)[0];
		}
		return null
}

//|[0-9]|\d{5,15}|[+]+\d{3}+

function Person(txt)
{
	var exp = /(?:find | find: | find me | stalk | stalk: | search | search for | search for me | find for me | tell me about | who is | who's | whos)(\w+)/;
	r = txt.match(exp);
	///p (.*?) /gi
	return r[1]

}

//var emailexp = /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gim;
//number like 555-555-555
//var numexp = /([0-9]+-[0-9]+-[0-9])/gim;
var text="There find: maksd jalajel@mawdoo3.com Person: sd find me mjalajel mohdbushnaq@yahoo.com is no vs. one 009627725807 who  because 0797725807 it is pain.";

document.write(text);

//var email = Emails(text);

document.write("<br><br>email is: " + Emails(text));
document.write("<br> Number is: " + Number(text));
document.write("<br> Person to find: " + Person(text));




</script>
</head>

<body>
<h1>Learn</h1>

<p>sample paragraph</p>
</body>
</html>
