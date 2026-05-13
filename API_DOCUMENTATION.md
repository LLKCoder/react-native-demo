# 课程学习 App 后端接口文档

本文档根据当前 Express 路由和 Sequelize Model 整理，供前端开发人员对接，也适合直接提供给大模型生成接口调用代码。

## 1. 基础约定

### 1.1 Base URL

开发环境默认：

```text
http://localhost:3000
```

实际环境请以前端运行配置为准。

### 1.2 请求格式

- 普通接口使用 `application/json`。
- 查询参数使用 URL query，例如 `GET /articles?currentPage=1&pageSize=10`。
- 文件上传接口 `POST /uploads/aliyun` 使用 `multipart/form-data`，文件字段名固定为 `file`。

### 1.3 鉴权方式

后端读取请求头中的 `token` 字段，不是 `Authorization: Bearer token`。

```http
token: <JWT_TOKEN>
```

鉴权范围：

- 不需要登录：`/`、`/auth/*`、`/categories`、`/courses/*`、`/chapters/*`、`/articles/*`、`/settings`、`/search`
- 需要普通用户登录：`/users/*`、`/likes/*`、`/uploads/*`
- 需要管理员登录：除 `/admin/auth/sign_in` 外的所有 `/admin/*`

管理员要求：

- JWT 有效。
- 当前用户存在。
- 当前用户 `role === 100`。

### 1.4 通用成功响应

```json
{
  "status": true,
  "message": "操作成功提示",
  "data": {}
}
```

### 1.5 通用失败响应

```json
{
  "status": false,
  "message": "请求失败: ErrorName",
  "errors": ["错误详情"]
}
```

常见 HTTP 状态码：

| 状态码 | 场景 |
|---|---|
| 200 | 请求成功 |
| 201 | 创建成功 |
| 400 | 参数错误或 Sequelize 校验失败 |
| 401 | token 缺失、错误、过期或无权限 |
| 404 | 资源不存在 |
| 409 | 资源有关联数据，无法删除 |
| 413 | 上传文件超过 5MB |
| 500 | 服务端错误 |

### 1.6 分页约定

列表接口通常支持：

| 参数 | 位置 | 类型 | 必填 | 默认值 | 说明 |
|---|---|---|---|---|---|
| currentPage | query | number | 否 | 1 | 当前页，后端会取绝对值 |
| pageSize | query | number | 否 | 10 | 每页数量，后端会取绝对值 |

分页响应：

```json
{
  "pagination": {
    "total": 100,
    "currentPage": 1,
    "pageSize": 10
  }
}
```

## 2. 数据字段约定

### 2.1 User

| 字段 | 类型 | 说明 |
|---|---|---|
| id | number | 用户 ID |
| email | string | 邮箱，唯一，必须是邮箱格式 |
| username | string | 用户名，唯一，长度 2-45 |
| password | string | 密码，创建/修改时传明文，长度 6-45；数据库返回时可能为加密值 |
| nickname | string | 昵称，长度 2-45 |
| sex | number | 性别：0 男，1 女，2 未选择 |
| company | string | 公司 |
| introduce | string | 个人介绍 |
| role | number | 用户组：0 普通用户，100 管理员 |
| avatar | string | 头像 URL |
| createdAt | string | 创建时间，中文日期格式 |
| updatedAt | string | 更新时间，中文日期格式 |

### 2.2 Category

| 字段 | 类型 | 说明 |
|---|---|---|
| id | number | 分类 ID |
| name | string | 分类名称，唯一，长度 2-45 |
| rank | number | 排序，正整数 |
| createdAt | string | 创建时间 |
| updatedAt | string | 更新时间 |

### 2.3 Course

| 字段 | 类型 | 说明 |
|---|---|---|
| id | number | 课程 ID |
| categoryId | number | 分类 ID |
| userId | number | 创建课程的用户 ID |
| name | string | 课程名称，长度 2-45 |
| image | string | 课程封面 URL |
| recommended | boolean | 是否推荐 |
| introductory | boolean | 是否入门课程 |
| content | string | 课程详情 |
| likesCount | number | 点赞数 |
| chaptersCount | number | 章节数 |
| createdAt | string | 创建时间 |
| updatedAt | string | 更新时间 |

### 2.4 Chapter

| 字段 | 类型 | 说明 |
|---|---|---|
| id | number | 章节 ID |
| courseId | number | 课程 ID |
| title | string | 章节标题，长度 2-45 |
| content | string | 章节内容 |
| video | string | 视频 URL |
| rank | number | 排序，正整数 |
| createdAt | string | 创建时间 |
| updatedAt | string | 更新时间 |

