const formLogin = document.getElementById("login-form");
formLogin.addEventListener('submit', async (event) => {
  event.preventDefault();
  const email = formLogin[0].value;
  const password = formLogin[1].value;

  const loginResponse = await fetch('/api/auth/login', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  });

  const response = await loginResponse.json();
  const { token } = response.data;
  console.log("token", token)
  console.log("response.data", response.data)
  if (token) {
    localStorage.setItem('access_token', token);
    location.href = "/api/profile";
  } else {
    location.href = "/unauthorized"
  }
})