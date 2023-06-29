var shopping_cart = [];
var shopping_cart_total = 0;

//계산
const add_item = (shopping_cart, item) => [...shopping_cart, item];

const make_item = (name, price) => ({ name, price });

const calc_cart_total = (shopping_cart) =>
  shopping_cart.reduce((total, item) => total + item.price, 0);

//액션
const add_item_to_cart = (name, price) => {
  const item = make_item(name, price);
  shopping_cart = add_item(shopping_cart, item);

  const total = calc_cart_total(shopping_cart);
  const tax = calc_tax(total);

  set_cart_total_dom(total);
  set_tax_dom(tax);

  update_shipping_icons(total);
};

const is_free_shipping = (item_price, shopping_cart_total) =>
  item_price + shopping_cart_total >= 20;

//액션
function update_shipping_icons(total) {
  var buy_buttons = get_buy_buttons_dom();
  for (var i = 0; i < buy_buttons.length; i++) {
    var button = buy_buttons[i];
    var item = button.item;
    if (item.price + shopping_cart_total >= 20)
      button.show_free_shopping_icon();
    else button.hide_free_shopping_icon();
  }
}

function update_tax_dom() {
  set_tax_dom(shopping_cart_total * 0.1);
}

test("add item ", () => {
  const new_cart = add_item_to_cart("car", 1000);
  expect(new_cart).toBe(1000);
});
