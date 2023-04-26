const form = document.querySelector('form');
const baseUrl = document.currentScript.getAttribute('data-base-url');

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  const email = document.querySelector('#email').value;

  const post = await fetch(`${baseUrl}/update-email`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
    }),
  });

  const app = document.getElementById('app');
  const data = JSON.stringify(await post.json());
  app.innerHTML = `<code>${data}</code>`;
});
