import React from "react"
import { FaSpinner } from 'react-icons/fa'

interface LoadingProps {
    message?: string
    loading: boolean
}

const Loading: React.FC<LoadingProps> = (props) =>
    props.loading ? <FaSpinner /> : <span />
export default Loading