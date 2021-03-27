
### How to get the real video url
#### You will find the following snippet
``` html
<div class="player_video embed-responsive embed-responsive-16by9 author-qq362695000 clearfix">
<script type="text/javascript">var player_aaaa={"flag":"play","encrypt":2,"trysee":0,"points":0,"link":"\/vod\/play\/id\/90987\/sid\/1\/nid\/1.html","link_next":"\/vod\/play\/id\/90987\/sid\/1\/nid\/2.html","link_pre":"","url":"JTY4JTc0JTc0JTcwJTczJTNBJTJGJTJGJTc3JTc3JTc3JTJFJTY4JTc5JTc4JTcyJTdBJTczJTJFJTYzJTZGJTZEJTJGJTMyJTMwJTMyJTMwJTMxJTMyJTMxJTM2JTJGJTRFJTM1JTQ1JTMzJTZEJTdBJTUxJTRGJTJGJTY5JTZFJTY0JTY1JTc4JTJFJTZEJTMzJTc1JTM4","url_next":"JTY4JTc0JTc0JTcwJTczJTNBJTJGJTJGJTc3JTc3JTc3JTJFJTY4JTc5JTc4JTcyJTdBJTczJTJFJTYzJTZGJTZEJTJGJTMyJTMwJTMyJTMwJTMxJTMyJTMxJTM2JTJGJTY5JTUxJTM0JTRDJTZCJTY3JTM5JTZEJTJGJTY5JTZFJTY0JTY1JTc4JTJFJTZEJTMzJTc1JTM4","from":"subom3u8","server":"no","note":"","id":"90987","sid":1,"nid":1}</script><script type="text/javascript" src="/static/js/playerconfig.js?t=20210325"></script><script type="text/javascript" src="/static/js/player.js?t=a20210325"></script>
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
