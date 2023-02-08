import express from "express";
import { Server as IOServer }  from "socket.io";
import __dirname from "./utils.js";
import productsManager from "./services/productsManager.js";
import messagesManager from "./services/messagesManager.js";
import { faker } from '@faker-js/faker';
import { normalize, schema } from "normalizr";
import session from "express-session";
import mongoStore from "connect-mongo";

faker.locale = "es";

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(express.static(__dirname+"/public"));

const PORT = process.env.PORT || 8080;
const serverExpress = app.listen(PORT, (err)=> err ? console.log(`Error en el server: ${err}`) : console.log(`Server listening on PORT: ${PORT}`));
const io = new IOServer(serverExpress);

app.set("views", __dirname + "/views");
app.set("view engine", ".ejs");

const mongoOptions = {useNewUrlParser: true, useUnifiedTopology: true};
app.use(session({
    store: mongoStore.create({mongoUrl: "mongodb+srv://mayricca5:mavica2105@ecommerce.68btp7z.mongodb.net/ecommerce?retryWrites=true&w=majority", mongoOptions}),
    secret: "secretox",
    resave: false,
    saveUninitialized: false,
    rolling: true,
    cookie:{
        maxAge: 600000
    }
}));

const authMiddleware = (req, res, next)=>{
    if (!req.session?.user) return res.redirect("/login");
    next();
};

app.get("/", authMiddleware, (req, res)=>{
    res.render("index.ejs", {name: req.session.user})
});

app.get("/login", (req, res)=>{
    if (req.session?.user) return res.redirect("/");
    res.sendFile(__dirname + "/views/login.html");
});

app.post("/login", (req, res)=>{
    const user = req.body.name;
    req.session.user = user;
    res.redirect("/");
});

app.get("/logout", (req, res)=>{
    if (req.session?.user){
        const name = req.session?.user;
        req.session.destroy();
        return res.render("logout.ejs", {name})
    };

    res.redirect("/login");
});

app.use("/api/productos-test", (req, res)=>{
    const products = [];
    for (let index = 0; index < 5; index++) {
        const obj = {};
        obj.id = products[products.length-1]?.id + 1 || 1;
        obj.title = faker.commerce.productName();
        obj.price = faker.commerce.price(100);
        obj.thumbnail = faker.image.fashion(400,400, true);
        products.push(obj);
    }
    res.status(404).render("productsTemplate.ejs", {products});
})

const authorSchema = new schema.Entity("authorEntity", {}, {idAttribute: "email"});
const messageSchema = new schema.Entity("messageEntity", {author: authorSchema}, {idAttribute: "_id"});
const messageArraySchema = new schema.Entity("messageArrayEntity", {messages: [messageSchema]});

const getNormalizedMessages = async ()=>{

    const messages = await messagesManager.getMessages();
   
    const messages2 = JSON.parse(JSON.stringify(messages));
    
    const normalizedData = normalize({id: "messagesArrayId", messages: messages2}, messageArraySchema);
    return normalizedData;
}

io.on("connection", async (socket) => {
    console.log(`Socket ID: ${socket.id} connected`);

    const products = await productsManager.getAll();
    socket.emit("server:products", products);
    socket.on("client:newProduct", async (data) => {
        data.price = Number(data.price);
        await productsManager.add(data);
        const products = await productsManager.getAll();
        io.emit("server:products", products);
    })

    const messagesLog  = await getNormalizedMessages();
    socket.emit("server:messages", messagesLog);
    socket.on("client:newMessage", async (data) => {
        await messagesManager.addMessage(data);
        const messagesLog  = await getNormalizedMessages();
        io.emit("server:messages", messagesLog);
    })
})
