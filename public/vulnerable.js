// /public/vulnerable.js

const form = document.querySelector('#update-email-form');
const baseUrl = document.currentScript
  .getAttribute('data-base-url')
  .replace('/view', '');

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  const email = document.querySelector('#email').value;

  const headers = new Headers();
  headers.append('Content-Type', 'application/json');

  const body = JSON.stringify({
    email,
  });

  try {
    const response = await fetch(`${baseUrl}/api/protected-update`, {
      method: 'POST',
      headers,
      body,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    const app = document.getElementById('app');
    app.innerHTML = `<code>${JSON.stringify(data)}</code>`;
  } catch (error) {
    const errorDiv = document.getElementById('error');
    errorDiv.textContent = error.message;
    console.error('Error:', error);
  }
});
