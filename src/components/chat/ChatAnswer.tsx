
function ChatAnswer({ answer }: { answer: any}) {
    return (
        <>
            <div className="col-start-1 col-end-8 p-3 rounded-lg">
                  <div className="flex flex-row items-center">
                    <div className="relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl">
                      <div>
                      <p>{answer}</p>
                      </div>
                    </div>
                  </div>
                </div>
        </>
    )
}
export default ChatAnswer