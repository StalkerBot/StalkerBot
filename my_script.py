from piplapis.search import SearchAPIRequest

request = SearchAPIRequest(email="nadershakhshir@gmail.com", api_key='CONTACT-DEMO-fg8iwe5slw9zc2eqb4xd8gu7')
response = request.send()

print(response.image.get_thumbnail_url(200, 100, zoom_face=False, favicon=False))
print ("The name of the email owner is:")
print(response.name)
#print(response.education)
print(response.username)
#print(response.address)
#print(", ".join(map(str, response.person.jobs)))



#print(", ".join(map(str, response.person.relationships)))


