import Link from 'next/link';

import styles from '@styles/ModFeed.module.css'

export default function PostFeed({ mods, admin = false }) {
	return mods ? mods.map((mod) => <ModItem mod={mod} key={mod.id} admin={admin} />) : null;
}

function ModItem({ mod, admin = false }) {
	return (
		<div className={styles.card}>
			<div className={styles.title}>
				<h2>{mod.name}</h2>
				<p style={{ margin: '0 0.3em 0 0' }}><small>{mod.game}</small></p>
			</div>
			<p>{mod.about}</p>

			<Link href={`/mods/${mod.id}`}>
				<button style={{ background: '#AD91FF', color: '#23272A' }}>View</button>
			</Link>

			{/* If admin view, show extra controls for user */}
			{admin && (
				<>
					<Link href={`mods/${mod.id}/edit`}>
						<h3>
							<button className="btn-blue">Edit</button>
						</h3>
					</Link>

					{mod.published ? <p className="text-success">Live</p> : <p className="text-danger">Unpublished</p>}
				</>
			)}
		</div>
	);
}