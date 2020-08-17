var stompClient = null;

function connect() {

    // Create and init the SockJS object
    var socket = new SockJS('/notification');
    stompClient = Stomp.over(socket);

    // Subscribe the '/notify' channell
    stompClient.connect({}, function(frame) {
      setConnected(true);
      stompClient.subscribe('/topic/user', function(notification) {

        // Call the notify function when receive a notification
        notify(JSON.parse(notification.body).content);

      });
    });

    return;
} // function connect

/**
* Display the notification message.
*/
function notify(message) {
   $("#userinfo").append("<tr><td>" + message + "</td></tr>");
   return;
}

/**
* Init operations.
*/
$(document).ready(function() {

    // Start the web socket connection.
    connect();

});


/**
* function disconnect
**/
function disconnect() {
    if (stompClient !== null) {
        stompClient.disconnect();
    }
    setConnected(false);
    console.log("Disconnected");
}

function sendName() {
    stompClient.send("/app/user", {}, JSON.stringify({'name': $("#name").val()}));
}

function sendGreeting(message){

    $.ajax({
      url: "/send-message",
      type: "POST",
      data: {greeting: message}
    });
}


function setConnected(connected) {
    $("#connect").prop("disabled", connected);
    $("#disconnect").prop("disabled", !connected);
    if (connected) {
        $("#conversation").show();
    }
    else {
        $("#conversation").hide();
    }
    $("#userinfo").html("");
}

$(function () {
    $("form").on('submit', function (e) {
        e.preventDefault();
    });
    $( "#connect" ).click(function() { connect(); });
    $( "#disconnect" ).click(function() { disconnect(); });
    $( "#send" ).click(function() { sendName(); });
    $( "#sendGreeting" ).click(function() {
        var greeting = $(this).closest("form").find('[name=greeting]').val();
        console.log(" greeting: " +greeting)
        sendGreeting(greeting); });
});
