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
`;

const resolvers = {
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
};

// Put together a schema
const schema = makeExecutableSchema({
    typeDefs,
    resolvers
});

export default schema;