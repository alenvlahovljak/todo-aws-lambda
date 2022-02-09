#!/bin/bash

aws lambda update-function-code --function-name createTodo --zip-file fileb://zip/create.zip
aws lambda update-function-code --function-name readTodos --zip-file fileb://zip/read.zip
aws lambda update-function-code --function-name deleteTodo --zip-file fileb://zip/delete.zip

