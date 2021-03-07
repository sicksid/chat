import React from 'react'
import { useMutation } from '@apollo/client'
import { FaPlus } from 'react-icons/fa'
import { useForm, useField } from 'react-final-form-hooks'
import { Input, FormControl, FormLabel, FormErrorMessage, Button, Modal, ModalBody, ModalFooter, useDisclosure } from '@chakra-ui/react'

import CREATE_CONVERSATION from '~/api/mutations/create_conversation.gql'
import { layout, useAppDispatch, RootState } from '~/store'

interface ConversationsProps {
  user?: User
}

interface ConversationMutation {
  createConversation: Conversation
}
interface ValidationErrors {
  title?: "Required" | "Please add a more descriptive title"
}

const Conversations: React.FC<ConversationsProps> = props => {
  const { isOpen, onClose, onOpen } = useDisclosure()
  const dispatch = useAppDispatch()

  const [create] = useMutation<ConversationMutation>(CREATE_CONVERSATION)
  const onSubmit = ({ title: conversationName }) => {
    create({ variables: { title: conversationName } })
    onClose()
  }

  const validate = ({ title: conversationName }: Conversation) => {
    const errors: ValidationErrors = {}
    if (!conversationName) {
      errors.title = "Required"
    }

    if (conversationName && conversationName.length < 10) {
      errors.title = "Please add a more descriptive title"
    }

    return errors
  }
  const { form, handleSubmit } = useForm({
    onSubmit,
    validate
  })

  const title = useField('title', form)


  // useEffect(() => {
  //   if (query.data) dispatch(layout.actions.setConversations(query.data.conversations))
  // }, [query.data])

  return props.user ? <>
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalBody>
        <form onSubmit={handleSubmit}>
          <FormControl>
            <FormLabel>Title</FormLabel>
            <Input
              {...title.input}
              placeholder="title" />
            {title.meta.touched && title.meta.error && <FormErrorMessage></FormErrorMessage>}
          </FormControl>
        </form>
      </ModalBody>
      <ModalFooter>
        <Button
          type="submit">
          <FaPlus />
          Create
        </Button>
      </ModalFooter>
    </Modal>
    <Button onClick={onOpen}>
      Create Conversation
    </Button>
  </> : <div />
}

export default Conversations
