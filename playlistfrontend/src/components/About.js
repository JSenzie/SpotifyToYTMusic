import React from "react"

const About = () => {
  return (
    <div className="about">
      <h1>About Spotify to Youtube Music</h1>
      <p>Created by Joseph Sensback, 2022</p>
      <p>
        Spotify playlist parsing executed with <a href="https://spotipy.readthedocs.io/en/master/">Spotipy</a>
      </p>
      <p>
        Automated playlist creation handled by <a href="https://ytmusicapi.readthedocs.io/en/stable/index.html">YTMusicAPI</a>
      </p>
    </div>
  )
}

export default About
