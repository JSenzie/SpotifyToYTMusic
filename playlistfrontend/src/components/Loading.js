import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSpinner } from "@fortawesome/free-solid-svg-icons"

const Loading = () => {
  return (
    <div className="loading">
      <h1>Loading...</h1>
      <FontAwesomeIcon icon={faSpinner} className={"fa-spin fa-2xl"} />
    </div>
  )
}

export default Loading
