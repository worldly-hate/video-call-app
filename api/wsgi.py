from main import app

# This is needed for Vercel
def handler(request, context):
    return app
