async function listarProductos() {
    const conexion = await fetch("https://my-json-server.typicode.com/FraNkoRasia/fake-json/productos");

    const conexionConvertida = conexion.json();
    // console.log(conexionConvertida);
    return conexionConvertida;
}
export const conexionAPI = {
    listarProductos
}


