
import React, { useState, useEffect } from "react";

const SearchComponent = () => {
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState("");

    // Función para traer los datos de la API
    const fetchData = async () => {
        const URL = 'http://159.223.196.104:8000/fhir/Patient';
        try {
            const response = await fetch(URL);
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
            const data = await response.json();
            setUsers(data.entry || []); // Actualiza el estado con los datos de pacientes si existen
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    // Función de búsqueda
    const searcher = (e) => {
        setSearch(e.target.value);
        console.log(e.target.value);
    };

    // Efecto para cargar datos al montar el componente
    useEffect(() => {
        fetchData();
    }, []); // El array vacío asegura que se ejecute solo una vez al montar el componente

    // Método de filtrado
    //const results = !search
      //  ? users
        //: users.filter((dato) =>
             //dato.resource.name[0].given.join(" ").toLowerCase().includes(search.toLowerCase()) ||
           //  dato.resource.name[0].family.toLowerCase().includes(search.toLowerCase())
        // );
    // metodo de filtrado -2
    const results = !search ? users : users.filter((dato) => dato.resource.name[0].given.join(" ").toLowerCase().includes(search.toLowerCase()));


    return (
        <div>
            <input value={search} onChange={searcher} type="text" placeholder="Busqueda" className="form-control" />
            <h1>Patient List</h1>
            <table className='table table-striped table-hover mt-5 shadow-lg'>
                <thead>
                    <tr className="bg-curso text-white">
                        <th>NOMBRE</th>
                        <th>APELLIDO</th>
                        <th>EDAD</th>
                    </tr>
                </thead>
                <tbody>
                    {results.map((user, index) => (
                        <tr key={index}>
                            <td>{user.resource.name[0].given.join(" ")}</td>
                            <td>{user.resource.name[0].family}</td>
                            <td>{calculateAge(user.resource.birthDate)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

// Función para calcular la edad a partir de la fecha de nacimiento
const calculateAge = (birthDate) => {
    const today = new Date();
    const dob = new Date(birthDate);
    let age = today.getFullYear() - dob.getFullYear();
    const monthDiff = today.getMonth() - dob.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
        age--;
    }
    return age;
};

export default SearchComponent;
