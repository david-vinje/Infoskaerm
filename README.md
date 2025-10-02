# Getting Started

### To SSH into the Raspi:
  1. Go on the `Trustworks-wpa2` network
  2. Find the IP address: `ping trustworks.local`, this should return "64 bytes from 192.168.1.xxx"
  3. Then `ssh screen-project@192.168.1.xxx` and type in the wifi password

### To run locally:
  1. Get the `REACT_APP_TOKEN` variable and put in a `.env` file in the `/screen` folder
  To get the token, SSH into the Raspi and `echo $REACT_APP_TOKEN`
  2. Then `cd screen` + `npm install` + `npm start`

### This project uses the Intranet API:
[TW intranet API](https://api.trustworks.dk/q/swagger-ui/)

### Dot "." is mapped to "Tab" because of clicker
`cat ~/.Xmodmap`: keycode 60 = Tab

### Path to various scripts:
1. Autostart: `/etc/xdg/lxsession/LXDE-pi/autostart`
2. Rotate screen: `~/rotate-screen.sh`  
3. Screen resolution: `~/screen-resolution.sh` 
4. (Doesn't currently work) Tab to "tab into" the screen so the clicker works: `~/tab.sh`
  
In case resolution on screen is bad: 
  1. Go to raspi-config file `sudo raspi-config`
  2. Select `Advanced Options`
  3. Select `Wayland`
  4. Select `X11`
  5. Reboot raspi
  6. See also script for screen-resolution in screenResolutionScript.txt

In case of error code `Bash exited with code '1'` or `Got permission denied while trying to connect to the Docker daemon socket at unix:///var/run/docker.sock` when building docker:
  1. Check user rights in Docker: `ls -l /var/run/docker.sock`. Expected output: `srwxrwxrwx`
  2. If user rights are not right then
      a. Create docker group if not exist : `sudo groupadd docker`
	    b. Add user to docker group : `sudo usermod -aG docker ${USER}`
	    c. Change docker.sock to new permission : `sudo chmod 777 /var/run/docker.sock`
	    d. Check user rights: `ls -l /var/run/docker.sock`
	    e. Finally restart docker daemon service : `sudo systemctl restart docker`