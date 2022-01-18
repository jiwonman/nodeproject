const indexRoot = async (req, res) => {
  let count;
  if(req.signedCookies.count){
    count = parseInt(req.signedCookies.count);
  } else {
    count = 0;
  }
  count = await count + 1;
    res.cookie('count', count, {signed:true});
    res.render('index', { title: 'Cookie Example', count : count });
  };

  const products = {
    1:{title: 'The First Item'},
    2:{title: 'The Second Item'}
  };

const indexProduct = (req, res) => {
  let output = '';
  for(let name in products){
    output += `<li>${products[name].title} <a href="/cart/${name}">add</a></li>`
  }
  res.send(`<h1>Product List</h1><ul>${output}</ul><a href="/cart">Cart</a>`);
};

const indexCart = (req, res) => {
  const id = req.params.id;
  let cart;
  if(req.signedCookies.cart){
    cart = req.signedCookies.cart;
  } else {
    cart = {};
  }
  if(!cart[id]){
    cart[id] = 0;
  }
  cart[id] = parseInt(cart[id]) + 1;
  console.log(cart);
  res.cookie('cart', cart, {signed:true})
  res.redirect('/cart');
};

const CartId = (req, res) => {
  const cart = req.signedCookies.cart;
  let output = '';
  if(!cart){
    res.send("Empty!");
  } else {
    for(let id in cart){
      output += `<li>${products[id].title} (${cart[id]})</li>`;
    }
  }
  res.send(`<h1>Cart</h1><ul>${output}</ul><a href="/products">Product List</a>`);
}

module.exports = {
    indexRoot,
    indexProduct,
    indexCart,
    CartId
}
