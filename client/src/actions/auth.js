// function signup(userData) {
//     return (dispatch) => {
//         fetch('/users', {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json', Accept: 'application/json'},
//             body: JSON.stringify(userData)
//         })
//         .then(res => {
//             if (res.ok) {
//                 res.json().then(data => {
//                     dispatch({
//                         type: 'SIGN_UP',
//                         payload: data
//                     })
//                 })
//             }
//         })
//     }
    
// }

// function login(userData) {
//     return (dispatch) => {
//         fetch('/login', {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json', Accept: 'application/json'},
//             body: JSON.stringify(userData)
//         })
//         .then(res => {
//           if (res.ok) {
//             res.json().then(data => {
//               dispatch({
//                   type: 'LOG_IN',
//                   payload: data
//               })
//             })
//           }
//         })
//     }
// }

function logout() {
    return (dispatch) => {
        fetch('/logout', {
            method: 'DELETE',
          })
          .then(res => {
            if (res.ok) {
              res.json().then(data => {
                dispatch({
                    type: 'LOG_OUT',
                    payload: data
                })
              })
            }
          })
    }

}