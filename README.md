# Xipics

The AI SFW & NSFW Image Generate Platform using Randomseed API.
You can generate your images using several template and custom prompts.

## License

[MIT](https://choosealicense.com/licenses/mit/)

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

<!-- LOCAL ENV -->

`HOST`
`WEBHOOK_URL`

<!-- JWT ENV -->

`JWT_SECRET_KEY`
`JWT_EXPIRES_IN`

<!-- MONGODB ENV -->

`MONGO_URI`
`DB_NAME`

<!-- AWS ENV -->

`AWS_UPLOAD_DIR`
`AWS_REGION`
`AWS_ACCESS_KEY_ID`
`AWS_SECRET_ACCESS_KEY`
`AWS_BUCKET_NAME`

<!-- RANDOMSEED ENV -->

`RANDOMSEED_API`
`RANDOMSEED_API_KEY`

## Installation & Running

Install npms using Yarn

```bash
  yarn install
```

Build and Start the project

```bash
  yarn build
```

```bash
yarn start
```
