import { useEffect, useState} from 'react';
import axios from 'axios';

const getAllUsers = () => {
    const [users, setUsers] = useState({});
    const [loadingUsers, setLoadingUsers] = useState(true);
    const [invalidatedData, setInvalidatedData] = useState(true);
    const refreshUsers = () => setInvalidatedData(true);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const { data } = await axios.get('http://localhost:3000/user');
          setUsers(data);
        } catch (error) {
          console.error(error)
        }
        setLoadingUsers(false);
        setInvalidatedData(false);
      };
  
      fetchData();
    }, [invalidatedData]);

    return {
      users,
      loadingUsers,
      refreshUsers
    };
};

export default getAllUsers;