from fastapi import FastAPI, HTTPException, WebSocket
#BaseModel garantiza que los datos almacenados concuerdan con los especificados
from pydantic import BaseModel, BeforeValidator, ConfigDict, Field
# Si quisiesemos un parametro opcional "Optional[type]"
from typing import Annotated, Optional, List, Tuple
import motor.motor_asyncio

# Creación de la aplicacion
app = FastAPI(title="RandomPeace API",summary="A simple API for the RandomPeace application")

borrar = "mongodb+srv://uo283069:7Qt17FhvvszsNVc1@cluster0.z7h979y.mongodb.net/?retryWrites=true&w=majority"
#TODO Conexión con la base de datos
#client = motor.motor_asyncio.AsyncIOMotorClient(os.environ["MONGODB_URL"])
client = motor.motor_asyncio.AsyncIOMotorClient(borrar)
db = client.get_database("randompeace")
users_collection = db.get_collection("users")


# Representa un ObjectID en la base de datos
# Se represetnará como una 'str' en el modelo para que se pueda serializar a JSON
PyObjectId = Annotated[str, BeforeValidator(str)]

# Clases de modelo de las entidades 
# La clase usuario, será la que guarde las posiciones de los usuarios
class User(BaseModel):
    id: Optional[PyObjectId] = Field(alias="_id", default=None)
    positions: List[Tuple[int, int]]
    model_config = ConfigDict(
        populate_by_name=True,
        arbitrary_types_allowed=True
    )

# Manager para conexión con Websocket
class ConnectionManager:
    """Clase definiendo conexiones con websocket"""
    def __init__(self):
        """init method, keeping track of connections"""
        self.active_connections = []
    
    async def connect(self, websocket: WebSocket):
        """connect event"""
        await websocket.accept()
        # Solo dejamos que se conecte si hay espacio en la sesión
        if(len(self.active_connections) < 4):
            self.active_connections.append(websocket)
        else:
            await manager.send_personal_message("Sorry, you where not able to join the session",websocket)

    async def send_personal_message(self, message: str, websocket: WebSocket):
        """Direct Message"""
        await websocket.send_text(message)
    
    def disconnect(self, websocket: WebSocket):
        """disconnect event"""
        self.active_connections.remove(websocket)

    def numberOfConnections(self):
        return len(self.active_connections)

manager = ConnectionManager()

@app.post('/api/v1/post')
async def set(user : User):
    """
        Post para ingresar como usuario en la "partida", si no hay espacio devuelve un 403.
    """
    # Se mira el número de usuarios ya en 'sesión'
    numberOfUsers = len(await users_collection.find().to_list(4))
    # Si el usuario se puede unir, lo añadimos
    if(numberOfUsers < 4):
        new_user = await users_collection.insert_one(
            user.model_dump(by_alias=True, exclude=["id"])
        )
    else :
        raise HTTPException(status_code=403, detail="Current session is already full. Please try again later.")
    
    return {"userID":str(new_user.inserted_id)}

@app.websocket("api/v1/ws")
async def websocket_endpoint(websocket: WebSocket):
    # Lo añadimos a la serie de conexiones
    await manager.connect(websocket)
    while True:
        # Si hay 4 usuarios, ejecutamos y acabamos
        if(manager.numberOfConnections() == 4):
            # TODO
            # Habría que parsear el dict de cada usuario y sacar las posiciones (positions)
            # a un objeto o mandarlas como json (mejor opcion) a la aplicación
            await websocket.send_text(f"Message text was: TODO")
        else:
            # TODO
            # El usuario sigue esperando a que se una gente a la sesión
            await websocket.send_text(f"Message text was: TODO")