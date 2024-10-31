# Getting Started
# 

Checkout the [TW intranet API](https://api.trustworks.dk/q/swagger-ui/#/Public%20Resource)

Get token from the raspi, and put it in a `REACT_APP_TOKEN` variable in an `.env` file in the root folder /screen: `REACT_APP_TOKEN=[your-token]`

To find the token, SSH into the Raspberry Pi: 
  1. `ssh screen-project@192.168.1.237`
  2. `cat ~/.bash_profile`

To run locally:
  1. `cd screen`
  2. `npm install`
  3. `npm start`

Checkout the [Azure DevOps pipeline status](https://dev.azure.com/davidvinje/info-screen/_build?definitionId=2&_a=summary)

Edit the [Azure DevOps pipeline script and variables](https://dev.azure.com/davidvinje/info-screen/_apps/hub/ms.vss-build-web.ci-designer-hub?pipelineId=2&branch=main)


Path to Raspberry Pi autostart script: `/etc/xdg/lxsession/LXDE-pi/autostart`
Find script for autostart in autostartScript.txt

Find script for rotating screen in rotateScreenScript.txt

In case token expires, ask Hans for a new system token, and put it in a secret in the DevOps pipeline:
  1. Open pipeline `project-screen`
  2. Select `Edit`
  3. Select `Variables`
  4. Select `REACT_APP_TOKEN`
  5. Update the value of the secret with the new system token 

In case token is needed for the project, create a system variable. For MAC users: 
  1. `nano ~/.zprofile`
  2. Write `export REACT_APP_TOKEN="[token value from Hans/what is in the RPi]"`
  3. `source ~/.zprofile`

To update the agent in RPi:
  1. `cd TWagent && ./config.sh`
  2. Enter `Y` to accept Team Explorer Everywhere license agreement
  3. Enter server URL `https://dev.azure.com/trustworks/`
  4. Enter PAT (might need to contact Henrik/tech support)

To generate a new PAT
  1. Follow guide https://learn.microsoft.com/en-us/azure/devops/pipelines/agents/personal-access-token-agent-registration?view=azure-devops
  2. Set the following rules:
    a. Expiration: 90 days
    b. Scope: Custom defined
    c. Only select rights to read. 

Install Docker: 
  1. `sudo apt install docker.io`
	2. `sudo systemctl enable docker`
	3. `sudo systemctl status docker`
	4. `sudo systemctl start docker`
	5. `sudo docker run hello-world`
  6. Good YouTube video: https://www.youtube.com/watch?v=cqbh-RneBlk
  
In case resolution on screen is bad: 
  1. Go to raspi-config file `sudo raspi-config`
  2. Select `Advanced Options`
  3. Select `Wayland`
  4. Seelct `X11`
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

In case of emergency and raspi needs to be reinstalled, then these are some of the steps:
  1. Trustworks-wpa2 til SSH
	2. SSH skal aktiveres i Raspberry Pi configuration
	3. `[username]@[ip]`
	4. ip kan findes ved command i RPi terminal: `hostname -I`