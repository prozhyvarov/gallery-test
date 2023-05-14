// export default class NewService {
    
// }
import axios from 'axios';
const KEY = '36372332-a8dc7cfa4e54f609c2ebd7bae';
async function fetchImages(query, page, perPage) {
  const url = `https://pixabay.com/api/?key=${KEY}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${perPage}`;
    const response = await axios.get(url);
    // console.log(response.data.hits[0].views)
  return response;
}
export { fetchImages };
// fetchImages('apple', 1, 40)
