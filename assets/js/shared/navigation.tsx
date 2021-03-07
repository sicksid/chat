import React from 'react'
import {
	Link
} from 'react-router-dom'
import { useApolloClient } from '@apollo/client'
import { useHistory } from 'react-router-dom'
import { layout, useAppDispatch } from '~/store'

interface NavigationProps {
	user?: User
}

const Navigation: React.FC<NavigationProps> = (props) => {
	const client = useApolloClient()
	const history = useHistory()
	const dispatch = useAppDispatch()

	const handleLogout = () => {
		localStorage.removeItem('auth-token')
		client.resetStore()
		history.push('/')
		dispatch(layout.actions.setUser())
	}

	return <div />
	// <Navbar>
	// 	<Navbar.Header className="flex items-center">
	// 		<Link to="/" className="p-2">
	// 			Chat
	// 		</Link>
	// 	</Navbar.Header>
	// 	<Navbar.Body>
	// 		<Nav pullRight>
	// 			{!props.user ? <>
	// 				<Nav.Item>
	// 					<Link to="/login">
	// 						Log in
	// 					</Link>
	// 				</Nav.Item>
	// 				<Nav.Item>
	// 					<Link to="/sign-up">
	// 						Sign up
	// 					</Link>
	// 				</Nav.Item>
	// 			</> : <>
	// 					<Nav.Item>
	// 						<a
	// 							href="#"
	// 							onClick={handleLogout}>
	// 							Exit
	// 						</a>
	// 					</Nav.Item>
	// 				</>}
	// 		</Nav>
	// 	</Navbar.Body>
	// </Navbar >

}

export default Navigation