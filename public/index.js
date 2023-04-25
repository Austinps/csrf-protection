const form = document.querySelector('form');
const baseUrl = document.currentScript.getAttribute('data-base-url');

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  const username = document.querySelector('#username').value;
  const password = document.querySelector('#password').value;

  const response = await fetch(`${baseUrl}/csrf-token`);
  const { token } = await response.json();
  console.log('the token', token);

  // The csrf cookie is set on the request by the server
  const post = await fetch(`${baseUrl}/protected_endpoint`, {
    method: 'POST',
    headers: {
      'x-csrf-token': token,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username,
      password,
    }),
  });

  const app = document.getElementById('app');
  const data = JSON.stringify(await post.json());
  app.innerHTML = `<code>${data}</code>`;
});