### 2.5 Article

| 字段 | 类型 | 说明 |
|---|---|---|
| id | number | 文章 ID |
| title | string | 标题，长度 2-45 |
| content | string | 内容 |
| createdAt | string | 创建时间 |
| updatedAt | string | 更新时间 |

### 2.6 Setting

| 字段 | 类型 | 说明 |
|---|---|---|
| id | number | 设置 ID |
| name | string | 站点名称 |
| icp | string | ICP 备案号 |
| copyright | string | 版权信息 |
| createdAt | string | 创建时间 |
| updatedAt | string | 更新时间 |

### 2.7 Attachment

| 字段 | 类型 | 说明 |
|---|---|---|
| id | number | 附件 ID |
| userId | number | 上传者 ID |
| originalname | string | 原始文件名 |
| filename | string | OSS 文件名 |
| mimetype | string | MIME 类型 |
| size | string | 文件大小 |
| path | string | OSS 路径 |
| fullpath | string | OSS 完整路径 |
| url | string | 文件访问 URL |
| createdAt | string | 创建时间 |
| updatedAt | string | 更新时间 |

## 3. 前台接口

### 3.1 首页

#### GET `/`

功能：获取首页数据，包括推荐课程、人气课程、入门课程。

鉴权：不需要。

请求参数：无。

响应 `data`：

```json
{
  "recommendedCourses": [],
  "likesCourses": [],
  "introductoryCourses": []
}
```

说明：

- `recommendedCourses` 返回最多 10 条 `recommended=true` 的课程，包含 `category` 和 `user` 简要信息。
- `likesCourses` 按 `likesCount desc, id desc` 返回最多 10 条。
- `introductoryCourses` 返回最多 10 条 `introductory=true` 的课程。
- 课程列表中不返回 `content`。

### 3.2 用户认证

#### POST `/auth/sign_up`

功能：用户注册。

鉴权：不需要。

Body：

| 字段 | 类型 | 必填 | 说明 |
|---|---|---|---|
| email | string | 是 | 邮箱，唯一 |
| username | string | 是 | 用户名，唯一，长度 2-45 |
| nickname | string | 是 | 昵称，长度 2-45 |
| password | string | 是 | 密码，长度 6-45 |

后端固定写入：

- `sex=2`
- `role=0`

请求示例：

```json
{
  "email": "user@example.com",
  "username": "alice",
  "nickname": "Alice",
  "password": "123456"
}
```

响应 `data`：

```json
{
  "user": {
    "id": 1,
    "email": "user@example.com",
    "username": "alice",
    "nickname": "Alice",
    "sex": 2,
    "role": 0
  }
}
```

#### POST `/auth/sign_in`

功能：普通用户登录。

鉴权：不需要。

Body：

| 字段 | 类型 | 必填 | 说明 |
|---|---|---|---|
| login | string | 是 | 邮箱或用户名 |
| password | string | 是 | 密码 |

响应 `data`：

```json
{
  "token": "jwt-token"
}
```

前端保存 token 后，访问登录接口时在请求头传：

```http
token: jwt-token
```

### 3.3 当前用户

#### GET `/users/me`

功能：查询当前登录用户信息。

鉴权：需要普通用户 token。

响应 `data`：

```json
{
  "user": {}
}
```

说明：返回用户信息，不包含 `password`。

#### PUT `/users/info`

功能：更新当前用户个人资料。

鉴权：需要普通用户 token。

Body：

| 字段 | 类型 | 必填 | 说明 |
|---|---|---|---|
| nickname | string | 否 | 昵称，长度 2-45 |
| sex | number | 否 | 0 男，1 女，2 未选择 |
| company | string | 否 | 公司 |
| introduce | string | 否 | 介绍 |
| avatar | string | 否 | 头像 URL |

响应 `data`：

```json
{
  "user": {}
}
```

#### PUT `/users/account`

功能：更新当前用户账号信息，包括邮箱、用户名、密码。

鉴权：需要普通用户 token。

Body：

| 字段 | 类型 | 必填 | 说明 |
|---|---|---|---|
| email | string | 否 | 新邮箱 |
| username | string | 否 | 新用户名 |
| current_password | string | 是 | 当前密码 |
| password | string | 否 | 新密码，长度 6-45 |
| passwordConfirmation | string | 否 | 新密码确认，必须与 `password` 一致 |

注意：

