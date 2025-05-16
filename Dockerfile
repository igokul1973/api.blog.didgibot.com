FROM python:3.13-alpine

WORKDIR /code

COPY ../requirements.txt /code/requirements.txt

RUN pip install --upgrade pip && pip install --no-cache-dir -U -r /code/requirements.txt

COPY ../app/ /code/app/

EXPOSE 8888

CMD ["fastapi", "run", "--host", "0.0.0.0", "--port", "8888"]
# CMD ["python", "-m", "debugpy", "--listen", "0.0.0.0:5690", "-m", "uvicorn", "main:app", "--reload", "--host", "0.0.0.0", "--port", "8000"]
