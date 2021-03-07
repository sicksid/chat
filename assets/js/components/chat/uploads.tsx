import React from 'react'
import { useMutation } from '@apollo/client'
import { FaTimes, FaUpload, FaFileArchive } from 'react-icons/fa'
import Loading from '~/components/loading'
import CREATE_ATTACHMENT_MUTATION from '~/api/mutations/create_attachment.gql'


interface Props {
  files?: Array<File>,
  conversation: Conversation,
  removeFile: (file: File, index: number) => void
}

const Uploads: React.FC<Props> = props => {
  const [createAttachment, createAttachmentOptions] = useMutation(CREATE_ATTACHMENT_MUTATION)
  const uploadAttachments = () => {
    props.files?.forEach((file: File) => {
      // TODO: maybe remove file from this component here `props.removeFile`
      createAttachment({
        variables: {
          conversationId: props.conversation.id,
          attachment: file
        }
      })
    })
  }

  return <div className={`mt-1 flex-none justify-self-end ${props.files?.length === 0 && "hidden"}`}>
    <div className="flex flex-row space-x-4">
      {createAttachmentOptions.loading ?
        <Loading loading={true} />
        : props.files?.map((file: File, index: number) =>
          <div key={index} className="rounded-md p-4 border">
            <div className="flex">
              <div className="flex-shrink-0">
                <FaFileArchive />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-black">
                  {file.name}
                </p>
              </div>
              <div className="ml-auto pl-3">
                <div className="-mx-1.5 -my-1.5">
                  <button onClick={() => props.removeFile(file, index)} className="inline-flex rounded-md p-1.5 text-black hover:bg-indigo-100 focus:outline-none focus:ring-2 focus:ring-offset-2">
                    <span className="sr-only">Dismiss</span>
                    <FaTimes />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
    </div>
    <div className="px-4 py-3 bg-gray-50 sm:px-6 flex items-center justify-end">
      <button className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        onClick={uploadAttachments}>
        Send <FaUpload />
      </button>
    </div>
  </div>
}

export default Uploads