from rest_framework.decorators import api_view
from rest_framework.response import Response
from . import utils
from rest_framework import status
from spotipy.client import SpotifyException
import os

# SECRET
CLIENT_ID = os.getenv('CLIENT_ID')
CLIENT_SECRET = os.getenv('CLIENT_SECRET')

@api_view(["GET"])
def index(request):
    return Response({"HALT": "Pay the court a fine or serve your sentence"})


@api_view(["GET"])
def spotifyToYTMusic(request, full_playlist):
    playlistBot = utils.SpotifyPlaylistBot(client_ID=CLIENT_ID, client_secret=CLIENT_SECRET)

    # Parses the playlist enterred 
    if "?" in full_playlist:
        playlist = full_playlist.split("?")[0]
    elif "playlist/" in full_playlist:
        playlist = full_playlist.split("playlist/")[1]
    else:
        playlist = full_playlist

    # Gets the playlist name, and song title + artist per song in provided playlist
    try:
        response, name = playlistBot.fetchSongs(playlist)
    except SpotifyException: 
        return Response(status=status.HTTP_404_NOT_FOUND)
        
    # Creates YTMusic playlist from provided song data
    ytmusicbot = utils.YTMusicBot()
    playlist_complete = ytmusicbot.titlesToPlaylist(titles=response, name=name)

    # Sends the slug for the YTMusic playlist to frontend
    if playlist_complete:
        return Response({"Success": playlist_complete})
    else: 
        return Response(status=status.HTTP_404_NOT_FOUND)
