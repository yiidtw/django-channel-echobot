
var ws_scheme = window.location.protocol == "https:" ? "wss" : "ws";
var chatsock = new ReconnectingWebSocket(ws_scheme + '://' + window.location.host + "/chat");

chatsock.onopen = function(message){
    console.log("connection open...");
}

chatsock.onmessage = function(message){
    console.log("processing message...");
    // data exmaple
    // Object {type: "text", text: "hi", source: "USER"}
    // Object {type: "text", text: "hi", source: "BOT"}
    var data = JSON.parse(message.data);

    var tbody = $('#container_msg');
    if(data.source == "BOT"){
        tbody.append('<div class="bubble bubble-left">' + data.text + '</div>');
    }else if(data.source == "USER"){
        tbody.append('<div class="bubble bubble-right">' + data.text + '</div>');
    }else{
        console.log("invalid data source...")
    }

    $('#container_msg').animate({
        scrollTop: $('#container_msg')[0].scrollHeight
    }, 0);

}

chatsock.onclose = function(message){
    console.log("connection lost...");
}

chatsock.onerror = function(message){
    // uncomment when production
    // console.log("err occured, reconnecting...");
}

$(function(){
    $('#btn_msg').click(function() {
        // we can put more info into payload such as date
        payload = {}
        payload.text = $('#input_msg').val();
        if(payload.text)
            chatsock.send(JSON.stringify(payload));
        $('#input_msg').val = '';
        $('#input_msg').val('').focus();

        return false;
    });
    
});
