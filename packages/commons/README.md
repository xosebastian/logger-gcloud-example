# @org/commons

Utilities library. Currently includes environment loader using YAML.

```ts
import { loadEnv } from '@org/commons';
const env = loadEnv();
console.log(env.SERVICE_NAME);
```
