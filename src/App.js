import Modal from "./components/Modal"
import data from "./data"
import { useState, useReducer } from "react"

// state = defaultState, action = dispatch({ type: "ADD_MOVIE"})
const reducer = (state, action) => {
    console.log(state, action)

    // here we modify the state
    if (action.type === "ADD_MOVIE") {
        const newMovies = [...state.movies, action.payload]

        return {
            ...state,
            movies: newMovies,
            showNotification: true,
            notificationContent: "Movie added"
        }
    }

    if (action.type === "NO_MOVIE_NAME") {
        return {
            ...state,
            showNotification: true,
            notificationContent: "No movie added"
        }
    }

    if (action.type === "CLOSE_NOTIFICATION") {
        return {
            ...state,
            showNotification: false
        }
    }

    if (action.type === "REMOVE_MOVIE") {
        const filteredMovies = state.movies.filter((movie) => {
            return movie.id !== action.payload
        })

        return {
            ...state,
            movies: filteredMovies,
        }
    }

    

    return new Error("No matching action type")
    //return state
}

// dafault state is added to state var
const defaultState = {
    movies: [],
    showNotification: false,
    notificationContent: ""
}

const App = () => {
    const [movieName, setMovieName] = useState("")
    const [state, dispatch] = useReducer(reducer, defaultState)

    const submitForm = (event) => {
        event.preventDefault()
        if (movieName) {
            const newMovie = { id: new Date().getTime(), name: movieName }
            dispatch( { type: "ADD_MOVIE", payload: newMovie} )
        } else {
            dispatch( { type: "NO_MOVIE_NAME" } )
        }

        setMovieName("")
    }

    const closeNotification = () => {
        dispatch( { type: "CLOSE_NOTIFICATION" })
    }

  return <section>
    {state.showNotification && <Modal notifContent={state.notificationContent} closeNotif={
        closeNotification
    } />}
    <form onSubmit={submitForm}>
        <input type="text" value={movieName} onChange={(event) => setMovieName(event.target.value) }/>
        <input type="submit" value="Submit" />
    </form>
    <div>
        {
            state.movies.map((movie) => {
                return <div key={movie.id}>
                    <p>{movie.name}</p>
                    <button type="button" onClick={ () => dispatch( {type: 
                    "REMOVE_MOVIE", payload: movie.id} ) }>Delete</button>
                </div>
            })
        }
    </div>
  </section>
}

export default App