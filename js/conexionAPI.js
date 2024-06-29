async function listarProductos() {
    const conexion = await fetch("https://fake-api-json.vercel.app/productos");

    const conexionConvertida = conexion.json();
    // console.log(conexionConvertida);
    return conexionConvertida;
}
export const conexionAPI = {
    listarProductos
}


