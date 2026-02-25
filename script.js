// 1. Dades de les cancionns (Objectes senzills)
const biblioteca = [
    { nom: "Animals", url: "audios/animals.mp3" },
    { nom: "Pollito Pio", url: "audios/pollito.mp3" },
    { nom: "Levitating", url: "https://audio.com/levitating" },
    { nom: "Shape of You", url: "https://audio.com/shape-of-you" },
    { nom: "Cancion Test", url: "audios/test_sound.mp3" }
];

// 2. Seleccionem els elements del DOM
const listaBiblioteca = document.getElementById('lista-biblioteca');
const listaCola = document.getElementById('lista-cola');
let cancionesCola = [];

let audio
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
            <div class="botones-orden">
                <button onclick="subir(${id})">subir</button>
                <button onclick="bajar(${id})">bajar</button>
            </div>
            <span>${nombre}</span>
            <button onclick="quitar(${id})">-</button>
        `;
    listaCola.appendChild(li);
}

function quitar(num) {
    listaCola.innerHTML = '';
    cancionesCola.splice(num, 1);

    for (let i = 0; i < cancionesCola.length; i++) {

        const li = document.createElement('li');
        li.innerHTML = `
            <div class="botones-orden">
                <button onclick="subir(${i})">subir</button>
                <button onclick="bajar(${i})">bajar</button>
            </div>
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
        if(audio === undefined) {
            audio = new Audio(url);
            audio.play();
        }
        else{
            audio.play();
        }
        reproduciendo = true;
        audio.addEventListener("ended", () => {
            console.log("Se ha pausado la reproducción");
            num_cancion++;
            if(num_cancion < cancionesCola.length) {
                play()
            }
            else {
                num_cancion = 0
                reproduciendo = false;
            }
        });
    }
}

function pausar(){
    audio.pause()
    reproduciendo = false;
}

function aleatorio(){
    let cancion_aletoria = Math.trunc(Math.random() * biblioteca.length);
    añadir(biblioteca[cancion_aletoria].nom);
}

function vaciar(){
    listaCola.innerHTML = '';
    cancionesCola = []
    num_cancion = 0;
}

function subir(id){
    if(id > 0) {

        let anterior = cancionesCola[id - 1];
        cancionesCola[id - 1] = cancionesCola[id];
        cancionesCola[id] = anterior;

        listaCola.innerHTML = '';
        for (let i = 0; i < cancionesCola.length; i++) {

            const li = document.createElement('li');
            li.innerHTML = `
            <div class="botones-orden">
                <button onclick="subir(${i})">subir</button>
                <button onclick="bajar(${i})">bajar</button>
            </div>
            <span>${cancionesCola[i]}</span>
            <button onclick="quitar(${i})">-</button>
        `;

            listaCola.appendChild(li);
        }
    }
    else{
        console.log(":(")
    }

}

function bajar(id){
    if(id < cancionesCola.length - 1) {

        let posterior = cancionesCola[id + 1];
        cancionesCola[id + 1] = cancionesCola[id];
        cancionesCola[id] = posterior;

        listaCola.innerHTML = '';
        for (let i = 0; i < cancionesCola.length; i++) {

            const li = document.createElement('li');
            li.innerHTML = `
            <div class="botones-orden">
                <button onclick="subir(${i})">subir</button>
                <button onclick="bajar(${i})">bajar</button>
            </div>
            <span>${cancionesCola[i]}</span>
            <button onclick="quitar(${i})">-</button>
        `;

            listaCola.appendChild(li);
        }
    }
    else{
        console.log(":(")
    }
}

// Inicialitzem la càrrega en obrir la pàgina
carregarBiblioteca();
