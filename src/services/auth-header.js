export default function authHeader() {
  const user = JSON.parse(localStorage.getItem("user"));

  if (user && user.access) {
    
    // for Django back-end
    return { "Authorization": 'Bearer '+user.access };
  } else {
    return {};
  }
}
