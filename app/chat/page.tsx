
import ConsentGate from "@/components/ConsentGate";
import ChatBox from "@/components/ChatBox";

export const metadata = { title: "Chat · kidschatgpt.org" };

export default function ChatPage() {
  return (
    <ConsentGate>
      <h1>Chat (Kid Mode)</h1>
      <p>Ask questions, practice, or get explanations. Be kind. Stay safe.</p>
      <ChatBox/>
      <p className="small">
        Safety: We block unsafe topics and limit daily messages. A parent can sit with you and guide your learning.
      </p>
    </ConsentGate>
  )
}
