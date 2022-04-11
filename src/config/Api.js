const Api = (type, url) => {
  if (type == 'POST') {
    return fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }
    })
    .then((response) => response.json())
    .then(res => {
      if(res){
          return res?.results
      }
    })
    .catch((error)=>{
      console.log(error)
    })
  }
};

export default Api;
