import Login from './Login'
export default function Home({user, handleLogIn, handleLogOut}) {
    
    if (user) return(
        <>
            <div>Home</div>
            <button onClick={handleLogOut}>Log Out</button>
        </>
    )

    return <Login handleLogIn={handleLogIn}/>
}