- `current_password` 必填。
- `password` 与 `passwordConfirmation` 不一致会返回 400。
- 即使只修改邮箱或用户名，也需要传 `current_password`。

响应 `data`：

```json
{
  "user": {}
}
```

### 3.4 分类

#### GET `/categories`

功能：查询分类列表。

鉴权：不需要。

排序：`rank asc, id desc`。

响应 `data`：

```json
{
  "categories": []
}
```

### 3.5 课程

#### GET `/courses`

功能：按分类查询课程列表。

鉴权：不需要。

Query：

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|---|---|---|---|---|
| categoryId | number | 是 | 无 | 分类 ID |
| currentPage | number | 否 | 1 | 当前页 |
| pageSize | number | 否 | 10 | 每页数量 |

响应 `data`：

```json
{
  "courses": [],
  "pagination": {
    "total": 0,
    "currentPage": 1,
    "pageSize": 10
  }
}
```

说明：课程列表不返回 `content`。

#### GET `/courses/:id`

功能：查询课程详情。

鉴权：不需要。

Path：

| 参数 | 类型 | 必填 | 说明 |
|---|---|---|---|
| id | number | 是 | 课程 ID |

响应 `data`：

```json
{
  "course": {},
  "category": {
    "id": 1,
    "name": "分类名"
  },
  "user": {
    "id": 1,
    "username": "alice",
    "nickname": "Alice",
    "avatar": "https://example.com/a.png",
    "company": "公司"
  },
  "chapters": []
}
```

说明：

- `course` 返回课程详情，包含 `content`。
- `chapters` 仅包含章节 `id`、`title`、`rank`、`createdAt`。

### 3.6 章节

#### GET `/chapters/:id`

功能：查询章节详情。

鉴权：不需要。

Path：

| 参数 | 类型 | 必填 | 说明 |
|---|---|---|---|
| id | number | 是 | 章节 ID |

响应 `data`：

```json
{
  "chapter": {},
  "course": {
    "id": 1,
    "name": "课程名",
    "userId": 1
  },
  "user": {
    "id": 1,
    "username": "alice",
    "nickname": "Alice",
    "avatar": "https://example.com/a.png",
    "company": "公司"
  },
  "chapters": []
}
```

说明：

- `chapter` 返回当前章节详情，包含 `content`。
- `chapters` 返回同一课程下的所有章节列表，不包含 `content`。

### 3.7 文章

#### GET `/articles`

功能：查询文章列表。

鉴权：不需要。

Query：

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|---|---|---|---|---|
| currentPage | number | 否 | 1 | 当前页 |
| pageSize | number | 否 | 10 | 每页数量 |

响应 `data`：

```json
{
  "articles": [],
  "pagination": {
    "total": 0,
    "currentPage": 1,
    "pageSize": 10
  }
}
```

说明：文章列表不返回 `content`。

#### GET `/articles/:id`

功能：查询文章详情。

鉴权：不需要。

Path：

| 参数 | 类型 | 必填 | 说明 |
|---|---|---|---|
| id | number | 是 | 文章 ID |

响应 `data`：

```json
{
  "article": {}
}
```

### 3.8 系统信息

#### GET `/settings`

功能：查询前台系统信息。

鉴权：不需要。

响应 `data`：

```json
{
  "setting": {}
}
```

### 3.9 搜索

#### GET `/search`

功能：搜索课程。

鉴权：不需要。

Query：

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|---|---|---|---|---|
| name | string | 否 | 无 | 课程名称，模糊匹配 |
| currentPage | number | 否 | 1 | 当前页 |
| pageSize | number | 否 | 10 | 每页数量 |

响应 `data`：

```json
{
  "courses": [],
  "pagination": {
    "total": 0,
    "currentPage": 1,
    "pageSize": 10
  }
}
```

### 3.10 点赞

#### POST `/likes`

功能：点赞或取消点赞课程。若当前用户没有点赞过该课程，则点赞；若已点赞，则取消点赞。

鉴权：需要普通用户 token。

Body：

| 字段 | 类型 | 必填 | 说明 |
|---|---|---|---|
| courseId | number | 是 | 课程 ID |

响应 `data`：

```json
{}
```

响应消息：

- 点赞成功：`点赞成功。`
- 取消点赞成功：`取消赞成功。`

#### GET `/likes`

功能：查询当前用户点赞过的课程。

鉴权：需要普通用户 token。

Query：

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|---|---|---|---|---|
| currentPage | number | 否 | 1 | 当前页 |
| pageSize | number | 否 | 10 | 每页数量 |

