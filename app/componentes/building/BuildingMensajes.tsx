import React, { useState, useEffect } from "react";
import { UsuarioType } from "@/app/models/usuarios";
import { getUsuarioList } from "@/app/services/users";
import Cookies from 'js-cookie';



interface Props {

}

const BuildingMensajes: React.FC<Props> = ({  }) => {
  const [selectedUser, setSelectedUser] = useState<number | null>(null);
  const [messageText, setMessageText] = useState<string>("");
  const [usuarios, setUsuarios] = useState<UsuarioType[] | null>(null);
  const userId = Cookies.get('userId');

  useEffect(() => {
    async function fetchUsuarios() {
      const users = await getUsuarioList();
      setUsuarios(users);
    }
    fetchUsuarios();
  }, []);

  // const handleSendMessage = () => {
  //   if (selectedUser !== null) {
  //     const currentDate = new Date(); // Obtener la fecha y hora actual
  
  //     console.log('ID de usuario:', userId);
  //     console.log("Mensaje enviado al usuario con ID:", selectedUser);
  //     console.log("Texto:", messageText);
  //     console.log("Fecha y hora de envío:", currentDate); // Mostrar la fecha y hora en la consola
  //   } else {
  //     console.log("No se ha seleccionado ningún usuario.");
  //   }
  // };

  const handleSendMessage = async () => {
    if (selectedUser !== null) {
      const currentDate = new Date(); // Obtener la fecha y hora actual
  
      try {
        // Construir el cuerpo de la solicitud POST
        const requestBody = {
          id_sender: userId,
          id_reciever: selectedUser,
          text: messageText,
          date: currentDate
        };
  
        // Hacer la solicitud POST al servidor
        const response = await fetch('../../api/users/messages', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestBody)
        });
  
        if (!response.ok) {
          throw new Error('Error al enviar el mensaje');
        }
  
        console.log('Mensaje enviado con éxito');
  
      } catch (error) {
        console.error('Error al enviar el mensaje:', error);
      }
    } else {
      console.log("No se ha seleccionado ningún usuario.");
    }
  };

  const handleUserClick = (userId: number) => {
    setSelectedUser(userId);
    console.log("Usuario seleccionado:", userId);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Mensajes</h1>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Seleccionar Usuario:</label>
        <div className="grid grid-cols-3 gap-4">
          {usuarios && usuarios.map((usuario) => (
            <div
              key={usuario.id}
              onClick={() => handleUserClick(usuario.id)}
              className={`p-2 border border-gray-300 rounded-md cursor-pointer hover:bg-gray-100`}
            >
              {usuario.username}
            </div>
          ))}
        </div>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Texto del Mensaje:</label>
        <textarea
          value={messageText}
          onChange={(e) => setMessageText(e.target.value)}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md text-black"
        />
      </div>
      <button
        onClick={handleSendMessage}
        className="px-4 py-2 bg-blue-600 text-white rounded-md"
      >
        Enviar Mensaje
      </button>
    </div>
  );
};

export default BuildingMensajes;