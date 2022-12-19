FROM dmytrish/sanic:21.9.3

WORKDIR /sanic-backend

COPY . .

RUN pip install -r requirements.txt

EXPOSE 1337

CMD ["python", "server.py"]
