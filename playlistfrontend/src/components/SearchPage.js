import React, { useEffect } from "react"
import Loading from "./Loading"
import axios from "axios"
import { useImmerReducer } from "use-immer"

const SearchPage = () => {
  const initialState = {
    isLoading: false,
    isComplete: false,
    playlist: "",
    response: {},
    searching: 0,
  }

  function reducer(draft, action) {
    switch (action.type) {
      case "setLoading":
        draft.isLoading = action.data
        return
      case "setComplete":
        draft.isComplete = action.data
        return
      case "setPlaylist":
        draft.playlist = action.data
        return
      case "setResponse":
        draft.response = action.data
        return
      case "searching":
        draft.searching++
        return
    }
  }

  const [state, dispatch] = useImmerReducer(reducer, initialState)

  const startSearch = (e) => {
    e.preventDefault()
    dispatch({ type: "searching" })
  }

  const handleInput = (e) => {
    const value = e.target.value
    dispatch({ type: "setPlaylist", data: value })
  }

  useEffect(() => {
    if (state.searching !== 0) {
      const ourRequest = axios.CancelToken.source()
      let handleSubmit = async () => {
        dispatch({ type: "setLoading", data: true })
        let response = await axios.get("/createPlaylist/" + state.playlist).catch((error) => {
          dispatch({ type: "setResponse", data: "Error" })
          dispatch({ type: "setLoading", data: false })
          dispatch({ type: "setComplete", data: true })
          return () => ourRequest.cancel()
        })

        let data = ""
        if (response.data["Success"]) {
          data = "https://music.youtube.com/playlist?list=" + response.data["Success"]
        } else {
          data = "Error"
        }

        dispatch({ type: "setResponse", data: data })
        dispatch({ type: "setLoading", data: false })
        dispatch({ type: "setComplete", data: true })
      }
      handleSubmit()
      return () => ourRequest.cancel()
    }
  }, [state.searching])

  if (state.isLoading) return <Loading />

  return (
    <div className="main">
      <h1>Enter your playlist link below</h1>
      <form>
        <input onChange={(e) => handleInput(e)} />
        <button onClick={(e) => startSearch(e)}>Submit</button>
      </form>
      {state.isComplete && state.response !== "Error" ? (
        <>
          <h3>Your playlist link is below</h3>
          <a href={state.response}>{state.response}</a>
        </>
      ) : (
        ""
      )}
      {state.isComplete && state.response === "Error" ? <p className="error">There was an error processing your request, please make sure the URL enterred is correct</p> : ""}
    </div>
  )
}

export default SearchPage
