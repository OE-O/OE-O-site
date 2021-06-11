import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';

import { auth, firestore } from '@lib/firebase';

// Custom hook to read  auth record and user profile doc
export function useUserData() {
	const [user] = useAuthState(auth);
	const [username, setUsername] = useState(null);
	const [admin, setAdmin] = useState(false);

	useEffect(() => {
		// turn off realtime subscription
		let unsubscribe;

		if (user) {
			const ref = firestore.collection('users').doc(user.uid);
			unsubscribe = ref.onSnapshot((doc) => {
				setUsername(doc.data()?.username);
				setAdmin(doc.data()?.admin);
			});
		} else {
			setUsername(null);
			setAdmin(false);
		}

		return unsubscribe;
	}, [user]);

	return { user, username, admin };
}
