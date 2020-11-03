#!/bin/bash
cd ~/bxc-web-app
pm2 startOrReload ecosystem.config.js
pm2 save 