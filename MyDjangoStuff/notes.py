# import requests
# import json
# import base64
# import datetime
# from urllib.parse import urlencode
#
# client_id = 'f2257f5af3144e4a8475a5db04b0e451'
# client_secret = '45a3f8adf6a14f8d8a8c7285ff70e4ef'
#
#
#
#
#
# class SpotifyAPI(object):
#     access_token = None
#     access_token_expires = datetime.datetime.now()
#     access_token_did_expire = True
#     client_id = None
#     client_secret = None
#     token_url = "https://accounts.spotify.com/api/token"
#
#     def __init__(self, client_id, client_secret, *args, **kwargs):
#         super().__init__(*args, **kwargs)
#         self.client_id = client_id
#         self.client_secret = client_secret
#
#     def get_client_credentials(self):
#         """
#         Returns a base64 encoded string
#         """
#         client_id = self.client_id
#         client_secret = self.client_secret
#         if client_secret == None or client_id == None:
#             raise Exception("You must set client_id and client_secret")
#         client_creds = f"{client_id}:{client_secret}"
#         client_creds_b64 = base64.b64encode(client_creds.encode())
#         return client_creds_b64.decode()
#
#     def get_token_headers(self):
#         client_creds_b64 = self.get_client_credentials()
#         return {
#             "Authorization": f"Basic {client_creds_b64}"
#         }
#
#     def get_token_data(self):
#         return {
#             "grant_type": "client_credentials"
#         }
#
#     def perform_auth(self):
#         token_url = self.token_url
#         token_data = self.get_token_data()
#         token_headers = self.get_token_headers()
#         r = requests.post(token_url, data=token_data, headers=token_headers)
#         if r.status_code not in range(200, 299):
#             return False
#         data = r.json()
#         now = datetime.datetime.now()
#         access_token = data['access_token']
#         expires_in = data['expires_in'] # seconds
#         expires = now + datetime.timedelta(seconds=expires_in)
#         self.access_token = access_token
#         self.access_token_expires = expires
#         self.access_token_did_expire = expires < now
#         return self.access_token
#
#
#
#
#
#
#
#
# s = SpotifyAPI(client_id, client_secret)
# spotify_token = 'BQAriLUhoYKSdnthfII2SiBVheGa7B02RudJs4np33GEreNIKgUO6fsI-x4JM2kCF5LfXIymDxe7Z9WkCcIDu82VIZG8CYLHcAVm51cHfFhJOUAff9AfdrdhG90268zqU90wlzLe1P9QBB53JndPSRx5toHJ36jc9G_LvnPVulGtj-xqPb5vm9Yp4m2Qd6UuO3YeZcz3_4m2II0h4-u33K-5azPM'
# access_token =  'BQAriLUhoYKSdnthfII2SiBVheGa7B02RudJs4np33GEreNIKgUO6fsI-x4JM2kCF5LfXIymDxe7Z9WkCcIDu82VIZG8CYLHcAVm51cHfFhJOUAff9AfdrdhG90268zqU90wlzLe1P9QBB53JndPSRx5toHJ36jc9G_LvnPVulGtj-xqPb5vm9Yp4m2Qd6UuO3YeZcz3_4m2II0h4-u33K-5azPM'
# headers = {
#     "Authorization": f"Bearer {access_token}"
# }
# endpoint = "https://api.spotify.com/v1/search"
# data = urlencode({"q": "beethoven", "type": "track"})
# print(data)
#
# lookup_url = f"{endpoint}?{data}"
# r = requests.get(lookup_url, headers=headers)
# print(r.status_code)
# print(r.json())
# i = r.json()
# uri = i                                                                              []
#
#
#
# # with open('output.txt', 'w') as convert_file:
# #      convert_file.write(json.dumps(i))
#
#
#
#
# def add_to_playlist():
#
#     print("Adding songs...")
#
#     new_playlist_id = '2ItscPusPEZiZR2YB5NHa2'
#
#     tracks = uri
#
#     query = f"https://api.spotify.com/v1/playlists/2ItscPusPEZiZR2YB5NHa2/tracks?uris={tracks}"
#
#     response = requests.post(query, headers={"Content-Type": "application/json",
#                                              "Authorization": f"Bearer {spotify_token}"})
#
#     print(response.json())
#
#
# add_to_playlist()










list = [1,2,3,4,5,6,7,8,9,10]
print(list[:1])
