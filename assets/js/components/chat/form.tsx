import React, { useState, useCallback } from 'react'
import { useMutation } from '@apollo/client'
import { Button, Box } from '@chakra-ui/react'
import { useDropzone } from 'react-dropzone'
import { FaPaperclip } from 'react-icons/fa'
import { useForm, useField } from 'react-final-form-hooks'
import Uploads from "./uploads"
import CREATE_MESSAGE_MUTATION from '~/api/mutations/create_message.gql'

interface Props {
  conversation: Conversation
}

interface ValidationErrors {
  content?: "Required"
}

const Form: React.FC<Props> = (props) => {
  const [files, setFiles] = useState<Array<File>>([])
  const [sendMessage] = useMutation(CREATE_MESSAGE_MUTATION)
  const onSubmit = ({ content }: Message) => {
    sendMessage({ variables: { content, conversationId: props.conversation.id } }).then(() =>
      form.reset()
    )
  }

  const validate = ({ content }: Message) => {
    const errors: ValidationErrors = {}
    if (!content) {
      errors.content = "Required"
    }

    return errors
  }

  const { form, handleSubmit } = useForm({
    onSubmit,
    validate
  })
  const content = useField('content', form)

  const onDrop = useCallback(files => setFiles(files), [])
  const { getRootProps, getInputProps, isDragActive, open: openFileBrowser } = useDropzone({
    onDrop,
    noClick: true,
    noKeyboard: true
  })

  const removeFile = (_file: File, index: number) => {
    setFiles(files.filter((_f, i) => i !== index))
  }


  return <Box>
    <Uploads files={files} conversation={props.conversation} removeFile={removeFile} />
    <form className="flex-none justify-self-end" onSubmit={handleSubmit}>
      <Box data-testid="dropzone" {...getRootProps()}>
        {isDragActive && <p className="text-blue">Drop your files here</p>}
        <textarea
          {...content.input}
          rows={3}
          className="bg-black shadow-sm mt-1 block w-full sm:text-sm"
          placeholder="Write down a message!">
        </textarea>
      </Box>
      <Box>
        <Button onClick={openFileBrowser} >
          <FaPaperclip />
          <input className="hidden" {...getInputProps()} />
        </Button>

        <Button type="submit">
          Send
        </Button>
      </Box>
    </form>
  </Box>
}

export default Form