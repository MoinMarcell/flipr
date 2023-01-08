import {ChangeEvent, FormEvent, useState} from "react";

type addFliprProps = {
    handleContent: (content: string) => void
}

const AddFlipr = (props: addFliprProps) => {

    const [content, setContent] = useState<string>("")

    function onChangeContent(event: ChangeEvent<HTMLTextAreaElement>){
        setContent(event.target.value)
    }

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        props.handleContent(content)
        setContent("")
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-floating">
                    <textarea className="form-control mb-1 h-25" placeholder="What do you want to flipr?"
                              id="floatingTextarea2" value={content} onChange={onChangeContent}></textarea>
                <label htmlFor="floatingTextarea2">What do you want to flipr?</label>
            </div>
            <button className={"btn btn-secondary mb-3"}>flipr IT!</button>
        </form>
    );
}

export default AddFlipr;