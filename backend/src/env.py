import os

AUTH_KEY = os.getenv('AUTH_KEY', '')
ACCESS_TOKEN_EXPIRY = os.getenv('ACCESS_TOKEN_EXPIRY', '')

SESSION_KEY = os.getenv('SESSION_KEY', 'sessionkey')

DB_NAME = os.getenv('DB_NAME')
DB_USERNAME = os.getenv('DB_USERNAME')
DB_PASSWORD = os.getenv('DB_PASSWORD')
DB_HOST = os.getenv('DB_HOST')
DB_PORT = os.getenv('DB_PORT')
DATABASE_URL = os.getenv('DATABASE_URL')
