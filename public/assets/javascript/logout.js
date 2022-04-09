function logout(event) {
  event.preventDefault();
    fetch('/api/users/logout', {
      
      method: 'post',
      headers: { 'Content-Type': 'application/json' }
    })
    .then((response) => {
    if (response.ok) {
      document.location.replace('/');
    } else {
      alert(response.statusText);
    }
  })
  .catch(console.error);
};

  document.querySelector('#logout').addEventListener('click', logout);
  