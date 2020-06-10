import React, { useContext } from 'react';
import { useQuery } from '@apollo/react-hooks';

import { Grid, Transition } from 'semantic-ui-react';
import { AuthContext } from '../context/auth';
import { FETCH_POSTS_QUERY } from '../utils/graphql';

import PostCard from '../components/PostCard';
import PostForm from '../components/PostForm';

const Home = () => {
	// const { loading, error, data } = useQuery(FETCH_POSTS_QUERY);

	// if (loading) return <div>Loading</div>;
	// if (error) return <p>ERROR</p>;
	// if (!data) return <p>Not found</p>;

	// const posts = data.getPosts;
	// console.log(posts);

	const { user } = useContext(AuthContext);

	const { loading, data: { getPosts: posts } = {} } = useQuery(
		FETCH_POSTS_QUERY
	);

	return (
		<Grid columns={3} divided>
			<Grid.Row className="page-title">
				<h1>Recent Posts</h1>
			</Grid.Row>
			<Grid.Row>
				{user && (
					<Grid.Column>
						<PostForm />
					</Grid.Column>
				)}
				{loading ? (
					<h1>Loading posts..</h1>
				) : (
					<Transition.Group>
						{posts &&
							posts.map((post) => (
								<Grid.Column key={post.id}>
									<PostCard post={post} />
								</Grid.Column>
							))}
					</Transition.Group>
				)}
			</Grid.Row>
		</Grid>
	);
};

export default Home;
