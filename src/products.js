//creates a variable that stores the API URL for the backend server
const API_URL = "http://localhost:4000" || 'my-shop/db.json'

//create a resusable  that sends requests to the backend server and returns the response data
async function request(path, options = {}) {

    //send request to the server
    const response = await fetch(`${API_URL}${path}`, {
        ...options,

        //tell server we are working with Json data
        headers: {
            "Content-Type": "application/json",
            ...options.headers,
        },
    });
    //check if the server returns an error(or retun json data if the request is successful)
    if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
    }
    return response.json();
}

//get all products from the backend server
export async function getProducts() {
    return request("/products");
}

//get a single product by its ID from the backend server
export async function getProduct(id) {
    return request(`/products/${id}`);
}
//create/add a new product on the backend server
export async function createProduct(product) {
    return request("/products", {
        method: "POST",
        //convert the product object to a JSON string and send it in the request body
        body: JSON.stringify(product),
    });
}
//edit/update an existing product on the backend server
export async function updateProduct(id, changes) {
    return request(`/products/${id}`, {
        method: "PATCH",
        //convert the product object to a JSON string and send it in the request body
        body: JSON.stringify(changes),
    });
}
//delete a product from the backend server
export async function deleteProduct(id) {
    return request(`/products/${id}`, {
        method: "DELETE",
    });
}

