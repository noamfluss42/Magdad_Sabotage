FROM bitnami/python:3.8.13-debian-10-r67
WORKDIR /app
ENV PYTHONUNBUFFERED 1

COPY requirements.txt requirements.txt

RUN pip3 install -r ./requirements.txt

COPY . .

EXPOSE 12580
CMD ["python","manage.py", "runserver", "0.0.0.0:12580"]
