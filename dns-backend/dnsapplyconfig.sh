#!/bin/bash

file_host=$(/var/www/cgi-bin/dnsapi/dnsmasq-genhosts.py)

dns_host="dns.example.it"


# Copia il file 'file_host' creato dallo script python nella cartella etc del server DNS remoto
scp $file_host "root@${dns_host}:/etc/hosts"

# Riavvia il servizio 'dnsmasq'
ssh "root@${dns_host}" -- systemctl restart dnsmasq

echo "Servizio Dnsmasq riconfigurato"
