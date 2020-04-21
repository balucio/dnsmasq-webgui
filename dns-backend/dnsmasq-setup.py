#!/usr/bin/env python3
# -*- coding: utf-8 -*-


""" Setup Sql Lite DB e Tabelle """

import sqlite3
conn = sqlite3.connect('hosts.db')

c = conn.cursor()

# Create table
c.execute('''CREATE TABLE IF NOT EXISTS hosts (
                id INTEGER PRIMARY KEY,
                parent INT8 DEFAULT NULL,
                type TEXT NOT NULL,
                name TEXT NOT NULL,
                content TEXT NOT NULL,
                ttl INT2 NOT NULL DEFAULT 600,
                UNIQUE(name, content))
          ''')

# Inserisco i nomi standard
standardHosts = [
  (None,'A','localhost', '127.0.0.1'),
  (None,'AAAA','ip6-localnet', 'fe00::0'),
  (None,'AAAA','ip6-allnodes', 'ff02::1'),
  (None,'AAAA','ip6-allrouters', 'ff02::2')
]

insertSql="INSERT INTO hosts(parent,type,name,content) VALUES(?,?,?,?)"

c.executemany(insertSql, standardHosts)

# Inserisco ipv6 localhost e loopback
c.execute(insertSql, (None,'AAAA','ip6-localhost', '::1'))
lhId = c.lastrowid
c.execute(insertSql, (lhId,'AAAA','ip6-loopback', '::1'))

# Save (commit) the changes
conn.commit()

# We can also close the connection if we are done with it.
# Just be sure any changes have been committed or they will be lost.
conn.close()
