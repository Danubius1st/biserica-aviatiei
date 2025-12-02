'use client';

import { ApolloLink, Observable } from '@apollo/client';

export const createGraphqlLogLink = () => {
  return new ApolloLink((operation, forward) => {
    const startTime = Date.now();

    // console.log(`[GraphQL Request] Operation: ${operation.operationName}`);
    // console.log('Variables:', JSON.stringify(operation.variables, null, 2));

    return new Observable((observer) => {
      // Înaintează cererea și abonează-te la răspuns
      const subscription = forward(operation).subscribe({
        next: (response) => {
          const endTime = Date.now();
          const duration = endTime - startTime;

          // Jurnalizează operațiunea și durata
          if (process.env.NODE_ENV !== 'production') {
            console.log('lib/graphql-log-link.ts:');
            console.log(`[GraphQL Response] Operation: ${operation.operationName}`);
            console.log(`Duration: ${duration}ms`);

            // Gestionează erorile GraphQL
            if (response.errors) {
              console.log('[GraphQL Errors]:', response.errors.map((err) => ({
                message: err.message,
                locations: err.locations,
                path: err.path,
                extensions: err.extensions,
              })));
            } else {
              // Log răspunsul dacă nu există erori
              console.log('Response data:', JSON.stringify(response.data, null, 2));
            }
          }
          // Transmite răspunsul mai departe
          observer.next(response);
        },
        error: (error) => {
          observer.error(error);
        },
        complete: () => {
          observer.complete();
        },
      });

      // Returnează funcția de curățare pentru a anula abonamentul
      return () => subscription.unsubscribe();
    });
  });
};
