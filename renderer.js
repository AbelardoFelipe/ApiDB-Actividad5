let salida = document.getElementById('imagen2')
let nombre = document.getElementById('nombre')
let experiencia = document.getElementById('experiencia')
let ID = document.getElementById('numeroPosicion')
let ataque = document.getElementById('numeroAtaque')
let defensa = document.getElementById('numeroDefensa')
let ingreso = document.getElementById('ingreso')
let textoIngresar = document.getElementById('textoIngresar')
let botonGenerar = document.getElementById('generar')
let botonGuardar = document.getElementById('guardarDatosEnDB')
let botonConsultar = document.getElementById('consultar')
let mylist = document.getElementById('mylist')

/**
 * DATOS QUE APARECEN POR DEFECTO AL CARGAR LA APLICACION AL CARGAR
 */
window.addEventListener('load', () => {
    botonGuardar.disabled = true
    let i = Math.floor(Math.random() * (600 - 1) + 1)
    fetch(`https://pokeapi.co/api/v2/pokemon/${i}/`)
        .then(res => res.json())
        .then(resJson => {
            nombre.innerHTML = resJson.name
            salida.setAttribute('src', resJson.sprites.other.dream_world.front_default)
            experiencia.innerHTML = "Exp. " + resJson.base_experience
            ID.innerHTML = i
            ataque.innerHTML = resJson.stats[1].base_stat
            defensa.innerHTML = resJson.stats[2].base_stat
        })
})

/**
 * DATOS QUE APARECEN AL INGRESAR UN NUMERO Y PRECIONAR EL BOTON "GENERAR POKEMON"
 */
let imagen
botonGenerar.addEventListener('click', () => {
    let i = parseInt(ingreso.value)
    if(ingreso.value == ""){
        botonGuardar.disabled = true
        textoIngresar.innerHTML = "El campo no puede estar vacío"
    }else if (i >= 1 && i <= 600) {
        fetch(`https://pokeapi.co/api/v2/pokemon/${i}/`)
            .then(res => res.json())
            .then(resJson => {
                nombre.innerHTML = resJson.name
                salida.setAttribute('src', resJson.sprites.other.dream_world.front_default)
                experiencia.innerHTML = "Exp. " + resJson.base_experience
                ID.innerHTML = i
                ataque.innerHTML = resJson.stats[1].base_stat
                defensa.innerHTML = resJson.stats[2].base_stat
                ingreso.value = ""
                textoIngresar.innerHTML = "Ingrese un nuevo número"
                botonGuardar.disabled = false
            })
    }else if(i > 600){
        textoIngresar.innerHTML = "El número no puede ser mayor a 600"
        ingreso.value = ""
        botonGuardar.disabled = true
    }else if (i <= 0) {
        textoIngresar.innerHTML = "El número no puede ser menor a 1"
        ingreso.value = ""
        botonGuardar.disabled = true
    }
})

/**
 * BOTON PARA GUARDAR DATOS EN LA BASE DE DATOS
 */
botonGuardar.addEventListener('click', () => {
    let fechaActual = new Date()
    let dia = fechaActual.getDate()
    let mes = fechaActual.getMonth() + 1
    let año = fechaActual.getFullYear()
    fecha = dia + "/" + mes + "/" + año
    console.log(fecha)
    window.comunicacion.guardar([fecha, 'image', nombre.innerHTML, experiencia.innerHTML, ID.innerHTML, ataque.innerHTML, defensa.innerHTML]);
})


/**
 * BOTON PARA CONSULTAR LA BASE DE DATOS CUANDO SE HAYA INGRESADO UN ID QUE PREVIAMENTE HAYA SIGO GUARDADO EN LA BASE DE DATOS
 */
botonConsultar.addEventListener('click', () => {
    botonGuardar.disabled = true
    window.comunicacion.consulta2('result2')
    window.comunicacion.historial2(function (event2, args2) {
        let a = parseInt(ingreso.value)
        args2.forEach(d => {
            if(d.ID_POKEMON == a){
                salida.setAttribute('src', "")
                nombre.innerHTML = d.NOMBRE
                experiencia.innerHTML = d.EXPERIENCIA
                ID.innerHTML = d.ID_POKEMON
                ataque.innerHTML = d.ATAQUE
                defensa.innerHTML = d.DEFENSA
                ingreso.value = ""
            }
        })
    })
})


/**
 * CONSULTAR DATOS GUARDADOS EN LA BASE DE DATOS (HISTORIAL) ESTOS APARACEN POR DEFENTO AL CARGAR LA APLICACION
 */
window.comunicacion.consulta('result')
window.comunicacion.historial(function (event, args) {
    args.forEach(p => {
        let fila = document.createElement('tr')

        let td = document.createElement('td')
        td.innerText = p.FECHA
        fila.appendChild(td)
        
        td = document.createElement('td')
        td.innerText = p.ID_POKEMON
        fila.appendChild(td)
        
        td = document.createElement('td')
        td.innerText = p.NOMBRE
        fila.appendChild(td)

        mylist.appendChild(fila)

    });
})