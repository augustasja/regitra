# Setup instructions

Docker daemon must be present.

1. Navigate to project folder and run:
   docker build -t vite-app .

2. Run the following (provide any port that is available):
   docker run -p 4173:4173 vite-app
