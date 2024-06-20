async function listarProductos() {
    const conexion = await fetch("https://fake-api-sage-pi.vercel.app/productos");

    const conexionConvertida = conexion.json();
    // console.log(conexionConvertida);
    return conexionConvertida;
}
export const conexionAPI = {
    listarProductos
}


