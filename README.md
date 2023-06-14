# ddd-todo-list

simple to-do list full stack web application with a very basic UI that allows a user to add items to their to-do list, edit existing items, delete items and check off completed items.

# how to spin up server

yarn workspace @ddd-todo-list/server start:dev

# how to run test on specific file

yarn jest ^.\*\/filename\.spec\.ts

# Running migrations locally

DDD_TODO_LIST_DB_HOST=localhost npx sequelize-cli db:migrate

# Running tests

# Unit

yarn test:unit:server

# Integration

docker-compose -f docker-compose.test.yml run server-test yarn test:int:server
