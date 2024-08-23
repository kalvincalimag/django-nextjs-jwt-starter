
# django-nextjs-jwt-starter

  

A sample setup integrating Django REST Framework, React/NextJS, and JWT Authentication for your development needs.

  

## Demo

#### Main

![demo-1](https://res.cloudinary.com/dotera808/image/upload/v1724405550/Demo-1_tbvd6a.gif)

  #### Admin
![demo-2](https://res.cloudinary.com/dotera808/image/upload/v1724405550/Demo-2_keiyxj.gif)
  

## Setup

  

Clone the repo

  

```

$ git clone https://github.com/kalvincalimag/django-nextjs-jwt-starter.git

```

  

### Setup Backend (Django)

  
  
  

First, create a `.env` file in the root of the backend folder & add your Django secret key:

```

DJ_SECRET_KEY=<your_django_secret_key_here>

```

For generating a key, refer [here](https://www.makeuseof.com/django-secret-key-generate-new/).
  

Enter Directory

```

cd backend

```

  

Install dependencies:

```

pip install -r requirements.txt

```

  

Set up the database:

```

python manage.py makemigrations

python manage.py migrate

```

  

Run server:

```

python manage.py runserver

```

  

### Setup Frontend (NextJS)

  

Enter directory

  

```

$ cd frontend

```

  

Install dependencies

  

```

npm install

```

  

Run the app

  

```

npm run dev

```

  

## Contact

  

### Let's connect

  

- Twitter [@kalvincalimag_](https://twitter.com/kalvincalimag_)

  

### If you find this project helpful, please consider giving it a ⭐.

  

[⭐](https://github.com/kalvincalimag/django-nextjs-jwt-starter) this repo or follow me on:

  

- Github [@kalvincalimag](https://github.com/kalvincalimag)

- Medium [@kalvincalimag](https://medium.com/@kalvincalimag)

  

## License

  

[BSD](LICENSE.md) @kalvincalimag