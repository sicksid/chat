import React, { useRef, useEffect } from 'react'
import ReactTimeAgo from 'react-time-ago'
import { FaUser } from 'react-icons/fa'

import moment from 'moment'
import 'moment-timezone'

interface Props {
  attachment: Attachment,
  newest: Boolean
}

const timezone: string = moment.tz.guess()

const Attachment: React.FC<Props> = props => {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (props.newest) ref.current?.scrollIntoView(true)
  }, [props.newest])

  const date = moment.utc(props.attachment.insertedAt).tz(timezone).toDate()
  return <div className="flex space-x-3 px-6" ref={ref}>
    <FaUser />
    <div className="flex-1 space-y-1">
      <div className="flex items-center justify-between">
        {props.attachment.user ?
          <h3 className="text-sm font-medium">{props.attachment.user.email}</h3> :
          <h3 className="text-sm font-medium">{props.attachment.user_id}</h3>
        }
        <p className="text-sm text-gray-500">
          <ReactTimeAgo date={date} locale="en-US" />
        </p>
      </div>
      <p className="text-sm text-gray-500">
        {props.attachment.url}
      </p>
    </div>
  </div>
}

export default Attachment