# API新玩法 -- GraphQL

## 介绍
GraphQL是一个用于API的查询语言,是一个使用基于类型系统来执行查询的服务器运行时。GraphQL并没有和任何特定数据库或者存储引擎绑定，而是依靠你现有的代码和数据引擎。本文主要讲解GraphQL的内容和使用。

## 安装

* 1.打开终端切换到项目目录下,需要安装node.js,npm或yarn
* 2.npm install 或 yarn install
* 3.启动 npm run start
* 4.启动浏览器打开http://localhost:3000/graphiql

## 基本内容讲解
* 参考文档： [GraphQL中文文档](http://www.mchz.com.cn/meichuang/)
### 查询和变更
#### 字段
GraphQL 是关于请求对象上的特定字段
```
#查询
query AuthorInfo{
  author{
    id
    firstName
    posts{
      id,
      title
    }
  }
}
```
#### 实用的例子
1. example-1
```
#查询
query AuthorInfo($firstName: String="Jet", $flag: Boolean=false){
  leftPeople:author(firstName: $firstName){
    id @include(if: $flag)
    firstName
    posts{
      id,
      title
    }
  }
}

#paramters
{
    "firstName": "Jet",
    "flag": true
}
```
2. example-2
```
#查询
query AuthorInfo($firstName: String="Jet", $lastName: String, $flag: Boolean=true){
  hahaAuthor:author(firstName: $firstName, lastName: $lastName){
  	...comparisonFields
  }
  heheAuthor:author(firstName: "Jack", lastName: "chen"){
  	...comparisonFields
  }
}

fragment comparisonFields on Author {
  id
  firstName
  posts @include(if: $flag){
  	id,
    title
	}
}
#parameters
{
  "lastName": "li",
  "flag": true
}
```
3. example-3
```
#变更
mutation hahha($id: Int!, $review: ReviewInput){
  createReview(id:$id, review: $review) {
    id,
    stars,
    commentary
  }
}
#parameter
{
  "id": 12356,
  "review": {
    "stars": 5,
    "commentary": "hello world"
  }
}
```

4. example-4 
```
#内省
{
  __type(name: "Author") {
    name
    fields {
      name
      type {
        name
      }
    }
  }
}

```
5. example-5
```
#schema
`
type Author {  
  id: Int
  firstName: String
  lastName: String
  posts: [Post]
}
type Post { 
  id: Int
  title: String
  text: String
  views: Int
  author: Author
}
type Query { 
  author(firstName: String, lastName: String): Author 
  getFortuneCookie: String
}
input ReviewInput {
    stars: Int!
    commentary: String
}

type Review {
    id: Int!,
    stars: Int!
    commentary: String
}
type Mutation {
    createReview(id: Int!, review: ReviewInput): Review
}
`
#resolver
{
    Mutation: {
        createReview(root, args) {
            return { id: args.id, ...args.review };
        }
    },
    Query: {
        author(root, args) { // args就是上面schema中author的入参
            return { id: 1, firstName: args.firstName, lastName: args.lastName };
        },
        getFortuneCookie(root) {
            return "Hello world"
        }
    },
    Author: {
        // 定义author中的posts
        posts(author) {
            console.log(author)
            return [
                { id: 1, title: 'A post', text: 'Some text', views: 2 },
                { id: 2, title: 'Another post', text: 'Some other text', views: 200 }
            ];
        },
    },
    Post: {
        // 定义Post里面的author
        author(post) {
            return { id: 1, firstName: 'Hello', lastName: 'World' };
        },
    },
}

```

## restful（表现层状态转化）参考
```
HTTP/1.1
GET
/posts/1
```

## 思考
graphQL会火起来吗?会成为一个革命性的API工具吗？

## 小小实战
和react结合使用

## 技术栈
* javascprt@es6
* babel@6.23.0
* express@4.13.1
* graphql@0.12.3

