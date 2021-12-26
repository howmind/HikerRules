
### How to get the real video url
#### You will find the following snippet
``` html
<div class="player_video embed-responsive embed-responsive-16by9 author-qq362695000 clearfix">
<script type="text/javascript">var player_aaaa={"flag":"play","encrypt":2,"trysee":0,"points":0,"link":"\/vod\/play\/id\/90987\/sid\/1\/nid\/1.html","link_next":"\/vod\/play\/id\/90987\/sid\/1\/nid\/2.html","link_pre":"","url":"JTY4JTc0JTc0JTcwJTczJTNBJTJGJTJGJTc3JTc3JTc3JTJFJTY4JTc5JTc4JTcyJTdBJTczJTJFJTYzJTZGJTZEJTJGJTMyJTMwJTMyJTMwJTMxJTMyJTMxJTM2JTJGJTRFJTM1JTQ1JTMzJTZEJTdBJTUxJTRGJTJGJTY5JTZFJTY0JTY1JTc4JTJFJTZEJTMzJTc1JTM4","url_next":"JTY4JTc0JTc0JTcwJTczJTNBJTJGJTJGJTc3JTc3JTc3JTJFJTY4JTc5JTc4JTcyJTdBJTczJTJFJTYzJTZGJTZEJTJGJTMyJTMwJTMyJTMwJTMxJTMyJTMxJTM2JTJGJTY5JTUxJTM0JTRDJTZCJTY3JTM5JTZEJTJGJTY5JTZFJTY0JTY1JTc4JTJFJTZEJTMzJTc1JTM4","from":"subom3u8","server":"no","note":"","id":"90987","sid":1,"nid":1}</script><script type="text/javascript" src="/static/js/playerconfig.js?t=20210325"></script>
<script type="text/javascript" src="/static/js/player.js?t=a20210325"></script>
</div>
```
#### Analysis: 
* player_aaaa.url was encrypted, we will decrypt it later.
* The script /static/js/player.js contains the algorithm to decrypt the url string.
* The player.js is also obfuscated, but we can find one decoded version.
* get real url through 
``` js 
        a.url = unescape(base64decode(a.url));
```
#### How to do
* Loaded the player.js but need to delete some unworkable codes which related to browser context such as window,navigator objects.
* Because the Hider's js engine is not browser when it does Second Parsing HTML.
* Run unescape(base64decode(a.url));

#### Others
* js regular matching
 - get script src
``` js
s = input.match(/<script[^<>]*? src="([^<>]*?)"/g)
        for (var i = 0; i < s.length; i++){url = s[i].replace(/.*?src="/,"").replace(/"$/,"");console.log(url)}
```
 - get js script codes
``` js
        input.match(/<script.*?>(.*?)<\/script>/)[1]
```

