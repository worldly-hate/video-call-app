import sys
import os

path = '/home/worldlyhate/video-call-app'  # Changed to lowercase
if path not in sys.path:
    sys.path.append(path)

from main import app as application
