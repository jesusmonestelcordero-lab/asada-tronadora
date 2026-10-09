javascript
// =========================
// MENSAJE INICIAL
// =========================

console.log("ASADA Tronadora - Sistema iniciado");


// =========================
// BUSCAR MEDIDOR
// =========================

function buscarMedidor() {

    let numero = document.getElementById("buscarMedidor").value.trim();

    let resultado = document.getElementById("resultadoMedidor");


    if (numero === "") {

        resultado.innerHTML = `
            <div class="notice-icon">
                ⚠️
            </div>

            <div>
                <h3>Atención</h3>

                <p>
                    Por favor, ingrese el número del medidor.
                </p>
            </div>
        `;

        return;
    }


    // Obtener los medidores guardados

    let medidores = JSON.parse(
        localStorage.getItem("medidores")
    ) || [];


    // Buscar el medidor

    let medidor = medidores.find(function(m) {

        return m.numero === numero;

    });


    // Si existe

    if (medidor) {

        resultado.innerHTML = `

            <div class="notice-icon">
                💧
            </div>

            <div>

                <h3>
                    Medidor encontrado
                </h3>

                <p>
                    <strong>Número:</strong>
                    ${medidor.numero}
                </p>

                <p>
                    <strong>Abonado:</strong>
                    ${medidor.abonado}
                </p>

                <p>
                    <strong>Dirección:</strong>
                    ${medidor.direccion}
                </p>

                <p>
                    <strong>Teléfono:</strong>
                    ${medidor.telefono}
                </p>

                <p>
                    <strong>Lectura actual:</strong>
                    ${medidor.lectura}
                </p>

                <p>
                    <strong>Estado:</strong>
                    ${medidor.estado}
                </p>

            </div>

        `;

    }


    // Si no existe

    else {

        resultado.innerHTML = `

            <div class="notice-icon">
                ❌
            </div>

            <div>

                <h3>
                    Medidor no encontrado
                </h3>

                <p>
                    No existe un medidor registrado con el número:
                    <strong>${numero}</strong>
                </p>

            </div>

        `;

    }

}


// =========================
// REGISTRAR MEDIDOR
// =========================

let formulario = document.getElementById("formMedidor");


if (formulario) {

    formulario.addEventListener("submit", function(event) {

        event.preventDefault();


        // Obtener los datos

        let numero = document
            .getElementById("numeroMedidor")
            .value
            .trim();

        let abonado = document
            .getElementById("nombreAbonado")
            .value
            .trim();

        let direccion = document
            .getElementById("direccion")
            .value
            .trim();

        let telefono = document
            .getElementById("telefono")
            .value
            .trim();

        let lectura = document
            .getElementById("lectura")
            .value;

        let estado = document
            .getElementById("estado")
            .value;


        // Obtener los medidores existentes

        let medidores = JSON.parse(
            localStorage.getItem("medidores")
        ) || [];


        // Comprobar si ya existe

        let existe = medidores.find(function(m) {

            return m.numero === numero;

        });


        if (existe) {

            alert("Ese número de medidor ya está registrado.");

            return;

        }


        // Crear nuevo medidor

        let nuevoMedidor = {

            numero: numero,

            abonado: abonado,

            direccion: direccion,

            telefono: telefono,

            lectura: lectura,

            estado: estado

        };


        // Agregarlo a la lista

        medidores.push(nuevoMedidor);


        // Guardar

        localStorage.setItem(
            "medidores",
            JSON.stringify(medidores)
        );


        // Mostrar mensaje

        let mensaje = document.getElementById(
            "mensajeRegistro"
        );


        mensaje.innerHTML = `

            <div class="notice-icon">
                ✅
            </div>

            <div>

                <h3>
                    Medidor registrado correctamente
                </h3>

                <p>
                    El medidor <strong>${numero}</strong>
                    fue guardado en el sistema.
                </p>

            </div>

        `;


        // Limpiar formulario

        formulario.reset();

    });

}