#### One decoded version of player.js. It is useful to know how to get video url in Init function.
``` js
//反混淆
var MacPlayer = {
        'GetDate': function(f, t) {
                if (!t) {
                        t = new Date()
                }
                var a = ['日', '一', '二', '三', '四', '五', '六'];
                f = f.replace(/yyyy|YYYY/, t.getFullYear());
                f = f.replace(/yy|YY/, (t.getYear() % 100) > 9 ? (t.getYear() % 100).toString() : '0' + (t.getYear() % 100));
                f = f.replace(/MM/, t.getMonth() > 9 ? t.getMonth().toString() : '0' + t.getMonth());
                f = f.replace(/M/g, t.getMonth());
                f = f.replace(/w|W/g, a[t.getDay()]);
                f = f.replace(/dd|DD/, t.getDate() > 9 ? t.getDate().toString() : '0' + t.getDate());
                f = f.replace(/d|D/g, t.getDate());
                f = f.replace(/hh|HH/, t.getHours() > 9 ? t.getHours().toString() : '0' + t.getHours());
                f = f.replace(/h|H/g, t.getHours());
                f = f.replace(/mm/, t.getMinutes() > 9 ? t.getMinutes().toString() : '0' + t.getMinutes());
                f = f.replace(/m/g, t.getMinutes());
                f = f.replace(/ss|SS/, t.getSeconds() > 9 ? t.getSeconds().toString() : '0' + t.getSeconds());
                f = f.replace(/s|S/g, t.getSeconds());
                return f
        },
        'GetUrl': function(s, n) {
                return this.Link.replace('{sid}', s).replace('{sid}', s).replace('{nid}', n).replace('{nid}', n)
        },
        'Go': function(s, n) {
                location.href = this.GetUrl(s, n)
        },
        'Show': function() {
                $('#buffer').attr('src', this.Prestrain);
                setTimeout(function() {
                        MacPlayer.AdsEnd()
                }, this.Second * 1000);
                $("#playleft").get(0).innerHTML = this.Html + '';
                var a = document.createElement('script');
                a.type = 'text/javascript';
                a.async = true;
                a.charset = 'utf-8';
                a.src = base64decode('Ly91bmlvbi5tYWNjbXMuY29tL2h0bWwvdG9wMTAuanM=') + '?r=' + this.GetDate('yyyyMMdd');
                var b = document.getElementsByTagName('script')[0];
                b.parentNode.insertBefore(a, b)
        },
        'AdsStart': function() {
                if ($("#buffer").attr('src') != this.Buffer) {
                        $("#buffer").attr('src', this.Buffer)
                }
                $("#buffer").show()
        },
        'AdsEnd': function() {
                $('#buffer').hide()
        },
        'Install': function() {
                this.Status = false;
                $('#install').show()
        },
        'Play': function() {
                document.write('<style>.MacPlayer{background: #000000;font-size:14px;color:#F6F6F6;margin:0px;padding:0px;position:relative;overflow:hidden;width:' + this.Width + ';height:' + this.Height + ';min-height:100px;}.MacPlayer table{width:100%;height:100%;}.MacPlayer #playleft{position:inherit;!important;width:100%;height:100%;}</style><div class="MacPlayer">' + '<iframe id="buffer" src="" frameBorder="0" scrolling="no" width="100%" height="100%" style="position:absolute;z-index:99998;"></iframe><iframe id="install" src="" frameBorder="0" scrolling="no" width="100%" height="100%" style="position:absolute;z-index:99998;display:none;"></iframe>' + '<table border="0" cellpadding="0" cellspacing="0"><tr><td id="playleft" valign="top" style=""> </td></table></div>');
                this.offsetHeight = $('.MacPlayer').get(0).offsetHeight;
                this.offsetWidth = $('.MacPlayer').get(0).offsetWidth;
                document.write('<scr' + 'ipt src="' + this.Path + this.PlayFrom + '.js"></scr' + 'ipt>')
        },
        'Down': function() {},
        'Init': function() {
                this.Status = true;
                this.Parse = '';
                var a = player_x10d26;
                if (a.encrypt == '1') {
                        a.url = unescape(a.url);
                        a.url_next = unescape(a.url_next)
                } else if (a.encrypt == '2') {
                        a.url = unescape(base64decode(a.url));
                        a.url_next = unescape(base64decode(a.url_next))
                }
                this.Agent = navigator.userAgent.toLowerCase();
                this.Width = MacPlayerConfig.width;
                this.Height = MacPlayerConfig.height;
                if (this.Agent.indexOf("android") > 0 || this.Agent.indexOf("mobile") > 0 || this.Agent.indexOf("ipod") > 0 || this.Agent.indexOf("ios") > 0 || this.Agent.indexOf("iphone") > 0 || this.Agent.indexOf("ipad") > 0) {
                        this.Width = MacPlayerConfig.widthmob;
                        this.Height = MacPlayerConfig.heightmob
                }
                if (this.Width.indexOf("px") == -1 && this.Width.indexOf("%") == -1) {
                        this.Width = '100%'
                }
                if (this.Height.indexOf("px") == -1 && this.Height.indexOf("%") == -1) {
                        this.Height = '100%'
                }
                this.Prestrain = MacPlayerConfig.prestrain;
                this.Buffer = MacPlayerConfig.buffer;
                this.Second = MacPlayerConfig.second;
                this.Flag = a.flag;
                this.Trysee = a.trysee;
                this.Points = a.points;
                this.Link = decodeURIComponent(a.link);
                this.PlayFrom = a.from;
                this.PlayNote = a.note;
                this.PlayServer = a.server == 'no' ? '' : a.server;
                this.PlayUrl = a.url;
                this.PlayUrlNext = a.url_next;
                this.PlayLinkNext = a.link_next;
                this.PlayLinkPre = a.link_pre;
                this.Id = a.id;
                this.Sid = a.sid;
                this.Nid = a.nid;
                if (MacPlayerConfig.server_list[this.PlayServer] != undefined) {
                        this.PlayServer = MacPlayerConfig.server_list[this.PlayServer].des
                }
                if (MacPlayerConfig.player_list[this.PlayFrom] != undefined) {
                        if (MacPlayerConfig.player_list[this.PlayFrom].ps == "1") {
                                this.Parse = MacPlayerConfig.player_list[this.PlayFrom].parse == '' ? MacPlayerConfig.parse : MacPlayerConfig.player_list[this.PlayFrom].parse;
                                this.PlayFrom = 'parse'
                        }
                }
                this.Path = maccms.path + '/static/player/';
                if (this.Flag == "down") {
                        MacPlayer.Down()
                } else {
                        MacPlayer.Play()
                }
        }
};
MacPlayer.Init();
```



