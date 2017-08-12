from piplapis.search import SearchAPIRequest
request = SearchAPIRequest(email=u'ashrafperformance@gmail.com', api_key='SOCIAL-PREMIUM-DEMO-lug6842a74vedg68olpi51wu')
response = request.send()

print(response.image.get_thumbnail_url(200, 100, zoom_face=False, favicon=False))
print(response.name)
print(response.education)
print(response.username)
print(response.address)
print(", ".join(map(str, response.person.jobs)))
print(", ".join(map(str, response.person.relationships)))