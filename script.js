// 1. Dades de les cançons (Objectes senzills)
const biblioteca = [
    { nom: "Blinding Lights", url: "https://audio.com/blinding-lights" },
    { nom: "Bohemian Rhapsody", url: "https://audio.com/bohemian" },
    { nom: "Levitating", url: "https://audio.com/levitating" },
    { nom: "Shape of You", url: "https://audio.com/shape-of-you" }
];

// 2. Seleccionem els elements del DOM
const llistaBiblioteca = document.getElementById('llista-biblioteca');

// 3. Funció per carregar la biblioteca a la columna esquerra
function carregarBiblioteca() {
    biblioteca.forEach(canço => {
        // Creem l'element de la llista (li)
        const li = document.createElement('li');

        // Afegim el contingut: Nom i botó d'afegir
        li.innerHTML = `
            <span>${canço.nom}</span>
            <button onclick="afegirALaCua('${canço.nom}', '${canço.url}')">+</button>
        `;

        // L'afegim al contenidor de l'esquerra
        llistaBiblioteca.appendChild(li);
    });
}

// Inicialitzem la càrrega en obrir la pàgina
carregarBiblioteca();