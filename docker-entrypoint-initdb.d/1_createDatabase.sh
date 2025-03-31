#!/bin/bash
set -e

# Criar o usuário 'docker' se não existir
psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
    SELECT 1 FROM pg_roles WHERE rolname = 'docker' LIMIT 1;
    \gset
    \if :found IS NULL
        CREATE USER docker WITH PASSWORD 'docker_password';  # Defina a senha que deseja
    \endif
EOSQL

# Criar o banco de dados 'pethub_db' se não existir
psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
    SELECT 1 FROM pg_database WHERE datname = 'pethub_db' LIMIT 1;
    \gset
    \if :found IS NULL
        CREATE DATABASE pethub_db;
    \endif
EOSQL

# Conceder permissões ao usuário 'docker' para o banco de dados 'pethub_db'
psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
    GRANT ALL PRIVILEGES ON DATABASE pethub_db TO docker;
EOSQL
