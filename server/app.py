from flask import Flask, make_response, jsonify, request, session

from config import app, db, api 
from flask_restful import Resource


# if __name__ == '__main__':
#     app.run(port=5555, debug=True)