import os

AUTH_KEY = os.getenv('AUTH_KEY', '')
ACCESS_TOKEN_EXPIRY = os.getenv('ACCESS_TOKEN_EXPIRY', '')

SESSION_KEY = os.getenv('SESSION_KEY', 'sessionkey')

DB_NAME = 'db'
DB_USERNAME = 'admin'
DB_PASSWORD = 'admin'
DB_HOST = 'db'
DB_PORT = '5432'
