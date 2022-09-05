echo Starting package
echo Removing old package directory

rm -rf ./package
rm -f ./dbl-webhook-refresh.zip
mkdir ./package
cp -R ./dist/** ./package
cp package.json ./package
cd ./package

#skip the dev dependencies 
yarn install --production=true

zip -rq dbl-webhook-refresh.zip .

mv dbl-webhook-refresh.zip ..
cd ..