响应 `data`：

```json
{
  "courses": [],
  "pagination": {
    "total": 0,
    "currentPage": 1,
    "pageSize": 10
  }
}
```

### 3.11 上传

#### POST `/uploads/aliyun`

功能：通过后端中转上传单张图片到阿里云 OSS，并记录附件。

鉴权：需要普通用户 token。

Content-Type：`multipart/form-data`

FormData：

| 字段 | 类型 | 必填 | 说明 |
|---|---|---|---|
| file | File | 是 | 图片文件 |

限制：

- 文件大小最大 5MB。
- 只允许图片 MIME 类型，即 `image/*`。

响应 `data`：

```json
{
  "file": "https://bucket.region.aliyuncs.com/uploads/filename"
}
```

#### GET `/uploads/aliyun_direct`

功能：获取前端直传阿里云 OSS 的授权参数。

鉴权：需要普通用户 token。

响应 `data`：

```json
{
  "expire": "2026-05-14 12:00:00",
  "policy": "base64-policy",
  "signature": "signature",
  "accessid": "access-key-id",
  "host": "https://bucket.region.aliyuncs.com",
  "key": "uploads/uuid",
  "url": "https://bucket.region.aliyuncs.com/uploads/uuid"
}
```

前端直传说明：

- 向 `host` 发起 `POST multipart/form-data`。
- 必须使用后端返回的 `key`。
- 允许文件类型：`image/jpeg`、`image/png`、`image/gif`、`image/webp`。
- 文件大小最大 5MB。
- 上传成功后的图片访问地址使用 `url`。

## 4. 管理后台接口

### 4.1 管理员认证

#### POST `/admin/auth/sign_in`

功能：管理员登录。

鉴权：不需要。

Body：

| 字段 | 类型 | 必填 | 说明 |
|---|---|---|---|
| login | string | 是 | 邮箱或用户名 |
| password | string | 是 | 密码 |

限制：

- 用户必须存在。
- 密码必须正确。
- 用户 `role` 必须等于 `100`。

响应 `data`：

```json
{
  "token": "jwt-token"
}
```

### 4.2 后台分类

#### GET `/admin/categories`

功能：查询分类列表。

鉴权：需要管理员 token。

Query：

| 参数 | 类型 | 必填 | 说明 |
|---|---|---|---|
| name | string | 否 | 分类名称，模糊匹配 |

排序：`rank asc, id asc`。

响应 `data`：

```json
{
  "categories": []
}
```

#### GET `/admin/categories/:id`

功能：查询分类详情。

鉴权：需要管理员 token。

Path：

| 参数 | 类型 | 必填 | 说明 |
|---|---|---|---|
| id | number | 是 | 分类 ID |

响应 `data`：

```json
{
  "category": {}
}
```

#### POST `/admin/categories`

功能：创建分类。

鉴权：需要管理员 token。

Body：

| 字段 | 类型 | 必填 | 说明 |
|---|---|---|---|
| name | string | 是 | 分类名称，唯一，长度 2-45 |
| rank | number | 是 | 排序，正整数 |

响应状态码：201。

响应 `data`：

```json
{
  "category": {}
}
```

#### PUT `/admin/categories/:id`

功能：更新分类。

鉴权：需要管理员 token。

Path：

| 参数 | 类型 | 必填 | 说明 |
|---|---|---|---|
| id | number | 是 | 分类 ID |

Body：

| 字段 | 类型 | 必填 | 说明 |
|---|---|---|---|
| name | string | 否 | 分类名称，唯一，长度 2-45 |
| rank | number | 否 | 排序，正整数 |

响应 `data`：

```json
{
  "category": {}
}
```

#### DELETE `/admin/categories/:id`

功能：删除分类。

鉴权：需要管理员 token。

Path：

| 参数 | 类型 | 必填 | 说明 |
|---|---|---|---|
| id | number | 是 | 分类 ID |

限制：如果分类下存在课程，返回 409，不能删除。

响应 `data`：

```json
{}
```

### 4.3 后台课程

#### GET `/admin/courses`

功能：查询课程列表。

鉴权：需要管理员 token。

Query：

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|---|---|---|---|---|
| categoryId | number | 否 | 无 | 分类 ID，精确匹配 |
| userId | number | 否 | 无 | 创建者用户 ID，精确匹配 |
| name | string | 否 | 无 | 课程名称，模糊匹配 |
| recommended | string | 否 | 无 | 传 `"true"` 或 `"false"` |
| introductory | string | 否 | 无 | 传 `"true"` 或 `"false"` |
| currentPage | number | 否 | 1 | 当前页 |
| pageSize | number | 否 | 10 | 每页数量 |

