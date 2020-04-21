#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import sys
import logging
logging.basicConfig(stream=sys.stderr)
sys.path.insert(0,"/var/www/cgi-bin/dnsapi")

from dnsapi import api as application

#application.secret_key = 'Add your secret key