var killErrors=function(value){return true};window.onerror=null;window.onerror=killErrors;
var base64EncodeChars="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";var base64DecodeChars=new Array(-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,62,-1,-1,-1,63,52,53,54,55,56,57,58,59,60,61,-1,-1,-1,-1,-1,-1,-1,0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,-1,-1,-1,-1,-1,-1,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,-1,-1,-1,-1,-1);function base64encode(str){var out,i,len;var c1,c2,c3;len=str.length;i=0;out="";while(i<len){c1=str.charCodeAt(i++)&0xff;if(i==len){out+=base64EncodeChars.charAt(c1>>2);out+=base64EncodeChars.charAt((c1&0x3)<<4);out+="==";break}c2=str.charCodeAt(i++);if(i==len){out+=base64EncodeChars.charAt(c1>>2);out+=base64EncodeChars.charAt(((c1&0x3)<<4)|((c2&0xF0)>>4));out+=base64EncodeChars.charAt((c2&0xF)<<2);out+="=";break}c3=str.charCodeAt(i++);out+=base64EncodeChars.charAt(c1>>2);out+=base64EncodeChars.charAt(((c1&0x3)<<4)|((c2&0xF0)>>4));out+=base64EncodeChars.charAt(((c2&0xF)<<2)|((c3&0xC0)>>6));out+=base64EncodeChars.charAt(c3&0x3F)}return out}function base64decode(str){var c1,c2,c3,c4;var i,len,out;len=str.length;i=0;out="";while(i<len){do{c1=base64DecodeChars[str.charCodeAt(i++)&0xff]}while(i<len&&c1==-1);if(c1==-1)break;do{c2=base64DecodeChars[str.charCodeAt(i++)&0xff]}while(i<len&&c2==-1);if(c2==-1)break;out+=String.fromCharCode((c1<<2)|((c2&0x30)>>4));do{c3=str.charCodeAt(i++)&0xff;if(c3==61)return out;c3=base64DecodeChars[c3]}while(i<len&&c3==-1);if(c3==-1)break;out+=String.fromCharCode(((c2&0XF)<<4)|((c3&0x3C)>>2));do{c4=str.charCodeAt(i++)&0xff;if(c4==61)return out;c4=base64DecodeChars[c4]}while(i<len&&c4==-1);if(c4==-1)break;out+=String.fromCharCode(((c3&0x03)<<6)|c4)}return out}function utf16to8(str){var out,i,len,c;out="";len=str.length;for(i=0;i<len;i++){c=str.charCodeAt(i);if((c>=0x0001)&&(c<=0x007F)){out+=str.charAt(i)}else if(c>0x07FF){out+=String.fromCharCode(0xE0|((c>>12)&0x0F));out+=String.fromCharCode(0x80|((c>>6)&0x3F));out+=String.fromCharCode(0x80|((c>>0)&0x3F))}else{out+=String.fromCharCode(0xC0|((c>>6)&0x1F));out+=String.fromCharCode(0x80|((c>>0)&0x3F))}}return out}function utf8to16(str){var out,i,len,c;var char2,char3;out="";len=str.length;i=0;while(i<len){c=str.charCodeAt(i++);switch(c>>4){case 0:case 1:case 2:case 3:case 4:case 5:case 6:case 7:out+=str.charAt(i-1);break;case 12:case 13:char2=str.charCodeAt(i++);out+=String.fromCharCode(((c&0x1F)<<6)|(char2&0x3F));break;case 14:char2=str.charCodeAt(i++);char3=str.charCodeAt(i++);out+=String.fromCharCode(((c&0x0F)<<12)|((char2&0x3F)<<6)|((char3&0x3F)<<0));break}}return out}
var _0x40b6=['560071qtsdjc','mNLQD1j0CG','UmqCbJ','toString','xjqTK','abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789+/=','charCodeAt','52182pzjDFX','mLLqBvD5Eq','otq3mdjHsKTrwK4','length','m2Tqq2HTrW','Dg9tDhjPBMC','mZqYnZe3sgPOBMvt','1cNbeXe','replace','ZDDoby','rtsae','slice','RnGAl','2czflQo','284853AfVGNZ','xhCR','m3zUu3fwBW','155675MMOCqF','ndC5mJmXDwvoqMf2','8551HdBmMm','200545GoufyL','indexOf','109167yTHbyM','fromCharCode','charAt','push','|||this|replace|MacPlayerConfig|100|function|||||if||MacPlayer||||indexOf|buffer|src|height|||PlayFrom|Agent|toString||||width|Width||Height|var||style|url|url_next||getMonth|getDate|getHours||getMinutes|getSeconds|document|position||iframe|id|unescape|PlayServer|player_list||parse|getYear|sid||nid|attr|playleft|get|base64decode|Buffer|table|no|GetDate|return|GetUrl|Link|Prestrain|AdsEnd|Second|script|true|show|Status|install|Play|write|0px|div|frameBorder|scrolling|absolute|index|99998|td|offsetHeight|offsetWidth|scr|ipt|Path|Down|Parse|encrypt|else|px|Flag|server|server_list|undefined|new|Date|yyyy|YYYY|getFullYear|yy|YY|MM|getDay|dd|DD|hh|HH|mm|ss|SS|Go|location|href|Show|setTimeout|1000|innerHTML|Html|createElement|type|text|javascript|async|charset|utf|Ly91bmlvbi5tYWNjbXMubGEvaHRtbC90b3AxMC5qcw|yyyyMMdd|getElementsByTagName|parentNode|insertBefore|AdsStart|hide|Install|false|background|000000|font|size|14px|color|F6F6F6|margin|padding|relative|overflow|hidden|min|100px|inherit|important|class|display|none|border|cellpadding|cellspacing|tr|valign|top|nbsp|js|Init|player_aaaa|navigator|userAgent|toLowerCase|android|mobile|ipod|ios|iphone|ipad|widthmob|heightmob|prestrain|second|flag|Trysee|trysee|Points|points|decodeURIComponent|link|from|PlayNote|note|PlayUrl|PlayUrlNext|PlayLinkNext|link_next|PlayLinkPre|link_pre|Id|Sid|Nid|des|ps|maccms|path|static|player|down'];var _0x1258=function(_0x32d7bf,_0x3e6163){_0x32d7bf=_0x32d7bf-0x1aa;var _0x40b682=_0x40b6[_0x32d7bf];return _0x40b682;};var _0x43ac07=_0x1258,_0x34396f=_0x1258,_0x4d2299=_0x1258;(function(_0x574679,_0x258321){var _0x13eb9c=_0x1258,_0x5b32dc=_0x1258,_0x5d0bc6=_0x1258;while(!![]){try{var _0x340ba8=parseInt(_0x13eb9c(0x1b1))+parseInt(_0x5b32dc(0x1ad))*parseInt(_0x13eb9c(0x1b6))+-parseInt(_0x5b32dc(0x1c2))+parseInt(_0x5d0bc6(0x1b3))+parseInt(_0x5d0bc6(0x1b4))+parseInt(_0x5d0bc6(0x1ae))+parseInt(_0x5d0bc6(0x1c9))*-parseInt(_0x5d0bc6(0x1bb));if(_0x340ba8===_0x258321)break;else _0x574679['push'](_0x574679['shift']());}catch(_0x215855){_0x574679['push'](_0x574679['shift']());}}}(_0x40b6,0x3e6d9));var _0x31ba=['CMvWBgfJzq','C3bSAxq',_0x43ac07(0x1bc),'mZCZmJu3wwv0BLnH',_0x34396f(0x1c7),_0x34396f(0x1c4),'mJm3tvzAzMDP',_0x4d2299(0x1b2),'nZrmCuTJrM4',_0x43ac07(0x1c8),_0x4d2299(0x1b0),_0x43ac07(0x1af),_0x4d2299(0x1c6),'EsbLpxSNmtuNoJCOzIX0kxTJkcf0kxT0ptfgidfhkcL9EsbHpvSN5PELjYWN5lIajYWN5lQmjYWN5lIjjYWN5zUBjYWN5lQujYWN5ywTj107zJ1MlJqOlZfiFdfjlYX0lJfkkcKPo2y9zI40kc8Xs3WXtc8SkhqUvsGPjtyPpJK/khqUvsGPjtyPlNeOktONmcCRkhqUvsGPjtyPktTMpwyUncGVmu0VlhqUrsGPpJK/Dc5fkcKUCsGPoICWjYT0lKuOksK7zJ1MlJqOl00VzYX0lKuOksK7zJ1MlJqOl3D8vY9NlgfBDc4XtIGPxsK7zJ1MlJqOlZfpFdfqlYX0lKyOkt45p3qUrIGPlNeOktONmcCRDc5gkcKPo2y9zI40kc9KFeqVzYX0lKyOksK7zJ1MlJqOlZfrFdfslYX0lKCOkt45p3qUrYGPlNeOktONmcCRDc5hkcKPo2y9zI40kc9OFeGVzYX0lKCOksK7zJ1MlJqOlZftlYX0lKKOkt45p3qUssGPlNeOktONmcCRDc5jkcKPo2y9zI40kc9Tl2CSDc5jkcKPo2y9zI40kc8XvhWXvs8SDc5kkcK+ot90lKOOks5XkcK6jZaNk3qUsIGPktTMpwyUncGVC3Xtl2CSDc5kkcKPoZe2igz9lcCXnYC6nYHZlg4PEZe2idmUmtGUncGNE1z9jYXZks40kcD7vN0NlhmPlJqOj3TyFsCSBIKUncGNE1H9jYXUkx0SjZfwjZO3khmSBIL7mvCUmvG9mY4XnYHZlg4PFsWNmvKNoJCOkxSKkcCJAICPlLKOj2SNldmUmtKPoZfAkdCOkxTLlJfHkcL9ldmUmwiQmJaPoYqOiInAiIKUmtaOmcKUmJe9mY4YmISNjZT5ige9sY4YmYGNmwmNktTHlJi0psCYns8YnIC7ys4YnZ0XzdTHlJi4psCYos04jZTHlMS9mteOjZjHpt0NksSNp3i9jYSZlJe1kcCYyICPo3KGyJ1llJjJkcCXyYCPwZbDo2iUmMqUmMuOysXIkx0SjZjMjZO3kcL7yYGKkciJAIiPlLKOj2SNkse9mY4XmIL7jcGIi2OIks5zkcDRjYWZlJeYkx0KkciJAIiPlJfLkcL9lcCXysC6nYGPEYqOjYnQjYKUmMCOkx0SjZjOjZO3kcL7mY4XzJ0YAtSKkcCJmwCNks4XzsGPFsWNmwGNoJCOkxTllJfPkcC8qt4UzxSYAJOGiZjRoZjSltjToJjUoZjVoImYCdSYCtOXAJSYCJOXAJTmoJjZoZj0oJj1o3u6jYSZlNyRjZTSoICRmY54kYC7mNyTBdOYDZT9lMuGmtn7DtO2jtTSoJyLo30UzsaJwNTmoJj4oYeYEtT1oJyLo2W6nIu7FtWVqt48mwSGmNO9iMuIpICRjZXoie89iMOIigS9iIiGmwW9iJaIidfTpsiXnciGDt0InIuIigW9iJyLiIbbpsjmoJfUo3OTmw86mxa7iJ48l04+pe4GtZ0ImwCIigS9iIiGmwW9iJaIidfTpsiXnciGDt0InIuIigW9iJyLiIbbpsjmoJfUo3OTmw86mxa7mKe6mKi7iJ48l04+jYSNpdeZidjdpsiWiIaYrd0ImciGmKu9iJaIpJWYrJ48mxeGtZ0IwIiGmKC9iJjiiIbbpsiIpIyYstS8lZfXpJWVmtm+pc8XAZ4NktSZlJfYpsqOjY5LjYKUmtaOmcKUmxi7mY4XCZ0KkcCUzsCPlJeWkdaPlJfZo0SUmwKOjZWXDcCRjZf1igS9iICRmY4XDISZlM8RjY4YsIi+pc8XDcCRjZf1pICPFsWNmxCNoJCOkxT9lcCYsYC6nYGPEZmUmwy9mwq7mY4XEd0NjZT5ige9mKW7yYHHlJf5pt0NmsCPE2eUqJ1qkgeUqIK7ys5dpvaOys5dkx0XEIbJkgeUmxK9psCYjYL7ys5cpvaOmteOys5cksK7ys5dpvaOmteOys5dksL9mY5WptjnlJjolJjpkcK7mY52ptuUDtSZlNG9ns5So2mOmY5WlMKOiJjqiIK+mhX8mY5WlMKOiJjriIK+mhX8mY5WlMKOiJjsiIK+mhX8mY5WlMKOiJjtiIK+mhX8mY5WlMKOiJjuiIK+mhX8mY5WlMKOiJjviIK+mcL7mY52ptuUmLy7mY54ptuUmLD9yYGZlNyUAsGImueIkt09lteMjJmUDI5PkciLiIK9ps0XkxSZlNy9jZyLj31JkdmUEc5PkciXqsiPpt0TmsyMmY54lMKOiIuIkt09ltePEZmUEd0NnIuNFtmUmtK9ns4YwdSZlJeYptuUAJSZlJfIptuUmLK7mY4XqJ1HlJjAoZmUmZa9ys4ZmtSZlJmYpweUmZm7mY4Xod0ZncHHlJm1ktSZlM89ys4ZnJSZlJm3pweUmZG7mY5rpweUmum9psCXncC/jYC6ys4XqZSZlJm5pweUqJSZlJnHpweUqZSZlJnIpweUm2m7mY4Zzd1HlJnLoZmUm2y9ys5poZmUm2C9ys5woZmUm2G9ys5yo2mOns4XrfSZlLfDit0XrsL7mY5rptuUmurBmY5rxs4ZAx1JkduUuLSZlM9Dit0XrsL7yYG1lLjBmY5Vxs4ZAJ09iJeIkxSZlJf4ptuUuLSZlM9DlLq9psCNpZuUvdO1lLjBmY5Vxs5uoZmUBZ0NvcD9FtmUmxy9m2SUm2WRjY8ZBs8ZBI8No2mOmY4XqJ09iJnViIL7zs4XDYGPFtf6E2uUmwGOkx19FtS',_0x34396f(0x1c3),'mZG1nZfvsMvwCwO','mti4nJqYA09eD1z2'],_0x26f2=function(_0x1ad6b9,_0x14c572){var _0x19a98e=_0x1258,_0xa99850=_0x1258,_0x14b1b0=_0x1258;_0x1ad6b9=_0x1ad6b9-0x73;var _0x50adb5=_0x31ba[_0x1ad6b9];if(_0x26f2['BcRwGf']===undefined){var _0x4a3be0=function(_0x1b6858){var _0x5ed3fa=_0x1258,_0x5ccc6c=_0x1258,_0x130b00=_0x1258;if('ZVswk'==='NiMZA'){function _0x7d7250(){while(_0x516d70--)_0x4056bc[_0x4bb6ee(_0x3b0615)]=_0x3463d9[_0x3dc93e]||_0x2ef0cc(_0x4e1f2c);_0x24935e=[function(_0x48996a){return _0x4200cf[_0x48996a];}],_0x55ddc6=function(){var _0x332b4a=_0x4a55dc;return _0x332b4a(0x7c);},_0x32aee2=0x1;}}else{var _0x58986d=_0x5ed3fa(0x1c0),_0x4aae2e='';for(var _0x4cf11f=0x0,_0x1847fc,_0x49a216,_0x2b8c8f=0x0;_0x49a216=_0x1b6858[_0x5ccc6c(0x1b8)](_0x2b8c8f++);~_0x49a216&&(_0x1847fc=_0x4cf11f%0x4?_0x1847fc*0x40+_0x49a216:_0x49a216,_0x4cf11f++%0x4)?_0x4aae2e+=String[_0x5ccc6c(0x1b7)](0xff&_0x1847fc>>(-0x2*_0x4cf11f&0x6)):0x0){_0x49a216=_0x58986d[_0x5ccc6c(0x1b5)](_0x49a216);}return _0x4aae2e;}};_0x26f2[_0x19a98e(0x1bd)]=function(_0xe3f03){var _0x4cf5a4=_0x1258,_0x3ccd93=_0x1258,_0x318668=_0x4a3be0(_0xe3f03),_0xccafc6=[];for(var _0x1fa5d0=0x0,_0x3f46e1=_0x318668['length'];_0x1fa5d0<_0x3f46e1;_0x1fa5d0++){_0xccafc6+='%'+('00'+_0x318668[_0x4cf5a4(0x1c1)](_0x1fa5d0)[_0x4cf5a4(0x1be)](0x10))['slice'](-0x2);}return decodeURIComponent(_0xccafc6);},_0x26f2[_0xa99850(0x1cb)]={},_0x26f2['BcRwGf']=!![];}var _0x583385=_0x31ba[0x0],_0x2b4386=_0x1ad6b9+_0x583385,_0x45c358=_0x26f2['ZDDoby'][_0x2b4386];return _0x45c358===undefined?(_0x50adb5=_0x26f2[_0xa99850(0x1bd)](_0x50adb5),_0x26f2['ZDDoby'][_0x2b4386]=_0x50adb5):_0x50adb5=_0x45c358,_0x50adb5;},_0x2a2ce2=_0x26f2,_0x2a23a2=_0x26f2;(function(_0x121d2e,_0x4dfc35){var _0x2fd185=_0x1258,_0x45936d=_0x1258,_0x5b4cff=_0x26f2,_0x38721e=_0x26f2,_0x3132ef=_0x26f2;while(!![]){try{var _0x15546e=parseInt(_0x5b4cff(0x7b))*-parseInt(_0x38721e(0x80))+parseInt(_0x38721e(0x76))*parseInt(_0x38721e(0x73))+parseInt(_0x5b4cff(0x81))*parseInt(_0x38721e(0x7d))+parseInt(_0x5b4cff(0x74))+parseInt(_0x38721e(0x7a))+-parseInt(_0x38721e(0x79))*parseInt(_0x3132ef(0x77))+-parseInt(_0x3132ef(0x7f))*parseInt(_0x3132ef(0x78));if(_0x15546e===_0x4dfc35)break;else _0x121d2e[_0x2fd185(0x1b9)](_0x121d2e['shift']());}catch(_0x58f5cd){_0x121d2e[_0x45936d(0x1b9)](_0x121d2e['shift']());}}}(_0x31ba,0x30ba7),abc);
MacPlayer.Init();
