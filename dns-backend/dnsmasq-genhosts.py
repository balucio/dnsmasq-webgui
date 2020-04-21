#!/usr/bin/env python3
# -*- coding: utf-8 -*-

""" Crea il file host dal database """
import time
import os
import tempfile
from python_hosts import Hosts, HostsEntry
from classes.dbhandler import DbHandler

def getType(type):

    if (type == 'A'):
        return 'ipv4'
    elif (type == 'AAAA'):
        return 'ipv6'
    
    return None

if __name__ == '__main__' :
    db = DbHandler()
    hosts_file = os.path.join(
        tempfile.gettempdir(),
        'hosts_' + time.strftime("%Y%m%d-%H%M%S")
    )

    if os.path.exists(hosts_file):
        os.remove(hosts_file)

    hosts = Hosts(path=hosts_file)

    for item in db.listHosts():


        entry = HostsEntry(
            entry_type=getType(item['type']), 
            address=item['content'],
            names=[ item['name'] ]
        )
        hosts.add(
            entries=[entry],
            force=False,
            allow_address_duplication=False,
            merge_names=True
        )

    hosts.write()
    print("Creato file " + hosts_file)

