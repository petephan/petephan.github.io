//Using Cookies to Create a Shopping Cart
//Create a file called shopping.js

//sets the cookie to the name=value format
function WM_setCookie (name, value) {
	document.cookie = name + '=' + escape(value); 
} 

//reads the cookie and returns the value of name - in essence returns the list of products and quantities stored in the cookie in the format pdt1:qty1:price/pdt2:qty2:price
function WM_readCookie(name) {
    //if there is no cookie
    if(document.cookie == '') { 
	return false; 
    } else { //there is a cookie 
	var firstChar, lastChar;
	var theBigCookie = document.cookie;
	//format is name=value
	//skip the string name= to position it at the first character of value
	firstChar = name.length + 1; 
        lastChar = theBigCookie.length;
	return unescape(theBigCookie.substring(firstChar, lastChar));
    }	
} 

//purpose of addToCart is to take the user's info about each product and add it to the existing cookie
function addToCart(name, amount, item, price)
{
	//format of your new purchase item:amount:price
	var purch_string = escape(item + ":" + amount + ":" + price);
	//read the cookie
	var the_cookie = WM_readCookie(name);
	//if the cookie exists
	if (the_cookie)
	{
		//add the purchase string to the original value of the cookie
		//note that eacch purchase is separated by /
		purch_string = the_cookie + "/" + purch_string;
	}
	//set the cookie to the value
	WM_setCookie(name, purch_string);
}

function readTheCookie(name, the_info)
{
	var split_stuff;
	//read the value of the cookie
	var the_cookie = WM_readCookie(name);
	//write out the cookie for debugging
	document.writeln("<p>" + unescape(the_cookie) + "</p>");
	//if there is a cookie
	if (the_cookie)
	{	
		//if there are multiple purchases
		if (the_cookie.indexOf("/") != -1)
		{
			//use the string split to populate the array
			split_stuff = unescape(the_cookie).split("/");
			for (var loop=0; loop < split_stuff.length; loop++)
			{
				the_info[loop] = split_stuff[loop];
			}
		}
		//else put the only purchase into the first element of the array
		else the_info[0] = the_cookie;
	}	
}

function checkOut(name)
{
	var total = 0;	
	var sub_total;
	//create an array
	var the_stuff = new Array();
	//populate the array from the cookie
	readTheCookie(name, the_stuff);
	//start writing out a table
	document.writeln("<table border=1>");
	document.writeln("<thead style=\"color:rgb(51, 102, 204)\">");
	document.writeln("<th width=\"30%\">Item</th><th>Amount</th><th>Price</th><th>Subtotal</th></thead>");
	//write out each purchase
	for (var loop = 0; loop < the_stuff.length; loop++)
	{
		//remember, each purchase is of the form item:amount:price
		//split the string to get item, amount, price
		var this_item = the_stuff[loop].split(":");
		//write out the item, amount, price
		document.writeln("<tr><td>" + this_item[0] + "</td><td>" + this_item[1] + "</td><td>" + "$" + this_item[2] + "</td>");
		//calculate the subtotal: amount * price
		sub_total = this_item[1] * this_item[2];
		//write out the subtotal
		document.writeln("<td>" + "$" + sub_total + "</td></tr>");	
		//add subtotal to total
		total += sub_total;
	}
	//write the total
	document.writeln("<tr><td>Total</td><td></td><td></td><td>" + "$" + total + "</td></tr></table");
}