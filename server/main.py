import json
import os
from fastapi import FastAPI, HTTPException, WebSocket, WebSocketDisconnect
#BaseModel garantiza que los datos almacenados concuerdan con los especificados
from pydantic import BaseModel, BeforeValidator, ConfigDict, Field
# Si quisiesemos un parametro opcional "Optional[type]"
from typing import Annotated, List, Tuple
import motor.motor_asyncio

# Creación de la aplicacion
app = FastAPI(title="RandomPeace API",summary="A simple API for the RandomPeace application")

client = motor.motor_asyncio.AsyncIOMotorClient(os.environ["MONGODB_URL"])
db = client.get_database("randompeace")
users_collection = db.get_collection("users")


# Representa un ObjectID en la base de datos
# Se represetnará como una 'str' en el modelo para que se pueda serializar a JSON
PyObjectId = Annotated[str, BeforeValidator(str)]

# Clases de modelo de las entidades 
# La clase usuario, será la que guarde las posiciones de los usuarios
class User(BaseModel):
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

    async def disconnectAll(self):
        for conn in self.active_connections:
           self.disconnect(conn)

    def numberOfConnections(self):
        return len(self.active_connections)
    
    async def broadcast(self, message: str):
        for connection in self.active_connections:
            await connection.send_text(message)
    async def endSession(self):
        users_collection.delete_many({})
        

manager = ConnectionManager()

@app.websocket("/")
async def websocket_endpoint(websocket: WebSocket):

    # Lo añadimos a la serie de conexiones SI HAY ESPACIO
    if(manager.numberOfConnections() < 4):
        await manager.connect(websocket)
    else:
        # No hay espacio, le devolvemos un error
        raise HTTPException(status_code=403, detail="Current session is already full. Please try again later.")
    
    try:
        # Código en el que se ejecuta el socket
        while True:
            # Recuperamos los datos que manda el cliente
            data = await websocket.receive_text()
            # Si no son None, los parseamos como un json
            if(data != None):
                obj = json.loads(data)
            else:
                obj = None

            # Guardamos las posiciones del usuario
            if(data != None):
                # El usuario acaba de mandar sus posiciones, las guardamos
                user = User(positions=obj.get("positions"))
                new_user = await users_collection.insert_one(
                    user.model_dump(by_alias=True, exclude=["id"])
                )
                print("OK")

            # Miramos el número de usuarios actualmente en la "sesión"
            numberOfUsers = len(await users_collection.find().to_list(4))
            
            # Le enviamos a cada usuario el número de jugadores actualmente en la sesión
            await manager.broadcast(str(numberOfUsers))

            # Si hay 4 usuarios, ejecutamos y acabamos
            if(numberOfUsers == 4):
                # Recuperamos todos los usuarios
                users = await users_collection.find().to_list(4)
                positions = []
                for user in users:
                    # Recogemos sus posiciones
                    positions.append(user.get("positions"))
                # Devolvemos las posiciones de todos los usuarios
                await manager.broadcast(json.dumps(positions))
                # Desconectamos a todos los usuarios de la sesión
                await manager.endSession()
            if(numberOfUsers == 0 and manager.numberOfConnections() == 5):
                await manager.disconnectAll();
                
    # En caso de que un usuario se desconecte inesperadamente
    except WebSocketDisconnect:
        manager.disconnect(websocket)