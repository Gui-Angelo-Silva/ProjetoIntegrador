import { useState, useEffect } from 'react';
import * as functions from '../../functions/functions';

export const useUserDetails = (userId) => {
  const [user, setUser] = useState(null);
  const [type, setType] = useState(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      if (!userId) return;

      try {
        const userData = await functions.GetUser(userId);
        setUser(userData);

        if (userData?.idTipoUsuario) {
          const userTypeData = await functions.GetTypeUser(userData.idTipoUsuario);
          setType(userTypeData);
        }
      } catch (error) {
        console.error("Erro ao buscar os detalhes do usuário:", error);
      }
    };

    fetchUserDetails();
  }, [userId]);

  return { user, type };
};
