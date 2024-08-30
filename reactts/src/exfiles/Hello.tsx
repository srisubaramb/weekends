import React from "react";
function Hello() {
    let [LoggedIn, Logs] = React.useState(false)
    const handle = () => {
        Logs(LoggedIn = true)
        LoggedIn ? console.log('LoggedIn') : console.log('LoggedOut')
    }
    return (

        <>
            <button onClick={() => handle()}>click to log</button>
            {LoggedIn ? <h3>Login sucessfully</h3> : <h3>Loged out</h3>}
        </>
    )
}
export default Hello;