响应 `data`：

```json
{
  "courses": [
    {
      "id": 1,
      "categoryId": 1,
      "userId": 1,
      "name": "课程名",
      "category": {
        "id": 1,
        "name": "分类名"
      },
      "user": {
        "id": 1,
        "username": "admin",
        "avatar": "https://example.com/avatar.png"
      }
    }
  ],
  "pagination": {
    "total": 0,
    "currentPage": 1,
    "pageSize": 10
  }
}
```

#### GET `/admin/courses/:id`

功能：查询课程详情。

鉴权：需要管理员 token。

Path：

| 参数 | 类型 | 必填 | 说明 |
|---|---|---|---|
| id | number | 是 | 课程 ID |

响应 `data`：

```json
{
  "course": {}
}
```

说明：`course` 包含关联的 `category` 和 `user`。

#### POST `/admin/courses`

功能：创建课程。

鉴权：需要管理员 token。

Body：

| 字段 | 类型 | 必填 | 说明 |
|---|---|---|---|
| categoryId | number | 是 | 分类 ID，必须存在 |
| name | string | 是 | 课程名称，长度 2-45 |
| image | string | 否 | 课程封面 URL |
| recommended | boolean | 否 | 是否推荐 |
| introductory | boolean | 否 | 是否入门课程 |
| content | string | 否 | 课程详情 |

说明：后端会自动将当前管理员用户 ID 写入 `userId`。

响应状态码：201。

响应 `data`：

```json
{
  "course": {}
}
```

#### PUT `/admin/courses/:id`

功能：更新课程。

鉴权：需要管理员 token。

Path：

| 参数 | 类型 | 必填 | 说明 |
|---|---|---|---|
| id | number | 是 | 课程 ID |

Body：

| 字段 | 类型 | 必填 | 说明 |
|---|---|---|---|
| categoryId | number | 否 | 分类 ID，必须存在 |
| name | string | 否 | 课程名称，长度 2-45 |
| image | string | 否 | 课程封面 URL |
| recommended | boolean | 否 | 是否推荐 |
| introductory | boolean | 否 | 是否入门课程 |
| content | string | 否 | 课程详情 |

响应 `data`：

```json
{
  "course": {}
}
```

#### DELETE `/admin/courses/:id`

功能：删除课程。

鉴权：需要管理员 token。

Path：

| 参数 | 类型 | 必填 | 说明 |
|---|---|---|---|
| id | number | 是 | 课程 ID |

限制：如果课程下存在章节，返回 409，不能删除。

响应 `data`：

```json
{}
```

### 4.4 后台章节

#### GET `/admin/chapters`

功能：查询某课程下的章节列表。

鉴权：需要管理员 token。

Query：

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|---|---|---|---|---|
| courseId | number | 是 | 无 | 课程 ID |
| title | string | 否 | 无 | 章节标题，模糊匹配 |
| currentPage | number | 否 | 1 | 当前页 |
| pageSize | number | 否 | 10 | 每页数量 |

排序：`rank asc, id asc`。

响应 `data`：

```json
{
  "chapters": [
    {
      "id": 1,
      "courseId": 1,
      "title": "章节标题",
      "course": {
        "id": 1,
        "name": "课程名"
      }
    }
  ],
  "pagination": {
    "total": 0,
    "currentPage": 1,
    "pageSize": 10
  }
}
```

#### GET `/admin/chapters/:id`

功能：查询章节详情。

鉴权：需要管理员 token。

Path：

| 参数 | 类型 | 必填 | 说明 |
|---|---|---|---|
| id | number | 是 | 章节 ID |

响应 `data`：

```json
{
  "chapter": {}
}
```

说明：`chapter` 包含关联的 `course` 简要信息。

#### POST `/admin/chapters`

功能：创建章节，并增加对应课程的 `chaptersCount`。

鉴权：需要管理员 token。

Body：

| 字段 | 类型 | 必填 | 说明 |
|---|---|---|---|
| courseId | number | 是 | 课程 ID，必须存在 |
| title | string | 是 | 标题，长度 2-45 |
| content | string | 否 | 内容 |
| video | string | 否 | 视频 URL |
| rank | number | 是 | 排序，正整数 |

响应状态码：201。

响应 `data`：

```json
{
  "chapter": {}
}
```

#### PUT `/admin/chapters/:id`

