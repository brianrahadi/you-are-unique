import { useEffect, useState} from 'react';
import axios from 'axios';

const postData = (data) => {
    const [success, setSuccess] = useState(false);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          await axios.post('http://localhost:3000/', {
            data,
        });
        } catch (error) {
          console.error(error)
        }
        setSuccess(true);
      };
  
      fetchData();
    }, []);
  
    return {
      success
    };
};

export default postData;