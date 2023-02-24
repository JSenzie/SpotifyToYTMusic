from spotipy.oauth2 import SpotifyClientCredentials
import spotipy
from ytmusicapi import YTMusic

class SpotifyPlaylistBot(spotipy.Spotify):
    def __init__(self, **kw):
        SPOTIPY_CLIENT_ID = kw['client_ID']
        SPOTIPY_CLIENT_SECRET = kw['client_secret']
        auth_manager=SpotifyClientCredentials(SPOTIPY_CLIENT_ID, SPOTIPY_CLIENT_SECRET)
        super().__init__(auth_manager=auth_manager)

    def fetchSongs(self, playlist_id):
        playlist = self.playlist_tracks(playlist_id=playlist_id, fields="items(track(artists(name),name))")
        name = self.user_playlist(user=None, playlist_id=playlist_id, fields="name")
        playlistFormatted = [f"{item['track']['artists'][0]['name']} {item['track']['name']}"for item in playlist['items']]
        return playlistFormatted, name['name']
        

class YTMusicBot(YTMusic):
    def __init__(self):
        self.id_list=[]
        super().__init__("headers_auth.json")

    def titlesToPlaylist(self, titles, name):
        for i in titles:
            try:
                yt_song= self.search(query=i, filter="songs")
                self.id_list.append(yt_song[0]['videoId'])
            except IndexError:
                pass

        response = self.create_playlist(title=name, description="This playlist was created with YTMusic Bot", video_ids=self.id_list)
        return response
