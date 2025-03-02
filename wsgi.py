import sys
import os

path = '/home/Worldlyhate/video-call-app'
if path not in sys.path:
    sys.path.append(path)

from main import app as application
