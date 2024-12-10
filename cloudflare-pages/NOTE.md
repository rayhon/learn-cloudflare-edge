# Cloudflare commands
```bash
npx wrangler login

# add hono framework (api router)to cloudflare workers
npm install hono

# add zod (validation) to cloudflare workers
npm install zod

npx wrangler d1 create prod-d1-example
```

## Simple Hono app
```javascript
import { Hono } from 'hono';

const app = new Hono<{ Bindings: Env}>();

app.get('/', c => {
 return c.json({ message: 'Hello World' });
});

app.get('/product/:id', async c => {
 const product_id = await c.req.param('id');
 return c.json(`Searching for product with id ${product_id}`);
});

app.post('/product', async c => {
 const body = await c.req.json();
 const name = body.name;
 const price = body.price;
 return c.json(`Created product ${name} with price ${price}`);
});

export default app;
```

### Simple data schema

```javascript
const postSchema = z.object({
 name: z.string(),
 price: z.number()
});

app.post('/product', zValidator('json', postSchema), async c => {
  const body = await c.req.json();
  const name = body.name;
  const price = body.price;
  return c.json(`Created product ${name} with price ${price}`);
 });
```
* zValidator('json', postSchema) - This middleware validates the JSON payload against postSchema before reaching the route handler. If validation fails, an error response is automatically returned.



## Git commands
```bash
# 1. Start with main branch
git checkout main

# 2. When you finish lesson 1 milestone:
git checkout -b "lesson_1"
git add .
git commit -m "Lesson_1: Initial project setup with Cloudflare Pages"
git push origin "lesson_1"

# 3. Go back to main to continue development and repeat
git checkout main

# To rollback to a previous lesson:
git stash
git checkout "lesson_2"
git checkout -b "new-direction-from-lesson-2"

```

## Useful commands

```bash
# List all branches (* shows current branch)
git branch
# See branch history
git log --oneline --graph --all
# See differences between lessons
git diff "lesson_1" "lesson_2"

```

## Reference
* https://medium.com/@jleonro/build-scalable-cloudflare-workers-with-hono-d1-and-kv-a-complete-guide-to-serverless-apis-and-2c217a4a4afe