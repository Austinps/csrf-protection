// Don't forget to change the port if the server uses another one.

const backup_url = 'http://127.0.0.1:3000';
const form = document.querySelector('form');

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  const username = document.querySelector('#username').value;
  const password = document.querySelector('#password').value;

  const response = await fetch(
    `${process.env.BASE_URL || backup_url}/csrf-token`
  );
  const { token } = await response.json();
  console.log('the token', token);

  // The csrf cookie is set on the request by the server
  const post = await fetch(
    `${process.env.BASE_URL || backup_url}/protected_endpoint`,
    {
      method: 'POST',
      headers: {
        'x-csrf-token': token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        password,
      }),
    }
  );

  const app = document.getElementById('app');
  const data = JSON.stringify(await post.json());
  app.innerHTML = `<code>${data}</code>`;
});
