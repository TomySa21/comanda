document.addEventListener('DOMContentLoaded', function () {
    const listaStockProductos = document.getElementById('listaStockProductos');
  
    fetch('http://localhost:3000/stock')
      .then(response => {
        if (response.status === 200) {
          return response.json();
        } else {
          throw new Error('No se pudo obtener el menú');
        }
      })
      .then(data => {
        const itemsHTML = data.map(item => `
          <tr>
            <td>${item.id}</td>
            <td>${item.nombre}</td>
            <td>${item.cantidad}</td>
            <td>$${item.costo}</td>
            <td>
              <button onclick="actualizar(${item.id})">Actualizar</button>
              <button onclick="eliminar(${item.id})">Eliminar</button>
            </td>
          </tr>
        `).join('');
        listaStockProductos.innerHTML = `
          <table>
            <thead>
              <tr>
                <th>Id</th>
                <th>Nombre</th>
                <th>Cantidad</th>
                <th>Costo</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>${itemsHTML}</tbody>
          </table>`;
      })
      .catch(error => {
        console.error(error);
        listaStockProductos.innerHTML = 'Error al cargar el menú';
      });
});

function actualizar(id) {
  // Aquí va tu código para actualizar
  console.log(`Actualizar: ${id}`);
}

function eliminar(id) {
  // Aquí va tu código para eliminar
  console.log(`Eliminar: ${id}`);
}
