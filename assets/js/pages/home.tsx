import React from 'react'
import { Container } from "@chakra-ui/react"
import Layout from '~/shared/layout'
import Chat from '~/components/chat'
import { useSelector } from 'react-redux'
import { RootState } from '~/store'

export default () => {
	const conversation = useSelector((store: RootState) => store.layout.conversation)
	const user = useSelector((store: RootState) => store.layout.user)
	return <Layout>
		<Container>
			{user && conversation && conversation.id &&
				<Chat conversation={conversation} />}
		</Container>
	</Layout>
}