# Blog backend

Backend for blog.didgibot.com

**Prerequisites: _(Also see requirements.txt in the project's root)_:**

1. Python >= 3.12
2. FastAPI
3. MongoDB
4. Strawberry (GraphQL)
5. Docker and Docker Compose (optional)

## Development

### Installation

Docker and docker compose are recommended for development purposes.

1. Open your terminal and clone repository.
1. In the root of the cloned project copy `cicd/.env.dist` to `cicd/.env`.
1. Set up your own env vars in the `cicd/.env` file and/or accept defaults.
1. Run `docker build --progress=plain --no-cache -t <your tag here> -f cicd/Dockerfile .`. It will build FastAPI docker container.
1. Switch to `cicd` directory.
1. Run `docker compose up` and wait until application starts.
1. Run `docker compose ps` to make sure all containers have started.
1. Run `docker compose logs -f` and make sure all is running as expected.
1. Open browser at `http://localhost:<your mongo express port from .env>` and see if you successfully connected to MongoDB.
1. Open browser at `http://localhost:<your backend port from .env>/docs` and see if it serves you the API documentation (OAS 3.1).
1. Check if the `data` folder in the root of the project now contains the MongoDB files.
1. You should be all set.

### Development procedures

This app should be started in Docker. The code would reload automatically with every saved change (thanks to **uvicorn's** `--reload` flag).

The minimum requirement is to start Mongo DB, which is also configured in a docker compose environment (see docker-compose.yaml in the root of the project). For this you can run `docker compose up -d` in the root of this project. Create, however, .env file first - clone it from the .env.dist and modify accordingly.

I also recommend to start this and other apps by running `docker compose up -d` in the parent folder instead. Most probably the folder's name is `didgibot`. There other applications, such as Blog FE and Blog Admin FE, among others, reside. This way all applications necessary for Blog project will be started (Blog, for example, also needs the MinIO).

Since this repo uses DevContainers (which can be configured in .devcontainer/devcontainer.json), next step is to open it as a devcontainer. This way the correct python version is ensured, among other benefits. In VS Code use Dev Containers extension.

The GraphQL schema is available in the Graphql IDE (Apollo Sandbox) form at http://<HOSTNAME>:<PORT>/graphql path (most probably http://localhost:8888/graphql).

### Debugging

For debugging purposes do not forget to install necessary extension, such as Python Debugger (if using VS Code).

The codebase ships with `.vscode` folder that contains the `launch.json` file. The file contains the "Python Debugger: Remote Attach" configuration that would allow to set breakpoints and debug the application inside VSCode. For any other IDE's - please find an appropriate documentation.

Please note that docker has opened a debug port (which you should have set up in the `.env` file) - please consult `.env`, `docker-compose.yml`. If you accepted defaults while setting up the `.env`, the debug port should be `5690`.
