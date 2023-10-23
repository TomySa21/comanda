document.addEventListener('DOMContentLoaded', function () {
  const menuDiv = document.getElementById('menuDiv');

  // Realizar una solicitud GET a la URL
  fetch('http://localhost:3000/menu')
      .then(response => {
          // Verificar si la solicitud fue exitosa (código de estado 200)
          if (response.status === 200) {
              return response.json(); // Parsear la respuesta JSON
          } else {
              throw new Error('No se pudo obtener el menú');
          }
      })
      .then(data => {
          // Construir el HTML para mostrar los objetos del menú
          const itemsHTML = data.map(item => `<p>${item.id} | ${item.producto} | $${item.precio} </p>`).join('');
          menuDiv.innerHTML = itemsHTML;
      })
      .catch(error => {
          console.error(error);
          menuDiv.innerHTML = 'Error al cargar el menú';
      });
});

// Variable para almacenar el ID de la mesa seleccionada
let mesa_id = "";

// Función para manejar el clic en los botones de las mesas
function handleTableButtonClick(id) {
  // Mostrar un mensaje de confirmación
  if (confirm('¿Quieres confirmar la acción?')) {
      // Bloquear todos los botones de las mesas
      for (let i = 1; i <= 5; i++) {
          document.getElementById('btn' + i).disabled = true;
      }

      // Desbloquear el botón de la mesa seleccionada
      document.getElementById('btn' + id).disabled = false;

      mesa_id = id;
  }
}


let productos = {};

let precios = {
  "hamburguesa": 1500,
  "pizza": 2400,
  "pancho": 500,
  "taco": 1000,    
  "sushi": 5000,   
  "cerveza": 600,  
  "vino": 1000,    
  "cocteles": 1400,
  "refrescos": 800, 
  "cafe": 450      
};


let menu_ids = {
  "hamburguesa": "1",
  "pizza": "2",
  "pancho": "3",
  "taco": "4",      
  "sushi": "5",     
  "cerveza": "6",   
  "vino": "7",      
  "cocteles": "8",  
  "refrescos": "9", 
  "cafe": "10"      
};

function handleProductButtonClick(producto) {
  
  if (productos[producto]) {
      productos[producto].cantidad++;
  } else {
      productos[producto] = { cantidad: 1, precio: precios[producto], menu_id: menu_ids[producto] };
  }
}

function handleDeliveryButtonClick() {
  if (mesa_id === "") {
      alert('Por favor, selecciona una mesa primero.');
      return;
  }

  
  let lastId = localStorage.getItem('lastId') || 0;
  
  let nextId = Number(lastId) + 1;

  
  let orden = Object.keys(productos).map((producto, index) => {
      return {
          "id": (index + 1).toString(),
          "nombre": producto,
          "cantidad": productos[producto].cantidad.toString(),
          "precio": productos[producto].precio.toString(),
          "menu_id": productos[producto].menu_id.toString()
      };
  });

  
  let total = orden.reduce((sum, item) => sum + item.cantidad * item.precio, 0);

  let pedido = {
      "id": nextId.toString(),
      "mesa_id": mesa_id,
      "orden": orden,
      "total": total.toString(),
  };

  fetch('http://localhost:3000/pedidos', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(pedido),
  })
      .then(response => response.json())
      .then(data => {
          console.log(data);
          alert('Pedido completado exitosamente');
          localStorage.setItem('lastId', nextId);

          
          productos = {};

          
          for (let i = 1; i <= 5; i++) {
              document.getElementById('btn' + i).disabled = false;
          }
      })
      .catch((error) => console.error('Error:', error));
}


document.getElementById('btn1').addEventListener('click', function () { handleTableButtonClick("1"); });
document.getElementById('btn2').addEventListener('click', function () { handleTableButtonClick("2"); });
document.getElementById('btn3').addEventListener('click', function () { handleTableButtonClick("3"); });
document.getElementById('btn4').addEventListener('click', function () { handleTableButtonClick("4"); });
document.getElementById('btn5').addEventListener('click', function () { handleTableButtonClick("5"); });
document.getElementById('entrega').addEventListener('click', handleDeliveryButtonClick);


document.getElementById('hamburguesa').addEventListener('click', function () { handleProductButtonClick("hamburguesa"); });
document.getElementById('pizza').addEventListener('click', function () { handleProductButtonClick("pizza"); });
document.getElementById('pancho').addEventListener('click', function () { handleProductButtonClick("pancho"); });
document.getElementById('taco').addEventListener('click', function () { handleProductButtonClick("taco"); });
document.getElementById('sushi').addEventListener('click', function () { handleProductButtonClick("sushi"); });
document.getElementById('cerveza').addEventListener('click', function () { handleProductButtonClick("cerveza"); });
document.getElementById('vino').addEventListener('click', function () { handleProductButtonClick("vino"); });
document.getElementById('cocteles').addEventListener('click', function () { handleProductButtonClick("cocteles"); });
document.getElementById('refrescos').addEventListener('click', function () { handleProductButtonClick("refrescos"); });
document.getElementById('cafe').addEventListener('click', function () { handleProductButtonClick("cafe"); });

document.addEventListener("DOMContentLoaded", function () {
    const menuDiv = document.getElementById("menuDiv");
    const buttons = document.querySelectorAll("button[id^='btn']");
    const entregaButton = document.getElementById("entrega");

    const menuItems = [];

    buttons.forEach((button) => {
        button.addEventListener("click", () => {
            const itemName = button.textContent;
            menuItems.push(itemName);
            updateMenuDisplay();
        });
    });

    entregaButton.addEventListener("click", () => {
        if (menuItems.length > 0) {
            alert("Pedido entregado: " + menuItems.join(", "));
            menuItems.length = 0; 
            updateMenuDisplay();
        } else {
            alert("No has seleccionado ningún elemento del menú.");
        }
    });

    function updateMenuDisplay() {
        menuDiv.textContent = "Pedido actual: " + menuItems.join(", ");
    }
});




function handleProductButtonClick(producto) {
    if (productos[producto]) {
        productos[producto].cantidad++;
    } else {
        productos[producto] = { cantidad: 1, precio: precios[producto], menu_id: menu_ids[producto] };
    }

    updatePedidoDisplay();
}


function updatePedidoDisplay() {
    const pedidoDiv = document.querySelector('.pedido-items');
    pedidoDiv.innerHTML = '';

    for (const producto in productos) {
        const { cantidad, precio } = productos[producto];
        const itemHTML = `<p>${cantidad}x ${producto} | $${cantidad * precio}</p>`;
        pedidoDiv.innerHTML += itemHTML;
    }
}
document.addEventListener("DOMContentLoaded", function () {
    
    function eliminarPedido() {
        var pedidoItems = document.querySelector(".pedido-items");
        pedidoItems.innerHTML = ""; 
    }

    var eliminarPedidoButton = document.getElementById("eliminarPedido");
    eliminarPedidoButton.addEventListener("click", eliminarPedido);
});



// ...
