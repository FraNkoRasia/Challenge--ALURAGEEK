async function listarProductos() {
    const conexion = await fetch("https://challenge-alurageek-eta.vercel.app/productos");

    const conexionConvertida = conexion.json();
    // console.log(conexionConvertida);
    return conexionConvertida;
}
export const conexionAPI = {
    listarProductos
}


