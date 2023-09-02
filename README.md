# Foodie
This is a Food Ordering management system app developed on Django.

# Installing Libraries
Install the following libraries before running the app on your local devices.
1. Django
```python -m pip install Django```
2. python-decouple
```pip install python-decouple```
3. mysqlclient (if you are using mysql for db)
```pip install mysqlclient```

# Database Engine 
Create a .env file in your project with following data
```
SECRET_KEY= (paste the django security key) 
DEBUG=
ENGINE=
NAME= (db name)
USER= (db username)
PASSWORD= (db password)
HOST=localhost
```