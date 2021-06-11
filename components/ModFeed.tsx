import Link from 'next/link';
import ReactMarkdown from 'react-markdown';

import styles from '@styles/ModFeed.module.scss';

export default function PostFeed({ mods, admin = false }) {
	return mods
		? mods.map((mod) => <ModCard mod={mod} key={mod.id} admin={admin} />)
		: null;
}

function ModCard({ mod, admin = false }) {
	return (
		<div className={styles.card}>
			<div className={styles.title}>
				<h2>{mod.name}</h2>
				<p style={{ margin: '0 0.3em 0 0' }}>
					<small>{mod.game}</small>
				</p>
			</div>
			<ReactMarkdown>{mod.about}</ReactMarkdown>

			<Link href={`/mods/${mod.id}`}>
				<a>
					<button style={{ background: '#AD91FF', color: '#23272A' }}>
						View
					</button>
				</a>
			</Link>

			{/* If admin view, show extra controls for user */}
			{admin && (
				<>
					<Link href={`admin/mods/${mod.id}`}>
						<h3>
							<button className='btn-blue'>Edit</button>
						</h3>
					</Link>

					{mod.published ? (
						<p className='text-success'>Live</p>
					) : (
						<p className='text-danger'>Unpublished</p>
					)}
				</>
			)}
		</div>
	);
}
