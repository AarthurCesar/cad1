const menu = document.getElementById("menu");
const cartBtn = document.getElementById("cart-btn");
const cartModal = document.getElementById("cart-modal");
const cartItemsContainer = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");
const checkoutBtn = document.getElementById("checkout-btn");
const closeModalBtn = document.getElementById("close-modal-btn");
const cartCounter = document.getElementById("cart-count");
const addressInput = document.getElementById("address");
const addressWarn = document.getElementById("address-warn");
const carrinhoWarn = document.getElementById("carrinho-warn");

let cart = [];

cartBtn.addEventListener("click", function () {
  updateCartModal();
  cartModal.style.display = "flex";
});

cartModal.addEventListener("click", function (event) {
  if (event.target === cartModal) {
    cartModal.style.display = "none";
  }
});

closeModalBtn.addEventListener("click", function () {
  cartModal.style.display = "none";
});

// Puxando Nome & Preço
menu.addEventListener("click", function (event) {
  // console.log(event.target);
  let parentButton = event.target.closest(".add-to-cart-btn");
  if (parentButton) {
    const name = parentButton.getAttribute("data-name");
    const price = parseFloat(parentButton.getAttribute("date-price"));

    addToCart(name, price);
  }
});

//Funçao para adiconar no carrinho
function addToCart(name, price) {
  const existeOItem = cart.find((item) => item.name === name);
  if (existeOItem) {
    existeOItem.quantity += 1;
  } else {
    cart.push({
      name,
      price,
      quantity: 1,
    });
  }

  updateCartModal();
}

// Atualizando  o Carrinho

function updateCartModal() {
  cartItemsContainer.innerHTML = "";
  let total = 0;
  cart.forEach((item) => {
    const cartItemElement = document.createElement("div");
    cartItemElement.classList.add(
      "flex",
      "justify-between",
      "mb-4",
      "flex-col"
    );
    cartItemElement.innerHTML = `
    <div class="flex items-center justify-between">

    <div>
    <p class="font-semibold">${item.name}</p>
    <p>Qtd: ${item.quantity}</p>
    <p class="font-medium mt-2">R$ ${item.price.toFixed(2)}</p>
    </div>
    <button class="remove-from-cart-btn" data-name="${item.name}">
    Remover
    </button>
    </div>
  
    `;
    total += item.price * item.quantity;
    cartItemsContainer.appendChild(cartItemElement);
  });
  cartTotal.textContent = total.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
  cartCounter.innerHTML = cart.length;
}

// REMOVER

cartItemsContainer.addEventListener("click", function (event) {
  if (event.target.classList.contains("remove-from-cart-btn")) {
    const name = event.target.getAttribute("data-name");
    removeItemCart(name);
  }
});

function removeItemCart(name) {
  const index = cart.findIndex((item) => item.name === name);
  if (index !== -1) {
    const item = cart[index];
    if (item.quantity > 1) {
      item.quantity -= 1;
      updateCartModal();
      return;
    }
    cart.splice(index, 1);
    updateCartModal();
  }
}

addressInput.addEventListener("input", function (event) {
  let inputValue = event.target.value;

  if (inputValue !== "") {
    addressInput.classList.remove("border-red-500");
    addressWarn.classList.add("hidden");
  }
});

checkoutBtn.addEventListener("click", function () {
  const isOpen = checkResturantOpen();
  if (!isOpen) {
    Toastify({
      text: "Estamos fechado no momento !",
      duration: 3000,
      close: true,
      gravity: "top", // `top` or `bottom`
      position: "left", // `left`, `center` or `right`
      stopOnFocus: true, // Prevents dismissing of toast on hover
      style: {
        background: "#ef4444",
      },
    }).showToast();
    return;
  }

  // Verificação do carrinho
  if (cart.length === 0) {
    carrinhoWarn.classList.remove("hidden");
    return; // Para aqui se o carrinho estiver vazio
  } else {
    carrinhoWarn.classList.add("hidden"); // Esconde o aviso do carrinho
  }

  // Verificação do campo de endereço
  if (addressInput.value === "") {
    addressWarn.classList.remove("hidden");
    addressInput.classList.add("border-red-500"); // Adiciona a borda vermelha se o endereço estiver vazio
  } else {
    addressWarn.classList.add("hidden"); // Esconde o aviso do endereço
    addressInput.classList.remove("border-red-500"); // Remove a borda vermelha se o endereço for preenchido
  }

  // API WHATS
  const cartItems = cart.map((item) => {
      return (
        ` ${item.name} Quantitdade: ${item.quantity} | Preço: R$${item.price.toFixed(2)} |` 
      )
    }).join("")
  const message = encodeURIComponent(cartItems)
  const phone = "31984245598"
  window.open(`https://wa.me/${phone}?text=${message} Endreço: ${addressInput.value}`, "_blank")

  cart.length = 0;
  updateCartModal();
})

// verificar a hora e manipular o card horario

function checkResturantOpen() {
  const data = new Date();
  const hora = data.getHours();
 return hora >= 7 && hora < 18; //true
}

const spanItem = document.getElementById("date-span");

const isOpen = checkResturantOpen();

// if (isOpen) {
//   spanItem.classList.remove("bg-red-500");
//   spanItem.classList.add("bg-green-500");
// } else {
//   alert("Estamos fechado no momento abriremos as 7:00!");
//   spanItem.classList.remove("bg-green-500");
//   spanItem.classList.add("bg-red-500");
// }

function updateHeaderFilter() {
  const currentTime = new Date(); // Obtém a data e hora atuais
  const currentHour = currentTime.getHours(); // Obtém a hora atual

  const header = document.getElementById("header");

  if (currentHour >= 18) {
    header.classList.add("filter", "grayscale"); // Adiciona classes para torná-lo cinza
  } else {
    header.classList.remove("filter", "grayscale"); // Remove classes se não for após as 29
  }
}

// Chama a função ao carregar a página
updateHeaderFilter();
