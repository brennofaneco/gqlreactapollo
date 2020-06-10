import React from 'react';
import {
	render,
	cleanup,
	findByTestId,
	findByText
} from '@testing-library/react';

import { MockedProvider } from '@apollo/react-testing';

import PostForm, { CREATE_POST_MUTATION } from '../components/PostForm';

const mocks = [
	{
		request: {
			query: CREATE_POST_MUTATION,
			variables: {
				body: 'body'
			}
		},
		result: {
			data: {
				post: {
					body: 'body'
				}
			}
		}
	}
];

describe('Post', () => {
	afterEach(cleanup);

	it('should render create post', async () => {
		const { container } = render(
			<MockedProvider mocks={mocks} addTypename={false}>
				<PostForm />
			</MockedProvider>
		);

		const titleElement = await findByTestId(container, 'create-post');

		expect(titleElement).toBeTruthy();
	});
});
