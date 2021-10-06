window.addEventListener('DOMContentLoaded', () => {
  console.log(1);
});

const printXfunc = () => {
  console.log('X');
};

const createPost = () => {
  fetch('/', {
    method: 'GET'
  })
  .then(response => {
    console.log(response);
    return response.json();
  })
  .then((response) => response.text())
      .then((data) => console.log(data));
};
