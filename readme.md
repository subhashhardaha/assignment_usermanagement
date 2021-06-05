# Protegrity Assignment

## Installation
Backend (usermanagement)
```sh
cd usermanagement
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
python manage.py makemigrations
python manage.py makemigrations account
python manage.py migrate
```

Load Sample Data
```sh
python manage.py migrate
python manage.py shell
```
Enter the following in the shell
```sh
from django.contrib.contenttypes.models import ContentType
ContentType.objects.all().delete()
exit()
```
```sh
python manage.py loaddata db.json
```

Run Server
```sh
python manage.py runserver
```

[API] <http://127.0.0.1:8000/api/>


Frontend (usermanagement)
Requires [Node.js](https://nodejs.org/) v10+ to run frontent

Install the dependencies and devDependencies and start the server.

```sh
cd um_ui
npm i
npm start
```
[Dashboard Page] <http://localhost:3000/>
