#!/usr/bin/env bash

sudo apt install -y nginx=1.14.0-0ubuntu1.2
sudo cp ../conf/nginx.conf /etc/nginx
sudo cp ../conf/avandaele.fr /etc/nginx/sites-available
sudo ln -s /etc/nginx/sites-available/avandaele.fr /etc/nginx/sites-enabled
sudo systemctl start nginx