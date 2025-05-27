window.onload = function() {
    document.getElementById("div1").textContent = "Window.onload event happened! Displayable content is loaded!"
}

document.addEventListener("DOMContentLoaded", function(event) {
    document.getElementById("div2").textContent = "DOMContentLoaded event happened. HTML is loaded"
});
