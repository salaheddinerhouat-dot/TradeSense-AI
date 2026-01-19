# TradeSense AI - Trading Challenge Platform

Ce projet est une plateforme de simulation de trading pour Prop Firms, incluant un suivi des règles de gestion des risques (5% daily loss, 10% max loss).

## Structure du Projet
- **/frontend** : Application React (Interface utilisateur et Dashboard).
- **/backend** : API Flask (Gestion des prix et des règles de trading).
- **database.sql** : Schéma de la base de données relationnelle.

## Fonctionnalités
- Prix en temps réel (IAM via Scraping, BTC via API).
- Leaderboard dynamique basé sur le profit %.
- Système d'échec automatique du challenge en cas de perte excessive.