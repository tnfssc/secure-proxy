# Secure Proxy

```sh
pnpm install
pnpm run dev
```

```sh
curl --request POST \
  --url http://localhost:3000/8f788ab6-1b2f-4b7c-88f5-c7298c19af05 \
  --header 'Authorization: Bearer secret' \
  --header 'content-type: application/json' \
  --data '{ "wassup": "dawg" }'
```
