// 1. Dades de les cancionns (Objectes senzills)
const biblioteca = [
    { nom: "Blinding Lights", url: "https://audio.com/blinding-lights" },
    { nom: "Bohemian Rhapsody", url: "https://audio.com/bohemian" },
    { nom: "Levitating", url: "https://audio.com/levitating" },
    { nom: "Shape of You", url: "https://audio.com/shape-of-you" }
];

// 2. Seleccionem els elements del DOM
const listaBiblioteca = document.getElementById('lista-biblioteca');
const listaCola = document.getElementById('lista-cola');
const cancionesCola = [];
// 3. Funció per carregar la biblioteca a la columna esquerra
function carregarBiblioteca() {
    biblioteca.forEach(cancion => {
        // Creem l'element de la llista (li)
        const li = document.createElement('li');

        // Afegim el contingut: Nom i botó d'afegir
        li.innerHTML = `
            <span>${cancion.nom}</span>
            <button onclick="añadir('${cancion.nom}', '${cancion.url}')">+</button>
        `;

        // L'afegim al contenidor de l'esquerra
        listaBiblioteca.appendChild(li);
    });
}

function añadir(nombre, url) {
    cancionesCola.push(nombre);
    console.log("cancionesCola:", cancionesCola);
    const li = document.createElement('li');
    let id = cancionesCola.length - 1;
    li.innerHTML = `
            <span>${nombre}</span>
            <button onclick="quitar(${id})">-</button>
        `;
    listaCola.appendChild(li);
}

function quitar(num) {
    listaCola.innerHTML = '';
    cancionesCola.splice(num, 1);
    console.log("hay", cancionesCola.length);
    // cancionesCola.forEach(cancion => {
    //     let id = cancionesCola.length;
    //     console.log("soy el numero", id, cancion)
    //     const li = document.createElement('li');
    //     li.innerHTML = `
    //         <span>${cancion}</span>
    //         <button onclick="quitar(${id})">+</button>
    //     `;
    //
    //     listaCola.appendChild(li);
    // })
    for (let i = 0; i < cancionesCola.length; i++) {
        console.log("soy", i, cancionesCola[i]);

        const li = document.createElement('li');
        li.innerHTML = `
            <span>${cancionesCola[i]}</span>
            <button onclick="quitar(${i})">-</button>
        `;

        listaCola.appendChild(li);
    }
}

function play(){
    console.log("Reproduciendo", cancionesCola[0]);
}

// Inicialitzem la càrrega en obrir la pàgina
carregarBiblioteca();