
https://www.tangrenjie.tv/vod/show/area/0/id/1/page/1/year/2021.html
//首页频道信息
https://www.tangrenjie.tv/vod/show/area/fyarea/id/fyclass/page/fypage/year/fyyear.html
电影&电视剧&综艺&动漫&动作片&喜剧片&爱情片&科幻片&恐怖片&剧情片&战争片&国产剧&港台剧&日韩剧&欧美剧&海外剧&纪录片
1&2&3&4&6&7&8&9&10&11&12&13&14&15&16&27&28
全部&大陆&香港&台湾&美国&韩国&日本&泰国&新加坡&马来西亚&印度&英国&法国&加拿大&西班牙&俄罗斯&其它
0&大陆&香港&台湾&美国&韩国&日本&泰国&新加坡&马来西亚&印度&英国&法国&加拿大&西班牙&俄罗斯&其它
全部&2021&2020&2019&2018&2017&2016&2015&2014&2013&2012&2011&2010&2009&2008&2007&2006&2005&2004&2003&2002&2001&2000&1990-1999&1980-1989&1970-1979&1960-1969
0&2021&2020&2019&2018&2017&2016&2015&2014&2013&2012&2011&2010&2009&2008&2007&2006&2005&2004&2003&2002&2001&2000&1990-1999&1980-1989&1970-1979&1960-1969

//首页 Parsing HTML Rule
.vodlist&&li;.vodlist_titbox&&Text;a&&data-original;.pic_text&&Text;a&&href


//二级Rule
js:
var res = {};
var d = [];
var html = getResCode();
var tabs = parseDomForArray(html, '.play_source_tab&&a');
var conts = parseDomForArray(html, 'body&&.content_playlist');
var desc = parseDomForHtml(html, 'section&&font&&Text');
var fftq ='';
var lazy = `@lazyRule=.js:var html=fetch(input,{});var playerHtml=parseDomForHtml(html,".player_video&&Html");var script=playerHtml.match(/<script.*?>(.*?)<\\/script>/i)[1];eval(script);var script_links = playerHtml.match(/<script[^<>]*? src="([^<>]*?)"/g);var i;for(i=0; i<script_links.length; i++){var url_js="https://www.tangrenjie.tv"+script_links[i].replace(/.*?src="/,"").replace(/"$/,"");var trj_js = fetch(url_js,{}); trj_js = trj_js.replace(/window.onerror=null;window.onerror=killErrors;/m, "").replace(/MacPlayer.Init(.+?);/g,"");eval(trj_js);}var play_url = unescape(base64decode(player_aaaa.url));if(getVar('magedn$local')=='0'){putVar('fftq',play_url);refreshPage();'toast://切换选集成功！'}else{play_url}`;
//var lazy = `@lazyRule=.player_video&&script&&Html.js:eval(input);if(getVar('magedn$local')=='0'){putVar('fftq',player_aaaa.url);refreshPage();'toast://切换选集成功！'}else{var trj_player_conf_js = fetch('https://www.tangrenjie.tv/static/js/playerconfig.js?t=20210324',{});var trj_player_js = fetch('https://www.tangrenjie.tv/static/js/player.js?t=a20210324',{});trj_player_js = trj_player_js.replace(/window.onerror=null;window.onerror=killErrors;/m, "").replace(/MacPlayer.Init(.+);/g,"");eval(trj_player_conf_js);eval(trj_player_js);unescape(base64decode(player_aaaa.url));}`;
if(getVar('fftq')==''){
    d.push({
        title: parseDomForHtml(html, '.data,3&&Text').replace('地区','\n地区').replace('语言','\n语言'),
        desc: parseDomForHtml(html,'.data&&Text'),
	    pic_url: 'upload/vod/20210323-1/67cec736e9812aa325857135f8c91cf0.jpg',
        url: MY_URL,
        col_type: 'movie_1_vertical_pic'
    });
    if (desc.length > 60) {
        desc = desc.replace(desc, desc.substring(0, 60) + "......");
    }
    d.push({
            title: desc,
            col_type: 'long_text'
    });
}else{
    d.push({
    url:getVar('fftq'),
            col_type: 'x5_webview_single'
    });
    putVar('fftq','');
}

d.push({col_type:"rich_text",title:`<small>当前模式为：<a href="hiker://empty@lazyRule=.js:putVar('magedn$local',getVar('magedn$local')=='1'?'0':'1');refreshPage();'toast://已切换模式';">`+(getVar('magedn$local')=='1'?"默认播放器":"X5播放器")+"</a></small>"});

d.push({col_type:'blank_block'});

for (var i in conts) {
    var list = parseDomForArray(conts[i], 'ul&&li');
    if (list != null) {
        d.push({
            title: parseDomForHtml(tabs[i], 'a&&Text'),
            col_type: 'long_text'
        });
        for (var j in list) {
            d.push({
                title: parseDomForHtml(list[j],'a&&Text'),
                url: parseDom(list[j],'a&&href') + lazy,
                col_type: list.length >2?'text_3':'text_2'
            });
        }
    }
}

res.data = d;
setHomeResult(res);


//二级JS预处理
if(!getVar('magedn$local')){
    //本地播放
        putVar('magedn$local','1');
    }

//Search Rule
https://www.tangrenjie.tv/vod/search.html?wd=**
.vodlist&&li;.vodlist_title&&Text;a&&href;.vodlist_sub,2&&Text;;a&&data-original;





/***************************************/
var html = fetch(input, {});
var playerHtml = parseDomForHtml(html, ".player_video&&Html");
var script = playerHtml.match(/<script.*?>(.*?)<\\/script > /i)[1];eval(script);var script_links = playerHtml.match(/ < script[ ^ < > ] * ? src = "([^<>]*?)" / g);

for (var i = 0; i < script_links.length; i++) {
    var url_js = "https://www.tangrenjie.tv" + script_links[i].replace(/.*?src="/, "").replace(/"$/, "");
    var trj_js = fetch(url_js, {});
    trj_js = trj_js.replace(/window.onerror=null;window.onerror=killErrors;/m, "").replace(/MacPlayer.Init(.+?);/g, "");
    eval(trj_js);
}
var play_url = unescape(base64decode(player_aaaa.url));
if (getVar('magedn$local') == '0') {
    putVar('fftq', play_url);
    refreshPage();
    'toast://切换选集成功！'
} else {
    play_url
}
/***************************************/

