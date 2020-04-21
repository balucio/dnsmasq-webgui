## *dnsmasq* Web Gui

This is a very simple project written in *Python* and *React* in order to manage the **dnsmasq** *hosts* file.

There are two folders:

- `dns-backend`: contains the API written in python using Flask framework, and some others tools to sync the DNS hosts file.
- `dns-webgui` folder contains the web gui itself. The Webgui is written in typescrip using React Hooks.

### Web-Gui

Actually the web-gui it is a very simple React application. It present all hosts in browser using a table with classic web editing button.

In order to use the Web-Gui, first of all you need to compile React application using `yarn build` command. Then put the compiled application (files created in build directory) on the root directory or other directory of WebServer.

### Dns-Backend

The back-end is a Python application that use *flask* framework. The *dns-backend* uses an **sqlite3** database file in order to keep the list of DNS names (actually only `A` and `AAAA` records). All editing operation are performed on `hosts.db` **sqlite3** database file. The hosts file of *dnsmasq* is never directly updated.

### Tools and sync service

Inside `dns-backend` folder, there are some others scripts and **systemd** descriptors files. These files are used in order to update the **dnsmasq** hosts file with modifications made on *web-gui*.

- `dnsapplyconfig.sh` it is a bash script used to apply the new configuration and restart `dnsmasq` service. This script will generate a new `hosts` file for **dnsmasq**, then copy the new file on DNS server using `scp`, and then using  `ssh` restart the service. You have to edit this script and change the line `dns_host="dns.example.it"` using the *hostname* or ip address of your DNS server. Also it is required a *passwordless* `ssh`, so that the computer where the script runs can connect to DNS server without password.
- `dnsmasq-genhosts.py` this python script is used by `dnsapplyconfig.sh` in order to create a new `hosts` file from the **sqlite3** `hosts.db` database.
- `dnsmonitor.path`: it is a **systemd** descriptor *path* used to keep monitored the `/var/www/cgi-bin/dnsapi/hosts.db` for modifications.

- `dnsmonitor.service`: it is the **systemd** descriptor *service* triggered by `dnsmonitor.path` when a change to `hosts.db` occurs. This service will run the `dnsapplyconfig.sh` script in order to update the dns configuration.