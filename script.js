// 1. Dades de les cancionns (Objectes senzills)
const biblioteca = [
    { nom: "Animals", url: "audios/animals.wav" },
    { nom: "Around the world", url: "audios/around_the_world.mp3" },
    { nom: "Caliente", url: "audios/caliente.mp3" },
    { nom: "Dile Que Tu Me Quieres", url: "audios/dile_que_tu_me_quieres.mp3" },
    { nom: "Pollito Pio", url: "audios/pollito.mp3" },
    { nom: "Shape of You", url: "audios/shape_of_you.wav" },
    { nom: "Traicionera", url: "audios/traicionera.mp3" }
];

// 2. Seleccionem els elements del DOM
const listaBiblioteca = document.getElementById('lista-biblioteca');
const listaCola = document.getElementById('lista-cola');
let sonando = document.getElementById('sonando');
let cancionesCola = [];

// variables para controlar el reproductor de audio
let audio = new Audio();
let num_cancion = 0
let reproduciendo = false
let pausado = false;

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


// funcion que añade canciones a la lista, y las dibuja como boton, agregandoles una id diferente a cada una
function añadir(nombre) {
    cancionesCola.push(nombre);
    const li = document.createElement('li');
    let id = cancionesCola.length - 1;
    li.innerHTML = `
            <div class="botones-orden">
                <button onclick="subir(${id})">⬆</button>
                <button onclick="bajar(${id})">⬇</button>
            </div>
            <span>${nombre}</span>
            <button onclick="quitar(${id})">-</button>
        `;
    listaCola.appendChild(li);
}

// funcion que elimina canciones de la lista, y actualiza las id de los demas botones
function quitar(num) {
    listaCola.innerHTML = '';
    cancionesCola.splice(num, 1);

    for (let i = 0; i < cancionesCola.length; i++) {

        const li = document.createElement('li');
        li.innerHTML = `
            <div class="botones-orden">
                <button onclick="subir(${i})">⬆</button>
                <button onclick="bajar(${i})">⬇</button>
            </div>
            <span>${cancionesCola[i]}</span>
            <button onclick="quitar(${i})">-</button>
        `;

        listaCola.appendChild(li);
    }
}

// funcion que empieza a reproducir la cancion correspondiente segun la ultima reproducida
function play(){
    console.log("Reproduciendo", cancionesCola[num_cancion]);
    sonando.innerHTML = `<h2>Sonando: ${cancionesCola[num_cancion]}</h2>`;
    let url = ""
    for (let i = 0; i < biblioteca.length; i++) {
        if(biblioteca[i].nom === cancionesCola[num_cancion]) {
            url = biblioteca[i].url;
        }
    }
    console.log("url:", url)
    if (reproduciendo === false && cancionesCola.length > 0) {
        if(pausado === false) {
            audio.src = url
            audio.play();
        }
        else{
            console.log("estoy aqui")
            pausado = false
            audio.play();
        }
        reproduciendo = true;
        audio.addEventListener("ended", () => {
            console.log("Se ha pausado la reproducción");
            reproduciendo = false;
            num_cancion++;
            if(num_cancion < cancionesCola.length) {
                play()
            }
            else {
                sonando.innerHTML = `<h2>Dale al play</h2>`;
                num_cancion = 0
                reproduciendo = false;
            }
        });
    }
}


// funcion que pausa la cancion
function pausar(){
    audio.pause()
    reproduciendo = false;
    pausado = true;
}

// funcion que agrega una cancion aleatoria desde la biblioteca
function aleatorio(){
    let cancion_aletoria = Math.trunc(Math.random() * biblioteca.length);
    añadir(biblioteca[cancion_aletoria].nom);
}

// funcion que vaciaa toda la lista
function vaciar(){
    listaCola.innerHTML = '';
    cancionesCola = []
    num_cancion = 0;
}

// funcion que permite cambiar la posicion de una cancion 1 posicion para arriba, y actualiza las id
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
                <button onclick="subir(${i})">⬆</button>
                <button onclick="bajar(${i})">⬇</button>
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

// funcion que permite cambiar la posicion de una cancion 1 posicion para abajo, y actualiza las id
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
                <button onclick="subir(${i})">⬆</button>
                <button onclick="bajar(${i})">⬇</button>
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

// salta a la siguiente cancion si es posible
function siguiente(){
    if(num_cancion < cancionesCola.length - 1) {
        reproduciendo = false;
        pausado = false;
        audio.pause()
        num_cancion++
        play()
    }
}

// salta a la cancion anterior si es posible
function anterior(){
    if(num_cancion > 0) {
        reproduciendo = false;
        pausado = false;
        audio.pause()
        num_cancion--
        play()
    }
}

// Inicialitzem la càrrega en obrir la pàgina
carregarBiblioteca();
