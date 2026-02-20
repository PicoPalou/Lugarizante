// 1. Dades de les cancionns (Objectes senzills)
const biblioteca = [
    { nom: "Blinding Lights", url: "https://audio.com/blinding-lights" },
    { nom: "Bohemian Rhapsody", url: "https://audio.com/bohemian" },
    { nom: "Levitating", url: "https://audio.com/levitating" },
    { nom: "Shape of You", url: "https://audio.com/shape-of-you" },
    { nom: "Cancion Test", url: "audios/test_sound.mp3" }
];

// 2. Seleccionem els elements del DOM
const listaBiblioteca = document.getElementById('lista-biblioteca');
const listaCola = document.getElementById('lista-cola');
const cancionesCola = [];

let audio = new Audio();
let num_cancion = 0
let reproduciendo = false

// 3. Funció per carregar la biblioteca a la columna esquerra
function carregarBiblioteca() {
    biblioteca.forEach(cancion => {
        // Creem l'element de la llista (li)
        const li = document.createElement('li');

        // Afegim el contingut: Nom i botó d'afegir
        li.innerHTML = `
            <span>${cancion.nom}</span>
            <button onclick="añadir('${cancion.nom}')">+</button>
        `;

        // L'afegim al contenidor de l'esquerra
        listaBiblioteca.appendChild(li);
    });
}

function añadir(nombre) {
    cancionesCola.push(nombre);
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

        const li = document.createElement('li');
        li.innerHTML = `
            <span>${cancionesCola[i]}</span>
            <button onclick="quitar(${i})">-</button>
        `;

        listaCola.appendChild(li);
    }
}

function play(){
    console.log("Reproduciendo", cancionesCola[num_cancion]);
    let url = ""
    for (let i = 0; i < biblioteca.length; i++) {
        if(biblioteca[i].nom === cancionesCola[num_cancion]) {
            url = biblioteca[i].url;
        }
    }
    console.log("url:", url)
    if (reproduciendo === false || cancionesCola.length > 0) {
        audio = new Audio(url);
        audio.play();
        reproduciendo = true;
        audio.addEventListener("ended", () => {
            console.log("Se ha pausado la reproducción");
            reproduciendo = false;
        });
    }
}

function pausar(){
    audio.pause()
    reproduciendo = false;
}

// Inicialitzem la càrrega en obrir la pàgina
carregarBiblioteca();
