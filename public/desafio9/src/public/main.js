const socket = io();

const renderProducts = async (products)=>{
    const res = await fetch("./views/productsTemplate.ejs");
    const template = await res.text();
    const html = ejs.render(template, {products});
    document.getElementById("products").innerHTML = html;
}

const renderMessages = async (messages, compression)=>{
    const res = await fetch("./views/chatTemplate.ejs");
    const template = await res.text();
    const html = ejs.render(template, {messages, compression});
    document.getElementById("chatLog").innerHTML = html;
}

document.getElementById("productsForm")
.addEventListener("submit", (e)=>{
    e.preventDefault();
    const data = new FormData(e.target);
    let obj = {};
    data.forEach((value,key)=>obj[key]=value);
    socket.emit("client:newProduct", obj);
    e.target.reset();
})

document.getElementById("messageCenter")
.addEventListener("submit", (e)=>{
    e.preventDefault();
    const chatBox = e.target.querySelector("[name='message']");
    const emailInput = e.target.querySelector("[name='email']");
    if (chatBox.value.trim()){
        const message = chatBox.value;
        const email = emailInput.value;
        const obj = {
            author: {
                email: email
            },
            text: message
        }
        socket.emit("client:newMessage", obj);
        chatBox.value = "";
        chatBox.focus();
        emailInput.disabled = true;
    }
})

socket.on("server:products", (data)=>{
    renderProducts(data.products);
})

const authorSchema = new normalizr.schema.Entity("authorEntity", {}, {idAttribute: "email"});
const messageSchema = new normalizr.schema.Entity("messageEntity", {author: authorSchema}, {idAttribute: "_id"});
const messageArraySchema = new normalizr.schema.Entity("messageArrayEntity", {messages: [messageSchema]});

socket.on("server:messages", (noromalizedData)=>{

    const denormalizedData = normalizr.denormalize(noromalizedData.result, messageArraySchema, noromalizedData.entities);

    const compression = Math.round(100 - JSON.stringify(noromalizedData).length / JSON.stringify(denormalizedData).length * 100);

    renderMessages(denormalizedData.messages, compression);
})