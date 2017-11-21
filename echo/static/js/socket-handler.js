
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
    var ele = $("<tr></tr>");
    ele.append($("<td></td>").text(data.source))
    ele.append($("<td></td>").text(data.text))
    tbody.append(ele);
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
