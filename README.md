<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

[![Node.js CI](https://github.com/amitchaudhari9121/project-hunt/actions/workflows/node.js.yml/badge.svg?branch=master)](https://github.com/amitchaudhari9121/project-hunt/actions/workflows/node.js.yml)

## Description

Repository for the backend of the project hunt website.

## What is Project Hunt?

It is a place for people to showcase their projects and discover projects by peers. Unlike a website like Product Hunt for example, the focus is not on how unique or how viable (business wise) the product is, but on how well the project is made as far as technicalities and design goes.

A growing segment of the developer/designer/product market is looking for people with past projects having been made. A portfolio site where projects can be showcased, and also where great projects can be discovered can help foster this community.

[Arnav Bhaiiya](https://github.com/championswimmer) at coding blocks is helping us, and documenting the development in open

Here's the [link](https://www.notion.so/myproject-page-f753fd0a6cb24ce19ff01e1d96d75af0) to notion doc containing briefing, Discussion notes etc

## Collaboration

Welcome! If you want to collaborate, please fork this repo and play around with it. any issues, todo's, feature requests are appreciated as well. Cheers!

## Database setup

- Make sure you have PostgreSQL installed ([Installation Instructions for Ubuntu](https://www.digitalocean.com/community/tutorials/how-to-install-and-use-postgresql-on-ubuntu-18-04))
- Open up CLI interface for PostgreSQL
  `sudo -u postgres psql`

  Inside the cli...

  - create a database named `projecthunt`

    `postgres=# create database projecthunt;`

  - create user `hotshot_dev` with password as `passwd`

    `postgres=# create user hotshot_dev with encrypted password 'passwd';`

  - connect to the created db as sudo

    `\c projecthunt`

    If you want to connect to the db as hotshot_dev run this instead of the above command

    `\c projecthunt hotshot_dev`

  - After creating new DB, enable uuid v_4 extension by running the following command inside your new DB.

    `projecthunt=# CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`

  - grant persmissions to `hotshot_dev`

    `postgres=# grant all privileges on database projecthunt to hotshot_dev;`

---

## TODO

- [ ] Proper Documentation for entity relation structure.
- [ ] Proper Documentation for controllers, modules and services.
- [ ] Write Better Controllers, for users and Projects.
- [ ] The user service functions that return a list of users should be paginated.
- [ ] The project service functions that return a list of users/projects should be paginated.
- [ ] Implement Filters like sortby, alphabetical, date created, most updated and so on.
- [x] Constraints for entities. Currently, most of the stuff is straight out string. I think we can improve on that.
- [ ] Implement Hash tags entities.
- [ ] Implement api call for Search by hashtag.
- [ ] Proper Mocks for testing or a typeorm config...
- [ ] Write Tests for the `**.**.spec.ts` files
- [ ] CI/CD pipe tests setup...
