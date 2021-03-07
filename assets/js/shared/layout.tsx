import React, { useEffect } from 'react'
import { Flex, useColorModeValue as mode } from '@chakra-ui/react'
import { useQuery } from '@apollo/client'
import { useSelector } from 'react-redux'
import { FaCaretRight } from 'react-icons/fa'
import { Box, Stack, Text, HStack } from '@chakra-ui/react'
import AccountSettings from '~/shared/account_settings'
import { layout, useAppDispatch, RootState } from '~/store'
import GET_ME from '~/api/queries/me.gql'
import GET_CONVERSATIONS from '~/api/queries/conversations.gql'


interface NavItemProps {
	href?: string
	label: string
	subtle?: boolean
	active?: boolean
	icon: React.ReactElement
	endElement?: React.ReactElement
	children?: React.ReactNode
}

export const NavGroup = (props: { label: string; children: React.ReactNode }) => {
	const { label, children } = props
	return (
		<Box>
			<Text
				px="3"
				fontSize="xs"
				fontWeight="semibold"
				textTransform="uppercase"
				letterSpacing="widest"
				color="gray.500"
				mb="3"
			>
				{label}
			</Text>
			<Stack spacing="1">{children}</Stack>
		</Box>
	)
}

export const NavItem = (props: NavItemProps) => {
	const { active, subtle, icon, children, label, endElement } = props
	return (
		<HStack
			w="full"
			px="3"
			py="2"
			cursor="pointer"
			userSelect="none"
			rounded="md"
			transition="all 0.2s"
			bg={active ? 'gray.700' : undefined}
			_hover={{ bg: 'gray.700' }}
			_active={{ bg: 'gray.600' }}
		>
			<Box fontSize="lg" color={active ? 'currentcolor' : 'gray.400'}>
				{icon}
			</Box>
			<Box flex="1" fontWeight="inherit" color={subtle ? 'gray.400' : undefined}>
				{label}
			</Box>
			{endElement && !children && <Box>{endElement}</Box>}
			{children && <Box
				fontSize="xs"
				flexShrink={0}
				as={FaCaretRight}
			/>}
		</HStack>
	)
}

interface MeQuery {
	me?: User
}

interface ConversationsQuery {
	conversations: Array<Conversation>
}


const Layout: React.FC = (props) => {
	const dispatch = useAppDispatch()
	const user = useSelector((store: RootState) => store.layout.user)
	const MeQuery = useQuery<MeQuery>(GET_ME)
	const selectedConversation = useSelector((store: RootState) => store.layout.conversation)
	const GetConversationsQuery = useQuery<ConversationsQuery>(GET_CONVERSATIONS)
	useEffect(() => {
		if (MeQuery.data && MeQuery.data.me)
			dispatch(layout.actions.setUser(MeQuery.data.me))
	}, [MeQuery.data])

	return <Box height="100vh" overflow="hidden" position="relative">
		<Flex h="full" id="app-container">
			<Box w="64" bg="gray.900" color="white" fontSize="sm">
				<Flex h="full" direction="column" px="4" py="4">
					<AccountSettings />
					<Stack spacing="8" flex="1" overflow="auto" pt="8">
						<Stack spacing="1">
							{/* <NavItem active icon={<BiHome />} label="Get Started" />
							<NavItem icon={<BiCommentAdd />} label="Inbox" /> */}
						</Stack>
						<NavGroup label="Conversations">
							{ }
							{/* <NavItem icon={ } label={conversation.title} /> */}
						</NavGroup>
					</Stack>
					<Box>
						<Stack spacing="1">
							{/* <NavItem subtle icon={<BiCog />} label="Settings" /> */}
						</Stack>
					</Box>
				</Flex>
			</Box>
			<Box bg={mode('white', 'gray.800')} flex="1" p="6">
				<Box
					w="full"
					h="full"
					rounded="lg"
					// border="3px dashed currentColor"
					color={mode('gray.200', 'gray.700')}
				>
					{props.children}
				</Box>
			</Box>
		</Flex>
	</Box>
	// <Container>
	// 	<Header>
	// 		<Navigation user={user} />
	// 	</Header>
	// 	<Error error={error} />
	// 	<Loading loading={loading} />
	// 	{props.children}
	// </Container>
}

export default Layout