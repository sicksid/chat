import React from "react"
import { Container } from "@chakra-ui/react"
import Message from "./message"
import Attachment from "./attachment"
import Timeline from "./timeline"
import Uploads from "./uploads"
import Form from "./form"

interface Props {
  conversation: Conversation
}

const Chat: React.FC<Props> = ({ conversation }) => <Container>
  {/* <Header>
  </Header>
  <Content>
  </Content> */}
  <Timeline conversation={conversation}></Timeline>
  <Form conversation={conversation}></Form>
  {/* <Footer>
  </Footer> */}
</Container>

export default Chat
export {
  Message,
  Timeline,
  Uploads,
  Attachment,
  Form
}