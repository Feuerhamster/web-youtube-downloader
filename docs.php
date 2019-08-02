<h1>API for Developers</h1>
<p>You can get the data of a video very easily by using our API.</p>

<h2>Web Request structure</h2>
<span class="label"><span class="label-name" style="width: 70px;display: inline-block;">Method</span><span class="label-value label-green">GET</span></span>
<span class="label"><span class="label-name" style="width: 70px;display: inline-block;">Url</span><span class="label-value label-blue">https://feuerhamster.code-elite.net/web-youtube-downloader/api.php</span></span>
<span class="label"><span class="label-name" style="width: 70px;display: inline-block;">Params</span><span class="label-value label-purble">vid={YOUTUBE VIDEO ID}</span></span>
<span class="label"><span class="label-name" style="width: 70px;display: inline-block;">Return</span><span class="label-value label-orange">JSON</span></span>

<h2 style="margin-top: 40px;">Return values</h2>
<p>There are mulitple return values for that request. The return values are also in JSON format</p>
<div class="pre">Errors:
    - error: missing_video_id //returns if you have not send the video Id in the query string
    - error: cipher_video" //returns if the video is protected and can not be read by the api
</div>

<div class="pre">Video Data JSON structure:

- title
- channel
- length
- views

- sources:

   - expiresInSeconds

   - formats:
       ARRAY()

   - adaptiveFormats:
       ARRAY()

- thumbnails:
   ARRAY()
</div>


<h2 style="margin-top: 40px;">Examples</h2>
<p>An example url for an api call</p>
<div class="pre">https://feuerhamster.code-elite.net/web-youtube-downloader/api.php?vid=nD6_aQIJgW0
</div class="pre">

<p>An example with Ajax in JavaScript</p>
<div class="pre">var videoId = "nD6_aQIJgW0";

$.ajax({
    type: 'GET',
    url: 'https://feuerhamster.code-elite.net/web-youtube-downloader/api.php',
    data: 'vid=' + videoId,
    success: function(res){

        if(!res.error){
            console.log(res);
        }

    }
});
</div>