const myHeaders = new Headers();
myHeaders.append('Content-Type', 'application/json');
myHeaders.append(
  'Authorization',
  'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2Nzc1NzM1NjFiMzRhYjAwNGVkOTgyN2UiLCJ0eXBlIjoiVXNlciIsImlhdCI6MTczNjcwMTM0MCwiZXhwIjoxNzQ0NDc3MzQwfQ.bVaKX6xe8hrPTcbmyVSQx7t6xI_qVWV0-IHs63SzIt8',
);

const raw = JSON.stringify({
  type: 'Pickup',
  address: '1234 Elm Street, Springfield',
  latitude: 37.7749,
  longitude: -122.4194,
  addressType: 'Residential',
  floor: '3rd Floor',
  landmark: 'Near Central Park',
});

const requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow',
};
console.log(myHeaders);

fetch('http://taxi-5.onrender.com/api/app/user/add-address', requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.error(error));
