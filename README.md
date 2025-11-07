# CodeDelta

A simple, single-page application designed to streamline the process of submitting code differences (diffs) to a Large Language Model (LLM) for analysis, review, or explanation.


This project uses React + TypeScript + Vite  

##  How to run

Before start you have to add VITE_API_KEY inside file.env.
You can get VITE_API_KEY at url https://aistudio.google.com/app/api-keys. There is no need for credit card registration.
Also in .env can by found system instruction prompt.

Application can be run inside docker:

```bash
docker compose up -d
```

Application will be avalible at address http://localhost:8765, port can be change in file docker-compose.yaml.