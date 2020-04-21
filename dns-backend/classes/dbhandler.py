#!/usr/bin/env python
# -*- coding: utf-8 -*-

import sqlite3

class DbHandler(object):

  dbName = 'hosts.db'
  conn = None

  listQuery = 'SELECT * FROM hosts WHERE 1'
  countQuery = 'SELECT COUNT(id) c FROM hosts WHERE 1'
  updateQuery = 'UPDATE hosts SET {fields} WHERE id=:id'
  insertQuery = 'INSERT into hosts({names}) VALUES({holders}) '
  deleteQuery = 'DELETE FROM hosts WHERE id=:id'

  def __init__(self):

    self._conn = sqlite3.connect(DbHandler.dbName)
    self._conn.row_factory = sqlite3.Row
    self._curs = self._conn.cursor()

  def countHosts(self):
    self._curs.execute(DbHandler.countQuery)
    return self._curs.fetchone()['c']

  def listHosts(self):
    
      self._curs.execute(DbHandler.listQuery);
      return  [ dict(row) for row in self._curs.fetchall() ]

  def updateHost(self, data):

    sql = DbHandler.updateQuery.format(
        fields=', '.join('{0}=:{0}'.format(k) for k in data.keys())
    )
    self._curs.execute(sql,data)
    c = self._curs.rowcount
    self._conn.commit()
    return c

  def insertHost(self, data):

    names = ', '.join(data.keys())
    holders = [":" + k for k in data.keys()]
    sql = DbHandler.insertQuery.format(
        names=names,
        holders=','.join(holders)
    )
    print("SQL " + sql)
    self._curs.execute(sql,data)
    c = self._curs.rowcount
    self._conn.commit()
    return c

  def deleteHost(self, data):
    self._curs.execute(DbHandler.deleteQuery, data)
    c = self._curs.rowcount
    self._conn.commit()
    return c

  def __del__(self):
    if self.conn:
      self.conn.close()