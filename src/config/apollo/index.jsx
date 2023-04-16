import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';

const apolloClient = new ApolloClient({
	link: new HttpLink({
		uri: 'https://elegant-hen-80.hasura.app/v1/graphql',
		headers: {
			'x-hasura-admin-secret':
				'hl9Qz8qr4JFkI4hmAna0zE2RaL1bJ2ugm8ZrXb4GnGwM3RnPQp0Z6S1gl11Y90ZF',
		},
	}),
	cache: new InMemoryCache(),
});

export default apolloClient;
