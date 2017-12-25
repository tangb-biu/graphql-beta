import { makeExecutableSchema } from 'graphql-tools';

const typeDefs = `
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
`;

const resolvers = {
    Query: {
        author(root, args) { // args就是上面schema中author的入参
            return { id: 1, firstName: args.firstName, lastName: args.lastName };
        },
    },
    Author: {
        // 定义author中的posts
        posts(author) {
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
};

// Put together a schema
const schema = makeExecutableSchema({
    typeDefs,
    resolvers
});

export default schema;