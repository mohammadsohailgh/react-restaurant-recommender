const restaurants = require('./food_categories.json')

cuisine = "0000"
restaurant_ID = "restaurant_1_ID"
category = "00"
food_item = "000000"

getRestaurantItem = restaurants[cuisine][restaurant_ID][category][food_item]

// for (const i = 0; i < restaurants.length; i++) {
//     console.log(restaurants[i])
// }

// var count = Object.keys(restaurants).length;
// console.log(count)

// console.log(getRestaurantItem)
console.log(restaurants["0001"]["restaurant_1_ID"])






















// restaurants.map((restaurant) => (
//     // <OrderItem key={order._id} order={order} />
//     console.log(restaurant)
//   ))



// pass a function to map
// const array1 = [1, 4, 9, 16];
// const map1 = array1.map(x => x * 2);

// console.log(map1);
// // expected output: Array [2, 8, 18, 32]
// // const rest = restaurants.map(x => x * 2);
// restaurants1 = [restaurants]
// const map2 = restaurants1.map(x => x.);

// console.log(map2)