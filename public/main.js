
const socket = io()

const prodForm = document.getElementById("productsForm")
const nameInput = document.getElementById("nombre");
const priceInput = document.getElementById("precio");
const imageInput = document.getElementById("imagen");
const table = document.getElementById("products");

prodForm.addEventListener("submit", (event) =>{
    event.preventDefault();
    const title = nameInput.value
    const price = priceInput.value
    const image = imageInput.value
    const newProduct = {
        title, price, image
    }   

    socket.emit("newProduct", newProduct)
    nameInput.value ="";
    priceInput.value ="";
    imageInput.value ="";    
})

socket.on('products', (products) => {
    console.log(products);
    
     fetch('products.hbs')
        .then((data) =>data.text())
        .then((serverTemplate) =>{
            const template = Handlebars.compile(serverTemplate);
            const html = template({products});
            table.innerHTML = html;
        })  
});

//Chat

//CHAT
const formChat = document.getElementById("form-chat");
const inputEmail = document.getElementById("username");
const inputText = document.getElementById("text");

formChat.addEventListener("submit", (e) => {
    e.preventDefault();
    const user = inputEmail.value;
    const message = inputText.value;
    socket.emit("new-message", {message, user});
    inputEmail.value = user;
    inputText.value = "";
  });


  socket.on("chat-message", (data) => {
    const user = data.email;
    const message = data.text;
    document.getElementById("chat").innerHTML += `<p style="padding-top: 0.3rem"><b><span style="color: orange">${user} - </b></span> 
    <span style="color: black">[${data.time}]:</span> 
    <span style="color:gray"><i>${message}</i></span></p>`;
  });
  
  socket.on("messages", (data) => {
    const html = data.map((user) => {
      let render = `
      <p style="padding-top: 0.5rem"><b><span style="color: blue">${user.email}</b></span> 
      <span style="color: white">[${user.date}]:</span> 
      <span style="color: red"><i>${user.message}</i></span></p>
      `;
      return render;
      })
      .join("\n");
    document.getElementById("chat").innerHTML = html;
    console.log(data)
  });
