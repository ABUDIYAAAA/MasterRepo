window.onload = function(){
    websocket = new WebSocket("ws://localhost:8888/");
    websocket.onmessage = function(event){document.write("  message received"); alert(event.data);}
    websocket.onopen = function(){document.write("  open");}
    websocket.onopen = (event) => websocket.send("  Hi");
    websocket.onclose = function(){document.write("  close");}
    websocket.onerror = function(){document.write("  error");}
}
