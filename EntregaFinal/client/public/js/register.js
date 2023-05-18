const formRegister = document.getElementById("signup-form");
formRegister.addEventListener('submit', async (event) => {
  event.preventDefault();
  const fullName = formRegister[0].value;
  const email = formRegister[1].value;
  const password = formRegister[2].value;
  const phone = formRegister[3].value

  const registerResponse = await fetch('/api/auth/register', {
    method: "POST",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ fullName, email, password, phone })
  });

  const response = await registerResponse.json();
  console.log(response)


  const { token } = response.data;
  console.log("token", token)
  console.log("response.data", response.data)
  if (token) {
    localStorage.setItem('access_token', token);
    location.href = "/api/profile";
  } else {
    location.href = "/unauthorized"
  }
});