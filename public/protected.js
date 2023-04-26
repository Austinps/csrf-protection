const form = document.querySelector('#update-email-form');
const baseUrl = document.currentScript.getAttribute('data-base-url');
const csrfToken = document.querySelector('input[name="_csrf"]').value;

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  const email = document.querySelector('#email').value;

  const headers = new Headers();
  headers.append('x-csrf-token', csrfToken);
  headers.append('Content-Type', 'application/json');

  const body = JSON.stringify({
    email,
  });

  const post = await fetch(`${baseUrl}/update-email`, {
    method: 'POST',
    headers,
    body,
  });

  const app = document.getElementById('app');
  const data = JSON.stringify(await post.json());
  app.innerHTML = `<code>${data}</code>`;
});