功能：更新章节。

鉴权：需要管理员 token。

Path：

| 参数 | 类型 | 必填 | 说明 |
|---|---|---|---|
| id | number | 是 | 章节 ID |

Body：

| 字段 | 类型 | 必填 | 说明 |
|---|---|---|---|
| courseId | number | 否 | 课程 ID，必须存在 |
| title | string | 否 | 标题，长度 2-45 |
| content | string | 否 | 内容 |
| video | string | 否 | 视频 URL |
| rank | number | 否 | 排序，正整数 |

响应 `data`：

```json
{
  "chapter": {}
}
```

#### DELETE `/admin/chapters/:id`

功能：删除章节，并减少对应课程的 `chaptersCount`。

鉴权：需要管理员 token。

Path：

| 参数 | 类型 | 必填 | 说明 |
|---|---|---|---|
| id | number | 是 | 章节 ID |

响应 `data`：

```json
{}
```

### 4.5 后台文章

#### GET `/admin/articles`

功能：查询文章列表。

鉴权：需要管理员 token。

Query：

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|---|---|---|---|---|
| title | string | 否 | 无 | 文章标题，模糊匹配 |
| currentPage | number | 否 | 1 | 当前页 |
| pageSize | number | 否 | 10 | 每页数量 |

响应 `data`：

```json
{
  "articles": [],
  "pagination": {
    "total": 0,
    "currentPage": 1,
    "pageSize": 10
  }
}
```

#### GET `/admin/articles/:id`

功能：查询文章详情。

鉴权：需要管理员 token。

Path：

| 参数 | 类型 | 必填 | 说明 |
|---|---|---|---|
| id | number | 是 | 文章 ID |

响应 `data`：

```json
{
  "article": {}
}
```

#### POST `/admin/articles`

功能：创建文章。

鉴权：需要管理员 token。

Body：

| 字段 | 类型 | 必填 | 说明 |
|---|---|---|---|
| title | string | 是 | 标题，长度 2-45 |
| content | string | 否 | 内容 |

响应状态码：201。

响应 `data`：

```json
{
  "article": {}
}
```

#### PUT `/admin/articles/:id`

功能：更新文章。

鉴权：需要管理员 token。

Path：

| 参数 | 类型 | 必填 | 说明 |
|---|---|---|---|
| id | number | 是 | 文章 ID |

Body：

| 字段 | 类型 | 必填 | 说明 |
|---|---|---|---|
| title | string | 否 | 标题，长度 2-45 |
| content | string | 否 | 内容 |

响应 `data`：

```json
{
  "article": {}
}
```

#### DELETE `/admin/articles/:id`

功能：删除文章。

鉴权：需要管理员 token。

Path：

| 参数 | 类型 | 必填 | 说明 |
|---|---|---|---|
| id | number | 是 | 文章 ID |

响应 `data`：

```json
{}
```

### 4.6 后台用户

#### GET `/admin/users`

功能：查询用户列表。

鉴权：需要管理员 token。

Query：

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|---|---|---|---|---|
| email | string | 否 | 无 | 邮箱，精确匹配 |
| username | string | 否 | 无 | 用户名，精确匹配 |
| nickname | string | 否 | 无 | 昵称，模糊匹配 |
| role | number | 否 | 无 | 0 普通用户，100 管理员 |
| currentPage | number | 否 | 1 | 当前页 |
| pageSize | number | 否 | 10 | 每页数量 |

响应 `data`：

```json
{
  "users": [],
  "pagination": {
    "total": 0,
    "currentPage": 1,
    "pageSize": 10
  }
}
```

注意：当前实现未排除 `password` 字段，前端不要展示或长期存储返回的密码哈希。

#### GET `/admin/users/me`

功能：查询当前登录管理员信息。

鉴权：需要管理员 token。

响应 `data`：

```json
{
  "user": {}
}
```

注意：当前实现直接返回 `req.user`，可能包含 `password` 哈希。

#### GET `/admin/users/:id`

功能：查询用户详情。

鉴权：需要管理员 token。

Path：

| 参数 | 类型 | 必填 | 说明 |
|---|---|---|---|
| id | number | 是 | 用户 ID |

响应 `data`：

```json
{
  "user": {}
}
```

注意：当前实现可能返回 `password` 哈希。

#### POST `/admin/users`

功能：创建用户。

鉴权：需要管理员 token。

Body：

