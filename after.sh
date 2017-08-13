#!/bin/sh

# If you would like to do some extra provisioning you may
# add any commands you wish to this file and they will
# be run after the Homestead machine is provisioned.

echo "~~~INSTALLING phpMyAdmin...";
cd /home/vagrant/
rm -rf phpMyAdmin > /dev/null 2>&1;
rm -rf phpMyAdmin-4.7.3-all-languages > /dev/null 2>&1;
wget -q https://files.phpmyadmin.net/phpMyAdmin/4.7.3/phpMyAdmin-4.7.3-all-languages.zip
unzip phpMyAdmin-4.7.3-all-languages.zip
mv phpMyAdmin-4.7.3-all-languages phpMyAdmin
rm phpMyAdmin-4.7.3-all-languages.zip > /dev/null 2>&1;
echo "~~~DONE";
