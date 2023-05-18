async function getCartProducts() {
    const token = localStorage.getItem('access_token');
    const profileContainer = document.getElementById("profile");

    const dataUser = await fetch('/api/users/data', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    const userData = await dataUser.json();
    console.log(userData)
    const { cartId } = userData.data;
    console.log(cartId);
    const { fullName } = userData.data
    console.log(fullName)

    console.log(token)
    try {
        const response = await fetch(`/api/carts/${cartId}/products`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        const data = await response.json();
        console.log("soy data", data)
        console.log("length", data.data.length)
        
        const saludo = document.getElementById('saludo');
        saludo.innerHTML = `<h2 style="color: white; font-weight: 400; display: flex; justify-content: center; padding-top: 50px; font-size: xxx-large;">Bienvenida ${fullName}</h2>
        <img style="width: 8%; min-width: 100px; margin-left: 46.5%;
        margin-top: 1%;" src="/assets/img/logo.png" alt="YOU NEED SUSHI">`

      

        if (data.data.length >= 1) {
            const products = data.data;

            const carritoContainer = document.getElementById('carrito-container');
            carritoContainer.innerHTML = `
              <h2 style="color: white; display: flex; justify-content: center; margin-top: 3%;">Tu Carrito</h2>
                ${products.map(product => `
                <table class="table table-dark">
                <thead>
                <tr>
                <th scope="col" style="color: #f9c05b;">#</th>
                <th scope="col" style="color: #f9c05b;">Stock</th>
                <th scope="col" style="color: #f9c05b;">Title</th>
                <th scope="col" style="color: #f9c05b;">Price</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <th scope="row" style="color: #f9c05b;">1</th>
                     <td style="color: #f9c05b;">${product.product.title}</td>
                     <td style="color: #f9c05b;">${product.product.stock}</td>
                     <td style="color: #f9c05b;">${product.product.price}</td>
                 </tr>
                 </tbody>`)}   <button id="logoutBtn" type="button" class="btn btn-danger btn-sm" style=" margin-left: 47.7%;
                 margin-top: -35%;">Logout</button>`
                     }


        else {
            const carritoContainer = document.getElementById('carrito-container');
            carritoContainer.innerHTML = `
        <h2 style="color: white; display: flex;
        justify-content: center; margin-top: 10%;">Carrito Vacio</h2>
        <button type="button" class="btn btn-primary btn-sm" style="margin-left: 48.5%;
        margin-top: 5%;">Store</button>
        <button id="logoutBtn" type="button" class="btn btn-danger btn-sm" style="margin-left: 48.3%;
        margin-top: 1%;">Logout</button>`
        }

        let btn = document.getElementById('logoutBtn')
        btn.addEventListener('click', evt => {
            evt.preventDefault()
            localStorage.removeItem('access_token')
            Swal.fire({
                title: `Hasta Pronto ${fullName}!`,
                icon: 'success',
                showCancelButton: false,
                confirmButtonText: 'OK',
                willClose: () => {
                    location.href = '../'
                }
            })
        })

    } catch (error) {
        console.error(error);
    }
}
getCartProducts()