import axios from "axios";
import { user } from "../Authentication/user";


export const FetchSavedPosts = async () => {
  const userId = user.id
  try {
    const response = await axios.get(`http://localhost:8081/get-saved-posts/${userId}`);
    const data = response.data;
    const savedPosts = data.savedPosts;
    return savedPosts;
  } catch (error) {
    console.error('Error while fetching saved posts in SavedPosts.jsx :', error)
    return [];
  }
}

/*export const FetchSavedPosts = () => {
  const [savedPosts, setSavedPosts] = useState([]);
  const userId = user.id;
  
  useEffect(() => {
    const getSavedPosts = async () => {
      try {
        const response = await axios.get(`http://localhost:8081/get-saved-posts/${userId}`);
        const data = response.data;
        setSavedPosts(data);
      } catch (error) {
        console.error('Error while fetchin saved posts in SavedPosts.jsx :', error)
      }
    }
    getSavedPosts();
  }, [])

  return savedPosts;
  
} */