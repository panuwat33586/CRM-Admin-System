export default function({redirect}){
    const loggedIn= JSON.parse(localStorage.getItem('adminInfo'))
    if(!loggedIn){
      return redirect('/')
    }
}
