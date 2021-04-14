function redrawContent() {
    let md_url = window.location.pathname.replace(".html", "") + ".md";
    let xhr = new XMLHttpRequest();
    xhr.open("GET", md_url, false);
    xhr.send();
    let html;
    if (xhr.status == 200) {
        let converter = new showdown.Converter();
        converter.setOption('tables', true);
        converter.setOption('strikethrough', true);
        converter.setOption('simplifiedAutoLink', true);
        let text = xhr.responseText;
        html = converter.makeHtml(text);
    } else {
        html = `<h1>Что-то пошло не так (${xhr.status})</h1>`
    }
    document.getElementById("article").innerHTML = html;
}


function tooglemenu() {
    if (document.getElementById("navigation").style.display === "block") {
        document.getElementById("navigation").style.display = "none"
    } else {
        document.getElementById("navigation").style.display = "block"
    }
}

function redrawNav() {
    for (let e of document.getElementsByClassName("nav-element")) {
        if (window.location.pathname === e.firstChild.getAttribute("href")) {
            e.classList.add("active");
        } else {
            e.classList.remove("active");
        }
    }
}

function addAnchors() {
    for (let i = 1; i < 10; i++) {
        for(let e of document.getElementsByTagName("h"+i)){
            e.innerHTML+=` <a href="#${e.id}">#</a>`
            console.log(e);
        }
    }
}

function resetListeners() {
    for (let e of document.getElementsByTagName("a")) {
        if (e.getAttribute("href").startsWith("/")) {
            e.onclick = function () {
                history.pushState({}, "", e.getAttribute("href"));
                redrawNav();
                redrawContent();
                resetListeners();
                addAnchors();
                return false;
            }
        } else {
            e.target = "_blank";
        }
    }
}
redrawNav();
redrawContent();
resetListeners();
addAnchors();