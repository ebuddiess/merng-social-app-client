import { ApolloClient, InMemoryCache , ApolloLink , HttpLink , concat } from '@apollo/client';

const httpLink = new HttpLink({ uri: "http://localhost:5000" });


const authMiddleware = new ApolloLink((operation, forward) => {
    const token = localStorage.getItem('token')
    // add the authorization to the headers
    operation.setContext({
      headers: {
        authorization: token ? `Bearer ${token}` : ' '
      }
    });
  
    return forward(operation);
})


export const client = new ApolloClient({
    link : concat(authMiddleware,httpLink),
    cache : new InMemoryCache() ,
})

