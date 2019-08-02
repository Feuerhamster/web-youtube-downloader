//get query string
var urlQs = document.URL.split('?');

//check if any querystring is set
if(urlQs[1]){
    
    //parse querytring args
    var qsArgs = urlQs[1].split('=');

    if(qsArgs[0] == "vid"){

        $('#content').load('./downloader.html');
        getVideoData(qsArgs[1]);

    }else if(qsArgs[0] == "page"){
        if(qsArgs[1] == "infos"){
            $('#content').load('./infos.html');
        }else if(qsArgs[1] == "documentation"){
            $('#content').load('./docs.php');
        }else{
            $('#content').html('<center><h1>ERROR 404: Page not found!</h1></center>');
        }
    }

}else{
    $('#content').load('./home.html');
}


function parseMimeType(mimeType){
    var regex = /(\w+)\/(\w+)\;\ codecs\=\"(.+)\"/;
    var result = regex.exec(mimeType);
    return { type: result[1], format: result[2], codec: result[3] };
}

function secToMin(time) {
    var hr = ~~(time / 3600);
    var min = ~~((time % 3600) / 60);
    var sec = time % 60;
    var sec_min = "";
    if (hr > 0) {
       sec_min += "" + hrs + ":" + (min < 10 ? "0" : "");
    }
    sec_min += "" + min + ":" + (sec < 10 ? "0" : "");
    sec_min += "" + sec;
    return sec_min+ " minutes";
 }

function getVideoData(videoId){

    $.ajax({
        type: "GET",
        url: "./api.php",
        data: "vid=" + videoId,
        success: function(res){

            console.log(res);

            if(!res.error){

                $('#video-title').html(res.title);
                $('#video-channel').html(res.channel);
                $('#video-views').html(res.views.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') + " views");
                $('#video-time').html(secToMin(res.length));
                $('#video-thumbnail').attr("src", res.thumbnails[3].url);

                $('#video-links').html('<a href="https://www.youtube.com/watch?v=' + res.videoId + '" style="color: #2980b9" target="_blank">https://www.youtube.com/watch?v=' + res.videoId + '<a>');

                res.sources.formats.forEach(element => {

                    var mainMime = parseMimeType(element.mimeType);
                    $('#video-main-source').append('<div class="box box-mobile"> <video src="' + element.url + '" controls height="190px"></video> <div style="padding: 10px 20px 10px 20px"> <h2 style="margin-top: 0px; margin-bottom: 10px; font-weight: 100"><b style="font-weight: 700">Quality:</b> ' +element.qualityLabel+ ' </h2> <h2 style="margin-top: 0px; margin-bottom: 10px; font-weight: 100"><b style="font-weight: 700">Format:</b> ' + mainMime.format + ' </h2> <h2 style="margin-top: 0px; margin-bottom: 10px; font-weight: 100"><b style="font-weight: 700">Codec:</b> ' + mainMime.codec + ' </h2> <a href="' + element.url + '" target="_blank" class="download-link-large"><i class="fas fa-external-link-alt"></i> Download</a> </div></div>');
                
                });
                
                res.sources.adaptiveFormats.forEach(element => {
                    var mime = parseMimeType(element.mimeType);
                    if(mime.type == "video"){
                        $('#video-sources').append('<div class="box" style="margin: 10px 0px 10px 0px;"><span class="label"><span class="label-name">Type</span><span class="label-value label-red">' + mime.type + '</span></span><span class="label"><span class="label-name">Quality</span><span class="label-value label-green">' + element.qualityLabel + '</span></span><span class="label"><span class="label-name">Format</span><span class="label-value label-orange">' + mime.format + '</span></span><span class="label"><span class="label-name">Codec</span><span class="label-value label-purble">' + mime.codec + '</span></span> <div class="spacer"></div> <a href="' + element.url + '" target="_blank" style="color: rgb(50,50,50); font-size: 26px;"><i class="fas fa-external-link-alt"></i></a> </div>');
                    }else{
                        $('#video-sources').append('<div class="box" style="margin: 10px 0px 10px 0px;"><span class="label"><span class="label-name">Type</span><span class="label-value label-blue">' + mime.type + '</span></span><span class="label"><span class="label-name">Bitrate</span><span class="label-value label-green">' + element.bitrate + '</span></span><span class="label"><span class="label-name">Format</span><span class="label-value label-orange">' + mime.format + '</span></span><span class="label"><span class="label-name">Codec</span><span class="label-value label-purble">' + mime.codec + '</span></span> <div class="spacer"></div> <a href="' + element.url + '" target="_blank" style="color: rgb(50,50,50); font-size: 26px;"><i class="fas fa-external-link-alt"></i></a> </div>');
                    }
                });

                res.thumbnails.forEach(element => {
                    $('#video-thumbnails').append('<div class="box box-mobile" style="margin: 10px 0px 10px 0px; flex-direction: row"><img src="' + element.url + '" style="width: 200px;" /><div style="padding: 10px 20px 10px 20px"><span class="label" style="margin: 0px;"><span class="label-name">Size</span><span class="label-value label-green">' + element.width + 'px*' + element.height + 'px</span></span><br/><a href="' + element.url + '" target="_blank"  class="download-link-large" style="font-size: 20px;" download="' + element.url + '"><i class="fas fa-external-link-alt"></i> Download</a></div></div>')
                });

            }else{
                $('#content').html('<center><h1>An error has occurred!</h1><h2>Please try another video or try again later</h2></center>');
            }
            

        }
    });

}

function loadVideoURL(source){

    //parse soruce and get id
    var ytidRegex = /(youtu\.be\/|youtube\.com\/(watch\?(.*&)?v=|(embed|v)\/))([^\?&"'>]+)/;
    var videoId = ytidRegex.exec(source)[5];

    window.location.href = window.location.protocol + "//" + window.location.hostname + window.location.pathname + "?vid=" + videoId;

}