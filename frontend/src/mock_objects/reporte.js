const nombres = ["Kevin", "Maria", "Juan", "Ana", "Carlos", "Lucia", "Pedro", "Sofia", "Jorge", "Laura", "Diego", "Elena", "Luis", "Paula", "Miguel", "Raquel", "Oscar", "Carmen", "Sergio", "Marta", "Jhon", "Simon", "Dayeza", "Ricardo", "Erwin"];
const apellidos = ["Huayllas", "Gomez", "Martinez", "Lopez", "Fernandez", "Rodriguez", "Perez", "Garcia", "Sanchez", "Diaz", "Hernandez", "Ramirez", "Morales", "Castro", "Vargas", "Ortiz", "Gutierrez", "Reyes", "Mendoza", "Navarro", "Abasto", "Merudia", "Perez", "Rojas"];

const generateValues = () => {
    const data = Array.from({ length: 30 }, (_, index) => ({
        id: index + 1,
        nombre: nombres[Math.floor(Math.random() * nombres.length)],
        apellidos: apellidos[Math.floor(Math.random() * apellidos.length)],
        autoevaluacion: Math.floor(Math.random() * 101), // Valor entre 0 y 100
        cruzada: Math.floor(Math.random() * 101),        // Valor entre 0 y 100
        pares: Math.floor(Math.random() * 101),           // Valor entre 0 y 100
        planificacion: Math.floor(Math.random() * 101)    // Valor entre 0 y 100
    }));
    return {data}
}

export {generateValues}


