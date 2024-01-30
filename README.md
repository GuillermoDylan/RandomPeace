<h1 align="center" id="title">Random Peace</h1>

[![made-with-javascript](https://img.shields.io/badge/Made%20with-JavaScript-f7df1e.svg)](https://www.javascript.com)
[![made-with-p5js](https://img.shields.io/badge/Made%20with-P5js-ed225d.svg)](https://p5js.org/)
[![Website shields.io](https://img.shields.io/website-up-down-green-red/http/shields.io.svg)](https://uo283069.github.io/RandomPeace/src/)

<p id="description">Random Peace is a homage to Charles Csuri 1967 “Random War”. As opposing to its reference the main theme in Random Peace is as its name states a random representation of a peaceful war between two (or several) sides.</p>

<a href="https://guillermodylan.github.io/RandomPeace/src/">Access the project</a>

# Instrucciones
## Para alojar la web en local
Desde la carpeta base o desde src:
```
python -m http.server
```
O en caso de que utilizamos python3
```
python3 -m http.server
```

## Para alojar la REST API
Dentro de la carpeta /server/ ejecutamos los siguientes comandos:
```
python -m venv serverEnv
.\serverEnv\Scripts\activate
pip install -r .\serverEnv\requirements.txt
```
Opcionalmente y si el instalador lo sugiere:
```
python.exe -m pip install --upgrade pip
```

Finalmente, para poner en marcha la REST API ejecutamos el siguiente comando sin salir de la carpeta:
```
uvicorn main:app --reload
```
