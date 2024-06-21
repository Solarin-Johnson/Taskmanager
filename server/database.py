from deta import Deta
from dotenv import load_dotenv

load_dotenv()

# init
deta =  Deta()


# connect to db
todos =  deta.Base('todos')