| 字段 | 类型 | 必填 | 说明 |
|---|---|---|---|
| email | string | 是 | 邮箱，唯一 |
| username | string | 是 | 用户名，唯一，长度 2-45 |
| password | string | 是 | 密码，长度 6-45 |
| nickname | string | 是 | 昵称，长度 2-45 |
| sex | number | 是 | 0 男，1 女，2 未选择 |
| company | string | 否 | 公司 |
| introduce | string | 否 | 介绍 |
| role | number | 是 | 0 普通用户，100 管理员 |
| avatar | string | 否 | 头像 URL |

响应状态码：201。

响应 `data`：

```json
{
  "user": {}
}
```

#### PUT `/admin/users/:id`

功能：更新用户。

鉴权：需要管理员 token。

Path：

| 参数 | 类型 | 必填 | 说明 |
|---|---|---|---|
| id | number | 是 | 用户 ID |

Body：

| 字段 | 类型 | 必填 | 说明 |
|---|---|---|---|
| email | string | 否 | 邮箱，唯一 |
| username | string | 否 | 用户名，唯一，长度 2-45 |
| password | string | 否 | 密码，长度 6-45；传入时会重新加密 |
| nickname | string | 否 | 昵称，长度 2-45 |
| sex | number | 否 | 0 男，1 女，2 未选择 |
| company | string | 否 | 公司 |
| introduce | string | 否 | 介绍 |
| role | number | 否 | 0 普通用户，100 管理员 |
| avatar | string | 否 | 头像 URL |

响应 `data`：

```json
{
  "user": {}
}
```

### 4.7 后台设置

#### GET `/admin/settings`

功能：查询系统设置。

鉴权：需要管理员 token。

响应 `data`：

```json
{
  "setting": {}
}
```

#### PUT `/admin/settings`

功能：更新系统设置。

鉴权：需要管理员 token。

Body：

| 字段 | 类型 | 必填 | 说明 |
|---|---|---|---|
| name | string | 否 | 站点名称 |
| icp | string | 否 | ICP 备案号 |
| copyright | string | 否 | 版权信息 |

响应 `data`：

```json
{
  "setting": {}
}
```

### 4.8 后台图表

#### GET `/admin/charts/sex`

功能：统计用户性别分布。

鉴权：需要管理员 token。

响应 `data`：

```json
{
  "data": [
    {
      "value": 10,
      "name": "男性"
    },
    {
      "value": 8,
      "name": "女性"
    },
    {
      "value": 3,
      "name": "未选择"
    }
  ]
}
```

#### GET `/admin/charts/user`

功能：统计每个月用户数量。

鉴权：需要管理员 token。

响应 `data`：

```json
{
  "data": {
    "months": ["2024-05", "2024-06"],
    "values": [12, 30]
  }
}
```

注意：该接口当前代码的异常处理里存在变量名错误，成功查询不受影响。

### 4.9 后台附件

#### GET `/admin/attachments`

功能：查询附件列表。

鉴权：需要管理员 token。

Query：

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|---|---|---|---|---|
| currentPage | number | 否 | 1 | 当前页 |
| pageSize | number | 否 | 10 | 每页数量 |

响应 `data`：

```json
{
  "attachments": [
    {
      "id": 1,
      "url": "https://example.com/file.png",
      "user": {
        "id": 1,
        "username": "alice",
        "avatar": "https://example.com/avatar.png"
      }
    }
  ],
  "pagination": {
    "total": 0,
    "currentPage": 1,
    "pageSize": 10
  }
}
```

#### DELETE `/admin/attachments/:id`

功能：删除附件。会先删除阿里云 OSS 文件，再删除数据库附件记录。

鉴权：需要管理员 token。

Path：

| 参数 | 类型 | 必填 | 说明 |
|---|---|---|---|
| id | number | 是 | 附件 ID |

响应 `data`：

```json
{}
```

## 5. 给大模型生成接口调用代码的提示词建议

可以把本段和接口文档一起提供给大模型：

```text
请基于接口文档生成前端 API client。
要求：
1. baseURL 从环境变量读取，默认 http://localhost:3000。
2. token 存在时放到请求头 token 字段，不要使用 Authorization Bearer。
3. GET 接口参数放 params，POST/PUT 接口参数放 JSON body。
4. 文件上传 POST /uploads/aliyun 使用 FormData，字段名 file。
5. 每个响应先判断 response.data.status 是否为 true。
6. 失败时读取 response.data.errors，这是字符串数组。
7. 分页接口统一传 currentPage 和 pageSize。
8. 不要在前端展示或持久化后端返回的 password 字段。
```

