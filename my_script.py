


import sys, json, numpy as np

#Read data from stdin
def read_in():
    lines = sys.stdin.readlines()
    #Since our input would only be having one line, parse our JSON data from that
    return json.loads(lines[0])

def main():
    #get our data as an array from read_in()
    lines = read_in()

    #create a numpy array
    np_lines = np.array(lines)

    #use numpys sum method to find sum of all elements in the array
    lines_sum = np.sum(np_lines)

    #return the sum to the output stream
   


from piplapis.search import SearchAPIRequest

request = SearchAPIRequest(email=lines_sum, api_key='CONTACT-DEMO-fg8iwe5slw9zc2eqb4xd8gu7')
response = request.send()

#print(response.image.get_thumbnail_url(200, 100, zoom_face=False, favicon=False))
print ("The name of the email owner is:")
print(response.name)
#print(response.education)
print(response.username)
#print(response.address)
#print(", ".join(map(str, response.person.jobs)))



#print(", ".join(map(str, response.person.relationships)))


#start process
if __name__ == '__main__':
    main()
