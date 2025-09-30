// Incluye el header y el footer en la página
function includeHTML(id, url) {
    fetch(url)
        .then(response => response.text())
        .then(data => {
            document.getElementById(id).innerHTML = data;
        });
}

document.addEventListener('DOMContentLoaded', function() {
    includeHTML('header-container', 'resources/header.html');
    includeHTML('footer-container', 'resources/footer.html');
});
