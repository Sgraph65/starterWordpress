# Dumps SQL

Place ici les exports de base de données que tu souhaites partager avec l’équipe.

### Exporter (depuis l’environnement Docker)

```bash
docker compose exec db mysqldump -u root -p$MYSQL_ROOT_PASSWORD $WORDPRESS_DB_NAME \
  > database/dump.sql
```

### Importer

```bash
docker compose exec -T db mysql -u root -p$MYSQL_ROOT_PASSWORD $WORDPRESS_DB_NAME \
  < database/dump.sql
```

⚠️ Veille à anonymiser les données sensibles (comptes utilisateurs, emails) avant de committer un dump.
