const menuEmail = document.querySelector('.navbar-email');
const menuHamIcon = document.querySelector('.menu');
const menuCarritoIcon = document.querySelector('.navbar-shopping-cart');
const productDetailCloseIcon = document.querySelector('.product-detail-close')
const desktopMenu = document.querySelector('.desktop-menu');
const mobileMenu = document.querySelector('.mobile-menu');
const shoppingCartContainer = document.querySelector('#shoppingCartContainer');
const productDetailContainer = document.querySelector('#productDetail');
const cardsContainer = document.querySelector('.cards-container');

menuEmail.addEventListener('click', toggleDesktopMenu);
menuHamIcon.addEventListener('click', toggleMobileMenu);
menuCarritoIcon.addEventListener('click', toggleCarritoAside);
productDetailCloseIcon.addEventListener('click', closeProductDetailAside);

function toggleDesktopMenu() {
  const isAsideClosed = shoppingCartContainer.classList.contains('inactive');

  if (!isAsideClosed) {
    shoppingCartContainer.classList.add('inactive');
  }

  desktopMenu.classList.toggle('inactive');
}

function toggleMobileMenu() {
  const isAsideClosed = shoppingCartContainer.classList.contains('inactive');

  if (!isAsideClosed) {
    shoppingCartContainer.classList.add('inactive');
  }

  closeProductDetailAside();

  mobileMenu.classList.toggle('inactive');
}

function toggleCarritoAside() {
  const isMobileMenuClosed = mobileMenu.classList.contains('inactive');

  if (!isMobileMenuClosed) {
    mobileMenu.classList.add('inactive');
  }

  const isProductDetailClosed = productDetailContainer.classList.contains('inactive');

  if (!isProductDetailClosed) {
    productDetailContainer.classList.add('inactive');
  }

  shoppingCartContainer.classList.toggle('inactive');
}

function openProductDetailAside() {
  shoppingCartContainer.classList.add('inactive');
  productDetailContainer.classList.remove('inactive');
}

function closeProductDetailAside() {
  productDetailContainer.classList.add('inactive');
}


const productList = [];
productList.push({
  id: 1,
  name: 'Nike Jordan',
  price: 420,
  image: 'https://images.pexels.com/photos/10853637/pexels-photo-10853637.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',

});

productList.push({
  id: 2,
  name: '-- GUN -- ',
  price: 420,
  image: 'https://images.pexels.com/photos/10853637/pexels-photo-10853637.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',

});

productList.push({
  id: 3,
  name: ' -- Bike -- ',
  price: 420,
  image: 'https://images.pexels.com/photos/10853637/pexels-photo-10853637.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1 '

});

/* <div class="product-card">
            <img src="https://images.pexels.com/photos/10853637/pexels-photo-10853637.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt="">
            <div class="product-info">
                <div>
                    <p>$120,00</p>
                    <p>Jordan</p>
                </div>
                <figure>
                    <img src="./Icons/bt_add_to_cart.svg" alt="">
                </figure>
            </div>
    </div> */

for (product of productList) {
  const productCard = document.createElement('div');
  productCard.classList.add('product-card');

  // product= {name, price, image} -> product.image
  const productImg = document.createElement('img');
  productImg.setAttribute('src', product.image);
  productImg.addEventListener('click', openProductDetailAside);

  const productInfo = document.createElement('div');
  productInfo.classList.add('product-info');

  const productInfoDiv = document.createElement('div');

  const productPrice = document.createElement('p');
  productPrice.innerText = '$' + product.price;
  const productName = document.createElement('p');
  productName.innerText = product.name;

  productInfoDiv.appendChild(productPrice);
  productInfoDiv.appendChild(productName);

  const productInfoFigure = document.createElement('figure');
  const productImgCart = document.createElement('img');
  productImgCart.classList.add('boton-agregar');
  productImgCart.setAttribute('src', './Icons/bt_add_to_cart.svg');
  productImgCart.setAttribute('id', `${product.id}`);

  productInfoFigure.appendChild(productImgCart);

  productInfo.appendChild(productInfoDiv);
  productInfo.appendChild(productInfoFigure);

  productCard.appendChild(productImg);
  productCard.appendChild(productInfo);

  cardsContainer.appendChild(productCard);

  const boton = document.getElementById(`${product.id}`);
  boton.addEventListener('click', () => {
    agregarAlCarrito(product.id);
  });
}

let carrito = []

const agregarAlCarrito = (prodId) => {
  const item = productList.find((product) => product.id === prodId)
  carrito.push(item);
  actualizarCarrito();
  console.log(carrito);
}

/*
   <div class="my-order-content">
   --------Esto es lo que necesito ----
        <div class="shopping-cart">
            <figure>
                <img src="https://images.pexels.com/photos/10853637/pexels-photo-10853637.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Nike Jordan">
            </figure>
            <p>Nike Jordan</p>
            <p>$70,00</p>
            <img src="./Icons/icon_close.png" alt="close">
        </div>
  --------------------------------------
        <div class="total">
            <p>
                <span>Total</span>
            </p>
            <p>$420.00</p>
        </div>
        <button class="primary-button">
            Checkout
            </button>
            </div>
            */
const contenedorCarrito = document.querySelector('.my-order-content');
const contadorCarrito = document.querySelector('.contador-carrito');
const precioTotal = document.querySelector('.precio-total');

const actualizarCarrito = () => {
  contenedorCarrito.innerHTML = "";

  /* Contenedor Shopping Cart */
  carrito.forEach(prod => {
    const div = document.createElement('div');
    div.className = ('shopping-cart');

    const productInfoFigure = document.createElement('figure');
    const productImgCart = document.createElement('img');

    productImgCart.setAttribute('src', prod.image);
    productImgCart.setAttribute('alt', prod.name);

    productInfoFigure.appendChild(productImgCart);
    div.appendChild(productInfoFigure);

    const productPrice = document.createElement('p');
    productPrice.innerText = '$' + prod.price;
    const productName = document.createElement('p');
    productName.innerText = prod.name;
    div.appendChild(productPrice);
    div.appendChild(productName);

    const botonEliminar = document.createElement('img');
    botonEliminar.setAttribute('src', './Icons/icon_close.png');
    botonEliminar.setAttribute('alt', 'close');
    botonEliminar.setAttribute('onclick', `eliminarDelCarrito(${prod.id})`);

    div.appendChild(botonEliminar);
    contenedorCarrito.appendChild(div);
  });

  /*Contenedor del total */
  // const div1 = document.createElement('div');
  // div1.className = ('total');
  // const total = document.createElement('p');
  // const span = document.createElement('span');
  // span.innerText = 'TOTAL';

  // total.appendChild(span);
  // div1.appendChild(total);

  // const precio = document.createElement('p');
  // precio.innerText ='$' + prod.price;

  // div1.appendChild(precio);
  // contenedorCarrito.appendChild(div1);

  // /* Contenedor boton */
  // const div2 = document.createElement('button');
  // div2.className = ('primary-button');
  // div2.innerText = 'Checkout';
  // contenedorCarrito.appendChild(div2);
  contadorCarrito.innerText = carrito.length;
  precioTotal.innerText = carrito.reduce((acc,prod) => acc + prod.price, 0)
}


const eliminarDelCarrito = (prodId) => {
  const item = carrito.find((product) => product.id === prodId);
  const indice = carrito.indexOf(item);
  carrito.splice(indice, 1);
  actualizarCarrito();
}
