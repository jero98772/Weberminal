from flask import Flask, request, jsonify
import subprocess
import os
from flask_cors import CORS 
app = Flask(__name__)
CORS(app) 
# Define a route
def shell(commandUser):
    out=""
    command=commandUser.split()
    if command[0]=="cd":    
        os.chdir(command[1])
    else:
        try:
            out=subprocess.check_output(command).decode()
        except:
            out="Unknown command: "+str(commandUser)
    return out
@app.route('/', methods=['POST'])
@app.route('/api/data', methods=['POST'])
def receive_data():
    received_data = request.json 
    command=shell(received_data["userInput"])
    data = {'message': command}
    return jsonify(data)

if __name__ == '__main__':
    app.run(debug=True)
