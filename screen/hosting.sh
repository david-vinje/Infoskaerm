# 0. Build image and declare variables
docker build \
  --platform linux/amd64 \
  --build-arg REACT_APP_TOKEN=$REACT_APP_TOKEN \
  -t hello/docker -f screen/Hello.Dockerfile .

resourceGroup="rg-infoscreen"
owner="David Vinje"
managedIdentity="mi-infoscreen"
acr="infoscreen"
asp="asp-infoscreen"
webApp="webapp-infoscreen"

# Tutorial: https://learn.microsoft.com/en-us/azure/app-service/tutorial-custom-container?tabs=azure-cli&pivots=container-linux

# 1. Create a user-assigned managed identity
az group create --name $resourceGroup --location swedencentral --tag Owner=$owner

az identity create --name $managedIdentity --resource-group $resourceGroup --tag Owner=$owner

# 2. Create a container registry
az acr create --name $acr --resource-group $resourceGroup --sku Basic --admin-enabled true --tag Owner=$owner

password=$(az acr credential show --resource-group $resourceGroup --name $acr --query "passwords[0].value" --output tsv)

# 3. Push the image to Container Registry
docker login $acr.azurecr.io --username $acr --password $password

docker tag hello/docker $acr.azurecr.io/$acr

docker push $acr.azurecr.io/$acr

# 4. Authorize the managed identity for your registry

principalId=$(az identity show --resource-group $resourceGroup --name $managedIdentity --query principalId --output tsv)

registryId=$(az acr show --resource-group $resourceGroup --name $acr --query id --output tsv)

az role assignment create --assignee $principalId --scope $registryId --role "AcrPull"

# 5. Create the web app

az appservice plan create --name $asp --resource-group $resourceGroup --is-linux

az webapp create --resource-group $resourceGroup --plan $asp --name $webApp --container-image-name $acr.azurecr.io/$acr

# 6. Configure the web app

az webapp config appsettings set --resource-group $resourceGroup --name $webApp --settings WEBSITES_PORT=8000

id=$(az identity show --resource-group $resourceGroup --name $managedIdentity --query id --output tsv)

az webapp identity assign --resource-group $resourceGroup --name $webApp --identities $id

appConfig=$(az webapp config show --resource-group $resourceGroup --name $webApp --query id --output tsv)

az resource update --ids $appConfig --set properties.acrUseManagedIdentityCreds=True

clientId=$(az identity show --resource-group $resourceGroup --name $managedIdentity --query clientId --output tsv)

az resource update --ids $appConfig --set properties.AcrUserManagedIdentityID=$clientId

cicdUrl=$(az webapp deployment container config --enable-cd true --name $webApp --resource-group $resourceGroup --query CI_CD_URL --output tsv)

az acr webhook create --name appserviceCD --registry $acr --uri $cicdUrl --actions push --scope $acr.azurecr.io/$acr

eventId=$(az acr webhook ping --name appserviceCD --registry $acr --query id --output tsv)

az acr webhook list-events --name appserviceCD --registry $acr --query "[?id=='$eventId'].eventResponseMessage"