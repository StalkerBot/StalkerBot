import sys, json

def read_in():
    lines = sys.stdin.readlines()
    # Since our input would only be having one line, parse our JSON data from that
    return json.loads(lines[0])




from piplapis.search import SearchAPIRequest
request = SearchAPIRequest(email=u'lines[0], api_key='CONTACT-DEMO-fg8iwe5slw9zc2eqb4xd8gu7')
response = request.send()

#print(response.image.get_thumbnail_url(200, 100, zoom_face=False, favicon=False))
print(response.name)
#print(response.education)
print(response.username)
#print(response.address)
#print(", ".join(map(str, response.person.jobs)))
#print(", ".join(map(str, response.person.relationships)))