## 6. 接口清单速查

| 模块 | 方法 | 路径 | 鉴权 | 功能 |
|---|---|---|---|---|
| 首页 | GET | `/` | 否 | 首页数据 |
| 认证 | POST | `/auth/sign_up` | 否 | 用户注册 |
| 认证 | POST | `/auth/sign_in` | 否 | 用户登录 |
| 用户 | GET | `/users/me` | 用户 | 当前用户信息 |
| 用户 | PUT | `/users/info` | 用户 | 更新个人资料 |
| 用户 | PUT | `/users/account` | 用户 | 更新账号信息 |
| 分类 | GET | `/categories` | 否 | 前台分类列表 |
| 课程 | GET | `/courses` | 否 | 前台课程列表 |
| 课程 | GET | `/courses/:id` | 否 | 前台课程详情 |
| 章节 | GET | `/chapters/:id` | 否 | 前台章节详情 |
| 文章 | GET | `/articles` | 否 | 前台文章列表 |
| 文章 | GET | `/articles/:id` | 否 | 前台文章详情 |
| 设置 | GET | `/settings` | 否 | 前台系统信息 |
| 搜索 | GET | `/search` | 否 | 搜索课程 |
| 点赞 | POST | `/likes` | 用户 | 点赞/取消赞 |
| 点赞 | GET | `/likes` | 用户 | 我的点赞课程 |
| 上传 | POST | `/uploads/aliyun` | 用户 | 后端中转上传 |
| 上传 | GET | `/uploads/aliyun_direct` | 用户 | 获取 OSS 直传参数 |
| 后台认证 | POST | `/admin/auth/sign_in` | 否 | 管理员登录 |
| 后台分类 | GET | `/admin/categories` | 管理员 | 分类列表 |
| 后台分类 | GET | `/admin/categories/:id` | 管理员 | 分类详情 |
| 后台分类 | POST | `/admin/categories` | 管理员 | 创建分类 |
| 后台分类 | PUT | `/admin/categories/:id` | 管理员 | 更新分类 |
| 后台分类 | DELETE | `/admin/categories/:id` | 管理员 | 删除分类 |
| 后台课程 | GET | `/admin/courses` | 管理员 | 课程列表 |
| 后台课程 | GET | `/admin/courses/:id` | 管理员 | 课程详情 |
| 后台课程 | POST | `/admin/courses` | 管理员 | 创建课程 |
| 后台课程 | PUT | `/admin/courses/:id` | 管理员 | 更新课程 |
| 后台课程 | DELETE | `/admin/courses/:id` | 管理员 | 删除课程 |
| 后台章节 | GET | `/admin/chapters` | 管理员 | 章节列表 |
| 后台章节 | GET | `/admin/chapters/:id` | 管理员 | 章节详情 |
| 后台章节 | POST | `/admin/chapters` | 管理员 | 创建章节 |
| 后台章节 | PUT | `/admin/chapters/:id` | 管理员 | 更新章节 |
| 后台章节 | DELETE | `/admin/chapters/:id` | 管理员 | 删除章节 |
| 后台文章 | GET | `/admin/articles` | 管理员 | 文章列表 |
| 后台文章 | GET | `/admin/articles/:id` | 管理员 | 文章详情 |
| 后台文章 | POST | `/admin/articles` | 管理员 | 创建文章 |
| 后台文章 | PUT | `/admin/articles/:id` | 管理员 | 更新文章 |
| 后台文章 | DELETE | `/admin/articles/:id` | 管理员 | 删除文章 |
| 后台用户 | GET | `/admin/users` | 管理员 | 用户列表 |
| 后台用户 | GET | `/admin/users/me` | 管理员 | 当前管理员信息 |
| 后台用户 | GET | `/admin/users/:id` | 管理员 | 用户详情 |
| 后台用户 | POST | `/admin/users` | 管理员 | 创建用户 |
| 后台用户 | PUT | `/admin/users/:id` | 管理员 | 更新用户 |
| 后台设置 | GET | `/admin/settings` | 管理员 | 设置详情 |
| 后台设置 | PUT | `/admin/settings` | 管理员 | 更新设置 |
| 后台图表 | GET | `/admin/charts/sex` | 管理员 | 性别统计 |
| 后台图表 | GET | `/admin/charts/user` | 管理员 | 月用户统计 |
| 后台附件 | GET | `/admin/attachments` | 管理员 | 附件列表 |
| 后台附件 | DELETE | `/admin/attachments/:id` | 管理员 | 删除附件 |
