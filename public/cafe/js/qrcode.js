
var serverip = "http://52.78.68.136"


$(document).ready(function() {	//jQuery('#qrcode').qrcode("this plugin is great");
	jQuery('#qrcodeTable').qrcode({
		render	: "table",
		text	: serverip+'/cafe/coupon_in.html'
	});	
	

})