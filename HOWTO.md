# JIRA

## 1. 初始化项目

```shell
npx create-react-app jira --template typescript
```

## 2. 项目配置

### 2.1 eslint, prettier, commitlint

- 引入 prettier

  ```shell
  yarn add --dev --exact prettier
  echo {}> .prettierrc.json
  echo > .prettierignore
  yarn prettier --write .
  ```

  [参考链接](https://prettier.io/docs/en/install.html)

- prettier 与 git commit 集成

  ```shell
  npx mrm@2 lint-staged
  ```

- prettier 与 eslint 冲突解决

  ```shell
  yarn add eslint-config-prettier -D
  ```

  ```json
  {
    "eslintConfig": {
      "extends": ["react-app", "react-app/jest", "prettier"]
    }
  }
  ```

- commitlint

  ```shell
  # 安装依赖
  yarn add husky @commitlint/config-conventional @commitlint/cli -D

  # Configure commitlint to use conventional config
  echo "module.exports = {extends: ['@commitlint/config-conventional']}" > commitlint.config.js

  # Activate hooks
  yarn husky install

  # Add hook
  npx husky add .husky/commit-msg 'npx --no-install commitlint --edit "$1"'
  ```

### 2.2 mock server

使用 json-server

```shell
# 中间件可以自定义接口处理
json-server mock/db.json --watch --port 3333 --middlewares ./mock/middlewares.js
```

## 3. redux-toolkit

使用 redux-toolkit 开发项目列表，管理用户状态。
参考 redux-toolkit 分支。
