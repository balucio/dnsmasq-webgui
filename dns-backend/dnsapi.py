#!/usr/bin/env python3
# -*- coding: utf-8 -*-

""" API Per la gestione di un file hosts in sqlite """
from flask import Flask, json, request
from classes.dbhandler import DbHandler
import sqlite3
api = Flask(__name__)

@api.route('/dnsapi/list', methods=['GET'])
def getHosts():
  db = DbHandler()
  queryResult = {
    'data' : db.listHosts(),
    'page' : 1,
    'totalCount' : db.countHosts(),
  }
  return json.dumps(queryResult)

@api.route('/dnsapi/update', methods=['POST'])
def updateHost():
  db = DbHandler()
  data = request.json
  try:
    res = { 'error' : False, 'totalCount' : db.updateHost(data) }
  except sqlite3.Error as e:
    print(str(e))
    res = { 'error' : True, 'message' : str(e) }

  return json.dumps(res)


@api.route('/dnsapi/add', methods=['POST'])
def addHost():
  db = DbHandler()
  data = request.json
  data.pop("id", None)

  try:
    res = { 'error' : False, 'totalCount' : db.insertHost(data) }
  except sqlite3.Error as e:
    print(str(e))
    res = { 'error' : True, 'message' : str(e) }

  return json.dumps(res)

@api.route('/dnsapi/delete', methods=['POST'])
def deleteHost():
  db = DbHandler()
  data = request.json
  id = { 'id' : data['id'] }

  try:
    res = { 'error' : False, 'totalCount' : db.deleteHost(id) }
  except sqlite3.Error as e:
    print(str(e))
    res = { 'error' : True, 'message' : str(e) }

  return json.dumps(res)

def dnsbk_serve():
    from waitress import serve
    serve(api, host="0.0.0.0", port=8080)
    

if __name__ == '__main__' :
    #api.run()
    dnsbk_serve()
