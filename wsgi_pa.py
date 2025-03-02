import os
import sys

# Add your project directory to the sys.path
path = '/home/worldlyhate/video-call-app'
if path not in sys.path:
    sys.path.append(path)

# Import your Flask app
from main import app as application

# Optional: Set environment variables if needed
os.environ['FLASK_ENV'] = 'production'
os.environ['SECRET_KEY'] = 'dev-key-12345'  # Change this to a secure key
os.environ['DATABASE_URL'] = 'sqlite:////home/worldlyhate/video-call-app/video-meeting.db'
