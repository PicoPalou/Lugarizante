// 1. Dades de les cançons (Objectes senzills)
const biblioteca = [
    { nom: "Blinding Lights", url: "https://audio.com/blinding-lights" },
    { nom: "Bohemian Rhapsody", url: "https://audio.com/bohemian" },
    { nom: "Levitating", url: "https://audio.com/levitating" },
    { nom: "Shape of You", url: "https://audio.com/shape-of-you" }
];

// 2. Seleccionem els elements del DOM
const listaBiblioteca = document.getElementById('lista-biblioteca');
const listaCola = [];

// 3. Funció per carregar la biblioteca a la columna esquerra
function carregarBiblioteca() {
    biblioteca.forEach(canço => {
        // Creem l'element de la llista (li)
        const li = document.createElement('li');

        // Afegim el contingut: Nom i botó d'afegir
        li.innerHTML = `
            <span>${canço.nom}</span>
            <button onclick="añadir('${canço.nom}', '${canço.url}')">+</button>
        `;

        // L'afegim al contenidor de l'esquerra
        listaBiblioteca.appendChild(li);
    });
}

function añadir(nombre, url) {
    listaCola.push(nombre);
    listaCola.forEach(elemento => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${canço.nom}</span>
            <button onclick="añadir('${canço.nom}', '${canço.url}')">+</button>
        `;
    })
}

// Inicialitzem la càrrega en obrir la pàgina
carregarBiblioteca();