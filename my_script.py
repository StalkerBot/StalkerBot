import sys, json
from piplapis.search import SearchAPIRequest

#Read data from stdin
def read_in():
    lines = sys.stdin.readlines()
    # Since our input would only be having one line, parse our JSON data from that
    return json.loads(lines[0])

def main():
    #get our data as an array from read_in()
    lines = read_in()

    # Sum  of all the items in the providen array
    total_sum_inArray = 0
    for item in lines:
        total_sum_inArray += item






request = SearchAPIRequest(email=total_sum_inArray, api_key='CONTACT-DEMO-fg8iwe5slw9zc2eqb4xd8gu7')
response = request.send()

#print(response.image.get_thumbnail_url(200, 100, zoom_face=False, favicon=False))
print ("The name of the email owner is:")
print(response.name)
#print(response.education)
print(response.username)
#print(response.address)
#print(", ".join(map(str, response.person.jobs)))



#print(", ".join(map(str, response.person.relationships)))

if __name__ == '__main__':
    main()