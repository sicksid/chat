defmodule ChatWeb.Schema.Subscriptions.System do
  use Absinthe.Schema.Notation

  object :system_subscriptions do
    @desc "Subscribe to new messages in a conversation"
    field :conversation_change, :conversation do
      arg(:conversation_id, non_null(:id))

      config(fn args, _res ->
        {:ok, topic: args.conversation_id}
      end)
    end

    field :attachment_change, :attachment do
      arg(:attachment_id, non_null(:id))

      config(fn args, _res ->
        {:ok, topic: args.id}
      end)
    end
  end
end
