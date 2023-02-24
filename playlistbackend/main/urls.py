from django.urls import path
from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("createPlaylist/<path:full_playlist>", views.spotifyToYTMusic, name="S2Y"),
]