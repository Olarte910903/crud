const aidi = document.querySelector('.aidi');
const neim = document.querySelector('.neim');
const company = document.querySelector('.company');
const body = document.querySelector('body');

document.addEventListener('DOMContentLoaded', function() {
  // Obtener el formulario del HTML
  const formulario = document.querySelector('#formulario');

  // Escuchar el evento submit del formulario
  formulario.addEventListener('submit', function(event) {
    event.preventDefault(); // Evitar el envío del formulario por defecto

    // Obtener los valores de los inputs
    const id = document.querySelector('.id').value;
    const nombre = document.querySelector('.nombre').value;
    const empresa = document.querySelector('.empresa').value;

    // Crear un objeto con los datos a enviar
    const datos = {
      id: id,
      nombre: nombre,
      empresa: empresa
    };

    // Realizar la solicitud HTTP (por ejemplo, utilizando fetch o axios)
    fetch('http://localhost:3000/datos/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(datos)
    })
      .then(response => response.json())
      .then(data => {
        // Manejar la respuesta del servidor si es necesario
        console.log('Respuesta del servidor:', data);
      })
      .catch(error => {
        // Manejar errores de la solicitud
        console.error('Error al enviar los datos:', error);
      });
  });
});

const recibirDatos = async () =>{
  const response = await fetch('http://localhost:3000/datos');
  const data = await response.json();
  // aidi.innerHTML = data[0].id;
  // neim.innerHTML = data[0].nombre;
  // company.innerHTML = data[0].empresa;
  for(let i = 0; i < data.length; i++){
    let componente = document.createElement('div');
    componente.innerHTML=
    `
      <p>${data[i].id}</p>
      <p>${data[i].nombre}</p>
      <p>${data[i].empresa}</p>

    `
    body.appendChild(componente);
  }

};

recibirDatos();