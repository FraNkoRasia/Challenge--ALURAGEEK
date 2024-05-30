async function listarProductos() {
     const response = await fetch('https://raw.githubusercontent.com/FraNkoRasia/Challenge--ALURAGEEK/main/productos.json');

    const conexionConvertida = conexion.json();
    // console.log(conexionConvertida);
    return conexionConvertida;
}
export const conexionAPI = {
    listarProductos
}


