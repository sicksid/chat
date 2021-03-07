import React from 'react'
import {
	Link
} from 'react-router-dom'
import { useApolloClient } from '@apollo/client'
import { useHistory } from 'react-router-dom'
import { layout, useAppDispatch } from '~/store'
import {
	Box,
	Flex,
	FlexProps,
	HStack,
	Img,
	Menu,
	MenuDivider,
	MenuItem,
	MenuList,
	Text,
	useMenuButton,
} from '@chakra-ui/react'
import { FaCaretDown } from 'react-icons/fa'

interface Props {
	user?: User
}

interface AccountSettingsButtonProps extends FlexProps {
	user?: User
}

const AccountSettingsButton: React.FC<AccountSettingsButtonProps> = (props) => {
	const buttonProps = useMenuButton(props)
	return (
		<Flex
			as="button"
			{...buttonProps}
			w={'full'}
			display={'flex'}
			alignItems={'center'}
			rounded={'lg'}
			bg={'gray.700'}
			px={'3'}
			py={'2'}
			fontSize={'sm'}
			userSelect={'none'}
			cursor={'pointer'}
			outline={'0'}
			transition={'all 0.2s'}
			_active={{ bg: 'gray.600' }}
			_focus={{ shadow: 'outline' }}
		>
			<HStack flex="1" spacing="3">
				<Img
					w="8"
					h="8"
					rounded="md"
					objectFit="cover"
					src=""
					alt=""
				/>
				<Box textAlign="start">
					<Box isTruncated fontWeight="semibold">
						{props.user?.email || <Text>
							Sign Up
						</Text>}
					</Box>
					<Box fontSize="xs" color="gray.400">
						ID {props.user?.id}
					</Box>
				</Box>
			</HStack>
			<Box fontSize="lg" color="gray.400" as={FaCaretDown} />
		</Flex>
	)
}

const AccountSettings: React.FC<Props> = ({ user }) => {
	const client = useApolloClient()
	const history = useHistory()
	const dispatch = useAppDispatch()

	const handleLogout = () => {
		localStorage.removeItem('auth-token')
		client.resetStore()
		history.push('/')
		dispatch(layout.actions.setUser())
	}

	const handleSettings = () => {
		history.push('/settings')
	}

	return (
		<Menu>
			<AccountSettingsButton user={user} />
			<MenuList shadow="lg" py="4" color="gray.600" px="3">
				<MenuItem rounded="md" onClick={handleSettings}>Add an account</MenuItem>
				<MenuDivider />
				<MenuItem rounded="md" onClick={handleLogout}>Logout</MenuItem>
			</MenuList>
		</Menu>
	)
}

export default AccountSettings;