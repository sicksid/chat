import React, { useEffect, useRef } from "react"
import { useSelector } from "react-redux"
import { useQuery, useMutation } from "@apollo/client"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faComments, faPlus } from '@fortawesome/free-solid-svg-icons'
import GET_CONVERSATIONS from "~/queries/conversations.gql"
import CREATE_CONVERSATION from "~/mutations/create_conversation.gql"
import Error from "~/components/error"
import Loading from "~/components/loading"
import { layout, useAppDispatch } from "~/store"

interface ConversationsProps {
    user?: User
}

interface ConversationsQuery {
    conversations: Array<Conversation>
}

const Conversations: React.FC<ConversationsProps> = props => {
    const dispatch = useAppDispatch()
    const inputRef = useRef<HTMLInputElement>(null)
    const selectedConversation = useSelector<Conversation>(store => store.layout.conversation)
    const query = useQuery<ConversationsQuery>(GET_CONVERSATIONS)
    const [title, setTitle] = React.useState<string>("")
    const [create, { loading: createLoading, error: createError, data: createData }] = useMutation(CREATE_CONVERSATION)
    const handleCreate = () => {
        create({ variables: { title } })
        setTitle("")
    }

    const handleConversationEnter = (conversation: Conversation) => {
        dispatch(layout.actions.setConversation(conversation))
        setTitle("")
    }

    useEffect(() => {
        console.log(createData)
    }, [createData])

    useEffect(() => {
        if (query.data) dispatch(layout.actions.setConversations(query.data.conversations))
    }, [query.data])

    return props.user ? <div style={{ maxHeight: "calc(100vh - 13.75rem)" }}>
        <Error error={query.error} />
        <Loading loading={query.loading} />
        <ul className="divide-y divide-gray-200" style={{ minHeight: "calc(100vh - 13.75rem)" }}>
            <li className="py-4 flex">
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Search Or Create a Conversation</label>
                    <div className="mt-1 flex rounded-md shadow-sm">
                        <div className="relative flex items-stretch flex-grow focus-within:z-10">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <FontAwesomeIcon icon={faComments} className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                type="text"
                                name="title"
                                id="title"
                                ref={inputRef}
                                onChange={(event: { target: HTMLInputElement }) => setTitle(event.target.value)}
                                className="focus:ring-indigo-500 focus:border-indigo-500 block w-full rounded-none rounded-l-md pl-10 sm:text-sm border-gray-300"
                                placeholder="title of the conversation" />
                        </div>
                        <button
                            onClick={handleCreate}
                            className="-ml-px relative inline-flex items-center space-x-2 px-4 py-2 border border-gray-300 text-sm font-medium rounded-r-md text-gray-700 bg-gray-50 hover:bg-gray-100 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500">
                            <FontAwesomeIcon icon={faPlus} className="h-5 w-5 text-gray-400" />
                            <span>Create</span>
                        </button>
                    </div>
                </div>
            </li>
            {query.data && query.data.conversations.map(conversation =>
                <li
                    key={conversation.id}
                    onClick={() => handleConversationEnter(conversation)}
                    className={`py-4 flex hover:text-gray-400 cursor-pointer ${selectedConversation && selectedConversation.id == conversation.id && "bg-indigo-600"}`}>
                    <FontAwesomeIcon icon={faComments} className="h-10 w-10 rounded-full" />
                    <div className="ml-3">
                        <p className={`text-sm font-medium ${(selectedConversation && selectedConversation.id == conversation.id) ? "text-white" : "text-gray-900"}`}>{conversation.title}</p>
                        {conversation.owner && <p className={`text-sm ${(selectedConversation && selectedConversation.id == conversation.id) ? "text-white" : "text-gray-500"}`}>{conversation.owner.email}</p>}
                    </div>
                </li>
            )}
        </ul>
    </div> : <></>
}

export default Conversations
