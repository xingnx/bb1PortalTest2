// Script for base64 encode & decode
//
// Sample:
// Base64.encode('yourClient_id:yourSecret');
// Base64.decode('yourBase64String');
var Base64 = {
        _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
        encode: function(e) {
            var t = "";
            var n, r, i, s, o, u, a;
            var f = 0;
            e = Base64._utf8_encode(e);
            while (f < e.length) {
                n = e.charCodeAt(f++);
                r = e.charCodeAt(f++);
                i = e.charCodeAt(f++);
                s = n >> 2;
                o = (n & 3) << 4 | r >> 4;
                u = (r & 15) << 2 | i >> 6;
                a = i & 63;
                if (isNaN(r)) {
                    u = a = 64
                } else if (isNaN(i)) {
                    a = 64
                }
                t = t + this._keyStr.charAt(s) + this._keyStr.charAt(o) + this._keyStr.charAt(u) + this._keyStr.charAt(a)
            }
            return t
        },
        decode: function(e) {
            var t = "";
            var n, r, i;
            var s, o, u, a;
            var f = 0;
            e = e.replace(/[^A-Za-z0-9+/=]/g, "");
            while (f < e.length) {
                s = this._keyStr.indexOf(e.charAt(f++));
                o = this._keyStr.indexOf(e.charAt(f++));
                u = this._keyStr.indexOf(e.charAt(f++));
                a = this._keyStr.indexOf(e.charAt(f++));
                n = s << 2 | o >> 4;
                r = (o & 15) << 4 | u >> 2;
                i = (u & 3) << 6 | a;
                t = t + String.fromCharCode(n);
                if (u != 64) {
                    t = t + String.fromCharCode(r)
                }
                if (a != 64) {
                    t = t + String.fromCharCode(i)
                }
            }
            t = Base64._utf8_decode(t);
            return t
        },
        _utf8_encode: function(e) {
            e=e.replace(/\r\n/g,"\n");
            var t = "";
            for (var n = 0; n < e.length; n++) {
                var r = e.charCodeAt(n);
                if (r < 128) {
                    t += String.fromCharCode(r)
                } else if (r > 127 && r < 2048) {
                    t += String.fromCharCode(r >> 6 | 192);
                    t += String.fromCharCode(r & 63 | 128)
                } else {
                    t += String.fromCharCode(r >> 12 | 224);
                    t += String.fromCharCode(r >> 6 & 63 | 128);
                    t += String.fromCharCode(r & 63 | 128)
                }
            }
            return t
        },
        _utf8_decode: function(e) {
                var t = "";
                var n = 0;
                var r = c1 = c2 = 0;
                while (n < e.length) {
                    r = e.charCodeAt(n);
                    if (r < 128) {
                        t += String.fromCharCode(r);
                        n++
                    } else if (r > 191 && r < 224) {
                        c2 = e.charCodeAt(n + 1);
                        t += String.fromCharCode((r & 31) << 6 | c2 & 63);
                        n += 2
                    } else {
                        c2 = e.charCodeAt(n + 1);
                        c3 = e.charCodeAt(n + 2);
                        t += String.fromCharCode((r & 15) << 12 | (c2 & 63) << 6 | c3 & 63);
                        n += 3
                    }
                }
                return t
        }
};

// Additional information on how to call MAAM: https://portal.paas.intraxa/confluence/display/OAUTH/OAuth+Grant+Types

// test client for testing the Access Token Request to MAAM
// client_id: add2dfd1-45ce-46ea-bb2a-a297a68b9989
// secret: 6246e976-eef7-4378-beb8-f5076d8e3a26

// Generating encoded base64 string for authorization
var basicAuth = Base64.encode('add2dfd1-45ce-46ea-bb2a-a297a68b9989:6246e976-eef7-4378-beb8-f5076d8e3a26');

// Simple copy to clipboard function
function copyToClipboard(element) {
	var token = document.getElementById(element).value;
	var $temp = $("<input>");
	$("body").append($temp);
	$temp.val(token).select();
	document.execCommand("copy");
	$temp.remove();
}

// PassAXA login information is prefilled in the html
// To create your own preprod PassAXA account go to: https://preprod-passaxa.corp.intraxa
function UserLogin() {
	var un = document.getElementById('username').value;
	var pw = document.getElementById('password').value;
	var params = {	grant_type:'password',
					username:un,
					password:pw,
					scope:'demo-scope-asia'};
	var str = jQuery.param( params );

	var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "https://maam-dev.axa.com/dev/token", false);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.setRequestHeader("Authorization", "Basic "+basicAuth);
    //Start timer
    var start = new Date().getTime();
    xhttp.send(str);
    //End timer
    var end = new Date().getTime() - start;
    var response = JSON.parse(xhttp.responseText);
    document.getElementById("accessToken").value=response.access_token;
    document.getElementById("refreshToken").value=response.refresh_token;
    document.getElementById("resTime").innerHTML =end+" ms";
}

// Posting the input section to local api middleware (server.js)
// Writes returned JSON to output section
function UserAction() {
	var e = document.getElementById("methods");
	var input = document.getElementById('input-field').value;
	var token = document.getElementById('input-token').value;
	var method = e.options[e.selectedIndex].text;

    var xhttp = new XMLHttpRequest();
    var params = "input="+input+"&"+"method="+method+"&"+"token="+token;

    xhttp.open("POST", "http://localhost:3000/api", false);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send(params);
    var response = JSON.parse(xhttp.responseText);
    
    document.getElementById('output').value = response.Input;
    document.getElementById('method').value = response.Method;
    document.getElementById('time').value = response.Time;
    document.getElementById('res-token').value = response.Token.split(" ")[1];
    document.getElementById('input-field').value = '';
}

// This function takes the value from the generated refresh token and sends
// it back to MAAM by posting to /dev/token. After a success call, it
// updates HTML with the new tokens. 
function RefreshAction(){
	var token = document.getElementById('refreshToken').value;

	var params = {	grant_type:'refresh_token',
					refresh_token:token};
	var str = jQuery.param( params );

	var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "https://maam-dev.axa.com/dev/token", false);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.setRequestHeader("Authorization", "Basic "+basicAuth);
    //Start timer
    var start = new Date().getTime();
    xhttp.send(str);
    //End timer
    var end = new Date().getTime() - start;
    var response = JSON.parse(xhttp.responseText);
    console.log(response);
    document.getElementById("accessToken").value=response.access_token;
    document.getElementById("refreshToken").value=response.refresh_token;
    document.getElementById("resTime").innerHTML =end+" ms";
}

// This function is currently not available as /revoke from MAAM does not contain an OPTION resource
// You will get a 500:Internal Server Error
// MAAM might not have Access-Control-Allow-Origin allowed
function RevokeAction(){
	var t = document.getElementById('revokeToken').value;

	var params = {token:t};
	var str = jQuery.param( params );
	// console.log(str);
	var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "https://maam-dev.axa.com/dev/revoke", false);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.setRequestHeader("Authorization", "Basic "+basicAuth);
    xhttp.send(str);
    var response = JSON.parse(xhttp.responseText);
    console.log(response.result);
    document.getElementById("revokeToken").value=response.result;
}