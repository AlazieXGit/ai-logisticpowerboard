up-dev:
	docker-compose --env-file .env.development up --build

down-dev:
	docker-compose --env-file .env.development down

up-prod:
	docker-compose --env-file .env.production -f docker-compose.yml -f docker-compose.prod.yml up --build -d

down-prod:
	docker-compose --env-file .env.production -f docker-compose.yml -f docker-compose.prod.yml down
