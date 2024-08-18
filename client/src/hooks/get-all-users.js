import { useEffect, useState} from 'react';
import axios from 'axios';

const getAllUsers = () => {
    const [users, setUsers] = useState({});
    const [loadingUsers, setLoadingUsers] = useState(true);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const { data } = await axios.get('http://localhost:3000/user');
          setUsers(data);
        } catch (error) {
          console.error(error)
        }
        setLoadingUsers(false);
      };
  
      fetchData();
    }, []);
  
    return {
      users,
      loadingUsers,
    };
};

export default getAllUsers;